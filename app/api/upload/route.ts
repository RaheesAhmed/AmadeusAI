import { NextRequest, NextResponse } from 'next/server';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Document Loaders
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

// Validation schema
const uploadSchema = z.object({
  files: z.array(z.any()),
  userId: z.string().optional(),
  category: z.enum(['tutorial', 'reference', 'example', 'documentation']).default('tutorial'),
});

// Initialize embeddings and Supabase client
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PRIVATE_KEY!
);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

// Text splitter for chunking documents
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

/**
 * Process uploaded file based on its type
 */
async function processFile(file: File, tempPath: string) {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  let loader;

  switch (fileExtension) {
    case 'pdf':
      loader = new PDFLoader(tempPath);
      break;
    case 'docx':
      loader = new DocxLoader(tempPath);
      break;
    case 'doc':
      loader = new DocxLoader(tempPath, { type: "doc" });
      break;
    case 'txt':
    case 'md':
      loader = new TextLoader(tempPath);
      break;
    case 'csv':
      loader = new CSVLoader(tempPath);
      break;
    case 'pptx':
      loader = new PPTXLoader(tempPath);
      break;
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }

  const documents = await loader.load();
  return documents;
}

/**
 * Save file temporarily for processing
 */
async function saveFileTemporarily(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const tempDir = join(process.cwd(), 'temp');
  const tempPath = join(tempDir, `${Date.now()}_${file.name}`);
  
  // Ensure temp directory exists
  try {
    await writeFile(tempPath, buffer);
    return tempPath;
  } catch (error) {
    throw new Error(`Failed to save temporary file: ${error}`);
  }
}

/**
 * Clean up temporary file
 */
async function cleanupTempFile(path: string) {
  try {
    await unlink(path);
  } catch (error) {
    console.warn(`Failed to cleanup temp file: ${path}`, error);
  }
}

/**
 * Sanitize content to remove problematic Unicode sequences
 */
function sanitizeContent(content: string): string {
  return content
    // Remove or replace problematic Unicode escape sequences
    .replace(/\\u[\dA-Fa-f]{4}/g, '') // Remove Unicode escape sequences
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\uFEFF/g, '') // Remove BOM
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\r/g, '\n') // Convert remaining carriage returns
    .trim(); // Remove leading/trailing whitespace
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const userId = formData.get('userId') as string || 'anonymous';
    const category = formData.get('category') as string || 'tutorial';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const results = [];
    
    for (const file of files) {
      let tempPath: string | null = null;
      
      try {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          results.push({
            filename: file.name,
            success: false,
            error: 'File size exceeds 10MB limit'
          });
          continue;
        }

        // Validate file type
        const allowedTypes = ['pdf', 'docx', 'doc', 'txt', 'md', 'csv', 'pptx'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        
        if (!fileExtension || !allowedTypes.includes(fileExtension)) {
          results.push({
            filename: file.name,
            success: false,
            error: `Unsupported file type. Allowed: ${allowedTypes.join(', ')}`
          });
          continue;
        }

        // Save file temporarily
        tempPath = await saveFileTemporarily(file);
        
        // Process the document
        const documents = await processFile(file, tempPath);
        
        // Split documents into chunks
        const splitDocs = await textSplitter.splitDocuments(documents);
        
        // Add metadata to each chunk and sanitize content
        const enhancedDocs = splitDocs.map(doc => ({
          ...doc,
          pageContent: sanitizeContent(doc.pageContent),
          metadata: {
            ...doc.metadata,
            filename: file.name,
            fileType: fileExtension,
            userId: userId,
            category: category,
            uploadDate: new Date().toISOString(),
            fileSize: file.size,
          }
        }));

        // Add documents to vector store
        await vectorStore.addDocuments(enhancedDocs);
        
        results.push({
          filename: file.name,
          success: true,
          documentsCount: splitDocs.length,
          totalChunks: splitDocs.length,
        });

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        results.push({
          filename: file.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown processing error'
        });
      } finally {
        // Cleanup temporary file
        if (tempPath) {
          await cleanupTempFile(tempPath);
        }
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      message: `Processed ${files.length} files: ${successCount} successful, ${failureCount} failed`,
      results,
      summary: {
        totalFiles: files.length,
        successful: successCount,
        failed: failureCount,
      }
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve uploaded documents metadata
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'anonymous';
    const category = searchParams.get('category');
    const fileType = searchParams.get('fileType');

    // Build filter conditions
    let filter: any = { userId };
    
    if (category) {
      filter.category = category;
    }
    
    if (fileType) {
      filter.fileType = fileType;
    }

    // Query documents from Supabase
    const { data, error } = await supabaseClient
      .from('documents')
      .select('metadata')
      .contains('metadata', filter);

    if (error) {
      throw error;
    }

    // Extract unique files information
    const filesMap = new Map();
    
    data?.forEach((doc: any) => {
      const metadata = doc.metadata;
      if (metadata.filename && !filesMap.has(metadata.filename)) {
        filesMap.set(metadata.filename, {
          filename: metadata.filename,
          fileType: metadata.fileType,
          category: metadata.category,
          uploadDate: metadata.uploadDate,
          fileSize: metadata.fileSize,
        });
      }
    });

    const files = Array.from(filesMap.values());

    return NextResponse.json({
      files,
      count: files.length,
    });

  } catch (error) {
    console.error('Get documents API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve documents',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
import { DynamicStructuredTool } from "@langchain/core/tools";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const retrievalSchema = z.object({
  query: z.string().describe("The search query to find relevant documents"),
  category: z.string().optional().describe("Filter by document category (tutorial, reference, example, documentation)"),
  fileType: z.string().optional().describe("Filter by file type (pdf, docx, txt, csv, pptx)"),
  limit: z.number().default(5).describe("Maximum number of documents to retrieve (default: 5)"),
});

export class AmadeusRetrievalTool extends DynamicStructuredTool {
  name = "retrieve_knowledge";
  description = `Search and retrieve relevant documents from the Amadeus knowledge base.
  Use this tool to find information about:
  - Documentation and reference materials

  
  Always use this tool when a student asks questions that might be answered by uploaded documents.`;
  
  schema = retrievalSchema;

  private vectorStore: SupabaseVectorStore;
  private embeddings: OpenAIEmbeddings;
  private supabaseClient: any;

  constructor() {
    super({
      name: "retrieve_knowledge",
      description: `Search and retrieve relevant documents from the Amadeus knowledge base.
      Use this tool to find information about:
      - Documentation and reference materials
      
      
      Always use this tool when a student asks questions that might be answered by uploaded documents.`,
      schema: retrievalSchema,
      func: async (args: z.infer<typeof retrievalSchema>) => {
        return this.executeRetrieval(args);
      },
    });
    
    this.embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    this.supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    );

    this.vectorStore = new SupabaseVectorStore(this.embeddings, {
      client: this.supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });
  }

  async executeRetrieval(args: z.infer<typeof retrievalSchema>): Promise<string> {
    try {
      const { query, category, fileType, limit } = args;

      // Build filter for metadata
      let filter: any = {};
      if (category) {
        filter.category = { eq: category };
      }
      if (fileType) {
        filter.fileType = { eq: fileType };
      }

      // Perform similarity search
      const results = await this.vectorStore.similaritySearch(
        query,
        limit,
        Object.keys(filter).length > 0 ? filter : undefined
      );

      if (results.length === 0) {
        return `No relevant documents found for query: "${query}". You may need to provide a general explanation or ask the student to upload relevant materials.`;
      }

      // Return clean content for the AI to synthesize silently
      let cleanContent = "";
      
      console.log('🔍 Retrieval tool returning', results.length, 'documents');
      
      results.forEach((doc, index) => {
        console.log(`📄 Document ${index + 1} content length:`, doc.pageContent?.length || 0);
        console.log(`📄 Document ${index + 1} preview:`, doc.pageContent?.substring(0, 100));
        cleanContent += doc.pageContent;
        if (index < results.length - 1) {
          cleanContent += "\n\n";
        }
      });

      console.log('🔍 Final clean content length:', cleanContent.length);
      console.log('🔍 Final clean content preview:', cleanContent.substring(0, 200));

      return cleanContent;

    } catch (error) {
      console.error('Retrieval tool error:', error);
      return `Error retrieving documents: ${error instanceof Error ? error.message : 'Unknown error'}. Please try rephrasing your query.`;
    }
  }
}

// Factory function to create the tool
export function createRetrievalTool(): AmadeusRetrievalTool {
  return new AmadeusRetrievalTool();
}

// Simple retrieval function for direct use
export async function searchKnowledge(
  query: string,
  options: {
    category?: string;
    fileType?: string;
    limit?: number;
  } = {}
): Promise<any[]> {
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

  // Build filter for metadata
  let filter: any = {};
  if (options.category) {
    filter.category = { eq: options.category };
  }
  if (options.fileType) {
    filter.fileType = { eq: options.fileType };
  }

  const results = await vectorStore.similaritySearch(
    query,
    options.limit || 5,
    Object.keys(filter).length > 0 ? filter : undefined
  );

  return results;
}
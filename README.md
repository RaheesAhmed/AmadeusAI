# Amadeus Learning Assistant 🛩️

An intelligent AI-powered learning platform for mastering the Amadeus Global Distribution System (GDS). Built with Next.js 15, OpenAI, and advanced RAG (Retrieval-Augmented Generation) technology to provide personalized Amadeus GDS training.

## 🌟 Features

- **🤖 AI-Powered Teaching**: Smart instructor specialized in Amadeus GDS commands and procedures
- **📚 Document Upload**: Support for PDF, DOCX, TXT, CSV, MD, and PPTX learning materials
- **🧠 Vector Search**: Advanced semantic search through uploaded documents
- **🔍 Web Search Fallback**: Automatic web search when local knowledge is insufficient
- **💬 Interactive Chat**: Real-time conversation with streaming responses
- **🎨 Professional UI**: Travel industry-themed interface with Amadeus branding
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔒 Secure**: Encrypted document storage and processing

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase** account for database and vector storage
- **OpenAI API** key for AI functionality
- **Tavily API** key for web search capabilities

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Tavily API for Web Search
TAVILY_API_KEY=your_tavily_api_key_here

# Optional: Custom Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase Database Setup

1. **Create a Supabase Project**
   ```bash
   # Visit https://supabase.com/dashboard
   # Create a new project and note your URL and keys
   ```

2. **Enable Vector Extension**
   ```sql
   -- In Supabase SQL Editor, run:
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

3. **Create Documents Table**
   ```sql
   -- Create the documents table for vector storage
   CREATE TABLE documents (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     content TEXT NOT NULL,
     metadata JSONB DEFAULT '{}',
     embedding vector(1536),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Create index for vector similarity search
   CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
   WITH (lists = 100);

   -- Enable Row Level Security
   ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

   -- Create policy for authenticated users
   CREATE POLICY "Users can manage their documents" ON documents
   FOR ALL USING (true);
   ```

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/RaheesAhmed/AmadeusAI.git
   cd amadeus-agent
   npm install
   ```

2. **Install Required Packages**
   ```bash
   # Core dependencies are already in package.json
   # Ensure these key packages are installed:
   npm install @supabase/supabase-js @langchain/openai @langchain/community
   npm install @langchain/supabase-js mammoth word-extractor pdf-parse
   npm install csv-parser marked
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
amadeus-agent/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API routes
│   │   ├── n8n-workflow/         # Main chat API
│   │   └── upload/               # File upload API
│   ├── upload/                   # File upload page
│   └── globals.css               # Global styles with Amadeus theme
├── components/                   # React components
│   ├── chat/                     # Chat interface components
│   ├── ui/                       # Reusable UI components
│   └── upload/                   # File upload components
├── lib/                          # Core functionality
│   ├── agents/n8n-copilot/      # AI agent configuration
│   │   ├── agent.ts              # Main agent logic
│   │   ├── prompts/              # System prompts
│   │   └── tools/                # AI tools
│   └── tools/                    # Utility tools
└── hooks/                        # React hooks
```

## 🔧 Configuration Details

### Vector Store Configuration

The application uses Supabase's `pgvector` extension for semantic search:

**Key Settings:**
- **Embedding Model**: `text-embedding-3-small` (1536 dimensions)
- **Similarity Function**: Cosine similarity
- **Chunk Size**: 1000 characters with 200 overlap
- **Search Results**: Top 5 most relevant documents

### Document Processing

**Supported File Types:**
- **PDF**: Uses `pdf-parse` for text extraction
- **DOCX**: Uses `mammoth` for modern Word documents
- **DOC**: Uses `word-extractor` for legacy Word documents
- **TXT/MD**: Direct text processing
- **CSV**: Structured data processing
- **PPTX**: Uses `officeparser` for presentations

**Processing Pipeline:**
1. File validation and type detection
2. Text extraction using appropriate loader
3. Content chunking for optimal retrieval
4. Embedding generation with OpenAI
5. Vector storage in Supabase

### AI Agent Configuration

**Core Components:**
- **System Prompt**: Specialized for Amadeus GDS teaching
- **Tools Available**:
  - `retrieve_knowledge`: Search uploaded documents
  - `tavily-search`: Web search for missing information
- **Model**: GPT-4 with streaming responses
- **Teaching Focus**: Amadeus commands, travel procedures, GDS best practices

## 🎯 Usage Guide

### 1. Upload Learning Materials

1. Navigate to `/upload` page
2. Drag & drop or select files (PDF, DOCX, TXT, CSV, MD, PPTX)
3. Files are processed and added to knowledge base
4. Maximum file size: 10MB per file

### 2. Start Learning

1. Return to main chat interface
2. Ask questions about Amadeus GDS:
   - "What are the basic Amadeus commands for flight booking?"
   - "How do I create a PNR in Amadeus?"
   - "Explain availability display commands"
3. Get personalized responses based on uploaded materials
4. Automatic web search for additional information if needed

### 3. Interactive Features

- **Real-time Streaming**: See responses as they're generated
- **Quick Prompts**: Use suggested questions to get started
- **Document Context**: Answers incorporate your uploaded materials
- **Professional Teaching**: Step-by-step explanations tailored for beginners

## 🔌 API Endpoints

### POST `/api/n8n-workflow`
Main chat endpoint with streaming support
```typescript
// Request
{
  "message": "How do I book a flight in Amadeus?"
}

// Response: Server-Sent Events stream
data: {"type": "token", "content": "To book a flight..."}
data: {"type": "complete"}
```

### POST `/api/upload`
File upload endpoint
```typescript
// FormData with files
// Response
{
  "success": true,
  "results": [
    {
      "filename": "amadeus-guide.pdf",
      "chunks": 45,
      "status": "processed"
    }
  ]
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub and connect to Vercel
   vercel --prod
   ```

2. **Environment Variables**
   ```bash
   # Add all .env.local variables to Vercel dashboard
   # Project Settings > Environment Variables
   ```

3. **Domain Configuration**
   ```bash
   # Update NEXT_PUBLIC_APP_URL to your domain
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠️ Development

### Adding New Document Types

1. **Install Loader Package**
   ```bash
   npm install new-document-loader
   ```

2. **Add to Loader Factory**
   ```typescript
   // lib/tools/retrieval-tool.ts
   case '.newext':
     return new NewDocumentLoader(filePath);
   ```

3. **Update File Validation**
   ```typescript
   // components/upload/FileUpload.tsx
   const allowedTypes = [...existing, '.newext'];
   ```

### Customizing AI Behavior

**System Prompt**: Edit `lib/agents/n8n-copilot/prompts/system-prompt.ts`
**Agent Tools**: Modify `lib/agents/n8n-copilot/agent.ts`
**UI Customization**: Update components in `components/` directory

## 🔍 Troubleshooting

### Common Issues

**1. Vector Search Not Working**
```bash
# Verify Supabase extension
SELECT * FROM pg_extension WHERE extname = 'vector';

# Check table exists
\d documents
```

**2. File Upload Failures**
- Check file size (max 10MB)
- Verify supported file types
- Check API route logs

**3. AI Responses Empty**
- Verify OpenAI API key
- Check document embedding process
- Ensure Supabase connection

### Performance Optimization

- **Vector Index**: Ensure proper ivfflat index on embeddings
- **Chunking Strategy**: Adjust chunk size for your content type
- **Caching**: Implement Redis for production environments
- **CDN**: Use Vercel Edge for static assets

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting guide above
- Review the API documentation

---

**Built with ❤️ for the Travel Industry**

Transform your Amadeus GDS learning experience with AI-powered personalized instruction.

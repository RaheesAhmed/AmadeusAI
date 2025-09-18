'use client';

import { FileUpload } from '@/components/upload/FileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Upload, Brain, Lightbulb, FileText } from 'lucide-react';

export default function UploadPage() {
  const handleUploadComplete = (results: any[]) => {
    console.log('Upload completed:', results);
    // Could add toast notification here
  };

  const features = [
    {
      icon: <BookOpen className="size-5 text-blue-500" />,
      title: 'Smart Learning',
      description: 'Upload documents that become part of Amadeus\' knowledge base for personalized teaching.'
    },
    {
      icon: <Brain className="size-5 text-purple-500" />,
      title: 'AI-Powered Retrieval',
      description: 'Advanced vector search finds relevant information from your uploaded materials instantly.'
    },
    {
      icon: <Lightbulb className="size-5 text-yellow-500" />,
      title: 'Contextual Teaching',
      description: 'Amadeus uses your documents to provide relevant examples and explanations.'
    }
  ];

  const supportedFormats = [
    { ext: 'PDF', description: 'Documents, books, manuals' },
    { ext: 'DOCX', description: 'Word documents, reports' },
    { ext: 'TXT', description: 'Plain text files, notes' },
    { ext: 'MD', description: 'Markdown documentation' },
    { ext: 'CSV', description: 'Data files, spreadsheets' },
    { ext: 'PPTX', description: 'Presentations, slides' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Upload className="size-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upload Learning Materials
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enhance Amadeus' teaching abilities by uploading your documents, tutorials, and reference materials. 
            Transform any content into an interactive learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Features Cards */}
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <FileUpload 
              onUploadComplete={handleUploadComplete}
              maxFileSize={10}
              userId="amadeus-user"
            />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Supported Formats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="size-5" />
                  Supported Formats
                </CardTitle>
                <CardDescription>
                  Upload any of these file types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {supportedFormats.map((format) => (
                    <div key={format.ext} className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {format.ext}
                      </Badge>
                      <span className="text-xs text-gray-500 truncate">
                        {format.description}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="size-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Max file size:</strong> 10MB per file
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="size-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Best results:</strong> Well-structured documents with clear headings
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="size-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Categories:</strong> Organize content by type for better retrieval
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="size-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <strong>Privacy:</strong> Documents are processed securely and stored encrypted
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold shrink-0">
                    1
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload your learning materials and choose a category
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold shrink-0">
                    2
                  </div>
                  <p className="text-sm text-gray-600">
                    AI processes and chunks your documents for optimal retrieval
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold shrink-0">
                    3
                  </div>
                  <p className="text-sm text-gray-600">
                    Content becomes available to Amadeus for personalized teaching
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Enhance Your Learning Experience?
          </h2>
          <p className="text-gray-600 mb-6">
            Upload your first document and start chatting with Amadeus using your personalized knowledge base.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Brain className="size-4" />
              Start Learning with Amadeus
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
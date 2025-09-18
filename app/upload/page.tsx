'use client';

import { FileUpload } from '@/components/upload/FileUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UploadPage() {
  const handleUploadComplete = (results: any[]) => {
    console.log('Upload completed:', results);
  };

  const supportedFormats = ['PDF', 'DOCX', 'TXT', 'MD', 'CSV', 'PPTX'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to Chat
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
              <Upload className="size-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] bg-clip-text text-transparent">
              Upload Documents
            </h1>
          </div>
          <p className="text-muted-foreground">
            Add materials to enhance Amadeus' knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Upload Area */}
          <div className="lg:col-span-3">
            <FileUpload
              onUploadComplete={handleUploadComplete}
              maxFileSize={10}
              userId="amadeus-user"
            />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            {/* Supported Formats */}
            <Card className="glass border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-4 text-[#1E40AF]" />
                  Supported Files
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {supportedFormats.map((format) => (
                    <Badge
                      key={format}
                      variant="secondary"
                      className="font-mono text-xs bg-[#1E40AF]/10 text-[#1E40AF] border-[#1E40AF]/20"
                    >
                      {format}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Guidelines */}
            <Card className="glass border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-[#1E40AF] rounded-full"></div>
                  <span>Max 10MB per file</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-[#1E40AF] rounded-full"></div>
                  <span>Clear structure preferred</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-[#1E40AF] rounded-full"></div>
                  <span>Files processed securely</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
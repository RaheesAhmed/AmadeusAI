'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface UploadedFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  documentsCount?: number;
}

interface FileUploadProps {
  onUploadComplete?: (results: any[]) => void;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  userId?: string;
}

const ACCEPTED_TYPES = {
  'pdf': 'application/pdf',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc': 'application/msword',
  'txt': 'text/plain',
  'md': 'text/markdown',
  'csv': 'text/csv',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
};

const CATEGORIES = [
  { value: 'tutorial', label: '📚 Tutorial', description: 'Step-by-step learning guides' },
  { value: 'reference', label: '📖 Reference', description: 'Documentation and references' },
  { value: 'example', label: '💡 Example', description: 'Code examples and samples' },
  { value: 'documentation', label: '📋 Documentation', description: 'Technical documentation' }
];

export function FileUpload({ 
  onUploadComplete, 
  maxFileSize = 10, 
  acceptedFileTypes = Object.keys(ACCEPTED_TYPES),
  userId = 'anonymous'
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [category, setCategory] = useState('tutorial');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedMimeTypes = acceptedFileTypes.map(type => ACCEPTED_TYPES[type as keyof typeof ACCEPTED_TYPES]).filter(Boolean);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !acceptedFileTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedFileTypes.join(', ')}`;
    }

    return null;
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(selectedFiles).forEach(file => {
      const error = validateFile(file);
      newFiles.push({
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: error ? 'error' : 'pending',
        error: error || undefined
      });
    });

    setFiles(prev => [...prev, ...newFiles]);
  }, [maxFileSize, acceptedFileTypes]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const uploadFiles = async () => {
    const filesToUpload = files.filter(f => f.status === 'pending');
    if (filesToUpload.length === 0) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      
      filesToUpload.forEach(({ file }) => {
        formData.append('files', file);
      });
      
      formData.append('userId', userId);
      formData.append('category', category);

      // Update status to uploading
      setFiles(prev => prev.map(f => 
        filesToUpload.some(upload => upload.id === f.id) 
          ? { ...f, status: 'uploading', progress: 0 }
          : f
      ));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      // Update files with results
      setFiles(prev => prev.map(f => {
        const uploadResult = result.results.find((r: any) => r.filename === f.file.name);
        if (uploadResult) {
          return {
            ...f,
            status: uploadResult.success ? 'success' : 'error',
            error: uploadResult.error,
            documentsCount: uploadResult.documentsCount,
            progress: 100
          };
        }
        return f;
      }));

      onUploadComplete?.(result.results);
      
    } catch (error) {
      console.error('Upload error:', error);
      
      // Update failed files
      setFiles(prev => prev.map(f => 
        filesToUpload.some(upload => upload.id === f.id)
          ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' }
          : f
      ));
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <FileText className="size-4" />;
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="size-4 text-red-500" />;
      case 'uploading':
        return <Loader2 className="size-4 animate-spin text-blue-500" />;
      default:
        return <FileText className="size-4 text-gray-400" />;
    }
  };

  const pendingFiles = files.filter(f => f.status === 'pending');
  const successfulFiles = files.filter(f => f.status === 'success');
  const failedFiles = files.filter(f => f.status === 'error');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-5" />
            Upload Learning Materials
          </CardTitle>
          <CardDescription>
            Upload documents to add to Amadeus knowledge base. Supported formats: {acceptedFileTypes.join(', ')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div>
                      <div>{cat.label}</div>
                      <div className="text-xs text-muted-foreground">{cat.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto size-10 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: {maxFileSize}MB
              </p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="mt-4"
              disabled={isUploading}
            >
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedMimeTypes.join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Upload Button */}
          {pendingFiles.length > 0 && (
            <Button 
              onClick={uploadFiles} 
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                `Upload ${pendingFiles.length} file${pendingFiles.length !== 1 ? 's' : ''}`
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Files List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>
              {successfulFiles.length} successful, {failedFiles.length} failed, {pendingFiles.length} pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((fileItem) => (
                <div 
                  key={fileItem.id} 
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getFileIcon(fileItem.file.name)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{fileItem.file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{(fileItem.file.size / 1024).toFixed(1)}KB</span>
                        <Badge variant="outline" className="text-xs">
                          {fileItem.file.name.split('.').pop()?.toUpperCase()}
                        </Badge>
                        {fileItem.documentsCount && (
                          <Badge variant="secondary" className="text-xs">
                            {fileItem.documentsCount} chunks
                          </Badge>
                        )}
                      </div>
                    </div>
                    {getStatusIcon(fileItem.status)}
                  </div>
                  
                  {fileItem.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileItem.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Messages */}
      {failedFiles.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            Some files failed to upload. Check individual file errors above.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Upload, FileText, CheckCircle, AlertCircle, Shield, Zap, Target, X, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { ExtractedDocument } from './MainLayout';
import { toast } from 'sonner';

interface UploadViewProps {
  onDocumentGenerated: (document: ExtractedDocument) => void;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface UploadError {
  type: 'file_size' | 'file_type' | 'network' | 'processing' | 'unknown';
  message: string;
}

export function UploadView({ onDocumentGenerated }: UploadViewProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<UploadError | null>(null);
  const [processedDocument, setProcessedDocument] = useState<ExtractedDocument | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateFile = (file: File): UploadError | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
    
    if (file.size > maxSize) {
      return {
        type: 'file_size',
        message: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum limit of 10MB`
      };
    }
    
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(jpg|jpeg|png|pdf|tiff)$/)) {
      return {
        type: 'file_type',
        message: 'Only PDF, JPEG, PNG, and TIFF files are supported'
      };
    }
    
    return null;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      setUploadStatus('error');
      return;
    }

    setUploadedFile(file);
    setUploadStatus('uploading');
    setUploadError(null);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(uploadInterval);
          processDocument(file);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const processDocument = async (file: File) => {
    setUploadStatus('processing');
    setUploadProgress(90);

    // Simulate processing with potential failure
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random processing error (10% chance)
    if (Math.random() < 0.1) {
      setUploadError({
        type: 'processing',
        message: 'Failed to extract text from document. The image quality may be too low or the document format is not recognized.'
      });
      setUploadStatus('error');
      return;
    }

    setUploadProgress(100);
    
    // Create mock extracted document
    const mockDocument: ExtractedDocument = {
      id: Date.now().toString(),
      filename: file.name,
      type: file.name.toLowerCase().includes('pan') ? 'PAN' : 
            file.name.toLowerCase().includes('voter') ? 'Voter ID' : 
            file.name.toLowerCase().includes('passport') ? 'Passport' : 'Medical Record',
      uploadDate: new Date().toISOString().split('T')[0],
      uploader: 'Current User',
      extractedText: `Name: RAJESH KUMAR
Father's Name: SURESH KUMAR
Date of Birth: 15/08/1985
Document ID: ${file.name.toLowerCase().includes('pan') ? 'ABCDE1234F' : 'DOC123456789'}
Address: 123 Sample Street, Sample City, State - 123456`,
      imageUrl: URL.createObjectURL(file),
      confidence: Math.floor(Math.random() * 10) + 90
    };

    setProcessedDocument(mockDocument);
    setUploadStatus('success');
    
    // Auto-advance after showing success
    setTimeout(() => {
      onDocumentGenerated(mockDocument);
    }, 3000);
  };

  const handleRetry = () => {
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setUploadError(null);
    setProcessedDocument(null);
  };

  const browseFiles = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.tiff';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    };
    input.click();
  };

  if (uploadStatus === 'success' && processedDocument) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full fluent-acrylic border-0 fluent-shadow">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {/* Success Animation */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>Processing Complete!</h2>
                <p className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400 }}>
                  Successfully extracted text from <span style={{ fontWeight: 600 }} className="text-gray-900">{processedDocument.filename}</span>
                </p>
              </div>

              {/* Document Preview */}
              <Card className="bg-gray-50 border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>{processedDocument.type}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>
                    {processedDocument.confidence}% Confidence
                  </Badge>
                </div>
                <div className="text-left bg-white rounded p-3 text-sm text-gray-700 font-mono leading-relaxed">
                  {processedDocument.extractedText.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => onDocumentGenerated(processedDocument)}
                  className="flex-1 fluent-button-primary h-12"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Continue to Review
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="fluent-button-secondary h-12 px-6"
                >
                  Upload Another
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadStatus === 'error' && uploadError) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full fluent-acrylic border-0 fluent-shadow">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {/* Error Icon */}
              <div className="w-24 h-24 bg-gradient-to-tr from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>

              <div className="space-y-3">
                <h2 className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>Upload Failed</h2>
                <p className="text-red-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}>{uploadError.message}</p>
                
                {uploadError.type === 'file_size' && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Tips to reduce file size:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Compress the image quality</li>
                      <li>Reduce image dimensions</li>
                      <li>Convert to a more efficient format (JPEG for photos)</li>
                    </ul>
                  </div>
                )}
                
                {uploadError.type === 'file_type' && (
                  <div className="text-sm text-gray-600">
                    <p>Supported formats: PDF, JPEG, PNG, TIFF</p>
                  </div>
                )}
                
                {uploadError.type === 'processing' && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Try these solutions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ensure the document is clearly visible and well-lit</li>
                      <li>Make sure text is not blurry or distorted</li>
                      <li>Try uploading a higher resolution image</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {uploadedFile && (
                  <Button 
                    onClick={handleRetry}
                    className="flex-1 fluent-button-primary h-12"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Processing
                  </Button>
                )}
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="fluent-button-secondary h-12 px-6"
                >
                  Upload Different File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadStatus === 'uploading' || uploadStatus === 'processing') {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full fluent-acrylic border-0 fluent-shadow">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {/* Processing Animation */}
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto relative">
                <Upload className="w-12 h-12 text-white" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-transparent animate-spin"></div>
              </div>

              <div className="space-y-3">
                <h2 className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>
                  {uploadStatus === 'uploading' ? 'Uploading Document...' : 'Processing Document...'}
                </h2>
                <p className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400 }}>
                  {uploadStatus === 'uploading' 
                    ? `Uploading ${uploadedFile?.name}` 
                    : 'Extracting text using AI-powered OCR'
                  }
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-gray-500">{uploadProgress.toFixed(0)}% complete</p>
              </div>

              {uploadStatus === 'processing' && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>This may take a few moments depending on document complexity...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#0E19EF] to-[#FF248E] bg-clip-text text-transparent" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '2.25rem', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
              VisionIQ Document Processor
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '1.125rem', lineHeight: '1.6' }}>
              Transform your physical documents into digital text with our AI-powered OCR technology. 
              Upload PAN cards, Voter IDs, passports, and medical records for instant text extraction.
            </p>
          </div>
          

        </div>

        {/* Upload Section */}
        <Card className="fluent-acrylic border-0 fluent-shadow">
          <CardHeader className="text-center pb-[0px] pt-[24px] pr-[24px] pl-[24px]">
            <CardTitle className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>Upload Your Document</CardTitle>
            <CardDescription className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '1rem' }}>
              Drag and drop your file here, or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50/50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={browseFiles}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <div className="space-y-2">
                <p className="text-gray-700" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500, fontSize: '1.125rem' }}>Drop your document here</p>
                <p className="text-gray-500" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.9375rem' }}>or click to browse files</p>
              </div>
              <div className="mt-6">
                <Button className="fluent-button-primary px-8 py-3" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600 }}>
                  Choose File
                </Button>
              </div>
            </div>

            {/* File Format Info */}
            <div className="grid md:grid-cols-2 gap-4 text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '0.875rem' }}>
              <div>
                <strong style={{ fontWeight: 600 }}>Supported formats:</strong> <span style={{ fontWeight: 400 }}>PDF, JPEG, PNG, TIFF</span>
              </div>
              <div className="text-right">
                <strong style={{ fontWeight: 600 }}>Maximum file size:</strong> <span style={{ fontWeight: 400 }}>10MB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section - Fluent Design with Light Backgrounds */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Precision Extraction */}
          <div className="group relative overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 hover:shadow-lg"
               style={{
                 border: '1px solid rgba(0, 0, 0, 0.08)',
                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)'
               }}>
            <div className="flex items-start gap-4">
              {/* Icon with gradient background */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                   style={{ boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
                <Target className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                {/* Title with gradient underline */}
                <div className="mb-2">
                  <h3 className="text-gray-900 mb-1" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                    Precision Extraction
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#6366f1] to-[#06b6d4] rounded-full"></div>
                </div>
                <p className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.8125rem', lineHeight: '1.5' }}>
                  AI-powered OCR with 95%+ accuracy for BFSI documents
                </p>
              </div>
            </div>
          </div>

          {/* Enterprise Security */}
          <div className="group relative overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 hover:shadow-lg"
               style={{
                 border: '1px solid rgba(0, 0, 0, 0.08)',
                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)'
               }}>
            <div className="flex items-start gap-4">
              {/* Icon with gradient background */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                   style={{ boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)' }}>
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                {/* Title with gradient underline */}
                <div className="mb-2">
                  <h3 className="text-gray-900 mb-1" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                    Enterprise Security
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full"></div>
                </div>
                <p className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.8125rem', lineHeight: '1.5' }}>
                  Bank-grade encryption with full regulatory compliance
                </p>
              </div>
            </div>
          </div>

          {/* Lightning Fast */}
          <div className="group relative overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 hover:shadow-lg"
               style={{
                 border: '1px solid rgba(0, 0, 0, 0.08)',
                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)'
               }}>
            <div className="flex items-start gap-4">
              {/* Icon with gradient background */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#0E19EF] to-[#FF248E] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                   style={{ boxShadow: '0 4px 12px rgba(14, 25, 239, 0.25)' }}>
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                {/* Title with gradient underline */}
                <div className="mb-2">
                  <h3 className="text-gray-900 mb-1" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                    Lightning Fast
                  </h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#0E19EF] to-[#FF248E] rounded-full"></div>
                </div>
                <p className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.8125rem', lineHeight: '1.5' }}>
                  Process documents in seconds with real-time results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
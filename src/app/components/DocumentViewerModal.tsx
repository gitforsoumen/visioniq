import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  X, 
  FileText, 
  Calendar, 
  User, 
  Copy, 
  Languages, 
  Download,
  Bot,
  Send,
  Sparkles,
  Search,
  MessageSquare,
  Zap,
  CheckCircle
} from 'lucide-react';
import { ExtractedDocument } from './MainLayout';
import { toast } from 'sonner';

interface DocumentViewerModalProps {
  document: ExtractedDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function DocumentViewerModal({ document, isOpen, onClose }: DocumentViewerModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I can help you analyze this document or answer any questions about its content. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!document) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PAN': return 'bg-blue-100 text-blue-800';
      case 'Voter ID': return 'bg-green-100 text-green-800';
      case 'Passport': return 'bg-purple-100 text-purple-800';
      case 'Medical Record': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document.extractedText);
      setIsCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock AI response based on the query
    let responseContent = '';
    const query = inputValue.toLowerCase();
    
    if (query.includes('summarize') || query.includes('summary')) {
      responseContent = `Based on this ${document.type}, here's a summary: This document contains personal identification information with a confidence score of ${document.confidence}%. The key details extracted include the text content you can see on the left. The document was uploaded by ${document.uploader} on ${new Date(document.uploadDate).toLocaleDateString()}.`;
    } else if (query.includes('translate')) {
      responseContent = `I can help translate this document. The extracted text appears to be in English. Would you like me to translate it to a specific language? I support Hindi, Bengali, Tamil, Telugu, and many other Indian languages.`;
    } else if (query.includes('confidence') || query.includes('accuracy')) {
      responseContent = `This document has a confidence score of ${document.confidence}%, which indicates ${document.confidence >= 95 ? 'excellent' : document.confidence >= 85 ? 'very good' : 'good'} extraction accuracy. The AI is ${document.confidence >= 95 ? 'highly' : 'reasonably'} confident in the extracted text quality.`;
    } else if (query.includes('details') || query.includes('information')) {
      responseContent = `This ${document.type} contains the following key information: ${document.extractedText.slice(0, 200)}... The document was processed with ${document.confidence}% confidence and uploaded by ${document.uploader}.`;
    } else {
      responseContent = `I understand you're asking about "${inputValue}". Based on the document content, I can help analyze the extracted text, explain the confidence score, or assist with translation. Could you be more specific about what you'd like to know?`;
    }

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionChips = [
    'Summarize this document',
    'Check confidence score',
    'Translate to Hindi',
    'Extract key details',
    'Analyze document type',
    'Explain the content'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[800px] h-[85vh] max-h-[800px] p-0 gap-0 fluent-acrylic border-0 fluent-shadow-lg">
        <DialogHeader className="px-6 py-4 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">{document.filename}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {document.uploader}
                  </span>
                  <Badge className={`${getTypeColor(document.type)} text-xs`}>
                    {document.type}
                  </Badge>
                </DialogDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex h-full min-h-0">
          {/* Left Panel - Document View */}
          <div className="w-3/5 flex flex-col border-r border-gray-100/50">
            {/* Document Image */}
            <div className="flex-1 p-8">
              <Card className="h-full fluent-surface border-0 fluent-shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Document Preview
                  </CardTitle>
                  <CardDescription>
                    Original uploaded image with enhanced viewing space
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <div className="h-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <ImageWithFallback
                      src={(() => {
                        switch (document.type) {
                          case 'Voter ID':
                            return "https://images.unsplash.com/photo-1579642984814-2176e81e0de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b3RlciUyMGlkJTIwY2FyZCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzU4Njg2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
                          case 'PAN':
                            return "https://images.unsplash.com/photo-1518206075495-4e901709d372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW4lMjBjYXJkJTIwdGF4JTIwaWRlbnRpZmljYXRpb258ZW58MXx8fHwxNzU4Njg2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
                          case 'Passport':
                            return "https://images.unsplash.com/photo-1613244470042-e69e8ccb303a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMHRyYXZlbCUyMGRvY3VtZW50fGVufDF8fHx8MTc1ODYxMTExMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
                          case 'Medical Record':
                            return "https://images.unsplash.com/photo-1565453004733-4759d7c8f712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVjb3JkcyUyMGhvc3BpdGFsJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzU4Njg2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
                          default:
                            return "https://images.unsplash.com/photo-1518206075495-4e901709d372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW4lMjBjYXJkJTIwdGF4JTIwaWRlbnRpZmljYXRpb258ZW58MXx8fHwxNzU4Njg2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
                        }
                      })()}
                      alt={`${document.type} - ${document.filename}`}
                      className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Extracted Text */}
            <div className="p-8 pt-0">
              <Card className="fluent-surface border-0 fluent-shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Extracted Text
                      </CardTitle>
                      <CardDescription>
                        AI-powered OCR results with enhanced readability
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {document.confidence}% Confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 max-h-40 overflow-y-auto">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {document.extractedText}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      onClick={handleCopy}
                      className="flex-1 fluent-button-secondary h-10"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {isCopied ? 'Copied!' : 'Copy Text'}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toast.success(`Translation started for ${document.filename}`)}
                      className="flex-1 fluent-button-secondary h-10"
                    >
                      <Languages className="w-4 h-4 mr-2" />
                      Translate
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toast.success(`Downloading ${document.filename}...`)}
                      className="fluent-button-secondary h-10 px-4"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="w-2/5 flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Document Assistant</h3>
                  <p className="text-sm text-gray-500">Ask questions about this document</p>
                </div>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="p-6 pb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {suggestionChips.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInputValue(suggestion)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-6 pt-0 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 transition-all duration-200 ease-out ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-[#0E19EF] to-[#FF248E] text-white fluent-shadow-sm'
                        : 'fluent-surface text-gray-900 fluent-shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.type === 'assistant' && (
                        <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="fluent-surface rounded-lg p-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 pt-0 border-t border-gray-100/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about this document... (e.g., 'Summarize the key details')"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 fluent-input"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="fluent-button-primary h-12 w-12 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
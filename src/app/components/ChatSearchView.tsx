import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Send, 
  MessageSquare, 
  Search, 
  Calendar, 
  FileText, 
  User, 
  Bot,
  Filter,
  Copy,
  Languages
} from 'lucide-react';
import { ExtractedDocument } from './MainLayout';
import { toast } from 'sonner';

interface ChatSearchViewProps {
  documents: ExtractedDocument[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  results?: ExtractedDocument[];
}

export function ChatSearchView({ documents }: ChatSearchViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I can help you search through your document history. You can ask me questions like "Find all PAN cards from last month" or "Show me documents uploaded by John Doe".',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<string>('all');
  const [documentType, setDocumentType] = useState<string>('all');
  const [uploader, setUploader] = useState<string>('all');

  const uploaders = Array.from(new Set(documents.map(doc => doc.uploader)));
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));

  const simulateSearch = (query: string): ExtractedDocument[] => {
    const lowerQuery = query.toLowerCase();
    return documents.filter(doc => {
      const matchesQuery = doc.filename.toLowerCase().includes(lowerQuery) ||
                          doc.extractedText.toLowerCase().includes(lowerQuery) ||
                          doc.uploader.toLowerCase().includes(lowerQuery) ||
                          doc.type.toLowerCase().includes(lowerQuery);
      
      const matchesDateRange = dateRange === 'all' || (() => {
        const docDate = new Date(doc.uploadDate);
        const now = new Date();
        switch (dateRange) {
          case 'today':
            return docDate.toDateString() === now.toDateString();
          case 'week':
            return (now.getTime() - docDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          case 'month':
            return (now.getTime() - docDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      })();

      const matchesType = documentType === 'all' || doc.type === documentType;
      const matchesUploader = uploader === 'all' || doc.uploader === uploader;

      return matchesQuery && matchesDateRange && matchesType && matchesUploader;
    });
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

    const searchResults = simulateSearch(inputValue);
    
    let responseContent = '';
    if (searchResults.length === 0) {
      responseContent = `I couldn't find any documents matching "${inputValue}". Try adjusting your search terms or filters.`;
    } else {
      responseContent = `I found ${searchResults.length} document${searchResults.length === 1 ? '' : 's'} matching "${inputValue}". Here are the results:`;
    }

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      results: searchResults,
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

  const handleCopy = async (text: string, filename: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Text from ${filename} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PAN': return 'bg-blue-100 text-blue-800';
      case 'Voter ID': return 'bg-green-100 text-green-800';
      case 'Passport': return 'bg-purple-100 text-purple-800';
      case 'Medical Record': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-8 bg-transparent">
      <div className="max-w-6xl mx-auto h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 fluent-surface rounded-2xl px-6 py-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  AI Search Assistant
                </h1>
                <p className="text-sm text-gray-500">Intelligent document search</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ask questions about your document history in natural language. Our AI understands context and provides intelligent search results.
            </p>
          </div>

          {/* Smart Filters */}
          <Card className="fluent-surface border-0 fluent-shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Smart Filters:</span>
                </div>
                
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-36 h-10 fluent-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="fluent-acrylic">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="w-44 h-10 fluent-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="fluent-acrylic">
                    <SelectItem value="all">All Types</SelectItem>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={uploader} onValueChange={setUploader}>
                  <SelectTrigger className="w-44 h-10 fluent-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="fluent-acrylic">
                    <SelectItem value="all">All Users</SelectItem>
                    {uploaders.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="flex-1 fluent-card border-0 fluent-shadow flex flex-col">
          <CardHeader className="border-b border-gray-100/50 pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              Search Conversation
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Ask questions in natural language and get intelligent results
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-2xl p-6 transition-all duration-200 ease-out ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-[#0E19EF] to-[#FF248E] text-white fluent-shadow-sm'
                          : 'fluent-surface text-gray-900 fluent-shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.type === 'assistant' && (
                          <Bot className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-base leading-relaxed">{message.content}</p>
                          <p className={`text-sm mt-3 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Results */}
                  {message.results && message.results.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {message.results.map((doc) => (
                        <Card key={doc.id} className="fluent-card border-0 fluent-shadow-sm fluent-hover">
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">
                                    {doc.filename}
                                  </h4>
                                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(doc.uploadDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <User className="w-3 h-3" />
                                      {doc.uploader}
                                    </div>
                                  </div>
                                </div>
                                <Badge className={`${getTypeColor(doc.type)} text-xs ml-2`}>
                                  {doc.type}
                                </Badge>
                              </div>

                              <div className="bg-gray-50 rounded p-2">
                                <p className="text-xs text-gray-800 line-clamp-2">
                                  {doc.extractedText}
                                </p>
                              </div>

                              <div className="flex items-center gap-3">
                                <Button
                                  size="sm"
                                  onClick={() => handleCopy(doc.extractedText, doc.filename)}
                                  className="flex-1 fluent-button-secondary h-9"
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => toast.success(`Translation started for ${doc.filename}`)}
                                  className="flex-1 fluent-button-secondary h-9"
                                >
                                  <Languages className="w-4 h-4 mr-2" />
                                  Translate
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-blue-600" />
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

            {/* Input */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about your documents... (e.g., 'Find all PAN cards from this week')"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-tl from-[#0E19EF] to-[#FF248E] hover:from-[#0E19EF]/90 hover:to-[#FF248E]/90 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs text-gray-500">Try asking:</span>
                {[
                  'Show me all PAN cards',
                  'Find documents from John Doe',
                  'What documents were uploaded this week?'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
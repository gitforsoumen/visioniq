import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { 
  Search, 
  Calendar, 
  User, 
  FileText, 
  Copy, 
  Languages, 
  MoreVertical,
  Download,
  Eye,
  Clock
} from 'lucide-react';
import { ExtractedDocument } from './MainLayout';
import { toast } from 'sonner';

interface HistoryViewProps {
  documents: ExtractedDocument[];
  onDocumentView: (document: ExtractedDocument) => void;
}

export function HistoryView({ documents, onDocumentView }: HistoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isTranslateDialogOpen, setIsTranslateDialogOpen] = useState(false);
  const [selectedDocumentForTranslation, setSelectedDocumentForTranslation] = useState<ExtractedDocument | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<{text: string, language: string, filename: string} | null>(null);
  const [isTranslationResultOpen, setIsTranslationResultOpen] = useState(false);
  
  const itemsPerPage = 6;

  // Language options for translation
  const languageOptions = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡିଆ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.extractedText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else if (sortBy === 'name') {
      return a.filename.localeCompare(b.filename);
    } else if (sortBy === 'confidence') {
      return b.confidence - a.confidence;
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  // Reset to page 1 when search/filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const handleCopy = async (text: string, filename: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Text from ${filename} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleTranslate = (document: ExtractedDocument) => {
    setSelectedDocumentForTranslation(document);
    setSelectedLanguage('');
    setIsTranslateDialogOpen(true);
  };

  // Mock translation function
  const mockTranslate = async (text: string, targetLanguage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock translation based on language
    const translations: Record<string, string> = {
      'hi': `[हिन्दी अनुवाद] ${text.slice(0, 50)}... (यह एक नमूना अनुवाद है। वास्तविक अनुवाद सेवा यहाँ जुड़ी होगी।)`,
      'bn': `[বাংলা অনুবাদ] ${text.slice(0, 50)}... (এটি একটি নমুনা অনুবাদ। প্রকৃত অনুবাদ সেবা এখানে সংযুক্ত হবে।)`,
      'ur': `[اردو ترجمہ] ${text.slice(0, 50)}... (یہ ایک نمونہ ترجمہ ہے۔ حقیقی ترجمہ سروس یہاں جڑی ہوگی۔)`,
      'ta': `[தமிழ் மொழிபெயர்ப்பு] ${text.slice(0, 50)}... (இது ஒரு மாதிரி மொழிபெயர்ப்பு. உண்மையான மொழிபெயர்ப்பு சேவை இங்கே இணைக்கப்படும்.)`,
      'te': `[తెలుగు అనువాదం] ${text.slice(0, 50)}... (ఇది ఒక నమూనా అనువాదం. నిజమైన అనువాద సేవ ఇక్కడ కనెక్ట్ చేయబడుతుంది.)`,
      'mr': `[मराठी भाषांतर] ${text.slice(0, 50)}... (हे एक नमुना भाषांतर आहे. वास्तविक भाषांतर सेवा येथे जोडली जाईल.)`,
      'gu': `[ગુજરાતી અનુવાદ] ${text.slice(0, 50)}... (આ એક નમૂનો અનુવાદ છે. વાસ્તવિક અનુવાદ સેવા અહીં જોડાશે.)`,
      'kn': `[ಕನ್ನಡ ಅನುವಾದ] ${text.slice(0, 50)}... (ಇದು ಒಂದು ಮಾದರಿ ಅನುವಾದವಾಗಿದೆ. ನಿಜವಾದ ಅನುವಾದ ಸೇವೆಯನ್ನು ಇಲ್ಲಿ ಸಂಪರ್ಕಿಸಲಾಗುವುದು.)`,
      'ml': `[മലയാളം വിവർത്തനം] ${text.slice(0, 50)}... (ഇത് ഒരു സാമ്പിൾ വിവർത്തനമാണ്. യഥാർത്ഥ വിവർത്തന സേവനം ഇവിടെ കണക്റ്റ് ചെയ്യപ്പെടും.)`,
      'pa': `[ਪੰਜਾਬੀ ਅਨੁਵਾਦ] ${text.slice(0, 50)}... (ਇਹ ਇੱਕ ਨਮੂਨਾ ਅਨੁਵਾਦ ਹੈ। ਅਸਲ ਅਨੁਵਾਦ ਸੇਵਾ ਇੱਥੇ ਜੁੜੇਗੀ।)`,
      'or': `[ଓଡିଆ ଅନୁବାଦ] ${text.slice(0, 50)}... (ଏହା ଏକ ନମୁନା ଅନୁବାଦ। ପ୍ରକୃତ ଅନୁବାଦ ସେବା ଏଠାରେ ସଂଯୁକ୍ତ ହେବ।)`,
      'as': `[অসমীয়া অনুবাদ] ${text.slice(0, 50)}... (এইটো এটা নমুনা অনুবাদ। প্ৰকৃত অনুবাদ সেৱা ইয়াত সংযোগ কৰা হ'ব।)`
    };
    
    return translations[targetLanguage] || `[Translation to ${targetLanguage}] ${text}`;
  };

  const handleTranslateConfirm = async () => {
    if (selectedDocumentForTranslation && selectedLanguage) {
      const selectedLang = languageOptions.find(lang => lang.code === selectedLanguage);
      
      setIsTranslating(true);
      setIsTranslateDialogOpen(false);
      
      toast.success(`Starting translation to ${selectedLang?.name}...`);
      
      try {
        const translatedText = await mockTranslate(selectedDocumentForTranslation.extractedText, selectedLanguage);
        
        setTranslationResult({
          text: translatedText,
          language: selectedLang?.name || '',
          filename: selectedDocumentForTranslation.filename
        });
        
        setIsTranslationResultOpen(true);
        toast.success(`Translation completed successfully!`);
        
      } catch (error) {
        toast.error('Translation failed. Please try again.');
      } finally {
        setIsTranslating(false);
        setSelectedDocumentForTranslation(null);
        setSelectedLanguage('');
      }
    }
  };

  const handleViewDocument = (document: ExtractedDocument) => {
    onDocumentView(document);
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

  const getPlaceholderImage = (type: string) => {
    switch (type) {
      case 'PAN': 
        return 'https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZG9jdW1lbnQlMjBmaW5hbmNpYWwlMjBwYXBlcnxlbnwxfHx8fDE3NTg2MzczODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      case 'Voter ID': 
        return 'https://images.unsplash.com/photo-1620887110499-d54ecf17cefb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwaWQlMjBjYXJkJTIwc2FtcGxlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzU4NjM3MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      case 'Passport': 
        return 'https://images.unsplash.com/photo-1487637419635-a2a471ff5c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGJvb2slMjB0cmF2ZWwlMjBkb2N1bWVudHxlbnwxfHx8fDE3NTg2MzczNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      case 'Medical Record': 
        return 'https://images.unsplash.com/photo-1710503913397-df9bfea7e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcmVwb3J0JTIwbWVkaWNhbCUyMGRvY3VtZW50fGVufDF8fHx8MTc1ODYzNzM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      default: 
        return 'https://images.unsplash.com/photo-1554224155-cfa08c2a758f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBkb2N1bWVudCUyMGZvcm0lMjBwYXBlcnxlbnwxfHx8fDE3NTg2MzczODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    }
  };

  return (
    <div className="flex-1 p-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 fluent-surface rounded-2xl px-6 py-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Document History
                </h1>
                <p className="text-sm text-gray-500">Comprehensive document archive</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              View, search, and manage all your processed documents with advanced filtering and intelligent organization.
            </p>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Documents */}
            <Card className="fluent-surface border-0 fluent-shadow-sm fluent-hover transition-all duration-200 ease-out">
              <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 font-medium">Total Documents</div>
                      <div className="text-xs text-gray-500">Processed successfully</div>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-gray-900 text-right">
                    {documents.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Confidence */}
            <Card className="fluent-surface border-0 fluent-shadow-sm fluent-hover transition-all duration-200 ease-out">
              <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 font-medium">Avg. Confidence</div>
                      <div className="text-xs text-gray-500">Accuracy score</div>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-gray-900 text-right">
                    {Math.round(documents.reduce((acc, doc) => acc + doc.confidence, 0) / documents.length)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Types */}
            <Card className="fluent-surface border-0 fluent-shadow-sm fluent-hover transition-all duration-200 ease-out">
              <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 font-medium">Document Types</div>
                      <div className="text-xs text-gray-500">Categories available</div>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-gray-900 text-right">
                    {new Set(documents.map(doc => doc.type)).size}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avg. Processing Time */}
            <Card className="fluent-surface border-0 fluent-shadow-sm fluent-hover transition-all duration-200 ease-out">
              <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 font-medium">Avg. Processing Time</div>
                      <div className="text-xs text-gray-500">Time per document</div>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold text-gray-900 text-right">
                    2.4s
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Document Search & Results */}
        <Card className="fluent-surface border-0 fluent-shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Document Library</CardTitle>
            <CardDescription>Search, filter, and manage your processed documents</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Advanced Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search documents, uploaders, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="fluent-input pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 fluent-input">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="fluent-acrylic">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PAN">PAN Card</SelectItem>
                  <SelectItem value="Voter ID">Voter ID</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="Medical Record">Medical Record</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 fluent-input">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="fluent-acrylic">
                  <SelectItem value="date">Upload Date</SelectItem>
                  <SelectItem value="name">File Name</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredDocuments.length)} of {filteredDocuments.length} documents
                {filteredDocuments.length !== documents.length && ` (filtered from ${documents.length} total)`}
              </div>
              {(searchTerm || filterType !== 'all') && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Document Grid */}
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No documents found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Upload your first document to get started'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedDocuments.map((document) => (
                  <Card 
                    key={document.id} 
                    className="group bg-white/90 backdrop-blur-xl border border-gray-200 fluent-shadow-sm fluent-hover cursor-pointer"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">
                            {document.filename}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(document.uploadDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className={`${getTypeColor(document.type)} text-xs`}>
                          {document.type}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Document Preview */}
                      <div 
                        className="aspect-video bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer relative group"
                        onClick={() => handleViewDocument(document)}
                      >
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
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                        {/* Document Type Overlay */}
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Badge className={`${getTypeColor(document.type)} text-xs shadow-sm`}>
                            {document.type}
                          </Badge>
                        </div>
                        {/* Confidence Overlay */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            {document.confidence}% Confidence
                          </div>
                        </div>
                      </div>

                      {/* Document Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <User className="w-3 h-3" />
                            <span>{document.uploader}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span>{document.confidence}%</span>
                          </div>
                        </div>

                        {/* Extracted Text Preview */}
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-xs text-gray-600 mb-1 font-medium">Extracted Text:</p>
                          <p className="text-sm text-gray-800 line-clamp-3">
                            {document.extractedText}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(document);
                          }}
                          className="flex-1 fluent-button-secondary h-9"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(document.extractedText, document.filename);
                          }}
                          className="fluent-button-secondary h-9 w-9 p-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTranslate(document);
                          }}
                          disabled={isTranslating}
                          className="fluent-button-secondary h-9 w-9 p-0 disabled:opacity-50"
                        >
                          {isTranslating ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Languages className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`Downloading ${document.filename}...`);
                          }}
                          className="fluent-button-secondary h-9 w-9 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center pt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          if (totalPages <= 7 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Translation Language Selection Dialog */}
        <Dialog open={isTranslateDialogOpen} onOpenChange={setIsTranslateDialogOpen}>
          <DialogContent className="fluent-acrylic max-w-4xl w-full">
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] rounded-xl flex items-center justify-center">
                  <Languages className="w-5 h-5 text-white" />
                </div>
                Select Translation Language
              </DialogTitle>
              <DialogDescription>
                Choose the language to translate "{selectedDocumentForTranslation?.filename}" to:
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Language Grid - Horizontal Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-2">
                {languageOptions.map((language) => (
                  <div
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-out hover:scale-[1.02] ${
                      selectedLanguage === language.code
                        ? 'border-blue-500 bg-blue-50 fluent-shadow'
                        : 'border-gray-200 bg-white/80 hover:border-gray-300 hover:fluent-shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                        selectedLanguage === language.code 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedLanguage === language.code && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm truncate">{language.name}</div>
                        <div className="text-xs text-gray-500 truncate">{language.native}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons - Always Visible */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
                <Button
                  variant="outline"
                  onClick={() => setIsTranslateDialogOpen(false)}
                  className="flex-1 fluent-button-secondary h-11"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTranslateConfirm}
                  disabled={!selectedLanguage}
                  className="flex-1 fluent-button-primary h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Languages className="w-4 h-4 mr-2" />
                  Translate to {selectedLanguage ? languageOptions.find(lang => lang.code === selectedLanguage)?.name : '...'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Translation Result Dialog */}
        <Dialog open={isTranslationResultOpen} onOpenChange={setIsTranslationResultOpen}>
          <DialogContent className="fluent-acrylic max-w-3xl w-full">
            <DialogHeader className="pb-6">
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Languages className="w-5 h-5 text-white" />
                </div>
                Translation Complete
              </DialogTitle>
              <DialogDescription>
                Translation of "{translationResult?.filename}" to {translationResult?.language}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Original Text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <h4 className="font-medium text-gray-900">Original Text (English)</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedDocumentForTranslation?.extractedText}
                  </p>
                </div>
              </div>

              {/* Translated Text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-medium text-gray-900">Translated Text ({translationResult?.language})</h4>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {translationResult?.text}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (translationResult?.text) {
                      try {
                        await navigator.clipboard.writeText(translationResult.text);
                        toast.success('Translation copied to clipboard!');
                      } catch (err) {
                        toast.error('Failed to copy text');
                      }
                    }
                  }}
                  className="flex-1 fluent-button-secondary h-11"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Translation
                </Button>
                <Button
                  onClick={() => setIsTranslationResultOpen(false)}
                  className="flex-1 fluent-button-primary h-11"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>



      </div>
    </div>
  );
}
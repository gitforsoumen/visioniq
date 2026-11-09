import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
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

interface DocumentViewerPageProps {
  document: ExtractedDocument;
  onBack: () => void;
}

export function DocumentViewerPage({ document, onBack }: DocumentViewerPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot' as const,
      content: `I've analyzed your ${document.type} document. I can help you extract specific information, translate content, or answer questions about the document. What would you like to know?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isTranslateDialogOpen, setIsTranslateDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<{text: string, language: string, filename: string} | null>(null);
  const [isTranslationResultOpen, setIsTranslationResultOpen] = useState(false);

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

  const suggestionChips = [
    "Extract all names",
    "Find ID numbers", 
    "Translate to English",
    "Summarize content",
    "Extract dates",
    "Find addresses"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    const botResponse = {
      id: messages.length + 2,
      type: 'bot' as const,
      content: `I understand you want to "${inputValue}". Based on the ${document.type} document, here's what I found: [This would contain the actual AI response with extracted information]`,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue('');
    setHasStartedChat(true);
  };

  const getDocumentImageUrl = () => {
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

  const handleTranslate = () => {
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
    if (selectedLanguage) {
      const selectedLang = languageOptions.find(lang => lang.code === selectedLanguage);
      
      setIsTranslating(true);
      setIsTranslateDialogOpen(false);
      
      toast.success(`Starting translation to ${selectedLang?.name}...`);
      
      try {
        const translatedText = await mockTranslate(document.extractedText, selectedLanguage);
        
        setTranslationResult({
          text: translatedText,
          language: selectedLang?.name || '',
          filename: document.filename
        });
        
        setIsTranslationResultOpen(true);
        toast.success(`Translation completed successfully!`);
        
      } catch (error) {
        toast.error('Translation failed. Please try again.');
      } finally {
        setIsTranslating(false);
        setSelectedLanguage('');
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="h-10 w-10 p-0 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {/* Document Thumbnail */}
            <div className="flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
              
            </div>
            
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{document.filename}</h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  {document.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {document.uploadDate}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {document.uploadedBy}
                </div>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {document.confidence}% Confidence
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 p-6 gap-6">
        {/* Left Panel - Document View - Scrollable */}
        <div className="flex-1 overflow-y-auto pr-4">
          {/* Document Content */}
          <Card className="fluent-surface border-0 fluent-shadow-sm">
            <CardContent className="space-y-6 p-6">
              {/* Document Preview Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Document Preview
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Original uploaded document image
                    </p>
                  </div>
                  {/* Document Thumbnail */}
                  <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                    <DialogTrigger asChild>
                      <button className="flex-shrink-0 group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
                        <ImageWithFallback
                          src={getDocumentImageUrl()}
                          alt={`${document.type} - ${document.filename}`}
                          className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Document Preview - {document.filename}
                        </DialogTitle>
                        <DialogDescription>
                          Full-size view of the uploaded {document.type} document for detailed examination
                        </DialogDescription>
                      </DialogHeader>
                      <div className="px-6 pb-6">
                        <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                          <ImageWithFallback
                            src={getDocumentImageUrl()}
                            alt={`${document.type} - ${document.filename}`}
                            className="max-w-full max-h-[70vh] object-contain"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Extracted Text Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Extracted Text
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    AI-powered OCR results with enhanced readability
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 max-h-48 overflow-y-auto">
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
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="flex-1 fluent-button-secondary h-10"
                >
                  {isTranslating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages className="w-4 h-4 mr-2" />
                      Translate
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.success(`Downloading ${document.filename}...`)}
                  className="flex-1 fluent-button-secondary h-10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - AI Chat - Single Unified Card */}
        <div className="w-96 flex flex-col h-full">
          <Card className="flex-1 fluent-surface border-0 fluent-shadow-sm flex flex-col min-h-0">
            {/* Chat Header */}
            <CardHeader className="pb-4 flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                AI Document Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about this document
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col min-h-0 p-6 pt-0">
              {/* Quick Action Chips - Only show if chat hasn't started */}
              {!hasStartedChat && (
                <div className="mb-4 flex-shrink-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {suggestionChips.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            // Auto-send the message when clicking a quick action
                            if (suggestion.trim()) {
                              setMessages(currentMessages => {
                                const userMessage = {
                                  id: currentMessages.length + 1,
                                  type: 'user' as const,
                                  content: suggestion,
                                  timestamp: new Date().toLocaleTimeString()
                                };

                                const botResponse = {
                                  id: currentMessages.length + 2,
                                  type: 'bot' as const,
                                  content: `I understand you want to "${suggestion}". Based on the ${document.type} document, here's what I found: [This would contain the actual AI response with extracted information]`,
                                  timestamp: new Date().toLocaleTimeString()
                                };

                                return [...currentMessages, userMessage, botResponse];
                              });
                              setHasStartedChat(true);
                            }
                          }}
                          className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 text-left"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 min-h-0 mb-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Chat History</span>
                  </div>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Input - Fixed at bottom */}
              <div className="flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about this document..."
                    className="flex-1 fluent-input px-[16px] py-[20px]"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="fluent-button-primary h-10 w-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
              Choose the language to translate "{document?.filename}" to:
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
                  {document?.extractedText}
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
  );
}
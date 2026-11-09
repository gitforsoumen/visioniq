import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Copy, Languages, CheckCircle, FileText, Calendar, User } from 'lucide-react';
import { ExtractedDocument } from './MainLayout';
import { toast } from 'sonner';

interface PostGenerationViewProps {
  document: ExtractedDocument | null;
}

export function PostGenerationView({ document }: PostGenerationViewProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslateDialogOpen, setIsTranslateDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [translationResult, setTranslationResult] = useState<{text: string, language: string, filename: string} | null>(null);
  const [isTranslationResultOpen, setIsTranslationResultOpen] = useState(false);

  // Language options for translation (same as HistoryView)
  const languageOptions = [
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ta', name: 'Tamil', native: 'தমিழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుগు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡିଆ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' }
  ];

  if (!document) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 text-gray-400 mx-auto" />
          <h2 className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.25rem' }}>No document processed yet</h2>
          <p className="text-gray-500" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400 }}>Upload a document to see the extracted text here</p>
        </div>
      </div>
    );
  }

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

  // Mock translation function (same as HistoryView)
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

  const handleTranslateWithLanguage = () => {
    setSelectedLanguage('');
    setIsTranslateDialogOpen(true);
  };

  const handleTranslateConfirm = async () => {
    if (document && selectedLanguage) {
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 fluent-surface rounded-2xl px-6 py-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0E19EF] to-[#FF248E] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1.875rem', letterSpacing: '-0.02em' }}>
                  Extraction Complete
                </h1>
                <p className="text-gray-500" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.875rem' }}>Document processed successfully</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '1.125rem', lineHeight: '1.6' }}>
              Review and manage your extracted document data with professional tools and intelligent features.
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="px-6 py-3 fluent-surface" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1rem' }}>
              <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
              {document.confidence}% Confidence Score
            </Badge>
          </div>

          {/* Document Metadata */}
          <Card className="fluent-surface border-0 fluent-shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '0.875rem' }}>{document.filename}</p>
                    <p className="text-gray-500" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '0.75rem' }}>Filename</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{new Date(document.uploadDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">Upload Date</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{document.uploader}</p>
                    <p className="text-xs text-gray-500">Uploaded By</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Badge className={`${getTypeColor(document.type)} px-3 py-1 text-sm`}>
                    {document.type}
                  </Badge>
                  <p className="text-xs text-gray-500">Document Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Document Preview */}
          <Card className="fluent-card border-0 fluent-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Document Preview
              </CardTitle>
              <CardDescription>
                Original document image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={document.imageUrl}
                  alt={document.filename}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Extracted Text */}
          <Card className="fluent-card border-0 fluent-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Extracted Text
                  </CardTitle>
                  <CardDescription>
                    AI-extracted content from your document
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    className="fluent-button-secondary h-10"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleTranslateWithLanguage}
                    disabled={isTranslating}
                    className="fluent-button-secondary h-10 disabled:opacity-50"
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {document.extractedText}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-8 fluent-surface border-0 shadow-md fluent-hover transition-all duration-200 ease-out hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Copy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Copy Text</h3>
            <p className="text-sm text-gray-600">
              Copy extracted text to your clipboard for use in other applications
            </p>
          </Card>
          
          <Card className="text-center p-8 fluent-surface border-0 shadow-md fluent-hover transition-all duration-200 ease-out hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Languages className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Translate</h3>
            <p className="text-sm text-gray-600">
              Translate extracted text to multiple languages instantly
            </p>
          </Card>
          
          <Card className="text-center p-8 fluent-surface border-0 shadow-md fluent-hover transition-all duration-200 ease-out hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Save & Export</h3>
            <p className="text-sm text-gray-600">
              Save to history and export in various formats
            </p>
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
              Translation of "{document?.filename}" to {translationResult?.language}
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
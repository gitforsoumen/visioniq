import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { UploadView } from './UploadView';
import { PostGenerationView } from './PostGenerationView';
import { HistoryView } from './HistoryView';
import { DocumentViewerPage } from './DocumentViewerPage';

export type ViewType = 'upload' | 'post-generation' | 'history' | 'document-viewer';

export interface ExtractedDocument {
  id: string;
  filename: string;
  type: 'PAN' | 'Voter ID' | 'Passport' | 'Medical Record';
  uploadDate: string;
  uploader: string;
  uploadedBy: string;
  extractedText: string;
  imageUrl: string;
  confidence: number;
}

export function MainLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('upload');
  const [currentDocument, setCurrentDocument] = useState<ExtractedDocument | null>(null);
  const [selectedDocumentForViewing, setSelectedDocumentForViewing] = useState<ExtractedDocument | null>(null);

  // Mock data for demonstration
  const mockDocuments: ExtractedDocument[] = [
    {
      id: '1',
      filename: 'pan_card_001.jpg',
      type: 'PAN',
      uploadDate: '2024-01-15',
      uploader: 'John Doe',
      uploadedBy: 'John Doe',
      extractedText: 'Name: RAJESH KUMAR\nFather\'s Name: SURESH KUMAR\nDate of Birth: 15/08/1985\nPAN: ABCDE1234F',
      imageUrl: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=PAN+Card',
      confidence: 96.5
    },
    {
      id: '2',
      filename: 'voter_id_002.pdf',
      type: 'Voter ID',
      uploadDate: '2024-01-14',
      uploader: 'Jane Smith',
      uploadedBy: 'Jane Smith',
      extractedText: 'Name: PRIYA SHARMA\nFather\'s Name: RAM SHARMA\nAge: 28\nVoter ID: ABC1234567',
      imageUrl: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Voter+ID',
      confidence: 94.2
    },
    {
      id: '3',
      filename: 'passport_003.jpg',
      type: 'Passport',
      uploadDate: '2024-01-13',
      uploader: 'Mike Johnson',
      uploadedBy: 'Mike Johnson',
      extractedText: 'Name: ANITA PATEL\nPassport No: K1234567\nDate of Birth: 22/03/1990\nPlace of Birth: MUMBAI',
      imageUrl: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Passport',
      confidence: 98.1
    },
    {
      id: '4',
      filename: 'medical_record_004.pdf',
      type: 'Medical Record',
      uploadDate: '2024-01-12',
      uploader: 'Dr. Sarah Wilson',
      uploadedBy: 'Dr. Sarah Wilson',
      extractedText: 'Patient: AMIT GUPTA\nDate: 12/01/2024\nDiagnosis: Hypertension\nPrescription: Amlodipine 5mg daily',
      imageUrl: 'https://via.placeholder.com/400x250/f97316/ffffff?text=Medical+Record',
      confidence: 92.8
    },
    {
      id: '5',
      filename: 'pan_card_005.jpg',
      type: 'PAN',
      uploadDate: '2024-01-11',
      uploader: 'Robert Chen',
      uploadedBy: 'Robert Chen',
      extractedText: 'Name: SUNITA VERMA\nFather\'s Name: RAMESH VERMA\nDate of Birth: 10/12/1982\nPAN: FGHIJ5678K',
      imageUrl: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=PAN+Card',
      confidence: 97.3
    },
    {
      id: '6',
      filename: 'voter_id_006.jpg',
      type: 'Voter ID',
      uploadDate: '2024-01-10',
      uploader: 'Lisa Anderson',
      uploadedBy: 'Lisa Anderson',
      extractedText: 'Name: VIKRAM SINGH\nFather\'s Name: BALRAM SINGH\nAge: 35\nVoter ID: DEF9876543',
      imageUrl: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Voter+ID',
      confidence: 95.7
    },
    {
      id: '7',
      filename: 'passport_007.pdf',
      type: 'Passport',
      uploadDate: '2024-01-09',
      uploader: 'David Kumar',
      uploadedBy: 'David Kumar',
      extractedText: 'Name: MEERA JOSHI\nPassport No: L9876543\nDate of Birth: 05/07/1988\nPlace of Birth: DELHI',
      imageUrl: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Passport',
      confidence: 96.9
    },
    {
      id: '8',
      filename: 'medical_record_008.jpg',
      type: 'Medical Record',
      uploadDate: '2024-01-08',
      uploader: 'Dr. Emily Brown',
      uploadedBy: 'Dr. Emily Brown',
      extractedText: 'Patient: RAVI PATEL\nDate: 08/01/2024\nDiagnosis: Diabetes Type 2\nPrescription: Metformin 500mg twice daily',
      imageUrl: 'https://via.placeholder.com/400x250/f97316/ffffff?text=Medical+Record',
      confidence: 93.4
    },
    {
      id: '9',
      filename: 'pan_card_009.pdf',
      type: 'PAN',
      uploadDate: '2024-01-07',
      uploader: 'Michael Torres',
      uploadedBy: 'Michael Torres',
      extractedText: 'Name: KAVITA SHAH\nFather\'s Name: BHARAT SHAH\nDate of Birth: 20/09/1975\nPAN: KLMNO3456P',
      imageUrl: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=PAN+Card',
      confidence: 94.6
    }
  ];

  const handleDocumentGenerated = (document: ExtractedDocument) => {
    setCurrentDocument(document);
    setCurrentView('post-generation');
  };

  const handleDocumentView = (document: ExtractedDocument) => {
    setSelectedDocumentForViewing(document);
    setCurrentView('document-viewer');
  };

  const handleBackFromDocumentViewer = () => {
    setSelectedDocumentForViewing(null);
    setCurrentView('history');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'upload':
        return <UploadView onDocumentGenerated={handleDocumentGenerated} />;
      case 'post-generation':
        return <PostGenerationView document={currentDocument} />;
      case 'history':
        return <HistoryView documents={mockDocuments} onDocumentView={handleDocumentView} />;
      case 'document-viewer':
        return selectedDocumentForViewing ? (
          <DocumentViewerPage 
            document={selectedDocumentForViewing} 
            onBack={handleBackFromDocumentViewer} 
          />
        ) : (
          <HistoryView documents={mockDocuments} onDocumentView={handleDocumentView} />
        );
      default:
        return <UploadView onDocumentGenerated={handleDocumentGenerated} />;
    }
  };

  return (
    <div className="flex h-screen bg-transparent">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
      />
      <main className="flex-1 overflow-auto transition-all duration-200 ease-out">
        <div className="h-full fluent-surface/30">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}
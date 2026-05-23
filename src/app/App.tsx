import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { FileUploadPage } from "./components/FileUploadPage";
import { RiskAnalysisPage } from "./components/RiskAnalysisPage";
import { CleaningConfirmationPage } from "./components/CleaningConfirmationPage";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import type { Metadata } from "./components/RiskAnalysisPage";
import { User, MapPin, FileText, Clock, Shield, Eye } from "lucide-react";

type Screen = 
  | "landing" 
  | "upload" 
  | "analysis" 
  | "cleaning" 
  | "dashboard";

interface AppState {
  currentScreen: Screen;
  selectedFile: File | null;
  deepScan: boolean;
  riskScore: number;
  metadata: Metadata[];
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: "landing",
    selectedFile: null,
    deepScan: false,
    riskScore: 0,
    metadata: []
  });

  const handleGetStarted = () => {
    setAppState(prev => ({ ...prev, currentScreen: "upload" }));
  };

  const handleScanStart = (file: File, deepScan: boolean) => {
    // Generate mock metadata based on file type
    const mockMetadata = generateMockMetadata(file, deepScan);
    const riskScore = calculateRiskScore(mockMetadata);

    setAppState({
      currentScreen: "analysis",
      selectedFile: file,
      deepScan,
      riskScore,
      metadata: mockMetadata
    });
  };

  const handleClean = () => {
    setAppState(prev => ({ ...prev, currentScreen: "cleaning" }));
  };

  const handleDownload = () => {
    // Mock download functionality
    if (appState.selectedFile) {
      const cleanedFileName = `cleaned_${appState.selectedFile.name}`;
      alert(`Download started: ${cleanedFileName}\n\nIn a production app, this would download the file with all metadata removed.`);
    }
  };

  const handleViewDashboard = () => {
    setAppState(prev => ({ ...prev, currentScreen: "dashboard" }));
  };

  const handleBackToHome = () => {
    setAppState({
      currentScreen: "landing",
      selectedFile: null,
      deepScan: false,
      riskScore: 0,
      metadata: []
    });
  };

  const handleBackToUpload = () => {
    setAppState(prev => ({ ...prev, currentScreen: "upload" }));
  };

  const handleNewScan = () => {
    setAppState(prev => ({ ...prev, currentScreen: "upload" }));
  };

  return (
    <>
      {appState.currentScreen === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {appState.currentScreen === "upload" && (
        <FileUploadPage 
          onScanStart={handleScanStart}
          onBack={handleBackToHome}
        />
      )}

      {appState.currentScreen === "analysis" && appState.selectedFile && (
        <RiskAnalysisPage
          file={appState.selectedFile}
          riskScore={appState.riskScore}
          metadata={appState.metadata}
          onClean={handleClean}
          onBack={handleBackToUpload}
        />
      )}

      {appState.currentScreen === "cleaning" && appState.selectedFile && (
        <CleaningConfirmationPage
          file={appState.selectedFile}
          originalMetadata={appState.metadata}
          originalRiskScore={appState.riskScore}
          onDownload={handleDownload}
          onViewDashboard={handleViewDashboard}
          onBack={() => setAppState(prev => ({ ...prev, currentScreen: "analysis" }))}
        />
      )}

      {appState.currentScreen === "dashboard" && (
        <AnalyticsDashboard
          onBack={() => setAppState(prev => ({ ...prev, currentScreen: "cleaning" }))}
          onNewScan={handleNewScan}
        />
      )}
    </>
  );
}

// Mock metadata generation based on file type
function generateMockMetadata(file: File, deepScan: boolean): Metadata[] {
  const baseMetadata: Metadata[] = [
    {
      category: "Author / Creator",
      icon: User,
      riskLevel: "high",
      items: [
        { 
          field: "Author", 
          value: "John Smith", 
          why: "Reveals personal identity and can be used to track document origins" 
        },
        { 
          field: "Organization", 
          value: "Acme Corporation", 
          why: "Exposes corporate affiliation and potential confidential relationships" 
        }
      ]
    },
    {
      category: "GPS / Location",
      icon: MapPin,
      riskLevel: "high",
      items: [
        { 
          field: "GPS Coordinates", 
          value: "37.7749° N, 122.4194° W", 
          why: "Pinpoints exact physical location where file was created, major privacy risk" 
        },
        { 
          field: "Location Name", 
          value: "San Francisco, CA", 
          why: "Reveals geographic information about file origin" 
        }
      ]
    },
    {
      category: "Device & OS Info",
      icon: Shield,
      riskLevel: "moderate",
      items: [
        { 
          field: "Device Model", 
          value: "iPhone 14 Pro", 
          why: "Can be used for device fingerprinting and tracking" 
        },
        { 
          field: "OS Version", 
          value: "iOS 17.2", 
          why: "Reveals system information that could expose security vulnerabilities" 
        }
      ]
    },
    {
      category: "Software History",
      icon: FileText,
      riskLevel: "moderate",
      items: [
        { 
          field: "Created With", 
          value: "Adobe Photoshop CC 2024", 
          why: "Indicates software licenses and editing capabilities" 
        },
        { 
          field: "Last Modified By", 
          value: "Microsoft Word 365", 
          why: "Shows document editing history and workflow patterns" 
        }
      ]
    },
    {
      category: "Timestamps",
      icon: Clock,
      riskLevel: "low",
      items: [
        { 
          field: "Created Date", 
          value: "December 15, 2024 2:34 PM", 
          why: "Can reveal work patterns and document creation timeline" 
        },
        { 
          field: "Modified Date", 
          value: "December 20, 2024 9:12 AM", 
          why: "Shows when document was last edited" 
        }
      ]
    }
  ];

  if (deepScan) {
    baseMetadata.push({
      category: "Hidden Comments",
      icon: Eye,
      riskLevel: "moderate",
      items: [
        { 
          field: "Comment 1", 
          value: "TODO: Remove sensitive data before sharing", 
          why: "Hidden comments may contain confidential notes or instructions" 
        },
        { 
          field: "Edit History", 
          value: "3 tracked changes found", 
          why: "Reveals document revision history and previous content" 
        }
      ]
    });
  }

  return baseMetadata;
}

function calculateRiskScore(metadata: Metadata[]): number {
  let score = 0;
  
  metadata.forEach(category => {
    category.items.forEach(item => {
      switch (category.riskLevel) {
        case "high":
          score += 15;
          break;
        case "moderate":
          score += 8;
          break;
        case "low":
          score += 3;
          break;
      }
    });
  });

  return Math.min(score, 100);
}

export default App;

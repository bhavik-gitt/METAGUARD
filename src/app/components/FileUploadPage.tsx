import { useState, useRef } from "react";
import { Upload, FileText, X, Shield } from "lucide-react";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface FileUploadPageProps {
  onScanStart: (file: File, deepScan: boolean) => void;
  onBack: () => void;
}

export function FileUploadPage({ onScanStart, onBack }: FileUploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deepScan, setDeepScan] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    { name: "PDF", ext: ".pdf" },
    { name: "DOCX", ext: ".docx" },
    { name: "JPG", ext: ".jpg,.jpeg" },
    { name: "PNG", ext: ".png" },
    { name: "PPTX", ext: ".pptx" }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleStartScan = () => {
    if (!selectedFile) return;
    
    setIsScanning(true);
    setProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onScanStart(selectedFile, deepScan), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--cyber-bg)' }}>
      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg absolute inset-0 opacity-20"></div>

      {/* Header */}
      <header className="relative border-b border-[var(--cyber-primary)] scan-line-container" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="container mx-auto px-6 py-4">
          <button 
            onClick={onBack}
            className="cyber-button-secondary px-6 py-2 text-sm"
          >
            ← BACK_TO_HOME
          </button>
        </div>
      </header>

      <div className="relative container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-glow-primary mb-4 terminal-text">FILE_UPLOAD_PROTOCOL</h1>
            <p className="text-gray-400 terminal-text">&gt; Initialize metadata scan sequence</p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative p-12 corner-cut scan-line-container cursor-pointer transition-all ${
              isDragging ? 'cyber-card' : ''
            }`}
            style={{ 
              background: isDragging ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 0, 0, 0.8)',
              border: `2px solid ${isDragging ? 'var(--cyber-primary)' : 'var(--cyber-grid)'}`,
              boxShadow: isDragging ? '0 0 30px var(--cyber-primary-glow)' : 'none'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,.jpg,.jpeg,.png,.pptx"
              onChange={handleFileSelect}
            />

            <div className="text-center">
              <div 
                className="w-24 h-24 hexagon flex items-center justify-center mx-auto mb-6 pulse-glow"
                style={{ background: 'var(--cyber-primary)' }}
              >
                <Upload className="w-12 h-12" style={{ color: '#000' }} />
              </div>
              
              <h3 className="text-[var(--cyber-primary)] mb-2 terminal-text">&gt; DRAG_AND_DROP_FILE_HERE</h3>
              <p className="text-gray-400 mb-6 terminal-text">or click to browse filesystem</p>
              
              {/* Supported Formats */}
              <div className="flex flex-wrap gap-2 justify-center">
                {supportedFormats.map((format) => (
                  <div
                    key={format.name}
                    className="px-4 py-2 corner-cut-small"
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid var(--cyber-primary)',
                      color: 'var(--cyber-primary)'
                    }}
                  >
                    <span className="terminal-text text-sm">{format.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected File Card */}
          {selectedFile && (
            <div 
              className="mt-8 p-6 corner-cut cyber-card scan-line-container"
              style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 hexagon flex items-center justify-center pulse-glow"
                    style={{ background: 'var(--cyber-secondary)' }}
                  >
                    <FileText className="w-7 h-7" style={{ color: '#000' }} />
                  </div>
                  <div>
                    <p className="text-[var(--cyber-primary)] terminal-text">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm terminal-text">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--cyber-red)] corner-cut-small"
                  style={{ border: '1px solid var(--cyber-red)', color: 'var(--cyber-red)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scan Options */}
              <div 
                className="p-5 mb-6 corner-cut-small"
                style={{ 
                  background: 'rgba(0, 255, 136, 0.05)',
                  border: '1px solid var(--cyber-primary)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--cyber-primary)] terminal-text mb-1">&gt; DEEP_METADATA_SCAN</p>
                    <p className="text-gray-400 text-sm terminal-text">Thorough analysis including hidden fields</p>
                  </div>
                  <Switch
                    checked={deepScan}
                    onCheckedChange={setDeepScan}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              {isScanning && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[var(--cyber-primary)] terminal-text">&gt; SCANNING_FILE...</span>
                    <span className="text-sm text-[var(--cyber-primary)] terminal-text">{progress}%</span>
                  </div>
                  <div className="cyber-loading-bar relative overflow-hidden" style={{ height: '6px', background: 'rgba(0, 255, 136, 0.2)' }}>
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ 
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--cyber-primary), var(--cyber-secondary))',
                        boxShadow: '0 0 10px var(--cyber-primary-glow)'
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Start Scan Button */}
              <button
                onClick={handleStartScan}
                disabled={isScanning}
                className="cyber-button-success w-full py-4 rounded-none flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5" />
                {isScanning ? 'SCANNING_IN_PROGRESS...' : 'INITIATE_SCAN'}
              </button>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div 
              className="p-5 corner-cut-small"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <p className="text-sm text-[var(--cyber-primary)] terminal-text mb-1">✓ SECURE_PROCESSING</p>
              <p className="text-xs text-gray-400 terminal-text">Files processed locally</p>
            </div>
            <div 
              className="p-5 corner-cut-small"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <p className="text-sm text-[var(--cyber-primary)] terminal-text mb-1">✓ ZERO_STORAGE</p>
              <p className="text-xs text-gray-400 terminal-text">Files never saved on servers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Line Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line-container opacity-20"></div>
    </div>
  );
}

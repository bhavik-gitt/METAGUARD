import { Download, CheckCircle, Shield, TrendingUp } from "lucide-react";
import type { Metadata } from "./RiskAnalysisPage";

interface CleaningConfirmationPageProps {
  file: File;
  originalMetadata: Metadata[];
  originalRiskScore: number;
  onDownload: () => void;
  onViewDashboard: () => void;
  onBack: () => void;
}

export function CleaningConfirmationPage({
  file,
  originalMetadata,
  originalRiskScore,
  onDownload,
  onViewDashboard,
  onBack
}: CleaningConfirmationPageProps) {
  const totalFieldsRemoved = originalMetadata.reduce((sum, cat) => sum + cat.items.length, 0);
  const newRiskScore = 5; // After cleaning
  const improvement = originalRiskScore - newRiskScore;

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
            ← BACK
          </button>
        </div>
      </header>

      <div className="relative container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Success Banner */}
          <div 
            className="p-10 corner-cut scan-line-container mb-12 text-center neon-border"
            style={{ 
              background: 'rgba(0, 0, 0, 0.9)',
              border: '2px solid var(--cyber-primary)',
              boxShadow: '0 0 40px var(--cyber-primary-glow)'
            }}
          >
            <div 
              className="w-24 h-24 hexagon flex items-center justify-center mx-auto mb-6 pulse-glow"
              style={{ background: 'var(--cyber-primary)' }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: '#000' }} />
            </div>
            <h1 className="text-5xl text-glow-primary mb-4 terminal-text">NEUTRALIZATION_COMPLETE</h1>
            <p className="text-xl text-gray-300 terminal-text">&gt; File sanitized and ready for secure transmission</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              className="p-6 corner-cut-small scan-line-container text-center"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-secondary)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-secondary)' }}>
                  <Shield className="w-4 h-4" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">FIELDS_REMOVED</span>
              </div>
              <p className="text-5xl text-[var(--cyber-secondary)] terminal-text">{totalFieldsRemoved}</p>
            </div>

            <div 
              className="p-6 corner-cut-small scan-line-container text-center pulse-glow"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)',
                boxShadow: '0 0 20px var(--cyber-primary-glow)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-primary)' }}>
                  <TrendingUp className="w-4 h-4" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">RISK_REDUCTION</span>
              </div>
              <p className="text-5xl text-[var(--cyber-primary)] terminal-text">-{improvement}%</p>
            </div>

            <div 
              className="p-6 corner-cut-small scan-line-container text-center"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-primary)' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">NEW_RISK_SCORE</span>
              </div>
              <p className="text-5xl text-[var(--cyber-primary)] terminal-text">{newRiskScore}</p>
            </div>
          </div>

          {/* Before / After Comparison */}
          <div className="mb-12">
            <h2 className="text-3xl text-glow-secondary mb-6 text-center terminal-text">&gt; BEFORE_VS_AFTER</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div 
                className="p-6 corner-cut scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '2px solid var(--cyber-red)',
                  boxShadow: '0 0 20px var(--cyber-red-glow)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-[var(--cyber-red)] terminal-text">ORIGINAL_FILE</h3>
                  <div 
                    className="px-4 py-2 corner-cut-small"
                    style={{ background: 'var(--cyber-red)', color: '#000' }}
                  >
                    <span className="terminal-text">RISK: {originalRiskScore}</span>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {originalMetadata.map((category, index) => (
                    <div key={index}>
                      <p className="text-gray-500 mb-2 terminal-text text-sm">&gt; {category.category}</p>
                      {category.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="p-3 corner-cut-small mb-2"
                          style={{ background: 'rgba(255, 0, 85, 0.1)', border: '1px solid var(--cyber-grid)' }}
                        >
                          <p className="text-xs text-gray-500 terminal-text">{item.field}</p>
                          <p className="text-sm text-gray-300 terminal-text">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div 
                className="p-6 corner-cut scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '2px solid var(--cyber-primary)',
                  boxShadow: '0 0 20px var(--cyber-primary-glow)'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-[var(--cyber-primary)] terminal-text">CLEANED_FILE</h3>
                  <div 
                    className="px-4 py-2 corner-cut-small pulse-glow"
                    style={{ background: 'var(--cyber-primary)', color: '#000' }}
                  >
                    <span className="terminal-text">RISK: {newRiskScore}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center h-80">
                  <div className="w-20 h-20 hexagon flex items-center justify-center mb-6 pulse-glow" style={{ background: 'var(--cyber-primary)' }}>
                    <CheckCircle className="w-10 h-10" style={{ color: '#000' }} />
                  </div>
                  <p className="text-2xl text-[var(--cyber-primary)] mb-4 terminal-text">ALL_METADATA_REMOVED</p>
                  <p className="text-gray-400 text-center terminal-text text-sm">
                    {totalFieldsRemoved} sensitive fields neutralized
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div 
            className="p-6 corner-cut-small scan-line-container mb-10"
            style={{ 
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid var(--cyber-primary)'
            }}
          >
            <h3 className="text-[var(--cyber-primary)] mb-6 text-center terminal-text">&gt; FILE_SAFETY_STATUS</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 corner-cut-small" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--cyber-primary)' }} />
                <span className="text-gray-300 terminal-text text-sm">Metadata removed successfully</span>
              </div>
              <div className="flex items-center gap-3 p-3 corner-cut-small" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--cyber-primary)' }} />
                <span className="text-gray-300 terminal-text text-sm">File integrity preserved</span>
              </div>
              <div className="flex items-center gap-3 p-3 corner-cut-small" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--cyber-primary)' }} />
                <span className="text-gray-300 terminal-text text-sm">Safe to share publicly</span>
              </div>
              <div className="flex items-center gap-3 p-3 corner-cut-small" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--cyber-primary)' }} />
                <span className="text-gray-300 terminal-text text-sm">Privacy risks eliminated</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={onDownload}
              className="cyber-button-primary px-10 py-5 text-lg flex items-center gap-3"
            >
              <Download className="w-6 h-6" />
              DOWNLOAD_CLEAN_FILE
            </button>
            <button
              onClick={onViewDashboard}
              className="cyber-button-secondary px-10 py-5 text-lg"
            >
              VIEW_ANALYTICS
            </button>
          </div>
        </div>
      </div>

      {/* Scan Line Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line-container opacity-20"></div>
    </div>
  );
}

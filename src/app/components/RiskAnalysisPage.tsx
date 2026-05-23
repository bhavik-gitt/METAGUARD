import { User, MapPin, FileText, Clock, Shield, Info } from "lucide-react";
import { RiskGauge } from "./RiskGauge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Metadata {
  category: string;
  icon: any;
  riskLevel: "low" | "moderate" | "high";
  items: { field: string; value: string; why: string }[];
}

interface RiskAnalysisPageProps {
  file: File;
  riskScore: number;
  metadata: Metadata[];
  onClean: () => void;
  onBack: () => void;
}

export function RiskAnalysisPage({ file, riskScore, metadata, onClean, onBack }: RiskAnalysisPageProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "var(--cyber-primary)";
      case "moderate": return "var(--cyber-amber)";
      case "high": return "var(--cyber-red)";
      default: return "var(--cyber-secondary)";
    }
  };

  const totalFields = metadata.reduce((sum, cat) => sum + cat.items.length, 0);

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
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-glow-danger mb-4 terminal-text">METADATA_RISK_ANALYSIS</h1>
            <p className="text-gray-400 terminal-text">&gt; Detailed threat assessment: {file.name}</p>
          </div>

          {/* Top Section - Risk Score and Summary */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Risk Gauge */}
            <div 
              className="p-8 corner-cut cyber-card scan-line-container flex items-center justify-center"
              style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            >
              <RiskGauge score={riskScore} />
            </div>

            {/* Summary Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div 
                className="p-6 corner-cut-small scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid var(--cyber-secondary)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-secondary)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#000' }} />
                  </div>
                  <span className="text-gray-400 terminal-text text-sm">TOTAL_FIELDS</span>
                </div>
                <p className="text-4xl text-[var(--cyber-secondary)] terminal-text">{totalFields}</p>
              </div>

              <div 
                className="p-6 corner-cut-small scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid var(--cyber-red)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 hexagon flex items-center justify-center pulse-glow" style={{ background: 'var(--cyber-red)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#000' }} />
                  </div>
                  <span className="text-gray-400 terminal-text text-sm">HIGH_RISK</span>
                </div>
                <p className="text-4xl text-[var(--cyber-red)] terminal-text">
                  {metadata.filter(m => m.riskLevel === "high").reduce((sum, m) => sum + m.items.length, 0)}
                </p>
              </div>

              <div 
                className="p-6 corner-cut-small scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid var(--cyber-amber)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-amber)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#000' }} />
                  </div>
                  <span className="text-gray-400 terminal-text text-sm">MODERATE_RISK</span>
                </div>
                <p className="text-4xl text-[var(--cyber-amber)] terminal-text">
                  {metadata.filter(m => m.riskLevel === "moderate").reduce((sum, m) => sum + m.items.length, 0)}
                </p>
              </div>

              <div 
                className="p-6 corner-cut-small scan-line-container"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid var(--cyber-primary)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 hexagon flex items-center justify-center" style={{ background: 'var(--cyber-primary)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#000' }} />
                  </div>
                  <span className="text-gray-400 terminal-text text-sm">LOW_RISK</span>
                </div>
                <p className="text-4xl text-[var(--cyber-primary)] terminal-text">
                  {metadata.filter(m => m.riskLevel === "low").reduce((sum, m) => sum + m.items.length, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata Categories Grid */}
          <div className="mb-12">
            <h2 className="text-3xl text-glow-secondary mb-6 terminal-text">&gt; DETECTED_METADATA_CATEGORIES</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metadata.map((category, index) => (
                <div
                  key={index}
                  className="p-6 corner-cut scan-line-container transition-all hover:scale-105"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: `2px solid ${getRiskColor(category.riskLevel)}`,
                    boxShadow: `0 0 20px ${getRiskColor(category.riskLevel)}40`
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 hexagon flex items-center justify-center pulse-glow"
                        style={{ background: getRiskColor(category.riskLevel) }}
                      >
                        <category.icon className="w-5 h-5" style={{ color: '#000' }} />
                      </div>
                      <h3 className="text-[var(--cyber-primary)] terminal-text text-sm">{category.category}</h3>
                    </div>
                    <div 
                      className="px-3 py-1 text-xs terminal-text"
                      style={{ 
                        background: getRiskColor(category.riskLevel) + '20',
                        color: getRiskColor(category.riskLevel),
                        border: `1px solid ${getRiskColor(category.riskLevel)}`
                      }}
                    >
                      {category.riskLevel.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="p-3 corner-cut-small"
                        style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid var(--cyber-grid)' }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 terminal-text mb-1">{item.field}</p>
                            <p className="text-sm text-gray-300 terminal-text break-all">{item.value}</p>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-4 h-4 text-[var(--cyber-primary)] flex-shrink-0 mt-1" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-black border border-[var(--cyber-primary)]">
                                <p className="terminal-text text-xs">{item.why}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={onClean}
              className="cyber-button-success px-16 py-5 text-lg flex items-center gap-3"
            >
              <Shield className="w-6 h-6" />
              NEUTRALIZE_METADATA
            </button>
          </div>
        </div>
      </div>

      {/* Scan Line Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line-container opacity-20"></div>
    </div>
  );
}

export type { Metadata };

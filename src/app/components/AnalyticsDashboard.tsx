import { Shield, TrendingUp, AlertTriangle, FileText, Activity } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AnalyticsDashboardProps {
  onBack: () => void;
  onNewScan: () => void;
}

export function AnalyticsDashboard({ onBack, onNewScan }: AnalyticsDashboardProps) {
  // Mock data for charts
  const riskDistribution = [
    { name: "GPS Location", value: 45, risk: "high" },
    { name: "Author Info", value: 38, risk: "high" },
    { name: "Software Tags", value: 32, risk: "moderate" },
    { name: "Timestamps", value: 28, risk: "low" },
    { name: "Device Info", value: 25, risk: "moderate" },
    { name: "Comments", value: 18, risk: "moderate" }
  ];

  const scansOverTime = [
    { date: "Dec 24", scans: 12, avgRisk: 65 },
    { date: "Dec 25", scans: 18, avgRisk: 58 },
    { date: "Dec 26", scans: 24, avgRisk: 52 },
    { date: "Dec 27", scans: 31, avgRisk: 48 },
    { date: "Dec 28", scans: 42, avgRisk: 42 }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "var(--cyber-red)";
      case "moderate": return "var(--cyber-amber)";
      case "low": return "var(--cyber-primary)";
      default: return "var(--cyber-secondary)";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--cyber-bg)' }}>
      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg absolute inset-0 opacity-20"></div>

      {/* Header */}
      <header className="relative border-b border-[var(--cyber-primary)] scan-line-container" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="cyber-button-secondary px-6 py-2 text-sm"
          >
            ← BACK
          </button>
          <button
            onClick={onNewScan}
            className="cyber-button-success px-8 py-3"
          >
            NEW_SCAN
          </button>
        </div>
      </header>

      <div className="relative container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-5xl text-glow-secondary mb-4 terminal-text flex items-center gap-4">
              <Activity className="w-12 h-12" />
              ANALYTICS_DASHBOARD
            </h1>
            <p className="text-gray-400 terminal-text">&gt; Comprehensive metadata scanning activity overview</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div 
              className="p-6 corner-cut scan-line-container neon-border"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-secondary)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 hexagon flex items-center justify-center pulse-glow"
                  style={{ background: 'var(--cyber-secondary)' }}
                >
                  <FileText className="w-6 h-6" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">FILES_SCANNED</span>
              </div>
              <p className="text-4xl text-[var(--cyber-secondary)] terminal-text mb-2">127</p>
              <p className="text-sm text-[var(--cyber-primary)] terminal-text">+12 this week</p>
            </div>

            <div 
              className="p-6 corner-cut scan-line-container neon-border"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 hexagon flex items-center justify-center pulse-glow"
                  style={{ background: 'var(--cyber-primary)' }}
                >
                  <Shield className="w-6 h-6" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">FIELDS_REMOVED</span>
              </div>
              <p className="text-4xl text-[var(--cyber-primary)] terminal-text mb-2">2,847</p>
              <p className="text-sm text-gray-400 terminal-text">Avg: 22 per file</p>
            </div>

            <div 
              className="p-6 corner-cut scan-line-container neon-border"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-red)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 hexagon flex items-center justify-center pulse-glow"
                  style={{ background: 'var(--cyber-red)' }}
                >
                  <AlertTriangle className="w-6 h-6" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">HIGH_RISK_FILES</span>
              </div>
              <p className="text-4xl text-[var(--cyber-red)] terminal-text mb-2">34</p>
              <p className="text-sm text-gray-400 terminal-text">26.8% of total</p>
            </div>

            <div 
              className="p-6 corner-cut scan-line-container neon-border"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 hexagon flex items-center justify-center pulse-glow"
                  style={{ background: 'var(--cyber-primary)' }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: '#000' }} />
                </div>
                <span className="text-gray-400 terminal-text text-sm">AVG_RISK_REDUCTION</span>
              </div>
              <p className="text-4xl text-[var(--cyber-primary)] terminal-text mb-2">-68%</p>
              <p className="text-sm text-[var(--cyber-primary)] terminal-text">Excellent</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Risk Types Distribution */}
            <div 
              className="p-6 corner-cut scan-line-container"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-primary)'
              }}
            >
              <h3 className="text-xl text-[var(--cyber-primary)] mb-6 terminal-text">&gt; TOP_METADATA_LEAK_SOURCES</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--cyber-grid)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--cyber-primary)"
                    tick={{ fill: 'var(--cyber-primary)', fontFamily: 'Courier New, monospace', fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="var(--cyber-primary)" 
                    tick={{ fill: 'var(--cyber-primary)', fontFamily: 'Courier New, monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#000', 
                      border: '1px solid var(--cyber-primary)',
                      borderRadius: '0',
                      fontFamily: 'Courier New, monospace',
                      boxShadow: '0 0 10px var(--cyber-primary-glow)'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                    {riskDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getRiskColor(entry.risk)}
                        style={{ filter: `drop-shadow(0 0 5px ${getRiskColor(entry.risk)})` }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Scans Over Time */}
            <div 
              className="p-6 corner-cut scan-line-container"
              style={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid var(--cyber-secondary)'
              }}
            >
              <h3 className="text-xl text-[var(--cyber-secondary)] mb-6 terminal-text">&gt; SCANNING_ACTIVITY</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scansOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--cyber-grid)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--cyber-secondary)" 
                    tick={{ fill: 'var(--cyber-secondary)', fontFamily: 'Courier New, monospace' }} 
                  />
                  <YAxis 
                    stroke="var(--cyber-secondary)" 
                    tick={{ fill: 'var(--cyber-secondary)', fontFamily: 'Courier New, monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#000', 
                      border: '1px solid var(--cyber-secondary)',
                      borderRadius: '0',
                      fontFamily: 'Courier New, monospace',
                      boxShadow: '0 0 10px var(--cyber-secondary-glow)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scans" 
                    stroke="var(--cyber-secondary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--cyber-secondary)', r: 6, strokeWidth: 2, stroke: '#000' }}
                    style={{ filter: 'drop-shadow(0 0 5px var(--cyber-secondary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgRisk" 
                    stroke="var(--cyber-primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--cyber-primary)', r: 6, strokeWidth: 2, stroke: '#000' }}
                    style={{ filter: 'drop-shadow(0 0 5px var(--cyber-primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metadata Leak Sources Breakdown */}
          <div 
            className="p-8 corner-cut scan-line-container"
            style={{ 
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid var(--cyber-red)'
            }}
          >
            <h3 className="text-2xl text-[var(--cyber-red)] mb-8 terminal-text text-center">&gt; MOST_COMMON_PRIVACY_RISKS</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div 
                className="p-6 corner-cut-small text-center pulse-glow"
                style={{ 
                  background: 'rgba(255, 0, 85, 0.1)',
                  border: '2px solid var(--cyber-red)',
                  boxShadow: '0 0 20px var(--cyber-red-glow)'
                }}
              >
                <p className="text-5xl mb-3 terminal-text" style={{ color: 'var(--cyber-red)', textShadow: '0 0 20px var(--cyber-red)' }}>45%</p>
                <p className="text-[var(--cyber-red)] terminal-text mb-2">GPS_LOCATION_DATA</p>
                <p className="text-sm text-gray-400 terminal-text">Found in images & documents</p>
              </div>
              <div 
                className="p-6 corner-cut-small text-center pulse-glow"
                style={{ 
                  background: 'rgba(255, 0, 85, 0.1)',
                  border: '2px solid var(--cyber-red)',
                  boxShadow: '0 0 20px var(--cyber-red-glow)'
                }}
              >
                <p className="text-5xl mb-3 terminal-text" style={{ color: 'var(--cyber-red)', textShadow: '0 0 20px var(--cyber-red)' }}>38%</p>
                <p className="text-[var(--cyber-red)] terminal-text mb-2">AUTHOR_INFORMATION</p>
                <p className="text-sm text-gray-400 terminal-text">Personal identifiers exposed</p>
              </div>
              <div 
                className="p-6 corner-cut-small text-center"
                style={{ 
                  background: 'rgba(255, 170, 0, 0.1)',
                  border: '2px solid var(--cyber-amber)',
                  boxShadow: '0 0 20px var(--cyber-amber)'
                }}
              >
                <p className="text-5xl mb-3 terminal-text" style={{ color: 'var(--cyber-amber)', textShadow: '0 0 20px var(--cyber-amber)' }}>32%</p>
                <p className="text-[var(--cyber-amber)] terminal-text mb-2">SOFTWARE_HISTORY</p>
                <p className="text-sm text-gray-400 terminal-text">Editing software details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Line Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line-container opacity-20"></div>
    </div>
  );
}

import { Shield, ScanLine, Eye, Lock, Upload, Terminal } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--cyber-bg)' }}>
      {/* Matrix Background Effect */}
      <div className="matrix-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-char"
            style={{
              left: `${i * 5}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 10}px`
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>

      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg absolute inset-0 opacity-30"></div>

      {/* Header */}
      <header className="relative border-b border-[var(--cyber-primary)] scan-line-container" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 hexagon flex items-center justify-center relative" style={{ background: 'var(--cyber-primary)' }}>
              <Shield className="w-5 h-5" style={{ color: '#000' }} />
            </div>
            <span className="text-xl text-glow-primary terminal-text">METAGUARD_</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-gray-400 hover:text-[var(--cyber-primary)] transition-colors terminal-text">FEATURES</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-[var(--cyber-primary)] transition-colors terminal-text">HOW_IT_WORKS</a>
            <button className="cyber-button-secondary px-6 py-2 text-sm">
              SIGN_IN
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 rounded-lg mb-8 neon-border corner-cut-small" style={{ background: 'rgba(0, 0, 0, 0.9)', border: '1px solid var(--cyber-primary)' }}>
            <span className="terminal-text" style={{ color: 'var(--cyber-primary)' }}>🔒 ENTERPRISE_GRADE_PROTECTION</span>
          </div>
          
          <h1 className="text-7xl mb-6 tracking-tight relative">
            <span className="text-glow-primary block mb-2">HIDDEN_METADATA</span>
            <span className="text-glow-danger">REAL_PRIVACY_RISKS</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto terminal-text">
            &gt; Detect and neutralize invisible data signatures from files before transmission.
            <span className="text-[var(--cyber-primary)] animate-pulse">█</span>
          </p>
          
          <div className="flex gap-6 justify-center">
            <button 
              onClick={onGetStarted}
              className="cyber-button-primary px-10 py-4 rounded-none flex items-center gap-3 text-lg"
            >
              <Upload className="w-6 h-6" />
              UPLOAD & SCAN
            </button>
            <button 
              className="cyber-button-secondary px-10 py-4 rounded-none text-lg"
            >
              <Terminal className="w-6 h-6 inline mr-2" />
              DOCUMENTATION
            </button>
          </div>

          {/* Trust Signals */}
          <div className="mt-20 flex justify-center gap-16 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 hexagon flex items-center justify-center pulse-glow" style={{ background: 'var(--cyber-primary)' }}>
                <Lock className="w-4 h-4" style={{ color: '#000' }} />
              </div>
              <span className="terminal-text text-gray-400">NO_FILES_STORED</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 hexagon flex items-center justify-center pulse-glow" style={{ background: 'var(--cyber-primary)' }}>
                <Shield className="w-4 h-4" style={{ color: '#000' }} />
              </div>
              <span className="terminal-text text-gray-400">CLIENT_SIDE_SCAN</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 hexagon flex items-center justify-center pulse-glow" style={{ background: 'var(--cyber-primary)' }}>
                <Eye className="w-4 h-4" style={{ color: '#000' }} />
              </div>
              <span className="terminal-text text-gray-400">PRIVACY_SAFE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="relative container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="cyber-card p-6 rounded-none corner-cut scan-line-container transition-all"
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div 
                className="w-12 h-12 hexagon flex items-center justify-center mb-4"
                style={{ background: feature.color }}
              >
                <feature.icon className="w-6 h-6" style={{ color: '#000' }} />
              </div>
              <h3 className="text-[var(--cyber-primary)] mb-3 terminal-text">&gt; {feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl text-glow-secondary mb-4 terminal-text">PROTOCOL_SEQUENCE</h2>
          <p className="text-gray-400 terminal-text">&gt; Four-step neutralization process</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5" style={{ background: 'var(--cyber-primary)' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45" style={{ background: 'var(--cyber-primary)' }}></div>
                </div>
              )}
              <div 
                className="w-16 h-16 hexagon flex items-center justify-center mx-auto mb-4 relative z-10 pulse-glow"
                style={{ background: 'var(--cyber-primary)' }}
              >
                <span className="text-2xl" style={{ color: '#000' }}>{index + 1}</span>
              </div>
              <h4 className="text-[var(--cyber-primary)] mb-2 terminal-text">{step.title}</h4>
              <p className="text-gray-400 text-sm terminal-text">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scan Line Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-line-container opacity-20"></div>
    </div>
  );
}

const features = [
  {
    icon: ScanLine,
    title: "RISK_DETECTION",
    description: "Advanced scanning algorithms to identify hidden privacy vulnerabilities",
    color: "var(--cyber-secondary)"
  },
  {
    icon: Shield,
    title: "ONE_CLICK_CLEAN",
    description: "Instant metadata neutralization with military-grade protocols",
    color: "var(--cyber-primary)"
  },
  {
    icon: Eye,
    title: "BEFORE_AFTER_VIEW",
    description: "Real-time visualization of data removal for complete transparency",
    color: "var(--cyber-amber)"
  },
  {
    icon: Lock,
    title: "ZERO_TRUST_ARCH",
    description: "All processing executed locally - your data never leaves your system",
    color: "var(--cyber-red)"
  }
];

const steps = [
  { title: "UPLOAD", description: "Initialize file transfer" },
  { title: "SCAN", description: "Deep metadata analysis" },
  { title: "ANALYZE", description: "Risk assessment" },
  { title: "CLEAN", description: "Data neutralization" }
];

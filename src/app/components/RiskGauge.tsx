interface RiskGaugeProps {
  score: number; // 0-100
}

export function RiskGauge({ score }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getRiskLevel = () => {
    if (score <= 30) return { text: "LOW_RISK", color: "var(--cyber-primary)", bgColor: "var(--cyber-primary)" };
    if (score <= 70) return { text: "MODERATE_RISK", color: "var(--cyber-amber)", bgColor: "var(--cyber-amber)" };
    return { text: "CRITICAL_RISK", color: "var(--cyber-red)", bgColor: "var(--cyber-red)" };
  };

  const risk = getRiskLevel();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56">
        {/* Background circle */}
        <svg className="transform -rotate-90 w-56 h-56">
          <circle
            cx="112"
            cy="112"
            r="90"
            stroke="rgba(0, 0, 0, 0.5)"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="112"
            cy="112"
            r="90"
            stroke={risk.color}
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 10px ${risk.color})`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl terminal-text" style={{ color: risk.color, textShadow: `0 0 20px ${risk.color}` }}>
            {score}
          </span>
          <span className="text-xs text-gray-500 terminal-text mt-2">RISK_SCORE</span>
        </div>
      </div>
      
      <div 
        className="mt-6 px-8 py-3 corner-cut-small pulse-glow"
        style={{ 
          background: `${risk.bgColor}20`, 
          border: `2px solid ${risk.color}`,
          boxShadow: `0 0 20px ${risk.color}40`
        }}
      >
        <span className="terminal-text" style={{ color: risk.color }}>{risk.text}</span>
      </div>
    </div>
  );
}

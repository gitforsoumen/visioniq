import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'icon') {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0E19EF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF248E', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Rounded square background with gradient */}
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          fill="url(#logoGradient)"
          opacity="0.15"
        />
        
        {/* Letter V shape representing VisionIQ */}
        <path
          d="M12 10 L16 10 L20 22 L24 10 L28 10 L21.5 28 L18.5 28 Z"
          fill="url(#logoGradient)"
        />
        
        {/* Scan lines effect - horizontal lines across the V */}
        <line x1="14" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="15" y1="18" x2="25" y2="18" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="22" x2="24" y2="22" stroke="white" strokeWidth="1" opacity="0.6" />
        
        {/* Sparkle/AI indicator - top right */}
        <circle cx="30" cy="10" r="2" fill="white" opacity="0.9" />
        <path
          d="M30 7 L30 13 M27 10 L33 10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0E19EF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF248E', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Rounded square background with gradient */}
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          fill="url(#logoGradientFull)"
          opacity="0.15"
        />
        
        {/* Letter V shape representing VisionIQ */}
        <path
          d="M12 10 L16 10 L20 22 L24 10 L28 10 L21.5 28 L18.5 28 Z"
          fill="url(#logoGradientFull)"
        />
        
        {/* Scan lines effect - horizontal lines across the V */}
        <line x1="14" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="15" y1="18" x2="25" y2="18" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="22" x2="24" y2="22" stroke="white" strokeWidth="1" opacity="0.6" />
        
        {/* Sparkle/AI indicator - top right */}
        <circle cx="30" cy="10" r="2" fill="white" opacity="0.9" />
        <path
          d="M30 7 L30 13 M27 10 L33 10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      <div className="flex flex-col">
        <span
          className="tracking-tight"
          style={{
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '32px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #0E19EF 0%, #FF248E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          VisionIQ
        </span>
        <span
          className="tracking-wide"
          style={{
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            color: '#94A3B8',
            marginTop: '-4px',
            letterSpacing: '2px',
          }}
        >
          OCR INTELLIGENCE PLATFORM
        </span>
      </div>
    </div>
  );
};

import React from "react";

// PayBox logo - built to match the actual PayBox brand
export function PayBoxLogo({ size = 48, textColor = "white" }) {
  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size }}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <circle cx="30" cy="30" r="30" fill="#6FB3E0" />
        {/* Head */}
        <circle cx="30" cy="18" r="6" stroke="white" strokeWidth="2.5" fill="none" />
        {/* Body */}
        <path d="M30 24 L30 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Arms raised */}
        <path d="M30 27 L20 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 27 L40 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Legs */}
        <path d="M30 34 L24 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 34 L36 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span style={{ color: textColor, fontWeight: 900, fontSize: size * 0.28, letterSpacing: "-0.02em" }}>
        PayBox
      </span>
    </div>
  );
}

// The Box logo - gift box with person jumping out
export function TheBoxLogo({ size = 48, textColor = "white" }) {
  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size * 1.5 }}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={size * 1.5} height={size}>
        <rect x="5" y="5" width="70" height="70" rx="16" fill="#6FB3E0" />
        {/* Gift box bottom */}
        <rect x="18" y="42" width="44" height="22" rx="3" stroke="white" strokeWidth="2.2" fill="none" />
        {/* Gift box lid */}
        <rect x="15" y="33" width="50" height="10" rx="2" stroke="white" strokeWidth="2.2" fill="none" />
        {/* Ribbon vertical */}
        <line x1="40" y1="33" x2="40" y2="64" stroke="white" strokeWidth="2.2" />
        {/* Ribbon horizontal on lid */}
        <line x1="15" y1="38" x2="65" y2="38" stroke="white" strokeWidth="2.2" />
        {/* Person popping out */}
        <circle cx="40" cy="19" r="5.5" stroke="white" strokeWidth="2" fill="none" />
        <path d="M40 24.5 L40 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 27 L34 23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 27 L46 23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span style={{ color: textColor, fontWeight: 900, fontSize: size * 0.3, letterSpacing: "-0.02em" }}>
        The Box
      </span>
    </div>
  );
}

// Horizontal combo lockup
export function BrandLockup({ size = 36, dark = false }) {
  const c = dark ? "#0B1930" : "white";
  return (
    <div className="flex items-center gap-4">
      <TheBoxLogo size={size} textColor={c} />
      <span style={{ color: dark ? "#9CA3AF" : "rgba(255,255,255,0.4)", fontSize: size * 0.5 }}>×</span>
      <PayBoxLogo size={size} textColor={c} />
    </div>
  );
}

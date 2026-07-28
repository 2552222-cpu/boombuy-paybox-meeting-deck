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

// The Box logo - uses the new uncropped brand asset (icon + wordmark)
export function TheBoxLogo({ size = 48, textColor = "white" }) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-[28px] shrink-0" style={{ width: size * 1.5, height: size }}>
      <img
        src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/2b893cba0_image.png"
        alt="The Box"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
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
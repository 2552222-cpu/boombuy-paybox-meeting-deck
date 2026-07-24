// Shared Apple-style animation variants for the presentation deck.
import React from "react";

// Apple-style ease-out curve, used consistently across every slide.
export const EASE = [0.22, 1, 0.36, 1];

// Self-contained fade-up reveal (spread onto a motion element).
export const fadeUp = (delay = 0, y = 22) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE, delay },
});

// Child item for staggered containers (variants drive hidden/show).
export const deckItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Staggered container — wrap a list of deckItem children.
export const deckContainer = (stagger = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

// Consistent gold accent bar for slide headers (RTL-aligned right by default).
export function GoldBar({ className = "", align = "right" }) {
  const alignClass = align === "center" ? "mx-auto" : align === "left" ? "ml-0 mr-auto" : "mr-0 ml-auto";
  return (
    <div
      className={`h-1 w-14 rounded-full ${alignClass} ${className}`}
      style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883)" }}
    />
  );
}
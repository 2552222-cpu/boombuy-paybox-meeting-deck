import React from "react";

// Full-bleed marketing-creative slide — renders a supplied ad image edge-to-edge.
export default function AdSlide({ src, alt }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0C1438]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
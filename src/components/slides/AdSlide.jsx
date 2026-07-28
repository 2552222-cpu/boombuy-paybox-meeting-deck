import React from "react";

// Framed marketing-creative slide — the ad image is centered inside
// a rounded, padded "device-ish" frame so it never stretches edge-to-edge.
export default function AdSlide({ src, alt }) {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-10 py-12"
      style={{ background: "linear-gradient(160deg,#0C1438 0%,#101A4B 100%)" }}
    >
      <div
        className="relative rounded-[2rem] p-4 deck-shadow"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.05)",
          maxWidth: "62rem",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block object-contain rounded-xl"
          style={{ maxHeight: "82vh", maxWidth: "66vw", margin: "0 auto" }}
        />
      </div>
    </div>
  );
}
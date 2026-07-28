import React from "react";

const ADS = [
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/a1f6c9e56_1.png", alt: "PayBox Young | העברתם משכורת אלינו?" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/3597b64a0_.png", alt: "PayBox Young | רוצים מתנות והטבות בחצי מחיר?" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/614f86070_superchargeyourhrimpact531pdf4.png", alt: "PayBox Young | רוצים לחסוך ולנצל כל שקל?" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/bd3e9c76c_superchargeyourhrimpact531pdf1.png", alt: "PayBox Young | עברתם טסט? מברוק!" },
];

export default function SlideAd1() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 md:px-10 py-12"
      style={{ background: "linear-gradient(160deg,#0C1438 0%,#101A4B 100%)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-6xl">
        {ADS.map((a, i) => (
          <div
            key={i}
            className="rounded-3xl p-3 deck-shadow flex items-center justify-center"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)" }}
          >
            <img
              src={a.src}
              alt={a.alt}
              className="block object-contain rounded-xl"
              style={{ maxHeight: "78vh", maxWidth: "100%", width: "auto", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
import React from "react";

const COMPETITOR_LOGOS = [
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/2c822ca85_.webp", alt: "ריף" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/5c894ed18_.jpg", alt: "Cal" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/6d4493294_.png", alt: "לאומי בונוס" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/afc57cdf0_.png", alt: "מועדון ישיר" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/5bbcfed8d_.png", alt: "Poalim Wonder" },
  { src: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/ff7fbf2f5_.png", alt: "מפעל הפיס" }
];

export default function Slide2() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col px-10 md:px-16 py-12 md:py-16 overflow-hidden">
      <div className="flex-1 flex flex-col justify-center max-w-3xl ml-auto text-right">
        <span className="text-sm md:text-base font-bold text-[#2D7FF9] tracking-[0.15em]">
          המצב בשוק
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-5 mb-1 mr-0 ml-auto" />
        <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.15] text-[#0A1B3D] tracking-tight">
          המירוץ הישראלי לכיס ולנאמנות הצרכן
        </h1>
        <p className="mt-9 text-lg md:text-2xl leading-[1.7] text-[#4B5563] font-normal">
          תחת מכבש יוקר המחיה, הביקוש למועדוני הטבות שובר שיאים. הגופים הגדולים במשק
          מבינים שמי שלא מייצר ערך צרכני אמיתי ויומיומי — מאבד את הלקוח.
        </p>
        <div className="mt-11 grid grid-cols-3 md:grid-cols-6 gap-3">
          {COMPETITOR_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-[#E5E7EB] shadow-sm h-20 md:h-24 flex items-center justify-center p-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>02</span>
      </div>
    </div>
  );
}
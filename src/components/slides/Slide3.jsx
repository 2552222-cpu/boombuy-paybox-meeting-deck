import React from "react";

const ITEMS = [
  "עלות הקמת מועדון",
  "עלות תחזוקה שוטפת",
  "סבסוד ישיר של כל הנחה והנחה"
];

export default function Slide3() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0B1930] to-[#0a101d] flex flex-col px-10 md:px-16 py-12 overflow-hidden text-white">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-bold text-[#3B82F6] tracking-[0.15em]">המצב היום</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D883] mt-5" />
        <h1 className="mt-5 text-2xl md:text-4xl font-black leading-[1.25] max-w-3xl tracking-tight">
          מודל הסבסוד המסורתי הגיע לקצה היכולת שלו
        </h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-14 mt-12">
        {/* 90% circle */}
        <div className="relative shrink-0">
          <div className="w-52 h-52 md:w-60 md:h-60 rounded-full border-2 border-dashed border-[#FDB833]/60 flex flex-col items-center justify-center">
            <span className="text-6xl md:text-7xl font-black text-[#FDB833]">90%</span>
            <span className="mt-2 text-xs md:text-sm text-gray-300 max-w-[12rem] leading-snug">
              מההטבות במועדונים מבוססות סבסוד ישיר ומסיבי
            </span>
          </div>
        </div>

        {/* Cost items */}
        <div className="flex flex-col gap-3.5 w-full max-w-sm">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 rounded-xl bg-white/5 border border-white/10 px-5 py-3.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E74C3C] shrink-0" />
              <span className="text-sm md:text-base font-medium tracking-wide">{item}</span>
            </div>
          ))}
          <p className="mt-3 text-xs md:text-sm text-gray-400 leading-relaxed">
            ↓ ארגונים משקיעים מיליוני שקלים מתקציבם רק כדי "לרכוש" הנחות עבור החברים
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-gray-500 text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>03</span>
      </div>
    </div>
  );
}
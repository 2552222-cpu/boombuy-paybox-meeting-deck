import React from "react";

const ITEMS = [
  "עלות הקמת מועדון",
  "עלות תחזוקה שוטפת",
  "סבסוד ישיר של כל הנחה והנחה"
];

export default function Slide3() {
  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-[#0B1930] to-[#0a101d] flex flex-col px-6 md:px-16 py-12 overflow-visible text-white">
      <div className="flex flex-col items-center text-center">
        <span className="text-base font-bold text-[#3B82F6] tracking-[0.15em]">המצב היום</span>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D883] mt-5" />
        <h1 className="mt-5 text-3xl md:text-5xl font-black leading-[1.25] max-w-4xl tracking-tight">
          מודל הסבסוד המסורתי הגיע לקצה היכולת שלו
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-12 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          {/* 90% circle */}
          <div className="relative shrink-0">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-dashed border-[#FDB833]/60 flex flex-col items-center justify-center">
              <span className="text-7xl md:text-8xl font-black text-[#FDB833]">90%</span>
              <span className="mt-2 text-sm md:text-base text-gray-300 max-w-[14rem] leading-snug">
                מההטבות במועדונים מבוססות סבסוד ישיר ומסיבי
              </span>
            </div>
          </div>

          {/* Cost items */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 px-6 py-4.5"
              >
                <span className="w-3 h-3 rounded-full bg-[#E74C3C] shrink-0" />
                <span className="text-base md:text-lg font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center rounded-2xl bg-white/5 border border-[#FDB833]/30 px-8 py-5">
          <p className="text-lg md:text-2xl font-bold text-[#FDB833] leading-relaxed">
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
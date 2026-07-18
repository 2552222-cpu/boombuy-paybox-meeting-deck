import React from "react";

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
        <div className="mt-11 inline-flex self-start md:self-auto">
          <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] tracking-wide">
            שחקנים מובילים בזירה
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>02</span>
      </div>
    </div>
  );
}
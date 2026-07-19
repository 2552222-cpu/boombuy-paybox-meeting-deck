import React from "react";

export default function Slide1() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col px-10 md:px-16 py-10 md:py-14 overflow-hidden">
      {/* Pill tag */}
      <div className="flex">
        <span className="inline-flex items-center rounded-full bg-white border border-[#E0E0E0] px-5 py-2 text-sm text-[#333333] font-medium tracking-wide shadow-sm">
          שותף פוטנציאלי
        </span>
      </div>

      {/* Main: text (right) + logo image (left) */}
      <div className="flex-1 flex flex-col md:flex-row items-center gap-12 mt-10">
        {/* Text block */}
        <div className="flex-1 w-full max-w-md text-right">
          <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mb-7 mr-0 ml-auto" />
          <h1 className="text-3xl md:text-[2.85rem] leading-[1.22] font-black text-[#0F1B3D] tracking-tight">
            הפלטפורמה המובילה בישראל למועדוני הטבות וצרכנות חכמה
          </h1>
          <p className="mt-7 text-xl md:text-2xl font-bold text-[#2D7FF9]">
            גם ללא הצורך בסבסוד ההטבה
          </p>
        </div>

        {/* Logo wall image */}
        <div className="flex-[1.4] w-full h-full flex items-center justify-center">
          <img
            src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/b032074d4_.png"
            alt="לוגואי שותפים"
            className="w-full h-auto max-h-[85vh] max-w-2xl object-contain"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>01</span>
      </div>
    </div>
  );
}
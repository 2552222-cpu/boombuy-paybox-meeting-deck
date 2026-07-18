import React from "react";
import { LOGOS } from "@/data/slides";

export default function Slide1() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col px-10 md:px-16 py-10 md:py-14 overflow-hidden">
      {/* Pill tag */}
      <div className="flex">
        <span className="inline-flex items-center rounded-full bg-[#F5F5F5] border border-[#E0E0E0] px-4 py-1.5 text-sm text-[#333333] font-medium">
          שותף פוטנציאלי
        </span>
      </div>

      {/* Main: logo grid (left/start) + text (right/end) */}
      <div className="flex-1 flex flex-col md:flex-row items-center gap-10 mt-8">
        {/* Logo grid */}
        <div className="flex-1 w-full max-w-2xl">
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {LOGOS.map((name, i) => (
              <div
                key={i}
                className="aspect-[3/2] rounded-lg bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-center px-2"
              >
                <span className="text-[11px] md:text-xs font-bold text-[#374151] text-center leading-tight tracking-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Text block */}
        <div className="flex-1 w-full max-w-md text-right">
          <h1 className="text-3xl md:text-[2.7rem] leading-[1.15] font-black text-[#0F1B3D]">
            הפלטפורמה המובילה בישראל למועדוני הטבות וצרכנות חכמה
          </h1>
          <p className="mt-5 text-xl md:text-2xl font-bold text-[#2D7FF9]">
            גם ללא הצורך בסבסוד ההטבה
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>01</span>
      </div>
    </div>
  );
}
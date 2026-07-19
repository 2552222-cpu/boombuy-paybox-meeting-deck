import React from "react";
import { Coins } from "lucide-react";

export default function ProductCard({ p }) {
  const imgPositionClass = p.imagePosition === "center" ? "object-center" : "object-top";
  return (
    <div className="relative rounded-2xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-[68%] shrink-0 bg-[#F9FAFB]">
        <img
          src={p.image}
          alt={p.title}
          className={`w-full h-full object-cover ${imgPositionClass}`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-[#FFCC4D] px-2 py-1 shadow-sm">
          <Coins className="w-3 h-3 text-[#10162A]" />
          <span className="text-[11px] font-black text-[#10162A]">{p.coins}</span>
        </div>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1 text-right">
        <h4 className="text-sm md:text-base font-bold text-[#10162A] leading-snug line-clamp-2">
          {p.title}
        </h4>
        <div>
          <p className="text-[10px] md:text-[11px] text-[#9CA3AF] font-medium">
            במקום <span className="line-through">{p.fullPrice}</span>
          </p>
          <div dir="rtl" className="mt-1 flex flex-row items-center justify-start gap-1.5 flex-nowrap">
            <span className="text-sm md:text-base font-black text-[#0055FF]">{p.cash} ₪</span>
            <span className="text-[#9CA3AF] text-xs font-bold">+</span>
            <span className="text-[11px] md:text-xs font-black text-[#D4AF37]">{p.coins} נק'</span>
          </div>
        </div>
      </div>
    </div>
  );
}
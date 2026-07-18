import React from "react";
import { SLIDE_META } from "@/data/slides";

function ThumbVisual({ id, theme }) {
  // tiny stylized representation per slide
  const dark = theme === "dark";
  const bg = dark ? "bg-[#0B1930]" : "bg-white";
  return (
    <div className={`absolute inset-0 ${bg} p-1.5 flex flex-col gap-0.5 overflow-hidden`}>
      {id === 1 && (
        <>
          <div className="h-1 w-6 rounded-full bg-[#E5E7EB] self-start" />
          <div className="grid grid-cols-4 gap-0.5 mt-0.5 flex-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-[#F3F4F6] rounded-[1px]" />
            ))}
          </div>
        </>
      )}
      {id === 2 && (
        <div className="flex flex-col gap-0.5 mt-1 px-0.5 items-end">
          <div className="h-1 w-8 bg-[#2D7FF9] rounded-full" />
          <div className="h-2 w-12 bg-[#0A1B3D] rounded-sm" />
          <div className="h-1 w-10 bg-[#D1D5DB] rounded-full" />
          <div className="h-1 w-8 bg-[#D1D5DB] rounded-full" />
        </div>
      )}
      {id === 3 && (
        <div className="flex items-center justify-center flex-1">
          <div className="w-6 h-6 rounded-full border border-dashed border-[#FDB833]/70 flex items-center justify-center">
            <span className="text-[6px] font-black text-[#FDB833]">90%</span>
          </div>
        </div>
      )}
      {id === 4 && (
        <div className="grid grid-cols-3 gap-0.5 mt-1 flex-1">
          <div className="bg-[#FFC107] rounded-[1px]" />
          <div className="bg-[#0D6EFD] rounded-[1px]" />
          <div className="bg-[#121926] rounded-[1px]" />
        </div>
      )}
      {id === 5 && (
        <div className="flex flex-col gap-0.5 flex-1 mt-0.5">
          <div className="grid grid-cols-3 gap-0.5 flex-1">
            <div className="bg-white/10 rounded-[1px]" />
            <div className="bg-white/10 rounded-[1px]" />
            <div className="bg-white/10 rounded-[1px]" />
          </div>
          <div className="h-1.5 bg-[#FFCC4D] rounded-full" />
        </div>
      )}
      {id === 6 && (
        <div className="flex gap-0.5 flex-1 mt-0.5">
          <div className="w-5 h-full rounded-[2px] bg-[#2D7FF9]/20 border border-[#2D7FF9]/40" />
          <div className="flex-1 flex flex-col gap-0.5 items-end justify-center px-0.5">
            <div className="h-1 w-full bg-[#E5E7EB] rounded-full" />
            <div className="h-1 w-2/3 bg-[#0a1638] rounded-sm" />
            <div className="h-0.5 w-full bg-[#E5E7EB] rounded-full" />
            <div className="h-0.5 w-3/4 bg-[#E5E7EB] rounded-full" />
          </div>
        </div>
      )}
      {id === 7 && (
        <div className="grid grid-cols-4 gap-0.5 mt-0.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#F3F4F6] rounded-[1px]" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ current, onSelect }) {
  return (
    <aside className="hidden md:flex w-[96px] shrink-0 bg-[#0a0a0a] flex-col items-center gap-3 py-5 overflow-y-auto no-scrollbar">
      {SLIDE_META.map((s) => {
        const active = s.id === current;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="group relative shrink-0"
            aria-label={`עבור לשקופית ${s.id}`}
          >
            <div
              className={`relative w-16 h-10 rounded-md overflow-hidden border transition-all ${
                active
                  ? "border-[#F97316] ring-2 ring-[#F97316]/40"
                  : "border-white/15 group-hover:border-white/40"
              }`}
            >
              <ThumbVisual id={s.id} theme={s.theme} />
            </div>
            <span
              className={`absolute -bottom-0.5 -left-0.5 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                active ? "bg-[#F97316] text-white" : "bg-black/70 text-gray-400"
              }`}
            >
              {s.id}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
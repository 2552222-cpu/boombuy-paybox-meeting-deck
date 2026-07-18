import React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function SlideNav({ current, total, onPrev, onNext, onReset }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/80 backdrop-blur px-3 py-1.5 text-white shadow-lg">
      <button
        onClick={onPrev}
        disabled={current <= 1}
        className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="הקודם"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <span className="text-xs font-medium tabular-nums min-w-[44px] text-center">
        {current} / {total}
      </span>
      <button
        onClick={onNext}
        disabled={current >= total}
        className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        aria-label="הבא"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-white/20 mx-0.5" />
      <button
        onClick={onReset}
        className="flex items-center gap-1 rounded-full hover:bg-white/10 px-2 py-1 transition-colors"
        aria-label="איפוס"
      >
        <RotateCcw className="w-3 h-3" />
        <span className="text-xs">Reset</span>
        <kbd className="text-[9px] font-bold bg-white/15 rounded px-1 py-0.5 leading-none">R</kbd>
      </button>
    </div>
  );
}
import React from "react";
import { PRODUCTS } from "@/data/slides";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/slides/ProductCard";

export default function Slide7() {
  const cards = [...PRODUCTS];
  const moreCard = (
    <div
      key="more"
      className="rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-3"
    >
      <h4 className="text-sm md:text-base font-black text-[#10162A]">ומאות מוצרים נוספים</h4>
      <p className="mt-1.5 text-[11px] text-[#9CA3AF] leading-relaxed">
        קטלוג דינמי, מתעדכן לפי מלאי והזדמנויות שוק
      </p>
    </div>
  );

  return (
    <div className="relative min-h-full w-full bg-white flex flex-col px-6 md:px-12 py-7 overflow-visible">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#10162A] hover:bg-[#F9FAFB]">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#10162A] hover:bg-[#F9FAFB]">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm font-bold text-[#0055FF]">לכל המוצרים</span>
      </div>

      <div className="text-right shrink-0 mt-3">
        <span className="text-sm font-bold text-[#0055FF] tracking-[0.15em]">הדמו: קטלוג ההטבות והמוצרים</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-3 mb-1.5 mr-0 ml-auto" />
        <h1 className="mt-2 text-3xl md:text-4xl font-black text-[#10162A] tracking-tight">
          עד 50% הנחה על מוצרים מבוקשים
        </h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 mt-5 auto-rows-[140px] md:auto-rows-auto">
        {cards.slice(0, 3).map((p, i) => (
          <ProductCard key={i} p={p} />
        ))}
        {moreCard}
        {cards.slice(3).map((p, i) => (
          <ProductCard key={`b-${i}`} p={p} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[#9CA3AF] text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>07</span>
      </div>
    </div>
  );
}
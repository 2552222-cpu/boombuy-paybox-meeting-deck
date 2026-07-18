import React from "react";
import { PRODUCTS } from "@/data/slides";
import { Coins } from "lucide-react";

export default function Slide7() {
  const cards = [...PRODUCTS];
  // insert "more products" card at index 4 (row 2 col 1)
  const moreCard = (
    <div
      key="more"
      className="rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-4 min-h-[230px]"
    >
      <h4 className="text-base font-black text-[#10162A]">ומאות מוצרים נוספים</h4>
      <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
        קטלוג דינמי, מתעדכן לפי מלאי והזדמנויות שוק
      </p>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-white flex flex-col px-8 md:px-12 py-8 overflow-hidden">
      <div className="text-right">
        <span className="text-sm font-bold text-[#0055FF] tracking-[0.15em]">הדמו: קטלוג ההטבות והמוצרים</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-3 mb-1.5 mr-0 ml-auto" />
        <h1 className="mt-2 text-3xl md:text-4xl font-black text-[#10162A] tracking-tight">
          עד 50% הנחה במרקטפלייס BoomBuy
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-6">
        {cards.slice(0, 4).map((p, i) => (
          <ProductCard key={i} p={p} />
        ))}
        {moreCard}
        {cards.slice(4).map((p, i) => (
          <ProductCard key={`b-${i}`} p={p} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>07</span>
      </div>
    </div>
  );
}

function ProductCard({ p }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-[#F9FAFB]">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2.5 right-2.5 rounded-lg bg-[#10162A] px-2.5 py-1.5 flex items-center gap-1.5">
          <Coins className="w-3 h-3 text-[#FFC107]" />
          <span className="text-[11px] font-bold text-white">{p.badge}</span>
        </div>
      </div>
      <div className="p-4 text-right">
        <h4 className="text-xs md:text-sm font-bold text-[#10162A] leading-snug line-clamp-2">
          {p.title}
        </h4>
        <p className="mt-2 text-[11px] text-[#9CA3AF] line-through">
          מחיר מלא {p.fullPrice}
        </p>
      </div>
    </div>
  );
}
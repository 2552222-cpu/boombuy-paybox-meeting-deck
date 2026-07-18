import React from "react";
import { PRODUCTS } from "@/data/slides";
import { Coins } from "lucide-react";

export default function Slide7() {
  const cards = [...PRODUCTS];
  const moreCard = (
    <div
      key="more"
      className="rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA] flex flex-col items-center justify-center text-center p-3"
    >
      <h4 className="text-sm md:text-base font-black text-[#10162A]">ומאות מוצרים נוספים</h4>
      <p className="mt-1.5 text-[11px] text-[#9CA3AF] leading-relaxed">
        קטלוג דינמי, מתעדכן לפי מלאי והזדמנויות שוק
      </p>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-white flex flex-col px-8 md:px-12 py-7 overflow-hidden">
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#0055FF] tracking-[0.15em]">הדמו: קטלוג ההטבות והמוצרים</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-3 mb-1.5 mr-0 ml-auto" />
        <h1 className="mt-2 text-3xl md:text-4xl font-black text-[#10162A] tracking-tight">
          עד 50% הנחה במרקטפלייס BoomBuy
        </h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 mt-5">
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

function ProductCard({ p }) {
  const cashNum = Number(String(p.cash).replace(/\D/g, ""));
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-[48%] shrink-0 bg-[#F9FAFB]">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-h-0 p-2.5 flex flex-col justify-between text-right">
        <h4 className="text-[11px] md:text-xs font-bold text-[#10162A] leading-snug line-clamp-2">
          {p.title}
        </h4>
        <div>
          <p className="text-[10px] md:text-[11px] text-[#9CA3AF] font-medium">
            במקום <span className="line-through">{p.fullPrice}</span>
          </p>
          <div className="mt-1 flex items-center justify-end gap-1.5 flex-wrap">
            {cashNum > 0 && (
              <span className="text-sm md:text-base font-black text-[#0055FF]">{p.cash} ₪</span>
            )}
            {cashNum > 0 && <span className="text-[#9CA3AF] text-xs font-bold">+</span>}
            <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF7DE] px-1.5 py-1">
              <Coins className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[11px] md:text-xs font-black text-[#10162A]">{p.coins} נק'</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
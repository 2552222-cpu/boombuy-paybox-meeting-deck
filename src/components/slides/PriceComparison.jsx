import React from "react";
import { ExternalLink, BadgeCheck } from "lucide-react";

const STORES = [
  { name: "ריפליי - אתר רשמי", price: "350 ₪", url: "https://replayjeans.co.il/products/2226681088?" },
  { name: "הייטקזון", price: "229 ₪", url: "https://www.htzone.co.il/item/156288/%D7%9E%D7%90%D7%A8%D7%96-2-%D7%97%D7%95%D7%9C%D7%A6%D7%95%D7%AA-%D7%9E%D7%91%D7%99%D7%AA-Replay-%D7%9C%D7%95%D7%92%D7%95/" },
  { name: "פיס פלוס (מסובסד)", price: "110 ₪", url: "https://paisplus.co.il/product/2011" }
];

export default function PriceComparison() {
  return (
    <div className="w-[300px] rounded-2xl border border-[#E5E7EB] bg-white shadow-lg p-4 text-right">
      <div className="flex items-center justify-start gap-1.5">
        <span className="text-xs font-black text-[#0a1638] tracking-wide">מחיר אמיתי בשוק, לא משחק</span>
        <BadgeCheck className="w-4 h-4 text-[#16A34A]" />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {STORES.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors px-3 py-2.5 group"
          >
            <span className="text-sm font-black text-[#10162A]">{s.price}</span>
            <span className="flex items-center gap-1 text-sm font-bold text-[#0055FF] group-hover:underline">
              {s.name}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-[#EAF7EF] px-3 py-2 text-center">
        <span className="text-[11px] font-black text-[#16A34A]">100 ₪ אצלנו = כ-50% הנחה אמיתית מהשוק</span>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { ChevronRight, Coins } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const FULL_PRICE = 200;
const MAX_COINS = 100;

export default function RedeemPhoneMockup() {
  const [coins, setCoins] = useState(60);
  const price = FULL_PRICE - coins;

  return (
    <div className="w-[260px] h-[540px] rounded-[2.5rem] bg-black p-2.5 shadow-2xl">
      <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden flex flex-col">
        {/* notch */}
        <div className="relative h-6 bg-white">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black" />
        </div>

        <div className="flex-1 px-4 py-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#0a1638]">מרקטפלייס BoomBuy</span>
            <ChevronRight className="w-4 h-4 text-[#0a1638]" />
          </div>

          <div className="mt-3 rounded-xl overflow-hidden h-[130px] bg-[#F9FAFB] shrink-0">
            <img
              src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/0e73b93dc_.jpg"
              alt="מארז זוג חולצות REPLAY"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <h3 className="mt-2.5 text-xs font-bold text-[#0a1638] leading-snug">
            מארז זוג חולצות REPLAY
          </h3>
          <p className="mt-0.5 text-[11px] text-[#9CA3AF]">
            במקום <span className="line-through">{FULL_PRICE} ₪</span>
          </p>

          <div className="mt-3 rounded-xl bg-[#F9FAFB] p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#0a1638]">
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                כמה נקודות תרצה להשתמש
              </span>
            </div>
            <div className="mt-3" dir="ltr">
              <Slider
                value={[coins]}
                onValueChange={(v) => setCoins(v[0])}
                max={MAX_COINS}
                step={1}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#9CA3AF]">
              <span>{MAX_COINS}</span>
              <span>0</span>
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-end gap-1.5">
            <span className="text-2xl font-black text-[#0055FF]">{price} ₪</span>
            <span className="text-xs font-bold text-[#D4AF37]">{coins} נק' +</span>
          </div>

          <button className="mt-auto w-full rounded-lg bg-[#0a1638] py-2 text-xs font-bold text-white">
            הוספה לעגלה
          </button>
        </div>
      </div>
    </div>
  );
}
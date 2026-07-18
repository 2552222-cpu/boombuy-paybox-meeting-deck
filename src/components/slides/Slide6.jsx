import React from "react";
import { ArrowUpRight, Gift, Repeat, Wallet, Banknote } from "lucide-react";

export default function Slide6() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col px-10 md:px-16 py-10 overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Mobile mockup */}
        <div className="shrink-0">
          <div className="w-[260px] h-[540px] rounded-[2.5rem] bg-black p-2.5 shadow-2xl">
            <div className="w-full h-full rounded-[2rem] bg-white overflow-hidden flex flex-col">
              {/* notch */}
              <div className="relative h-6 bg-white">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black" />
              </div>

              <div className="flex-1 px-4 py-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-[#0a1638]">PayBox</span>
                  <div className="w-7 h-7 rounded-full bg-[#F3F4F6]" />
                </div>

                {/* Balance card */}
                <div className="mt-3 rounded-2xl bg-[#2D7FF9] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium opacity-90">היתרה שלי</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="mt-1 text-3xl font-black">5 ₪</div>
                  <button className="mt-3 w-full rounded-lg bg-white/20 py-1.5 text-xs font-bold">
                    טעינה ליתרה
                  </button>
                </div>

                {/* Coins card */}
                <div className="mt-3 rounded-2xl bg-[#FFCC4D] p-4 text-black">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">PayBox Coins</span>
                    <span className="text-[10px] font-bold bg-black/10 px-1.5 py-0.5 rounded">חדש</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#2D7FF9] flex items-center justify-center text-white text-[10px] font-black">P</div>
                    <span className="text-xl font-black">150 נקודות</span>
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-[#0a1638] py-1.5 text-xs font-bold text-white">
                    למימוש במרקטפלייס
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-3">
                  <span className="text-[11px] font-bold text-[#0a1638]">פעולות באפליקציה</span>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[
                      { i: Repeat, l: "העברה" },
                      { i: Gift, l: "מתנה" },
                      { i: Wallet, l: "Box" },
                      { i: Banknote, l: "הלוואה" }
                    ].map((a, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                          <a.i className="w-4 h-4 text-[#2D7FF9]" />
                        </div>
                        <span className="text-[9px] text-[#4a4a4a]">{a.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="border-t border-[#F3F4F6] grid grid-cols-4 py-2">
                {["בית", "יתרת הלוואות", "PayBox Plus", "היסטוריה"].map((n, i) => (
                  <span key={i} className={`text-[9px] text-center ${i === 0 ? "text-[#2D7FF9] font-bold" : "text-gray-400"}`}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text block */}
        <div className="flex-1 text-right max-w-md">
          <span className="text-sm font-bold text-[#2D7FF9] tracking-[0.15em]">חוויית המשתמש באפליקציה</span>
          <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-5 mb-1 mr-0 ml-auto" />
          <h1 className="mt-4 text-3xl md:text-4xl font-black leading-[1.25] text-[#0a1638] tracking-tight">
            הטמעה טבעית בתוך ה-UX הקיים
          </h1>
          <p className="mt-6 text-base md:text-lg leading-[1.75] text-[#4a4a4a]">
            הלקוח רואה את היתרה הפיננסית שלו, ולצידה את יתרת ה-Coins שלו — מוכנים לשימוש
            בכל רגע. תמריץ פסיכולוגי אדיר להשאיר את הכסף בתוך האפליקציה.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>06</span>
      </div>
    </div>
  );
}
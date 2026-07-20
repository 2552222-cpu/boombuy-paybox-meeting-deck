import React, { useState } from "react";
import { Palmtree, X } from "lucide-react";

const SCREENSHOT_URL = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/b3553123c_.png";

export default function Slide8() {
  const [showOffer, setShowOffer] = useState(false);

  return (
    <div className="relative min-h-full w-full bg-white flex flex-col px-6 md:px-16 py-10 overflow-visible">
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#7C3AED] tracking-[0.15em]">הדמו: PayGift</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black text-[#10162A] tracking-tight">
          חנות המתנות PayGift
        </h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 py-4">
        {/* Phone mockup */}
        <div className="shrink-0 relative">
          <div className="w-[240px] h-[500px] md:w-[300px] md:h-[620px] rounded-[2.5rem] bg-black p-2.5 shadow-2xl">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-white">
              <img
                src={SCREENSHOT_URL}
                alt="מסך פתיחת קבוצה"
                className="w-full h-full object-cover object-top"
              />

              {/* Hotspot on "איסוף למתנה" */}
              <button
                onClick={() => setShowOffer((v) => !v)}
                className="absolute w-9 h-9"
                style={{ left: "78%", top: "53%", transform: "translate(-50%, -50%)" }}
                aria-label="איסוף למתנה"
              >
                <span className="absolute inset-0 rounded-full bg-[#F97316]/50 animate-ping" />
                <span className="absolute inset-2 rounded-full bg-[#F97316] border-2 border-white shadow-lg" />
              </button>

              {/* Offer banner popup */}
              {showOffer && (
                <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-gradient-to-br from-[#0EA5A4] to-[#0a7b7a] p-4 text-white shadow-2xl">
                  <button
                    onClick={() => setShowOffer(false)}
                    className="absolute top-2 left-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
                    aria-label="סגור"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Palmtree className="w-6 h-6" />
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="text-sm font-black leading-tight">חופשת ספא זוגית בתל אביב</h4>
                      <p className="mt-1 text-xs font-bold opacity-90">900 ש"ח + 400 נקודות</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-white/15 py-2 text-xs font-bold hover:bg-white/25 transition-colors">
                    למתנות נוספות
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text block */}
        <div className="flex-1 text-right max-w-md">
          <p className="text-lg md:text-xl leading-[1.75] text-[#4a4a4a]">
            כל מי שאוסף כסף באפליקציה — לאירוע, למתנה או למטרה משותפת — פוגש בדיוק ברגע הנכון
            הצעת מתנה רלוונטית מקטלוג BoomBuy, ישירות בתוך תהליך פתיחת הקבוצה.
          </p>
          <p className="mt-5 text-base font-bold text-[#7C3AED]">
            לחצו על הנקודה הכתומה במסך כדי לראות את ההדמיה
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>08</span>
      </div>
    </div>
  );
}
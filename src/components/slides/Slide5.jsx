import React from "react";
import { ArrowLeft } from "lucide-react";

const STEPS = [
  { num: "01", title: "הלקוח פעיל ב-PayBox", desc: "מעביר כסף, שומר יתרה, משתמש בכרטיס האשראי" },
  { num: "02", title: "צובר PayBox Coins", desc: "נקודות נאמנות על כל פעולה רצויה ל-PayBox" },
  { num: "03", title: "משתמש לרכישת מוצרים בעד 50% הנחה", desc: "ב-PayBox Market" }
];

export default function Slide5() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#1a2a40] to-[#0a101d] flex flex-col px-10 md:px-14 py-10 overflow-hidden text-white">
      <div className="text-center">
        <span className="text-sm font-bold text-[#FFCC4D] tracking-[0.15em]">ההצעה ל-PayBox</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mx-auto" />
        <h1 className="mt-3 text-2xl md:text-4xl font-black leading-[1.25] max-w-3xl mx-auto tracking-tight">
          מנוע הנאמנות: כל פעולה שלכם הופכת ל-PayBox Coins
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-9 mt-8">
        {/* Steps: RTL so 01 on right, 03 on left */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-stretch">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-7 flex flex-col gap-3.5 min-h-[160px]">
                <span className="text-4xl font-black text-[#FFCC4D]">{s.num}</span>
                <h3 className="text-lg font-bold tracking-wide">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center">
                  <ArrowLeft className="w-7 h-7 text-[#FFCC4D]/70" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Yellow pill */}
        <div className="rounded-full bg-[#FFCC4D] flex items-center justify-center gap-6 px-9 py-5 shadow-lg mx-auto">
          <span className="text-base md:text-lg font-black text-black tracking-wide">התוצאה: הנחה של עד</span>
          <span className="text-4xl md:text-5xl font-black text-black">50%</span>
          <span className="text-base md:text-lg font-black text-black tracking-wide">גם ללא סבסוד מהותי</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-gray-500 text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>05</span>
      </div>
    </div>
  );
}
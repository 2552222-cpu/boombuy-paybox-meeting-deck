import React from "react";
import { Cpu, Wallet, FileSignature } from "lucide-react";

const CARDS = [
  {
    icon: "₪",
    bg: "bg-[#121926]",
    text: "#FFC107",
    title: "חיסכון",
    desc: "חיסכון של מיליונים בהקמה ובניהול ההטבות"
  },
  {
    icon: "%",
    bg: "bg-[#0D6EFD]",
    text: "#ffffff",
    title: "ערך צרכני",
    desc: "הנחות עמוקות ללא מגבלת שימושים"
  },
  {
    icon: "∞",
    bg: "bg-[#FFC107]",
    text: "#1a1a1a",
    title: "חופש מימוש",
    desc: "המועדון לא 'נחנק' כשהמימושים עולים"
  }
];

const PILLS = [
  { icon: Cpu, text: "טכנולוגיה חכמה לאיתור הזדמנויות בשוק" },
  { icon: Wallet, text: "כוח קנייה עצום" },
  { icon: FileSignature, text: "התחייבות מראש לנפח מכירות גדול" }
];

export default function Slide4() {
  return (
    <div className="relative min-h-full w-full bg-white flex flex-col px-6 md:px-16 py-12 overflow-visible">
      <div className="text-right">
        <span className="text-sm font-bold text-[#4285F4] tracking-[0.15em]">המהפכה הכלכלית של BoomBuy</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-[1.15]">
          0% סבסוד — מקסימום ערך
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-14 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`${c.bg} rounded-2xl p-9 deck-shadow flex flex-col gap-6 min-h-[220px]`}
            >
              <div
                className="w-16 h-16 rounded-xl bg-black/10 flex items-center justify-center text-3xl font-black"
                style={{ color: c.text }}
              >
                {c.icon}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black" style={{ color: c.text }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-base md:text-lg font-medium opacity-90 leading-relaxed" style={{ color: c.text }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-[#374151] tracking-wide">איך אנחנו עושים את זה</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLS.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-[#E5E7EB] px-6 py-6 shadow-sm flex flex-col items-center gap-3 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-[#4285F4]" />
                </div>
                <span className="text-sm md:text-base font-bold text-[#374151] leading-snug">
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[#9CA3AF] text-xs">
        <span className="font-bold tracking-widest">BoomBuy</span>
        <span>04</span>
      </div>
    </div>
  );
}
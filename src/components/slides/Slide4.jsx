import React from "react";

const CARDS = [
  {
    icon: "∞",
    bg: "bg-[#FFC107]",
    text: "#1a1a1a",
    title: "חופש מימוש",
    desc: "המועדון לא 'נחנק' כשהמימושים עולים"
  },
  {
    icon: "%",
    bg: "bg-[#0D6EFD]",
    text: "#ffffff",
    title: "ערך צרכני",
    desc: "הנחות עמוקות ללא מגבלת שימושים"
  },
  {
    icon: "₪",
    bg: "bg-[#121926]",
    text: "#FFC107",
    title: "חיסכון",
    desc: "חיסכון של מיליונים בהקמה ובניהול ההטבות"
  }
];

const PILLS = [
  "טכנולוגיה חכמה לאיתור הזדמנויות בשוק",
  "כוח קנייה עצום",
  "התחייבות מראש לנפח מכירות גדול"
];

export default function Slide4() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col px-10 md:px-16 py-12 overflow-hidden">
      <div className="text-right">
        <span className="text-sm font-bold text-[#4285F4]">המהפכה הכלכלית של BoomBuy</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-black text-[#111827]">
          0% סבסוד — מקסימום ערך
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`${c.bg} rounded-2xl p-6 deck-shadow flex flex-col gap-4 min-h-[170px]`}
            >
              <div
                className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center text-2xl font-black"
                style={{ color: c.text }}
              >
                {c.icon}
              </div>
              <div>
                <h3 className="text-xl font-black" style={{ color: c.text }}>
                  {c.title}
                </h3>
                <p className="mt-1 text-sm font-medium opacity-90" style={{ color: c.text }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-base font-bold text-[#374151]">איך אנחנו עושים את זה</p>
          <div className="mt-3 flex flex-wrap gap-2.5 justify-start md:justify-end">
            {PILLS.map((p, i) => (
              <span
                key={i}
                className="rounded-full bg-white border border-[#E5E7EB] px-4 py-2 text-xs md:text-sm font-medium text-[#374151] shadow-sm"
              >
                {p}
              </span>
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
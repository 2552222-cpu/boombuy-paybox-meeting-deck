import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const PHASES = [
  {
    phase: "חודש 1-3",
    label: "השקעה",
    color: "#EF4444",
    retainer: -300,
    commerce: 60,
    interchange: 40,
    eilat: 10,
    total: -190,
    note: "שלב עלייה לאוויר",
  },
  {
    phase: "חודש 4-6",
    label: "איזון",
    color: "#F59E0B",
    retainer: -300,
    commerce: 150,
    interchange: 120,
    eilat: 30,
    total: 0,
    note: "ריטיינר מתאפס",
  },
  {
    phase: "חודש 7-12",
    label: "רווח",
    color: "#34D399",
    retainer: -300,
    commerce: 350,
    interchange: 250,
    eilat: 80,
    total: 380,
    note: "PayBox ברווח נקי",
  },
  {
    phase: "שנה 2",
    label: "סקייל",
    color: "#60A5FA",
    retainer: -200,
    commerce: 600,
    interchange: 450,
    eilat: 150,
    total: 1000,
    note: "ריטיינר יורד · רווח עולה",
  },
];

const SCRIPT = `"בואו נדבר מספרים — שמרניים לחלוטין.

חודשים 1-3: אנחנו עולים לאוויר, מקימים הכל. פייבוקס מוציאה ~190 אלף נטו בחודש אחרי הכנסות.

חודשים 4-6: הסחר מתחיל לזרום. הגדלנו First in Wallet. הריטיינר מתאפס.

מחודש 7: פייבוקס עוברת לרווח נקי חדש — 380 אלף שקל בחודש שלא היו קיימים לפני.

שנה 2: הריטיינר יורד ל-200 אלף (כי ההכנסות כבר מכסות). הרווח עולה למיליון שקל בחודש.

סך השקעה בשנה 1: פחות מ-2 מיליון שקל נטו.
ההחזר: מעל 5 מיליון שקל הכנסות חדשות.
ROI שנה 1: 250%+."`;

export default function Slide9() {
  const [active, setActive] = useState(null);

  const year1Investment = 190 * 3 + 0 * 3; // ~570K net
  const year1Return = (60 + 40 + 10) * 3 + (150 + 120 + 30) * 3 + (350 + 250 + 80) * 6; // estimate

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#34D399] tracking-[0.15em]">
          טבלת ROI
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
          מספרים שמרנים. תוצאות מדהימות.
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 mt-6">
        {/* Phase cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PHASES.map((p, i) => (
            <div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="rounded-2xl p-5 cursor-pointer transition-all border"
              style={{
                background: active === i ? `${p.color}18` : "rgba(255,255,255,0.04)",
                borderColor: active === i ? p.color : "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-black tracking-wider rounded-full px-2 py-0.5"
                  style={{ background: `${p.color}25`, color: p.color }}
                >
                  {p.label}
                </span>
                <span className="text-gray-500 text-[10px]">{p.phase}</span>
              </div>
              <p
                className="text-3xl md:text-4xl font-black"
                style={{ color: p.total >= 0 ? "#34D399" : "#EF4444" }}
              >
                {p.total >= 0 ? "+" : ""}
                {p.total.toLocaleString()}K
              </p>
              <p className="text-xs text-gray-400 mt-1">₪ נטו לחודש</p>
              <p className="text-[10px] text-gray-500 mt-2 italic">{p.note}</p>

              {active === i && (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#EF4444]">{p.retainer.toLocaleString()}K ₪</span>
                    <span className="text-gray-400">ריטיינר</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#34D399]">+{p.commerce}K ₪</span>
                    <span className="text-gray-400">סחר The Box</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#60A5FA]">+{p.interchange}K ₪</span>
                    <span className="text-gray-400">עמלה צולבת</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FBBF24]">+{p.eilat}K ₪</span>
                    <span className="text-gray-400">אילת + אחר</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Assumptions table */}
        <div
          className="rounded-2xl p-6 border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <p className="text-gray-400 text-xs font-bold tracking-widest mb-4 text-right">
            הנחות יסוד שמרניות
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: "300K", label: "כרטיסי אשראי", sub: "× 1,800 ₪/חודש" },
              { val: "30%", label: "כסף קבוצות שנלכד", sub: "מ-100% בריחה כיום" },
              { val: "10%→25%", label: "First in Wallet", sub: "גידול מדורג" },
              { val: "6 חודש", label: "Break-Even", sub: "ריטיינר מתאפס" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-white font-black text-xl">{item.val}</p>
                <p className="text-gray-300 text-xs font-bold mt-1">{item.label}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Big year 1 summary */}
        <div className="rounded-2xl bg-gradient-to-r from-[#34D399]/15 to-[#60A5FA]/15 border border-[#34D399]/30 px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            <div>
              <p className="text-gray-400 text-xs font-bold tracking-widest mb-1">
                השקעה נטו שנה 1
              </p>
              <p className="text-[#EF4444] font-black text-3xl">~ 1.5M ₪</p>
            </div>
            <div className="text-2xl text-gray-600 hidden md:block">→</div>
            <div>
              <p className="text-gray-400 text-xs font-bold tracking-widest mb-1">
                הכנסות חדשות שנה 1
              </p>
              <p className="text-[#34D399] font-black text-3xl">~ 5.2M ₪</p>
            </div>
            <div className="text-2xl text-gray-600 hidden md:block">→</div>
            <div>
              <p className="text-gray-400 text-xs font-bold tracking-widest mb-1">
                ROI שנה 1
              </p>
              <p className="text-white font-black text-4xl">250%</p>
            </div>
            <div className="text-2xl text-gray-600 hidden md:block">→</div>
            <div>
              <p className="text-gray-400 text-xs font-bold tracking-widest mb-1">
                Break-Even
              </p>
              <p className="text-[#FBBF24] font-black text-3xl">חודש 6</p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-[10px]">
          * לחצו על כל תקופה לפירוט המלא · כל המספרים שמרניים ומבוססים על נתוני PayBox
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>09</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

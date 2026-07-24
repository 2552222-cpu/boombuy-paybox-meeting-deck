import React, { useState } from "react";
import { motion } from "framer-motion";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { EASE, fadeUp, deckItem, deckContainer, GoldBar } from "@/components/slides/deckAnim";

// Retainer: 350K NIS/month (= 350 NIS × 1,000 = 1 NIS per card × 350K cards)
// Eilat card commission removed — discussed separately
const PHASES = [
  { phase: "חודש 1–3", label: "השקעה", color: "#EF4444", retainer: -350, commerce: 80,  interchange: 65,  total: -205,  note: "שלב עלייה לאוויר" },
  { phase: "חודש 4–6", label: "איזון", color: "#F59E0B", retainer: -350, commerce: 195, interchange: 160, total: 5,     note: "ריטיינר מתאפס" },
  { phase: "חודש 7–12", label: "רווח", color: "#34D399", retainer: -350, commerce: 380, interchange: 325, total: 355,   note: "PayBox ברווח נקי" },
  { phase: "שנה 2", label: "סקייל", color: "#60A5FA", retainer: -200, commerce: 700, interchange: 560, total: 1060,  note: "ריטיינר יורד · רווח עולה" },
];

const ASSUMPTIONS = [
  { val: "350K",    label: "ריטיינר חודשי",       sub: "1 ₪ × 350K כרטיסי אשראי" },
  { val: "30%",     label: "כסף קבוצות שנלכד",     sub: "מ-100% בריחה כיום" },
  { val: "10%→25%", label: "First in Wallet",      sub: "גידול מדורג" },
  { val: "חודש 6",  label: "Break-Even",           sub: "ריטיינר מתאפס" },
];

const SUMMARY = [
  { k: "ריטיינר שנה 1",       v: "₪4.2M",  c: "#EF4444" },
  { k: "הכנסות חדשות שנה 1",   v: "₪5.6M",  c: "#34D399" },
  { k: "רווח נטו שנה 1",       v: "+₪1.4M", c: "#D4AF37", big: true },
  { k: "Break-Even",           v: "חודש 6", c: "#FBBF24" },
];

const SCRIPT = `"בואו נדבר מספרים — שמרניים לחלוטין.

חודשים 1-3: אנחנו עולים לאוויר, מקימים הכל. פייבוקס מוציאה ~205 אלף נטו בחודש אחרי הכנסות — זה שלב ההקמה.

חודשים 4-6: הסחר מתחיל לזרום. הגדלנו First in Wallet. הריטיינר מתאפס לחלוטין — נקודת האיזון.

מחודש 7: פייבוקס עוברת לרווח נקי חדש — 355 אלף שקל בחודש שלא היו קיימים לפני.

שנה 2: הריטיינר יורד ל-200 אלף כי ההכנסות כבר מכסות ברווח. נכנסים ל-1M+ נטו בחודש.

2 מנועי הכנסה:
• סחר The Box — BoomBuy גובה מהספקים, מחזיר rev-share לפייבוקס
• עמלת Interchange — כל עסקה שפייבוקס הופכת לארנק ראשי מייצרת עמלת סליקה נוספת

סך ריטיינר שנה 1: 4.2M ₪.
סך הכנסות חדשות שנה 1: 5.6M ₪.
רווח נטו שנה 1: 1.4M ₪ שלא היה קיים.
Break-even: חודש 6."`;

function PhaseRow({ label, val, color }) {
  return (
    <div className="flex justify-between">
      <span style={{ color }}>{val}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

export default function Slide9() {
  const [active, setActive] = useState(null);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-12 overflow-hidden text-white"
      style={{ background: "linear-gradient(160deg,#0B1930 0%,#0D1F3C 55%,#07101e 100%)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-right shrink-0"
      >
        <span className="text-sm font-bold text-[#34D399] tracking-[0.2em]">ROI · מנוע כלכלי</span>
        <GoldBar className="mt-4" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.12] tracking-[-0.02em]">
          מספרים שמרנים.<br />
          <span className="text-[#D4AF37]">תוצאות שמדברות בעד עצמן.</span>
        </h1>
      </motion.div>

      {/* Year 1 — headline numbers (the story) */}
      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-2 md:grid-cols-4 gap-px mt-8 rounded-2xl overflow-hidden border border-white/10"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {SUMMARY.map((s, i) => (
          <div key={i} className="px-5 md:px-6 py-5 text-right" style={{ background: "#0B1930" }}>
            <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">{s.k}</p>
            <p className={`font-black ${s.big ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`} style={{ color: s.c }}>
              {s.v}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Phase cards (interactive) */}
      <motion.div
        variants={deckContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5"
      >
        {PHASES.map((p, i) => (
          <motion.div
            key={i}
            variants={deckItem}
            onClick={() => setActive(active === i ? null : i)}
            className="rounded-2xl p-5 cursor-pointer transition-colors duration-300 border text-right"
            style={{
              background: active === i ? `${p.color}14` : "rgba(255,255,255,0.03)",
              borderColor: active === i ? p.color : "rgba(255,255,255,0.09)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[9px] font-black tracking-wider rounded-full px-2.5 py-0.5"
                style={{ background: `${p.color}22`, color: p.color }}
              >
                {p.label}
              </span>
              <span className="text-gray-500 text-[10px]">{p.phase}</span>
            </div>
            <p className="text-3xl md:text-4xl font-black" style={{ color: p.total >= 0 ? "#34D399" : "#EF4444" }}>
              {p.total >= 0 ? "+" : ""}
              {p.total.toLocaleString()}K
            </p>
            <p className="text-[10px] text-gray-500 mt-1">₪ נטו לחודש</p>
            <p className="text-[10px] text-gray-400 mt-2">{p.note}</p>

            {active === i && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-[11px]">
                <PhaseRow label="ריטיינר" val={`${p.retainer.toLocaleString()}K ₪`} color="#EF4444" />
                <PhaseRow label="סחר The Box" val={`+${p.commerce}K ₪`} color="#34D399" />
                <PhaseRow label="Interchange (FIW)" val={`+${p.interchange}K ₪`} color="#60A5FA" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Assumptions */}
      <motion.div {...fadeUp(0.15)} className="mt-6 px-1">
        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 text-right">
          הנחות יסוד שמרניות
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
          {ASSUMPTIONS.map((a, i) => (
            <div key={i} className="text-right">
              <p className="text-white font-black text-lg">{a.val}</p>
              <p className="text-gray-300 text-xs font-bold mt-1">{a.label}</p>
              <p className="text-gray-500 text-[10px] mt-0.5">{a.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="text-center text-gray-600 text-[10px] mt-5">
        * לחצו על כל תרופה לפירוט המלא · כל המספרים שמרניים ומבוססים על נתוני PayBox · עמלת כרטיס אילת תידון בנפרד
      </p>

      <div className="mt-auto flex items-center justify-between text-gray-600 text-xs shrink-0 pt-4">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>09 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
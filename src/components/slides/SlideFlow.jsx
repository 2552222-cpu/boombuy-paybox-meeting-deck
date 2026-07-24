import React, { useState } from "react";
import { motion } from "framer-motion";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── DATA ───────────────────────────────────────────────
const YEARS = [
  {
    year: "שנה 1",
    sub: "1B ₪/חודש נוסף",
    fiwTarget: "25%",
    gmv: "350M ₪",
    color: "#F59E0B",
    streams: [
      { name: "Commerce Rev-Share", val: 12, color: "#D4AF37", pct: 18 },
      { name: "Interchange Growth", val: 36, color: "#5BA4CF", pct: 55 },
      { name: "Float Interest",     val: 6,  color: "#34D399", pct: 9  },
      { name: "כרטיסים חדשים",      val: 12, color: "#A78BFA", pct: 18 },
    ],
    retainer: 4.2,
    net: 61.8,
  },
  {
    year: "שנה 2",
    sub: "2.5B ₪/חודש נוסף",
    fiwTarget: "40%",
    gmv: "700M ₪",
    color: "#34D399",
    streams: [
      { name: "Commerce Rev-Share", val: 24,  color: "#D4AF37", pct: 16 },
      { name: "Interchange Growth", val: 90,  color: "#5BA4CF", pct: 61 },
      { name: "Float Interest",     val: 10,  color: "#34D399", pct: 7  },
      { name: "כרטיסים חדשים",      val: 23,  color: "#A78BFA", pct: 16 },
    ],
    retainer: 3,
    net: 144,
  },
  {
    year: "שנה 3",
    sub: "4B ₪/חודש נוסף",
    fiwTarget: "50%+",
    gmv: "1.2B ₪",
    color: "#5BA4CF",
    streams: [
      { name: "Commerce Rev-Share", val: 42,  color: "#D4AF37", pct: 17 },
      { name: "Interchange Growth", val: 144, color: "#5BA4CF", pct: 60 },
      { name: "Float Interest",     val: 16,  color: "#34D399", pct: 7  },
      { name: "כרטיסים חדשים",      val: 39,  color: "#A78BFA", pct: 16 },
    ],
    retainer: 1.8,
    net: 239.2,
  },
];

const SCRIPT = `"שאלה טובה — בואו נעשה סדר בכסף.

PayBox מרוויחה היום 1B ₪ בחודש בסליקה, 10% מאנשים שזה הכרטיס הראשי שלהם.

The Box הופך אותה למקום שאנשים קונים ממנו. זה מייצר 4 מנועי הכנסה שלא היו קיימים:

1. כל קניית מוצר ב-The Box — 3.5% חוזר ל-PayBox מה-GMV. ללא מלאי, ללא סיכון.
2. כל שקל שנוסף לסליקה — PayBox מרוויחה 0.3% אינטרצ'יינג'. עלינו לה מ-1B ל-5B זה +4B × 0.3% = +12M ₪ בחודש.
3. כסף שנשאר בארנק כי יש במה להשתמש — ריבית על הפלואט. עכשיו 100% יוצא. אחרי The Box — יתרה ממוצעת של 200M ₪+.
4. The Box הופך לסיבה לפתוח כרטיס PayBox. 15-30K כרטיסים חדשים בשנה.

שנה 1: הכנסה חדשה של 66M ₪ מול ריטיינר 4.2M ₪.
שנה 3: PayBox מרוויחה 241M ₪ שלא היו קיימים — ב-1.8M ₪ ריטיינר בלבד."`;

// ─── BAR COMPONENT ───────────────────────────────────────
function StreamBar({ stream, animate, delay }) {
  return (
    <motion.div
      className="mb-2"
      initial={{ opacity: 0, x: 20 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-white/50">{stream.name}</span>
        <span className="text-[11px] font-black" style={{ color: stream.color }}>
          {stream.val}M ₪
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: stream.color }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${stream.pct}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

// ─── YEAR CARD ────────────────────────────────────────────
function YearCard({ data, isActive, onClick, index }) {
  const total = data.streams.reduce((s, x) => s + x.val, 0);
  return (
    <div
      className="rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden"
      style={{
        borderColor: isActive ? data.color : "rgba(255,255,255,0.1)",
        background: isActive ? `${data.color}10` : "rgba(255,255,255,0.03)",
      }}
      onClick={onClick}
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between mb-1">
          <span
            className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: `${data.color}25`, color: data.color }}
          >
            {data.year}
          </span>
          <span className="text-[9.5px] text-white/35 font-bold">{data.sub}</span>
        </div>
        <div className="mt-3 text-center">
          <p className="text-[9px] text-white/40 font-bold tracking-widest mb-1">הכנסה חדשה ל-PayBox</p>
          <p className="text-4xl font-black" style={{ color: isActive ? data.color : "#fff" }}>
            {total}M ₪
          </p>
          <p className="text-[9px] text-white/30 mt-0.5">לפני ניכוי ריטיינר</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-xl bg-white/5 px-2 py-2">
            <p className="text-[8.5px] text-red-400/70 font-bold">ריטיינר</p>
            <p className="text-sm font-black text-red-400">-{data.retainer}M</p>
          </div>
          <div className="rounded-xl bg-white/5 px-2 py-2">
            <p className="text-[8.5px] text-emerald-400/70 font-bold">נטו חדש</p>
            <p className="text-sm font-black text-emerald-400">+{data.net}M</p>
          </div>
        </div>
      </div>

      {/* Breakdown bars — show when active */}
      {isActive && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5">
          <p className="text-[9px] text-white/30 font-bold tracking-widest mb-3">פירוט מנועים</p>
          {data.streams.map((s, i) => (
            <StreamBar key={i} stream={s} animate={isActive} delay={i * 0.07} />
          ))}
          <div className="mt-3 pt-3 border-t border-white/5 text-[9.5px] text-white/35 flex justify-between">
            <span>FIW יעד: <strong className="text-white/60">{data.fiwTarget}</strong></span>
            <span>GMV The Box: <strong className="text-white/60">{data.gmv}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────
export default function SlideFlow() {
  const [activeYear, setActiveYear] = useState(0);

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #060F1E 0%, #0B1930 60%, #0D1F3C 100%)" }}
    >
      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(91,164,207,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="text-right shrink-0 relative">
        <span className="text-sm font-bold text-[#5BA4CF] tracking-[0.15em]">מנגנון הצמיחה</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
          כל שקל שמייצרים — PayBox מרוויחה
        </h1>
        <p className="mt-2 text-white/45 text-sm">לחצו על שנה לפירוט מלא</p>
      </div>

      {/* Current state → Engine row */}
      <div className="relative mt-7 flex items-center gap-0 shrink-0">
        {/* Current PayBox */}
        <div className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-center min-w-[140px]">
          <p className="text-[9px] text-white/35 font-bold tracking-widest mb-1">פייבוקס היום</p>
          <p className="text-2xl font-black text-white/60">1B ₪</p>
          <p className="text-[9px] text-white/25 mt-0.5">/חודש סליקה</p>
          <div className="mt-2 text-[9px] text-red-400/80 font-bold">FIW 10% · 100% cash-out</div>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex flex-col items-center gap-1 px-2">
          <div className="flex items-center w-full">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-white/10 to-[#D4AF37]/60" />
            <div className="text-[#D4AF37] text-lg px-1">+</div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-white/10 to-[#D4AF37]/60" />
          </div>
        </div>

        {/* The Box Engine */}
        <div
          className="rounded-2xl border px-5 py-4 text-center min-w-[150px]"
          style={{ borderColor: "rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.07)" }}
        >
          <p className="text-[9px] text-[#D4AF37]/70 font-bold tracking-widest mb-1">The Box</p>
          <p className="text-2xl font-black text-[#D4AF37]">EaaS</p>
          <p className="text-[9px] text-white/30 mt-0.5">מנוע ההטבות</p>
          <div className="mt-2 text-[9px] text-[#D4AF37]/70 font-bold">BoomBuy מפעילה · ₪ חוזר</div>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex flex-col items-center gap-1 px-2">
          <div className="flex items-center w-full">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-white/10 to-emerald-400/60" />
            <div className="text-emerald-400 text-lg px-1">→</div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-white/10 to-emerald-400/60" />
          </div>
        </div>

        {/* Target */}
        <div
          className="rounded-2xl border border-emerald-400/30 px-5 py-4 text-center min-w-[140px]"
          style={{ background: "rgba(52,211,153,0.07)" }}
        >
          <p className="text-[9px] text-emerald-400/70 font-bold tracking-widest mb-1">יעד שנה 3</p>
          <p className="text-2xl font-black text-emerald-400">5B ₪</p>
          <p className="text-[9px] text-white/25 mt-0.5">/חודש סליקה</p>
          <div className="mt-2 text-[9px] text-emerald-400/70 font-bold">FIW 50%+ · כסף נשאר</div>
        </div>
      </div>

      {/* 4 Engines strip */}
      <div className="mt-5 grid grid-cols-4 gap-3 shrink-0">
        {[
          { icon: "🛍️", label: "Commerce Rev-Share", sub: "3.5% מ-GMV", color: "#D4AF37" },
          { icon: "💳", label: "Interchange Growth", sub: "0.3% × סליקה נוספת", color: "#5BA4CF" },
          { icon: "🏦", label: "Float Interest", sub: "4% על יתרת ארנק", color: "#34D399" },
          { icon: "📱", label: "כרטיסים חדשים", sub: "LTV 65 ₪/חודש/כרטיס", color: "#A78BFA" },
        ].map((e, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/8 bg-white/3 px-3 py-3 flex items-center gap-3"
          >
            <span className="text-xl">{e.icon}</span>
            <div>
              <p className="text-[10px] font-bold" style={{ color: e.color }}>{e.label}</p>
              <p className="text-[9px] text-white/35">{e.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Year cards */}
      <div className="mt-5 grid grid-cols-3 gap-4 flex-1">
        {YEARS.map((y, i) => (
          <YearCard
            key={i}
            data={y}
            index={i}
            isActive={activeYear === i}
            onClick={() => setActiveYear(i)}
          />
        ))}
      </div>

      {/* Bottom summary bar */}
      <div
        className="mt-4 rounded-2xl border border-[#34D399]/25 bg-[#34D399]/5 px-6 py-4 shrink-0"
      >
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">ריטיינר שנה 1 → שנה 3</p>
            <p className="text-lg font-black text-red-400">4.2M → 1.8M ₪</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">הכנסה חדשה שנה 1</p>
            <p className="text-lg font-black text-[#D4AF37]">66M ₪</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">הכנסה חדשה שנה 3</p>
            <p className="text-lg font-black text-[#34D399]">241M ₪</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">Break-Even</p>
            <p className="text-lg font-black text-[#F59E0B]">חודש 6</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">ROI שנה 3 (על ריטיינר)</p>
            <p className="text-lg font-black text-white">133×</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span className="text-[9px] text-white/20">* הנחות שמרניות · 0.3% Interchange · GMV נלכד 20%→60%</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

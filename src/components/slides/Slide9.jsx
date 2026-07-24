import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── BASE DATA ────────────────────────────────────────────────────────────────
// Source: PayBox CFO meeting + Discovery Report
// 2M transactions/year × 2% Year1 → 10% Year3 → 20%+ Year5 conversion
// BoomBuy margin NOT disclosed. PayBox sees 2-3% of GMV only.

const PHASES = [
  {
    phase: "שנה 1",
    label: "עלייה לאוויר",
    color: "#F59E0B",
    note: "2% מ-2M טרנזקציות → 40K קבוצות",
    gmv: 45,
    retainer: -4.2,
    commerce: 1.1,    // 2.5% of 45M GMV
    interchange: 36,
    float: 6,
    newCards: 12,
    get total() { return this.commerce + this.interchange + this.float + this.newCards + this.retainer; },
  },
  {
    phase: "שנה 2",
    label: "שוברים שיא",
    color: "#34D399",
    note: "5% מ-2M טרנזקציות → 100K קבוצות",
    gmv: 112,
    retainer: -3.0,
    commerce: 2.8,    // 2.5% of 112M
    interchange: 63,
    float: 10,
    newCards: 18,
    get total() { return this.commerce + this.interchange + this.float + this.newCards + this.retainer; },
  },
  {
    phase: "שנה 3",
    label: "מנוע מלא",
    color: "#5BA4CF",
    note: "10% מ-2M → 200K קבוצות + פיתוח עסקי",
    gmv: 226,
    retainer: -1.8,
    commerce: 5.7,    // 2.5% of 226M
    interchange: 90,
    float: 15,
    newCards: 20,
    get total() { return this.commerce + this.interchange + this.float + this.newCards + this.retainer; },
  },
  {
    phase: "שנה 5",
    label: "מועדון מוביל",
    color: "#A78BFA",
    note: "20%+ המרה + גידול ביז. דב. → 1B GMV",
    gmv: 515,
    retainer: 0,
    commerce: 12.9,   // 2.5% of 515M
    interchange: 144,
    float: 22,
    newCards: 30,
    get total() { return this.commerce + this.interchange + this.float + this.newCards + this.retainer; },
  },
];

const SCRIPT = `"בואו נדבר מספרים — שמרניים לחלוטין, בנויים מהנתונים שסיפרתם לנו.

יש לכם 2 מיליון טרנזקציות בשנה. שנה 1 — אנחנו מניחים ש-2 אחוז מהן יממשו דרך The Box. זה 40 אלף קבוצות. לא הרבה.

400 מיליון שח בשוק המתנות שלכם — אנחנו לוקחים 45 מיליון שנה 1. שמרני.

אבל זה לא הסיפור הגדול. הסיפור הגדול הוא האינטרצ'יינג.
כשאנחנו הופכים את PayBox לכרטיס הראשי — מ-1 מיליארד לחודש ל-5 מיליארד לחודש בסליקה — 4 מיליארד כפול 0.3% זה 12 מיליון שח לחודש לפייבוקס. 144 מיליון שח לשנה.

שנה 1 לפני הריטיינר: 55 מיליון שח חדש. שנה 3: 131 מיליון. שנה 5: 209 מיליון.

הריטיינר של 350K בחודש? מתאפס לחלוטין שנה 3. שנה 5 אנחנו כבר עובדים בלעדיו."`;

export default function Slide9() {
  const [active, setActive] = useState(null);

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#34D399] tracking-[0.15em]">תחזית רווחיות</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
          מ-2M טרנזקציות — 4 מנועי הכנסה חדשים
        </h1>
        <p className="mt-2 text-white/40 text-sm">2% המרה שנה 1 → 20%+ שנה 5 · מבוסס נתוני CFO</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 mt-6">

        {/* GMV context strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "שוק מתנות זמין", val: "400M ₪", sub: "CFO אמר — כולו ממתין", color: "#D4AF37" },
            { label: "שוק על האש", val: "~1B ₪", sub: "25% × 2M × 2,100 ₪", color: "#F97316" },
            { label: "פוקר/בידור", val: "~100M ₪", sub: "10% × 2M × 500 ₪", color: "#A78BFA" },
            { label: "שוק כולל", val: "~2.26B ₪", sub: "סך מחזור קבוצות PayBox", color: "#5BA4CF" },
          ].map((c, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-center">
              <p className="text-xl font-black" style={{ color: c.color }}>{c.val}</p>
              <p className="text-[10px] font-bold text-white/60 mt-0.5">{c.label}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

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
                <span className="text-[10px] font-black tracking-wider rounded-full px-2 py-0.5"
                  style={{ background: `${p.color}25`, color: p.color }}>{p.label}</span>
                <span className="text-gray-500 text-[10px]">{p.phase}</span>
              </div>

              {/* Net total */}
              <p className="text-3xl md:text-4xl font-black text-[#34D399]">
                +{p.total.toFixed(1)}M
              </p>
              <p className="text-xs text-gray-400 mt-0.5">₪ נטו חדש לפייבוקס</p>
              <p className="text-[10px] text-gray-600 mt-2 italic leading-snug">{p.note}</p>
              <p className="text-[10px] text-[#D4AF37]/70 mt-1 font-bold">GMV The Box: {p.gmv}M ₪</p>

              {active === i && (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#EF4444]">{p.retainer}M ₪</span>
                    <span className="text-gray-400">ריטיינר</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#D4AF37]">+{p.commerce.toFixed(1)}M ₪</span>
                    <span className="text-gray-400">עמלת Commerce</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#60A5FA]">+{p.interchange}M ₪</span>
                    <span className="text-gray-400">Interchange</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#34D399]">+{p.float}M ₪</span>
                    <span className="text-gray-400">Float Interest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A78BFA]">+{p.newCards}M ₪</span>
                    <span className="text-gray-400">כרטיסים חדשים</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interchange highlight */}
        <div className="rounded-2xl bg-gradient-to-r from-[#5BA4CF]/12 to-[#34D399]/12 border border-[#5BA4CF]/25 px-6 py-4">
          <p className="text-[10px] text-white/35 font-bold tracking-widest mb-2">💳 מנוע מס׳ 2 — הגדול ביותר</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-white/40 text-xs">סליקה נוכחית</p>
              <p className="text-2xl font-black text-white/60">1B ₪/חודש</p>
            </div>
            <div className="text-2xl text-[#D4AF37]">→</div>
            <div className="text-center">
              <p className="text-white/40 text-xs">יעד שנה 5</p>
              <p className="text-2xl font-black text-[#34D399]">5B ₪/חודש</p>
            </div>
            <div className="text-2xl text-[#D4AF37]">→</div>
            <div className="text-center">
              <p className="text-white/40 text-xs">4B × 0.3% × 12</p>
              <p className="text-2xl font-black text-[#D4AF37]">144M ₪/שנה</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-white/30 max-w-xs leading-relaxed">Interchange טהור — ככל שהמחזור גדל, ההכנסה גדלה. ZUZ הוא מה שמגדיל את FIW מ-10% ל-50%+</p>
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-gray-400 text-xs font-bold tracking-widest mb-3 text-right">הנחות יסוד — שמרניות</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: "2%", label: "המרה שנה 1", sub: "מ-2M טרנזקציות" },
              { val: "2-3%", label: "עמלת Commerce", sub: "מהGMV — ברור ופשוט" },
              { val: "0.3%", label: "Interchange", sub: "על כל שקל סליקה" },
              { val: "חודש 12", label: "Break-Even", sub: "ריטיינר מתאפס שנה 3" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-white font-black text-xl">{item.val}</p>
                <p className="text-gray-300 text-xs font-bold mt-1">{item.label}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-600 text-[10px]">
          * לחצו על כל שנה לפירוט · עמלת Commerce = מה שפייבוקס רואה · מחושב לפי 2M טרנזקציות × שיעור המרה
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>09 / 15</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

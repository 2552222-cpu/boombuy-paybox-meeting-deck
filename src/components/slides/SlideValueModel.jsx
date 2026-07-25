import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── PAYBOX VALUE MODEL — 2 VIEWS ─────────────────────────────────────────────
// Slide A: Revenue sources TODAY (confirmed + assumptions marked)
// Slide B: 3 scenarios — Conservative / Reasonable / Above Expected
// Source: Discount Bank annual reports 2024, Calcalist, BizPortal, Ynet Capital
// Updated post-Discovery 23/07/2026: 100K Young cards @200₪, Interchange = tiered model, Float = assumption

const SCRIPT_A = `"לפני שנדבר על מה אנחנו מביאים לכם — בואו נבין יחד מה יש לכם היום.

פייבוקס מרוויחה היום כ-55 מיליון שקל לשנה לקבוצת דיסקונט.

~20 מיליון מהאינטרצ'יינג — 560 מיליון שקל סליקה חודשית, מודל מדורג (לא 0.3% תקני). 
19 מיליון נוספים מה-float — 938 מיליון שקל שיושבים בחשבונות. הריבית של בנק ישראל מינוס מה שאתם משלמים ללקוחות — הפרש של 2% הולך לדיסקונט.

אבל יש הפסד של 63.7 מיליון שקל בשנה — כי עלויות התפעול עדיין גבוהות.

עכשיו — מה The Box עושה לכל השורות האלו? לחצו על שלב 2."`;

const SCRIPT_B = `"שלושה תרחישים. כולם שמרניים.

אפילו בתרחיש השמרני — פלוס 14 מיליון שקל לשנה. ההפסד יורד מ-63 מיליון ל-49.

בתרחיש הסביר — פלוס 34 מיליון. ההפסד מוחצה לחצי. 29 מיליון.

בתרחיש המעל מצופה — פלוס 68 מיליון. הולכים לאיזון.

ועמלת Commerce? בתרחיש הסביר היא 1.6 מיליון מתוך 34 מיליון — 5 אחוז. 
הכסף הגדול הוא האינטרצ'יינג, ה-float, הכרטיסים החדשים — אלה שלכם ממילא, פשוט גדלים.

הריטנר שלנו? 12% מהרווח הסביר. ומחזיר את עצמו ב-400 מיליון GMV."`;

const ASSUMPTIONS = [
  { text: "300K CC רגיל × 1,800 ₪ + 100K יאנג × 200 ₪ = 560M ₪/חודש ✓", verified: true },
  { text: "Interchange: מודל מדורג (לא 0.3% תקני) — לא אומת*", verified: false },
  { text: "יתרת לקוחות פייבוקס: 938M ₪ (גדל 25.6% ב-2024) ✓", verified: true },
  { text: "הפסד פייבוקס 2024: 63.7M ₪ (ירד מ-77M ב-2023) ✓", verified: true },
  { text: "FIW נוכחי: ~10% (כרטיס משני בלבד) — אמרו ✓", verified: true },
  { text: "Float: 938M × 2% — אין נתון זמן שהייה בארנק. הנחה*", verified: false },
  { text: "משיכה לחשבון בנק: 100% — אמרו. מחליש הנחת Float*", verified: false },
  { text: "עלויות תפעול: ~120M ₪ (backwards מהפסד)*", verified: false },
];

export default function SlideValueModel() {
  const [view, setView] = useState("today");
  const [showAssumptions, setShowAssumptions] = useState(false);

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-14 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #D4AF37, #F5D883, #D4AF37)" }} />

      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.15em]">ניתוח ערך</span>
        <div className="w-0.5 h-12 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-3 mb-1" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
          {view === "today" ? "מאיפה הכסף בא היום — ואיפה הוא הולך" : "מה The Box משנה — 3 תרחישים"}
        </h1>
      </div>

      {/* Tab toggle + assumptions toggle */}
      <div className="flex gap-3 justify-between mt-5 shrink-0 flex-wrap">
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
          style={{
            background: showAssumptions ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
            color: showAssumptions ? "#D4AF37" : "rgba(255,255,255,0.4)",
            border: `1px solid ${showAssumptions ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          📋 הנחות יסוד {showAssumptions ? "▲" : "▼"}
        </button>
        <div className="flex gap-3">
          {[
            { id: "today", label: "שלב 1 — היום" },
            { id: "scenarios", label: "שלב 2 — עם The Box" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: view === t.id ? "#D4AF37" : "rgba(255,255,255,0.06)",
                color: view === t.id ? "#0B1930" : "rgba(255,255,255,0.5)",
                border: `1px solid ${view === t.id ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Assumptions panel */}
      {showAssumptions && (
        <div className="mt-3 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/6 px-5 py-4 shrink-0">
          <p className="text-[10px] font-bold text-[#D4AF37]/60 tracking-widest mb-3">הנחות יסוד — ✓ מאומת · * הנחת BoomBuy בלבד</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
            {ASSUMPTIONS.map((a, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className={`text-xs font-black mt-0.5 shrink-0 ${a.verified ? "text-[#4ade80]" : "text-[#D4AF37]"}`}>
                  {a.verified ? "✓" : "*"}
                </span>
                <span className="text-xs text-white/50 leading-snug">{a.text}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/20 mt-3">מקורות: דוחות דיסקונט 2024 · כלכליסט · BizPortal · Ynet Capital</p>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center gap-4 mt-4">

        {/* ── TODAY VIEW ── */}
        {view === "today" && (
          <div className="grid grid-cols-2 gap-5">

            {/* Revenue side */}
            <div>
              <p className="text-[10px] text-white/35 font-bold tracking-widest mb-3">הכנסות קבוצת דיסקונט מפייבוקס</p>

              {[
                { icon: "💳", label: "Interchange — מודל מדורג*", val: "~19M ₪", note: "560M ₪/חודש × מדורג × 12 · לא אומת*", verified: false, pct: 35, color: "#1D9E75" },
                { icon: "🏦", label: "Float → דיסקונט*", val: "~19M ₪", note: "938M × פער 2% · 100% משיכה · זמן לא ידוע*", verified: false, pct: 35, color: "#0F6E56" },
                { icon: "💸", label: "עמלות העברה (2025)*", val: "~9M ₪", note: "450K משתמשים × ~20 ₪/שנה*", verified: false, pct: 16, color: "#BA7517" },
                { icon: "📦", label: "Plus / עסקים / אחר*", val: "~8M ₪", note: "הנחה — לא נבדק*", verified: false, pct: 14, color: "#854F0B" },
              ].map((row, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm text-white/80 text-right" dir="rtl">{row.icon} {row.label}</span>
                    <span className={`text-sm font-black ${row.verified ? "text-[#4ade80]" : "text-[#D4AF37]"}`}>{row.val}</span>
                  </div>
                  <div className="rounded h-5 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full flex items-center px-2 rounded" style={{ width: `${row.pct}%`, background: row.color }}>
                      <span className="text-[9px] font-bold text-white/80 whitespace-nowrap">{row.verified ? "✓ מאומת" : "* הנחה"}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/25 mt-1">{row.note}</p>
                </div>
              ))}

              <div className="rounded-xl p-3 mt-2 flex justify-between items-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <span className="text-xs text-white/40">סה"כ הכנסות</span>
                <span className="text-xl font-black text-[#4ade80]">~55M ₪</span>
              </div>
            </div>

            {/* Cost/Loss side */}
            <div>
              <p className="text-[10px] text-white/35 font-bold tracking-widest mb-3">עלויות ותוצאות</p>

              <div className="rounded-xl p-4 mb-3 border border-red-500/20" style={{ background: "rgba(239,68,68,0.07)" }}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/50">עלויות תפעול*</span>
                  <span className="text-base font-black text-red-400">~120M ₪</span>
                </div>
                <p className="text-[10px] text-white/25 leading-relaxed">
                  טכנולוגיה · עובדים · שיווק<br />
                  ריבית ללקוחות על 938M יתרה (~23M ₪)
                </p>
              </div>

              <div className="rounded-xl p-5 border border-[#D4AF37]/30 text-center" style={{ background: "rgba(212,175,55,0.07)" }}>
                <p className="text-[10px] text-[#D4AF37]/50 mb-1">הפסד נטו פייבוקס — מאומת בדוחות 2024 ✓</p>
                <p className="text-4xl font-black text-red-400">-63.7M ₪</p>
                <p className="text-[10px] text-white/25 mt-2">ירד מ-77M ב-2023 · מגמת שיפור עקבית</p>
              </div>

              <div className="rounded-xl p-3 mt-3 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[10px] text-white/30 leading-relaxed">
                  💡 פייבוקס מפסידה <em>בכוונה</em> — דיסקונט מממן צמיחה.<br />
                  ה-float (19M ₪) עובר לדיסקונט מחוץ ל-P&amp;L.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── SCENARIOS VIEW ── */}
        {view === "scenarios" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "שמרני", sub: "FIW +5%", color: "#639922", border: "rgba(99,153,34,.3)", bg: "rgba(99,153,34,.07)",
                  rows: [
                    { k: "Interchange", v: "+8M" }, { k: "Float", v: "+5M" },
                    { k: "כרטיסים חדשים", v: "+5M" }, { k: "Commerce 0.75%", v: "+0.5M" },
                    { k: "ריטנר", v: "-4.2M", neg: true },
                  ],
                  net: "+14.3M", loss: "הפסד: -63M → -49M"
                },
                {
                  label: "סביר", sub: "FIW +12%", color: "#2a78d6", border: "rgba(56,135,229,.5)", bg: "rgba(56,135,229,.08)", featured: true,
                  rows: [
                    { k: "Interchange", v: "+15M" }, { k: "Float", v: "+10M" },
                    { k: "כרטיסים חדשים", v: "+12M" }, { k: "Commerce 0.75%", v: "+1.6M" },
                    { k: "ריטנר", v: "-4.2M", neg: true },
                  ],
                  net: "+34.4M", loss: "הפסד: -63M → -29M"
                },
                {
                  label: "מעל מצופה", sub: "FIW +20%", color: "#D4AF37", border: "rgba(212,175,55,.3)", bg: "rgba(212,175,55,.07)",
                  rows: [
                    { k: "Interchange", v: "+25M" }, { k: "Float", v: "+18M" },
                    { k: "כרטיסים חדשים", v: "+25M" }, { k: "Commerce 0.75%", v: "+4.6M" },
                    { k: "ריטנר", v: "-4.2M", neg: true },
                  ],
                  net: "+68.4M", loss: "מוחק את כל ההפסד · Break-Even!"
                },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-4 relative"
                  style={{ background: s.bg, border: `${s.featured ? "2px" : "1px"} solid ${s.border}` }}>
                  {s.featured && (
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 text-[10px] font-black text-white px-3 py-0.5 rounded-b-md"
                      style={{ background: s.color }}>סביר</div>
                  )}
                  <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: s.color, marginTop: s.featured ? "10px" : "0" }}>{s.label} · {s.sub}</p>

                  <div className="flex flex-col gap-2 mb-4">
                    {s.rows.map((r, j) => (
                      <div key={j} className="flex justify-between">
                        <span className="text-xs text-white/50">{r.k}</span>
                        <span className={`text-xs font-black ${r.neg ? "text-red-400" : ""}`} style={!r.neg ? { color: s.color } : {}}>{r.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-white/35">נטו נוסף/שנה</span>
                      <span className="text-2xl font-black" style={{ color: s.color }}>{s.net}</span>
                    </div>
                    <p className="text-[10px] text-white/25 mt-1">{s.loss}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key message strip */}
            <div className="rounded-xl p-4 border border-white/8 flex gap-5 items-center flex-wrap" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-center">
                <p className="text-[10px] text-white/30">Commerce % מסך הרווח</p>
                <p className="text-2xl font-black text-[#D4AF37]">3–7%</p>
              </div>
              <div className="flex-1 text-sm text-white/45 leading-relaxed border-r border-white/10 pr-5">
                <strong className="text-white/70">המסר:</strong> עמלת Commerce היא הכי קטנה בטבלה — 3 עד 7% מהרווח הכולל.
                הכסף הגדול בא מ-Interchange, Float וכרטיסים — דברים שכבר שלכם, פשוט גדלים.
              </div>
              <div className="text-center">
                <p className="text-[10px] text-white/30">ריטנר % מהרווח הסביר</p>
                <p className="text-2xl font-black text-red-400">12%</p>
                <p className="text-[10px] text-white/20">חוזר ב-400M GMV</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span className="text-[10px] text-white/20">✓ מאומת · * הנחת BoomBuy · מקורות: דוחות דיסקונט 2024, כלכליסט, BizPortal</span>
      </div>

      <SpeakerNotes notes={view === "today" ? SCRIPT_A : SCRIPT_B} />
    </div>
  );
}

import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── SIMPLE VALUE TABLE ───────────────────────────────────────────────────────
// Based on PayBox CFO meeting data
// Baseline: 400K cards × 1,800 ₪/month ≈ 1B ₪/month credit volume
// Commission: 1% on first 400M GMV → returns retainer. Above 400M → discuss together.

const RETAINER_BREAKDOWN = [
  { icon: "👥", label: "5 אנשי מקצוע בכירים", sub: "סחר, שירות, תפעול, טכנולוגיה, ניהול", val: 200000 },
  { icon: "⚙️", label: "טכנולוגיה ופלטפורמה", sub: "ZUZ Engine, API, אינטגרציות PayBox", val: 60000 },
  { icon: "📦", label: "לוגיסטיקה וספקים", sub: "ניהול מלאי, אספקה ל-4M לקוחות", val: 50000 },
  { icon: "🎧", label: "מוקד שירות לקוחות", sub: "תמיכה רציפה לרוכשי The Box", val: 25000 },
  { icon: "🏢", label: "תפעול שוטף", sub: "ניהול מועדון, שיווק, בקרה", val: 15000 },
];

const VALUE_TABLE = [
  {
    col: "היום",
    sub: "בלי The Box",
    color: "rgba(255,255,255,0.3)",
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)",
    items: [
      { label: "מחזור סליקה חודשי", val: "~1B ₪", note: "400K × 1,800 ₪ ≈ 1B" },
      { label: "Interchange שנתי", val: "36M ₪", note: "1B × 0.3% × 12" },
      { label: "Float Interest", val: "~8M ₪", note: "כסף יושב בחשבונות" },
      { label: "כרטיסים חדשים", val: "—", note: "" },
      { label: "עמלת Commerce", val: "—", note: "" },
      { label: "ריטנר", val: "—", note: "" },
      { label: "נטו שנתי לפייבוקס", val: "~44M ₪", note: "Interchange + Float", bold: true, accent: "rgba(255,255,255,0.5)" },
    ]
  },
  {
    col: "שנה 1",
    sub: "The Box מתחיל",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.06)",
    border: "rgba(212,175,55,0.25)",
    items: [
      { label: "מחזור סליקה חודשי", val: "~1.3B ₪", note: "+30% עם ZUZ" },
      { label: "Interchange שנתי", val: "47M ₪", note: "1.3B × 0.3% × 12" },
      { label: "Float Interest", val: "~10M ₪", note: "יותר כסף בחשבונות" },
      { label: "כרטיסים חדשים", val: "+12M ₪", note: "FIW גדל" },
      { label: "עמלת Commerce", val: "+4M ₪", note: "1% × 400M GMV" },
      { label: "ריטנר (הוצאה)", val: "-4.2M ₪", note: "350K/חודש" },
      { label: "נטו שנתי לפייבוקס", val: "+69M ₪", note: "+25M מעל היום", bold: true, accent: "#D4AF37" },
    ]
  },
  {
    col: "שנה 3",
    sub: "מנוע בשל",
    color: "#34D399",
    bg: "rgba(52,211,153,0.06)",
    border: "rgba(52,211,153,0.25)",
    items: [
      { label: "מחזור סליקה חודשי", val: "~2.5B ₪", note: "FIW עולה ל-30%+" },
      { label: "Interchange שנתי", val: "90M ₪", note: "2.5B × 0.3% × 12" },
      { label: "Float Interest", val: "~18M ₪", note: "מחזור גדל משמעותית" },
      { label: "כרטיסים חדשים", val: "+25M ₪", note: "שוק לא מנוצל נכנס" },
      { label: "עמלת Commerce", val: "+6M ₪+", note: "1% + % על מעל 400M" },
      { label: "ריטנר (הוצאה)", val: "-1.8M ₪", note: "מוזל שנה 3" },
      { label: "נטו שנתי לפייבוקס", val: "+138M ₪", note: "+94M מעל היום", bold: true, accent: "#34D399" },
    ]
  },
];

const SCRIPT = `"הריטנר שלנו הוא 350 אלף שקל לחודש. בואו נדבר על מה אתם קונים.

אתם קונים 5 אנשים בכירים ברמה הכי גבוהה שיודעים לנהל סחר ושירות ל-4 מיליון צרכנים. רק כוח אדם — 200 אלף שקל. ועוד טכנולוגיה, לוגיסטיקה, שירות לקוחות.

זה לא ריטנר — זו שותפות.

ועכשיו תגיד לי — אם המועדון יגיע ל-400 מיליון שח מכירות, ואנחנו נותנים לכם 1% — זה 4 מיליון שח. הריטנר חוזר אליכם. כל שקל מעל 400 מיליון — נבנה ביחד את מה שמגיע לכם.

ואת זה עוד לפני שדיברנו על האינטרצ'יינג. ראו מה קורה לאינטרצ'יינג שלכם כשאנחנו הופכים את PayBox לכרטיס הראשי. מ-36 מיליון שנה ל-90 מיליון שנה. זה כסף שהוא שלכם — בלי קשר לעמלה שנסכים עליה."`;

export default function Slide9() {
  const [view, setView] = useState("table"); // "retainer" | "table"

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-14 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.15em]">ערך השותפות</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
          ריטנר = שותפות · 1% מ-400M מחזיר אתכם לאפס
        </h1>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-3 justify-end mt-5 shrink-0">
        {[
          { id: "retainer", label: "📋 מה כולל הריטנר" },
          { id: "table", label: "📊 טבלת ערך" },
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

      <div className="flex-1 flex flex-col justify-center gap-5 mt-5">

        {/* ── RETAINER VIEW ── */}
        {view === "retainer" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {RETAINER_BREAKDOWN.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-black text-white text-sm leading-tight">{item.label}</p>
                  <p className="text-[10px] text-white/35 mt-1 leading-relaxed">{item.sub}</p>
                  <p className="text-lg font-black text-[#D4AF37] mt-3">{item.val.toLocaleString()} ₪</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="rounded-2xl p-5 border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex items-center justify-between">
              <div className="text-right">
                <p className="text-[10px] text-[#D4AF37]/60 font-bold tracking-widest">סה"כ ריטנר</p>
                <p className="text-4xl font-black text-[#D4AF37]">350,000 ₪/חודש</p>
                <p className="text-white/35 text-xs mt-1">= 4.2M ₪ לשנה</p>
              </div>
              <div className="text-center max-w-xs">
                <p className="text-white/60 text-sm leading-relaxed">
                  זה לא עוד ספק — זו שותפות אמיתית.<br/>
                  כשהמחזור יגיע ל-<strong className="text-[#D4AF37]">400M ₪</strong>,<br/>
                  עמלה של <strong className="text-[#D4AF37]">1%</strong> = <strong className="text-[#34D399]">4M ₪</strong>.<br/>
                  הריטנר חזר. כל שקל מעל — שלכם.
                </p>
              </div>
            </div>

            {/* Commission teaser */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { gmv: "100M ₪", comm: "1M ₪", note: "שנה 1 (Q2-Q3)", color: "#F59E0B" },
                { gmv: "400M ₪", comm: "4M ₪", note: "Break-Even מלא", color: "#D4AF37" },
                { gmv: "500M ₪+", comm: "4M ₪ + X%", note: "נבנה ביחד", color: "#34D399" },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-white/8 bg-white/3 py-4">
                  <p className="text-xs text-white/40 font-bold">GMV The Box</p>
                  <p className="text-xl font-black mt-1" style={{ color: c.color }}>{c.gmv}</p>
                  <p className="text-sm text-white/70 mt-1 font-bold">עמלה: {c.comm}</p>
                  <p className="text-[10px] text-white/30 mt-1">{c.note}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── VALUE TABLE VIEW ── */}
        {view === "table" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              {VALUE_TABLE.map((col, ci) => (
                <div key={ci}
                  className="rounded-2xl border p-5 flex flex-col"
                  style={{ background: col.bg, borderColor: col.border }}
                >
                  {/* Col header */}
                  <div className="text-center mb-4 pb-3 border-b border-white/10">
                    <p className="text-xl font-black" style={{ color: col.color }}>{col.col}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{col.sub}</p>
                  </div>
                  {/* Rows */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {col.items.map((item, i) => (
                      <div key={i} className={`flex justify-between items-start gap-2 ${item.bold ? 'pt-2.5 border-t border-white/10 mt-1' : ''}`}>
                        <span className={`text-xs ${item.bold ? 'font-black' : 'font-medium'} text-white/50 text-right leading-tight`}>
                          {item.label}
                          {item.note && <span className="block text-[9px] text-white/25 font-normal">{item.note}</span>}
                        </span>
                        <span
                          className={`text-sm font-black whitespace-nowrap ${item.bold ? 'text-base' : ''}`}
                          style={{ color: item.accent || col.color }}
                        >
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key insight */}
            <div className="rounded-2xl p-4 border border-[#60A5FA]/20 bg-[#60A5FA]/5 flex items-center gap-6 flex-wrap justify-end">
              <p className="text-[10px] text-white/30 max-w-xs text-right leading-relaxed">
                ה-Interchange גדל ישירות עם FIW. ZUZ הופך את PayBox לכרטיס הראשי. לא תלוי בעמלת Commerce שלנו.
              </p>
              <div className="text-center">
                <p className="text-[10px] text-white/35">Interchange היום</p>
                <p className="text-2xl font-black text-white/50">36M ₪/שנה</p>
              </div>
              <div className="text-2xl text-[#D4AF37]">→</div>
              <div className="text-center">
                <p className="text-[10px] text-white/35">Interchange שנה 3</p>
                <p className="text-2xl font-black text-[#60A5FA]">90M ₪/שנה</p>
              </div>
              <div className="text-2xl text-[#D4AF37]">→</div>
              <div className="text-center">
                <p className="text-[10px] text-white/35">Interchange שנה 5</p>
                <p className="text-2xl font-black text-[#34D399]">180M ₪/שנה</p>
              </div>
            </div>

            <p className="text-center text-white/20 text-[10px]">
              בסיס: 400K כרטיסים × 1,800 ₪/חודש ≈ 1B ₪ מחזור · Interchange 0.3% · FIW עולה עם ZUZ
            </p>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>09 / 15</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

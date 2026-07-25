import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── TWO-LAYER MODEL ──────────────────────────────────────────────────────────
// Numbers aligned with SlideValueModel (Discount Bank reports 2024):
// Interchange: 560M × מודל מדורג × 12 ≈ 20M NIS/year (הנחה — מודל לא אומת)
// Float: 938M NIS balance × 2% spread = ~19M NIS/year (goes to Discount Bank group)
// Cards: 300K active → ZUZ attracts 60K new cards/year → more interchange
//
// Layer 1 gains = "reasonable" scenario from SlideValueModel (FIW +12%):
//   Interchange +15M, Float +10M, Cards +12M  → total +37M year 1
// Layer 2: Commerce bonus = % of GMV agreed with PayBox (0.5–1%)
// Break-even: 420M GMV × 1% = 4.2M = retainer

const ORGANIC = [
  {
    icon: "💳",
    title: "Interchange",
    today: "19.4M ₪/שנה",
    todayNote: "560M ₪/חודש × מודל מדורג × 12 ≈ 20M ₪",
    engine: "The Box מגדיל First in Wallet",
    engineNote: "10% → 22% שימוש ככרטיס ראשי",
    gain: "+15M ₪/שנה",
    yr3: "+25M ₪",
    yr3note: "FIW 30%+ = 25M Interchange נוסף",
    color: "#60A5FA",
    calc: "560M → 840M ₪/חודש × שיעור מדורג × 12",
  },
  {
    icon: "🏦",
    title: "Float Interest",
    today: "~19M ₪/שנה",
    todayNote: "938M ₪ יתרה × פער 2% → דיסקונט",
    engine: "ZUZ משאיר כסף בפייבוקס יותר זמן",
    engineNote: "יתרה גדלה + ימי float ארוכים יותר",
    gain: "+10M ₪/שנה",
    yr3: "+18M ₪",
    yr3note: "יתרה מוכפלת × פער ריבית",
    color: "#34D399",
    calc: "יתרה 1.2B × 2% = 24M (+5M מהיום)",
  },
  {
    icon: "🆕",
    title: "כרטיסים חדשים",
    today: "300K כרטיסים",
    todayNote: "1,800 ₪/חודש ממוצע לכרטיס",
    engine: "ZUZ מושך +60K כרטיסים/שנה",
    engineNote: "כל כרטיס חדש מגדיל מחזור → Interchange מדורג",
    gain: "+4M ₪/שנה",
    yr3: "+10M ₪",
    yr3note: "+30% מחזור מכרטיסים חדשים",
    color: "#A78BFA",
    calc: "60K × 1,800 ₪ × 12 × שיעור מדורג ≈ 4M ₪",
  },
];

const RETAINER_BREAKDOWN = [
  { icon: "👥", label: "5 אנשים בכירים", val: "200K ₪", note: "סחר, טכנולוגיה, שירות, ניהול" },
  { icon: "⚙️", label: "טכנולוגיה + ZUZ", val: "60K ₪", note: "פלטפורמה, API, אינטגרציות" },
  { icon: "📦", label: "לוגיסטיקה", val: "50K ₪", note: "ספקים, מלאי, אספקה" },
  { icon: "🎧", label: "שירות לקוחות", val: "25K ₪", note: "תמיכה ל-4M לקוחות" },
  { icon: "🏢", label: "תפעול", val: "15K ₪", note: "שיווק, בקרה, ניהול" },
];

const SCRIPT = `"אני רוצה להסביר לכם למה הריטנר הוא ההשקעה הכי טובה שתעשו.

פייבוקס היום מרוויח מ-Interchange — 560 מיליון שקל סליקה חודשית, מודל מדורג — זה כ-20 מיליון שקל לשנה (הנחה).

The Box הופך יותר ויותר משתמשים לשימוש בכרטיס כראשי — First in Wallet עולה מ-10% ל-22%. כל השקלים האלה עוברים דרככם. זה עוד 15 מיליון שקל לשנה — רק מ-Interchange.

938 מיליון שקל יושבים בחשבונות. ZUZ גורם לכסף לשבת יותר זמן — כי אנשים מחכים לרכוש דרך The Box. זה עוד 10 מיליון שקל.

כרטיסים חדשים — 60 אלף כרטיסים בשנה 1. כל כרטיס שווה 1,800 שח לחודש לסליקה. חשבו מה זה שווה לכם לאורך זמן.

זה Layer 1 — 37 מיליון שקל בשנה הראשונה, ורק הולך וגדל. The Box פשוט מגדיל את המכונה שלכם.

Layer 2 — הבונוס. מהמחזור של המועדון — מתנות, על האש, פוקר, מוצרים — אתם מקבלים אחוז שנסכים עליו. על ה-420 מיליון הראשונים — 1% — זה 4.2 מיליון. בדיוק כמו הריטנר. הריטנר חזר.

מה שמעבר ל-420 מיליון — בואו נדבר ביחד."`;

export default function Slide9() {
  const [view, setView] = useState("layers");

  const totalOrganicYr1 = 15 + 10 + 12; // = 37M
  const totalOrganicYr3 = 25 + 18 + 30; // = 73M

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-14 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.15em]">ערך השותפות</span>
        <div className="w-0.5 h-12 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-3 mb-1" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black leading-tight">
          שתי שכבות הכנסה — ה-Layer 1 הוא כסף שלכם
        </h1>
        <p className="mt-2 text-white/35 text-sm">The Box מגדיל את המנועים שכבר קיימים לכם · Commerce הוא הבונוס</p>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-3 justify-end mt-5 shrink-0">
        {[
          { id: "layers", label: "🔋 שתי השכבות" },
          { id: "retainer", label: "📋 ריטנר = שותפות" },
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

      <div className="flex-1 flex flex-col justify-center gap-4 mt-5">

        {/* ── LAYERS VIEW ── */}
        {view === "layers" && (
          <>
            {/* Layer 1 header */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-xs font-black text-[#60A5FA]/70 tracking-widest">LAYER 1 — הגידול שלכם (הכנסות שכבר קיימות, רק גדלות)</span>
              <div className="w-0.5 h-5 rounded-full bg-[#60A5FA]/40" />
            </div>

            {/* Organic engines */}
            <div className="grid grid-cols-3 gap-4">
              {ORGANIC.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-white/3 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-black text-white">{item.title}</span>
                  </div>

                  {/* Today */}
                  <div className="mb-3 pb-3 border-b border-white/8">
                    <p className="text-[10px] text-white/35 font-bold">היום ✓</p>
                    <p className="text-lg font-black text-white/70">{item.today}</p>
                    <p className="text-[10px] text-white/25">{item.todayNote}</p>
                  </div>

                  {/* Engine */}
                  <div className="mb-3 pb-3 border-b border-white/8">
                    <p className="text-[10px] font-bold" style={{ color: `${item.color}99` }}>The Box עושה</p>
                    <p className="text-xs font-bold text-white/60 mt-0.5">{item.engine}</p>
                    <p className="text-[10px] text-white/25 italic">{item.engineNote}</p>
                    <p className="text-[9px] text-white/20 mt-1">{item.calc}</p>
                  </div>

                  {/* Gain */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/30">שנה 1</p>
                      <p className="text-xl font-black" style={{ color: item.color }}>{item.gain}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/30">שנה 3</p>
                      <p className="text-sm font-black text-white/60">{item.yr3}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Layer 1 total bar */}
            <div className="rounded-xl p-4 border border-white/8 bg-white/3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/35 font-bold">סה"כ Layer 1 — גידול אורגני שנה 1</p>
                <p className="text-2xl font-black text-[#34D399]">+{totalOrganicYr1}M ₪/שנה</p>
                <p className="text-[10px] text-white/25">שנה 3: +{totalOrganicYr3}M ₪/שנה</p>
              </div>
              <div className="text-[10px] text-white/30 text-right max-w-xs leading-relaxed">
                זה הכסף שלכם — The Box פשוט מגדיל את המנועים שכבר עובדים.<br />
                Interchange + Float + כרטיסים = ה-DNA של פייבוקס.
              </div>
            </div>

            {/* Layer 2 header */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-xs font-black text-[#D4AF37]/70 tracking-widest">LAYER 2 — הבונוס (% מהמחזור · נסכים יחד)</span>
              <div className="w-0.5 h-5 rounded-full bg-[#D4AF37]/40" />
            </div>

            {/* Layer 2 commerce */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { gmv: "עד 420M ₪", comm: "1%", val: "→ 4.2M ₪", sub: "מחזיר את הריטנר המלא", color: "#D4AF37" },
                { gmv: "מעל 420M ₪", comm: "% X", val: "נגדיר יחד", sub: "כל שקל מעל = רווח נטו", color: "#34D399" },
                { gmv: "מתנות + אש + פוקר", comm: "—", val: "Volume גדל", sub: "כולם עוברים דרך פייבוקס", color: "#A78BFA" },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border p-4 text-center"
                  style={{ background: `${c.color}08`, borderColor: `${c.color}25` }}>
                  <p className="text-xs text-white/40">{c.gmv}</p>
                  <p className="text-3xl font-black mt-1" style={{ color: c.color }}>{c.comm}</p>
                  <p className="text-sm font-bold text-white/60 mt-1">{c.val}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── RETAINER VIEW ── */}
        {view === "retainer" && (
          <>
            <div className="grid grid-cols-5 gap-3">
              {RETAINER_BREAKDOWN.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-black text-white text-sm leading-tight">{item.label}</p>
                  <p className="text-[10px] text-white/30 mt-1 leading-relaxed">{item.note}</p>
                  <p className="text-lg font-black text-[#D4AF37] mt-3">{item.val}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex items-center justify-between">
              <div className="text-right">
                <p className="text-[10px] text-[#D4AF37]/60 font-bold tracking-widest">סה"כ ריטנר</p>
                <p className="text-4xl font-black text-[#D4AF37]">350,000 ₪/חודש</p>
                <p className="text-white/30 text-xs mt-1">4.2M ₪ לשנה · לא ספק — שותף</p>
              </div>
              <div className="text-right max-w-sm">
                <p className="text-white/60 text-sm leading-relaxed">
                  5 אנשים בכירים שמנהלים סחר ושירות<br />
                  ל-<strong className="text-[#D4AF37]">4 מיליון לקוחות פוטנציאליים</strong>.<br /><br />
                  כשה-GMV יגיע ל-<strong className="text-[#D4AF37]">420M ₪</strong> —<br />
                  1% עמלה = <strong className="text-[#34D399]">4.2M ₪</strong>.<br />
                  הריטנר חזר. <strong className="text-white">כל שקל מעל — שלכם.</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "ריטנר שנתי", val: "4.2M ₪", color: "#EF4444", icon: "📤" },
                { label: "Commerce 1% × 420M", val: "4.2M ₪", color: "#D4AF37", icon: "📥" },
                { label: "נטו Commerce", val: "≈ 0", color: "#34D399", icon: "⚖️", note: "+ Layer 1 מעל" },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-white/8 bg-white/3 py-5">
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <p className="text-xs text-white/40">{c.label}</p>
                  <p className="text-2xl font-black mt-1" style={{ color: c.color }}>{c.val}</p>
                  {c.note && <p className="text-[10px] text-white/25 mt-1">{c.note}</p>}
                </div>
              ))}
            </div>
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

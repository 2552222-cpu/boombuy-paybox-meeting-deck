import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── FULL ASSUMPTIONS SIMULATOR ──────────────────────────────────────────────
// PayBox sets their own numbers live during the meeting.
// We show them the outcome based on THEIR assumptions.

const RETAINER_ANNUAL = 4.2;   // M NIS/year  (350K × 12)
const BASE_CARDS_K   = 400;    // K total cards (300K CC + 100K Young)
const BASE_VOL_MONTH = 560;    // M NIS/month current volume
const BASE_FLOAT_M   = 938;    // M NIS customer balance (Discount Bank 2024)
const BASE_FIW       = 10;     // % current FIW

const SCRIPT = `"עכשיו אנחנו נותנים לכם את הסימולטור.
כל הנחה כאן — אתם קובעים אותה.

מה שיעור ה-Interchange שלכם? — תגידו לנו.
כמה אחוז מהלקוחות תחשבו שיעברו לכרטיס ראשי? — תגידו לנו.
כמה כרטיסים חדשים ריאלי? — תגידו לנו.

אנחנו לא יודעים את המספרים שלכם טוב כמוכם.
אבל כשתגידו לנו — הסימולטור ייתן לכם את התשובה בזמן אמת.

מה שנשאר קבוע: הריטנר. 4.2 מיליון שקל לשנה. ותראו מתי הוא מתכסה."`;

// Slider config
const SLIDERS = [
  {
    key: "fiw",
    label: "גידול שימוש ראשי (FIW)",
    sublabel: "כמה % מהלקוחות יעברו לכרטיס ראשי (בזכות ZUZ + The Box)?",
    sub2: `בסיס: ${BASE_FIW}% היום (נאמר בשיחה) — The Box מגדיל`,
    min: 0, max: 25, step: 1, default: 10,
    unit: "% גידול",
    color: "#60A5FA",
    icon: "💳",
  },
  {
    key: "interchange",
    label: "שיעור Interchange שלכם",
    sublabel: "מה האחוז האמיתי שלכם על סליקה? (אמרתם: מודל מדורג)",
    sub2: "הזינו את המספר הנכון — אנחנו לא יודעים",
    min: 0.1, max: 0.5, step: 0.01, default: 0.25,
    unit: "%",
    color: "#34D399",
    icon: "📊",
    decimals: 2,
  },
  {
    key: "newCards",
    label: "כרטיסים חדשים / שנה",
    sublabel: "כמה כרטיסים ZUZ ימשוך שנה 1? (הנחתנו: 40K)",
    sub2: "כל כרטיס = ממוצע 1,800 ₪/חודש × Interchange שלכם × 12",
    min: 0, max: 100, step: 5, default: 40,
    unit: "K כרטיסים",
    color: "#A78BFA",
    icon: "🆕",
  },
  {
    key: "floatGrowth",
    label: "גידול יתרת הלקוחות (Float)",
    sublabel: "ב-2024 הייתה 938M ₪ וגדלה 25.6%. כמה תגדל עם ZUZ?",
    sub2: "כסף בקבוצות מתנה יושב יותר זמן — שאלה: כמה?",
    min: 0, max: 60, step: 5, default: 20,
    unit: "% גידול יתרה",
    color: "#FBBF24",
    icon: "🏦",
  },
  {
    key: "gmv",
    label: "מחזור The Box (GMV) — שנה 1",
    sublabel: "כמה מחזור מועדון ריאלי? זה בסיס ל-Commerce",
    sub2: "Break-even: 420M ₪ × 1% = 4.2M = ריטנר",
    min: 50, max: 1000, step: 25, default: 300,
    unit: "M ₪/שנה",
    color: "#D4AF37",
    icon: "🛍️",
  },
  {
    key: "commPct",
    label: "אחוז Commerce לפייבוקס",
    sublabel: "כמה % מה-GMV מגיע לפייבוקס? (נסכים יחד)",
    sub2: "1% × 420M GMV = מכסה ריטנר מלא",
    min: 0.5, max: 2.0, step: 0.1, default: 1.0,
    unit: "%",
    color: "#F97316",
    icon: "📈",
    decimals: 1,
  },
];

function fmt(n, d = 1) {
  if (typeof n !== "number") return n;
  return n >= 1000 ? `${(n / 1000).toFixed(1)}B` : n.toFixed(d);
}

export default function SlideFlow() {
  const [vals, setVals] = useState(() =>
    Object.fromEntries(SLIDERS.map(s => [s.key, s.default]))
  );

  const set = (key, val) => setVals(v => ({ ...v, [key]: val }));

  const R = useMemo(() => {
    const { fiw, interchange, newCards, floatGrowth, gmv, commPct } = vals;

    // 1. Interchange — FIW effect on volume
    // Each 1 percentage point of FIW growth = ~4K more primary users (out of 400K)
    // Primary user spends ~5x more than secondary
    // Additional volume per 1% FIW gain ≈ 4K users × (5000-1400) NIS = ~14.4M NIS/month
    // Simplified: 1% FIW = +14M NIS/month more volume
    const extraVol = fiw * 14;  // M NIS/month additional
    const totalVol = BASE_VOL_MONTH + extraVol;
    const interchangeToday = +(BASE_VOL_MONTH * (interchange / 100) * 12).toFixed(1);
    const interchangeNew   = +(totalVol       * (interchange / 100) * 12).toFixed(1);
    const interchangeGain  = +(interchangeNew - interchangeToday).toFixed(1);

    // 2. Float — balance growth
    const newBalance    = BASE_FLOAT_M * (1 + floatGrowth / 100);
    const floatSpread   = 2; // % (BoI 4.5% - 2.5% paid = 2% net to Discount)
    const floatToday    = +(BASE_FLOAT_M * floatSpread / 100).toFixed(1);
    const floatNew      = +(newBalance   * floatSpread / 100).toFixed(1);
    const floatGain     = +(floatNew - floatToday).toFixed(1);

    // 3. New cards — Year 1 only (annualized)
    // newCards K × 1800 NIS/month × interchange% × 12 months
    const newCardsGain = +(newCards * 1000 * 1800 * (interchange / 100) * 12 / 1e6).toFixed(1);

    // 4. Commerce
    const commerce = +(gmv * commPct / 100).toFixed(1);

    // Totals
    const totalLayer1  = +(interchangeGain + floatGain + newCardsGain).toFixed(1);
    const totalAll     = +(totalLayer1 + commerce).toFixed(1);
    const netRetainer  = +(totalAll - RETAINER_ANNUAL).toFixed(1);
    const retMonths    = totalAll > 0
      ? Math.max(0, +(RETAINER_ANNUAL / totalAll * 12).toFixed(1))
      : 999;

    return {
      interchangeToday, interchangeNew, interchangeGain,
      floatToday, floatNew, floatGain,
      newCardsGain,
      commerce,
      totalLayer1, totalAll, netRetainer, retMonths,
      totalVol: +totalVol.toFixed(0),
    };
  }, [vals]);

  const coverPct = Math.min(100, Math.round(R.totalAll / RETAINER_ANNUAL * 100));
  const coverColor = coverPct >= 100 ? "#4ade80" : coverPct >= 60 ? "#D4AF37" : "#60A5FA";

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-10 py-8 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right shrink-0 mb-4">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור הנחות יסוד</span>
        <div className="w-0.5 h-8 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-2 mb-1" />
        <h1 className="text-2xl md:text-3xl font-black leading-tight">
          הזינו את המספרים שלכם — ראו תוצאה בזמן אמת
        </h1>
        <p className="mt-1 text-white/35 text-xs">כל הנחה — אתם קובעים · אנחנו מחשבים</p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* LEFT — Sliders */}
        <div className="flex flex-col gap-3 w-[55%] shrink-0 overflow-y-auto pr-1">
          {SLIDERS.map(s => {
            const val = vals[s.key];
            const pct = ((val - s.min) / (s.max - s.min)) * 100;
            const display = s.decimals ? val.toFixed(s.decimals) : val;
            return (
              <div key={s.key}
                className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-right">
                    <p className="text-xs font-black text-white leading-tight">
                      {s.icon} {s.label}
                    </p>
                    <p className="text-[10px] text-white/35 mt-0.5 leading-tight">{s.sublabel}</p>
                    <p className="text-[9px] text-white/20 mt-0.5 italic">{s.sub2}</p>
                  </div>
                  <div className="text-left shrink-0 ml-3">
                    <span className="text-2xl font-black" style={{ color: s.color }}>
                      {display}
                    </span>
                    <span className="text-xs text-white/40 ml-1">{s.unit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={s.min} max={s.max} step={s.step} value={val}
                  onChange={e => set(s.key, +e.target.value)}
                  className="w-full cursor-pointer mt-1"
                  style={{ accentColor: s.color }}
                />
                <div className="flex justify-between text-[9px] text-white/20 mt-0.5">
                  <span>{s.min}{s.unit.replace("% גידול","").replace(" גידול יתרה","").replace("K כרטיסים","K").replace("M ₪/שנה","M")}</span>
                  <span>{s.max}{s.unit.replace("% גידול","").replace(" גידול יתרה","").replace("K כרטיסים","K").replace("M ₪/שנה","M")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Live Results */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">

          {/* Revenue breakdown */}
          <div className="rounded-xl border border-white/10 bg-white/3 p-4 flex-1">
            <p className="text-[10px] font-bold text-white/35 tracking-widest mb-3 text-right">
              תוצאות — הכנסה נוספת לפייבוקס / שנה
            </p>

            {[
              {
                label: "📈 Interchange (FIW + מחזור גדל)",
                today: R.interchangeToday,
                gain: R.interchangeGain,
                new: R.interchangeNew,
                color: "#60A5FA",
                note: `${BASE_VOL_MONTH}M → ${R.totalVol}M ₪/חודש × ${vals.interchange.toFixed(2)}% × 12`,
              },
              {
                label: "🏦 Float (יתרה גדלה × פער 2%)",
                today: R.floatToday,
                gain: R.floatGain,
                new: R.floatNew,
                color: "#34D399",
                note: `938M → ${Math.round(BASE_FLOAT_M*(1+vals.floatGrowth/100))}M × 2%`,
              },
              {
                label: "🆕 כרטיסים חדשים (שנה 1)",
                today: 0,
                gain: R.newCardsGain,
                new: R.newCardsGain,
                color: "#A78BFA",
                note: `${vals.newCards}K × 1,800 ₪ × ${vals.interchange.toFixed(2)}% × 12`,
              },
              {
                label: "🛍️ Commerce (% מ-GMV)",
                today: 0,
                gain: R.commerce,
                new: R.commerce,
                color: "#D4AF37",
                note: `${vals.gmv}M ₪ GMV × ${vals.commPct.toFixed(1)}%`,
              },
            ].map((row, i) => (
              <div key={i} className="mb-3 pb-3 border-b border-white/6 last:border-0 last:mb-0 last:pb-0">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[10px] text-white/50">{row.label}</span>
                  <div className="flex items-baseline gap-2">
                    {row.today > 0 && (
                      <span className="text-[10px] text-white/25">{row.today}M היום →</span>
                    )}
                    <span className="text-base font-black" style={{ color: row.color }}>
                      +{row.gain}M ₪
                    </span>
                  </div>
                </div>
                <p className="text-[9px] text-white/20 text-left">{row.note}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-[10px] text-white/35">Layer 1 (Organic)</p>
                <p className="text-xl font-black text-[#34D399]">+{R.totalLayer1}M ₪</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-white/35">+ Commerce</p>
                <p className="text-xl font-black text-[#D4AF37]">+{R.commerce}M ₪</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/35">סה"כ / שנה</p>
                <p className="text-3xl font-black" style={{ color: coverColor }}>+{R.totalAll}M ₪</p>
              </div>
            </div>

            {/* Coverage bar */}
            <div className="h-3 rounded-full overflow-hidden bg-white/8 mb-2">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(2, coverPct)}%`, background: coverColor }} />
            </div>
            <div className="flex justify-between text-[10px]">
              <span style={{ color: coverColor }} className="font-black">
                {coverPct}% מהריטנר מכוסה
              </span>
              <span className="text-white/30">
                ריטנר: 4.2M ₪ · Break-even בחודש {R.retMonths}
              </span>
            </div>
          </div>

          {/* Net box */}
          <div className="rounded-xl p-4 text-center border"
            style={{
              borderColor: R.netRetainer >= 0 ? "rgba(74,222,128,.4)" : "rgba(96,165,250,.3)",
              background: R.netRetainer >= 0 ? "rgba(74,222,128,.07)" : "rgba(96,165,250,.05)"
            }}>
            <p className="text-[10px] text-white/35 mb-1">
              {R.netRetainer >= 0 ? "✓ ריטנר מכוסה — רווח נטו ממעל" : "עוד צריך למלא"}
            </p>
            <p className="text-3xl font-black" style={{ color: coverColor }}>
              {R.netRetainer >= 0 ? "+" : ""}{R.netRetainer}M ₪
            </p>
            <p className="text-[10px] text-white/25 mt-1">
              {R.netRetainer >= 0
                ? "כל שקל מעבר לריטנר — שלכם ישירות"
                : `חסרים עוד ${Math.abs(R.netRetainer).toFixed(1)}M לכיסוי מלא`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span className="text-white/20 text-[10px]">* Float spread 2% = הנחה · הנחות נוספות בהתאם לסליידרים</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

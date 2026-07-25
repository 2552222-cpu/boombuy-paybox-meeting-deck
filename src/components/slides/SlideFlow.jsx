import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── FULL LAYER-BY-LAYER SIMULATOR ───────────────────────────────────────────
// Each income layer has its OWN assumptions sliders.
// PayBox sets every number themselves — they own the result.

const RETAINER_ANNUAL = 4.2; // M NIS/year

const SCRIPT = `"הסימולטור הזה הוא שלכם.
כל מספר — אתם קובעים.

FIW כמה לדעתכם? שיעור Interchange שלכם? כמה כרטיסים חדשים ריאלי?
גררו — ותראו תוצאה בזמן אמת.

אנחנו לא מניחים בשבילכם — אתם מניחים.
כשהמספרים שלכם על המסך — התוצאה היא שלכם."`;

// ── Helpers ──────────────────────────────────────────────────────────────────
const f1 = n => Number(n.toFixed(1));
const pct = (n, d = 1) => n.toFixed(d) + "%";

function Slider({ label, sub, min, max, step, value, onChange, unit, color, decimals = 0 }) {
  const display = decimals ? value.toFixed(decimals) : value;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-0.5">
        <span className="text-[10px] text-white/40 leading-tight">{label}</span>
        <span className="text-sm font-black ml-2 shrink-0" style={{ color }}>
          {display}{unit}
        </span>
      </div>
      {sub && <p className="text-[9px] text-white/20 italic mb-1">{sub}</p>}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full cursor-pointer"
        style={{ accentColor: color }}
      />
      <div className="flex justify-between text-[9px] text-white/20">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function LayerCard({ title, icon, color, children, gain, today, note }) {
  const gainColor = gain > 0 ? color : "rgba(255,255,255,0.3)";
  return (
    <div className="rounded-2xl border bg-white/3 p-4 flex flex-col gap-2"
      style={{ borderColor: `${color}35` }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="font-black text-white text-sm">{title}</span>
      </div>
      {/* Sliders */}
      <div className="flex-1">{children}</div>
      {/* Result */}
      <div className="rounded-xl p-3 border mt-1" style={{ background: `${color}10`, borderColor: `${color}30` }}>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-[9px] text-white/30">היום</p>
            <p className="text-xs font-bold text-white/50">{today} M₪</p>
          </div>
          <div className="text-left">
            <p className="text-[9px] text-white/30">גידול שנה 1</p>
            <p className="text-2xl font-black" style={{ color: gainColor }}>+{gain}M</p>
          </div>
        </div>
        {note && <p className="text-[9px] text-white/20 mt-1 italic">{note}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function SlideFlow() {

  // LAYER 1 — Interchange
  const [cards,     setCards]     = useState(400);   // K total cards
  const [fiwNow,    setFiwNow]    = useState(10);    // % current FIW
  const [fiwTarget, setFiwTarget] = useState(22);    // % FIW with The Box
  const [iRate,     setIRate]     = useState(0.25);  // % interchange rate
  const [primSpend, setPrimSpend] = useState(5000);  // NIS/month primary user

  // LAYER 2 — Float
  const [floatSpread,  setFloatSpread]  = useState(2);   // % spread
  const [floatGrowth,  setFloatGrowth]  = useState(25);  // % balance growth

  // LAYER 3 — New Cards
  const [newCardsK, setNewCardsK] = useState(40);    // K new cards/year
  const [avgSpend,  setAvgSpend]  = useState(1800);  // NIS/month per new card

  // LAYER 4 — Commerce
  const [gmv,      setGmv]      = useState(300);   // M NIS/year
  const [commPct,  setCommPct]  = useState(1.0);   // %

  const R = useMemo(() => {
    // ── Layer 1: Interchange ────────────────────────────────────────────────
    // Derive secondary spend from total volume (560M = cards * weighted avg)
    // 560M = cards*K * (fiwNow/100 * primSpend + (1-fiwNow/100) * secSpend)
    const totalCards = cards * 1000;
    const primNow = totalCards * (fiwNow / 100);
    const secNow  = totalCards * (1 - fiwNow / 100);
    // Back-calculate secondary spend so current volume ≈ 560M
    // 560M = primNow*primSpend + secNow*secSpend → secSpend = (560M - primNow*primSpend)/secNow
    const secSpend = secNow > 0
      ? Math.max(200, (560e6 - primNow * primSpend) / secNow)
      : 800;

    const volToday = (primNow * primSpend + secNow * secSpend) / 1e6; // M NIS/month

    const primTarget = totalCards * (fiwTarget / 100);
    const secTarget  = totalCards * (1 - fiwTarget / 100);
    const volTarget  = (primTarget * primSpend + secTarget * secSpend) / 1e6; // M NIS/month

    const interchangeToday = f1(volToday  * (iRate / 100) * 12);
    const interchangeNew   = f1(volTarget * (iRate / 100) * 12);
    const interchangeGain  = f1(interchangeNew - interchangeToday);

    // ── Layer 2: Float ──────────────────────────────────────────────────────
    const floatBase  = 938; // M NIS
    const floatNew_M = floatBase * (1 + floatGrowth / 100);
    const floatToday = f1(floatBase  * (floatSpread / 100));
    const floatFuture= f1(floatNew_M * (floatSpread / 100));
    const floatGain  = f1(floatFuture - floatToday);

    // ── Layer 3: New Cards ──────────────────────────────────────────────────
    // Year 1 annualized: cards grow monthly, use avg 6-month effect → *0.5
    const newCardsGain = f1(newCardsK * 1000 * avgSpend * (iRate / 100) * 12 * 0.5 / 1e6);

    // ── Layer 4: Commerce ───────────────────────────────────────────────────
    const commerce = f1(gmv * commPct / 100);

    // ── Totals ──────────────────────────────────────────────────────────────
    const layer1Total = f1(interchangeGain + floatGain + newCardsGain);
    const totalGain   = f1(layer1Total + commerce);
    const netRet      = f1(totalGain - RETAINER_ANNUAL);
    const coverPct    = Math.min(200, Math.round(totalGain / RETAINER_ANNUAL * 100));
    const breakMonths = totalGain > 0 ? f1(RETAINER_ANNUAL / totalGain * 12) : 999;

    return {
      interchangeToday, interchangeGain, interchangeNew,
      volToday: f1(volToday), volTarget: f1(volTarget),
      secSpend: Math.round(secSpend),
      floatToday, floatGain, floatFuture, floatNew_M: Math.round(floatNew_M),
      newCardsGain,
      commerce,
      layer1Total, totalGain, netRet, coverPct, breakMonths,
    };
  }, [cards, fiwNow, fiwTarget, iRate, primSpend, floatSpread, floatGrowth,
      newCardsK, avgSpend, gmv, commPct]);

  const coverColor = R.coverPct >= 100 ? "#4ade80" : R.coverPct >= 60 ? "#D4AF37" : "#60A5FA";

  return (
    <div className="relative min-h-full w-full flex flex-col px-5 md:px-8 py-6 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right shrink-0 mb-3">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור הנחות</span>
        <div className="w-0.5 h-7 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-1 mb-1" />
        <h1 className="text-xl md:text-2xl font-black">
          כל שכבת הכנסה — הניחו את המספרים שלכם
        </h1>
        <p className="text-white/30 text-[10px] mt-0.5">גררו · ראו תוצאה חיה · אתם קובעים</p>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">

        {/* 4 Layer Cards */}
        <div className="grid grid-cols-2 gap-3 w-[65%] shrink-0 content-start">

          {/* LAYER 1 — Interchange */}
          <LayerCard
            title="Interchange — כרטיס ראשי"
            icon="💳" color="#60A5FA"
            today={R.interchangeToday}
            gain={R.interchangeGain}
            note={`מחזור: ${R.volToday}M → ${R.volTarget}M ₪/חודש · ₪${R.secSpend.toLocaleString()}/חודש כרטיס משני`}
          >
            <Slider label="כרטיסים כיום" sub="CC + Young (K)" min={300} max={500} step={10}
              value={cards} onChange={setCards} unit="K" color="#60A5FA" />
            <Slider label="FIW נוכחי — כמה % ראשי היום?" sub="אמרתם 10% — האם נכון?"
              min={5} max={40} step={1} value={fiwNow} onChange={setFiwNow} unit="%" color="#93C5FD" />
            <Slider label="FIW עם The Box — כמה % ריאלי?" sub="לאן תגיעו בשנה 1?"
              min={fiwNow} max={50} step={1} value={fiwTarget} onChange={setFiwTarget} unit="%" color="#60A5FA" />
            <Slider label="שיעור Interchange שלכם" sub="המספר האמיתי — אתם יודעים"
              min={0.1} max={0.5} step={0.01} value={iRate} onChange={setIRate} unit="%" color="#3B82F6" decimals={2} />
            <Slider label="הוצאה חודשית — כרטיס ראשי" sub="₪/חודש (כרטיס שמשתמשים בו לכל)"
              min={2000} max={12000} step={500} value={primSpend} onChange={setPrimSpend} unit="₪" color="#60A5FA" />
          </LayerCard>

          {/* LAYER 2 — Float */}
          <LayerCard
            title="Float — כסף שיושב"
            icon="🏦" color="#34D399"
            today={R.floatToday}
            gain={R.floatGain}
            note={`יתרה: 938M → ${R.floatNew_M}M ₪ · ריבית נטו: ${pct(floatSpread)} × יתרה`}
          >
            <div className="rounded-lg bg-white/5 px-3 py-2 mb-3 text-right">
              <p className="text-[9px] text-white/30">יתרת לקוחות נוכחית</p>
              <p className="text-base font-black text-white/60">938M ₪</p>
              <p className="text-[9px] text-white/20">מדוחות דיסקונט 2024 ✓</p>
            </div>
            <Slider label="פער ריבית נטו" sub="BoI rate פחות מה שמשלמים ללקוחות"
              min={0.5} max={4} step={0.25} value={floatSpread} onChange={setFloatSpread} unit="%" color="#34D399" decimals={2} />
            <Slider label="גידול יתרה עם ZUZ"
              sub="ZUZ משאיר כסף יותר זמן ב-wallet — כמה % גידול?"
              min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth} unit="%" color="#10B981" />
            <div className="rounded-lg bg-[#34D399]/8 border border-[#34D399]/20 px-3 py-2 mt-1">
              <p className="text-[9px] text-white/30">400M ₪ קיים בקבוצות מתנה פעילות</p>
              <p className="text-[9px] text-[#34D399]/60">כסף שיושב עד שהמתנה מחולקת — Float אמיתי</p>
            </div>
          </LayerCard>

          {/* LAYER 3 — New Cards */}
          <LayerCard
            title="כרטיסים חדשים"
            icon="🆕" color="#A78BFA"
            today={0}
            gain={R.newCardsGain}
            note={`${newCardsK}K × ${avgSpend.toLocaleString()}₪ × ${pct(iRate, 2)} × 12 × 50% (ממוצע שנה)`}
          >
            <div className="rounded-lg bg-white/5 px-3 py-2 mb-3 text-right">
              <p className="text-[9px] text-white/30">מנגנון</p>
              <p className="text-[10px] text-white/50 leading-relaxed">
                ZUZ = תגמול על שימוש בכרטיס פייבוקס.<br/>
                לקוחות חדשים ייפתחו כרטיס בשביל ZUZ.<br/>
                כל כרטיס חדש = מחזור נוסף = Interchange נוסף.
              </p>
            </div>
            <Slider label="כמה כרטיסים חדשים ריאלי — שנה 1?"
              sub="הניחו מה שנראה לכם הגיוני"
              min={0} max={120} step={5} value={newCardsK} onChange={setNewCardsK} unit="K" color="#A78BFA" />
            <Slider label="הוצאה ממוצעת לכרטיס חדש"
              sub="₪/חודש — לקוחות שפותחים בשביל ZUZ"
              min={500} max={4000} step={100} value={avgSpend} onChange={setAvgSpend} unit="₪" color="#8B5CF6" />
          </LayerCard>

          {/* LAYER 4 — Commerce */}
          <LayerCard
            title="Commerce — % מ-GMV"
            icon="🛍️" color="#D4AF37"
            today={0}
            gain={R.commerce}
            note={`${gmv}M ₪ GMV × ${pct(commPct, 1)} · Break-even: ${(RETAINER_ANNUAL / commPct * 100).toFixed(0)}M GMV`}
          >
            <div className="rounded-lg bg-white/5 px-3 py-2 mb-3 text-right">
              <p className="text-[9px] text-white/30">מנגנון</p>
              <p className="text-[10px] text-white/50 leading-relaxed">
                כל קנייה בThe Box — מתנות, אוכל, חופשה —<br/>
                X% ממנה הולך לפייבוקס.<br/>
                זהו הבונוס — מעבר לכל Layer 1.
              </p>
            </div>
            <Slider label="GMV The Box — מחזור שנה 1"
              sub="כמה קניות ריאלי? Break-even ב-4.2M"
              min={50} max={1000} step={25} value={gmv} onChange={setGmv} unit="M₪" color="#D4AF37" />
            <Slider label="אחוז Commerce לפייבוקס"
              sub="נסכים יחד — מה ריאלי?"
              min={0.5} max={2.0} step={0.1} value={commPct} onChange={setCommPct} unit="%" color="#B45309" decimals={1} />
          </LayerCard>
        </div>

        {/* RIGHT — Grand Total */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-[10px] font-bold text-white/30 tracking-widest text-center">סיכום — כל השכבות</p>

          {/* Per-layer summary */}
          {[
            { label: "💳 Interchange", gain: R.interchangeGain, color: "#60A5FA" },
            { label: "🏦 Float",        gain: R.floatGain,        color: "#34D399" },
            { label: "🆕 כרטיסים",      gain: R.newCardsGain,     color: "#A78BFA" },
            { label: "🛍️ Commerce",      gain: R.commerce,         color: "#D4AF37" },
          ].map((row, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/45">{row.label}</span>
                <span className="text-lg font-black" style={{ color: row.color }}>+{row.gain}M ₪</span>
              </div>
              <div className="h-1.5 rounded-full mt-2 overflow-hidden bg-white/8">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, row.gain / R.totalGain * 100 || 0)}%`, background: row.color }} />
              </div>
            </div>
          ))}

          {/* Divider */}
          <div className="h-px bg-white/10 my-1" />

          {/* Layer 1 subtotal */}
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Layer 1 — אורגני</span>
              <span className="text-base font-black text-[#34D399]">+{R.layer1Total}M ₪</span>
            </div>
          </div>

          {/* Grand total */}
          <div className="rounded-xl border px-4 py-4 text-center"
            style={{ borderColor: `${coverColor}50`, background: `${coverColor}08` }}>
            <p className="text-[10px] text-white/35 mb-1">סה"כ גידול / שנה</p>
            <p className="text-4xl font-black" style={{ color: coverColor }}>+{R.totalGain}M ₪</p>
            <p className="text-[10px] text-white/30 mt-1">מול ריטנר: {RETAINER_ANNUAL}M ₪</p>
          </div>

          {/* Coverage bar */}
          <div>
            <div className="h-3 rounded-full overflow-hidden bg-white/8">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, R.coverPct / 2)}%`, background: coverColor }} />
            </div>
            <div className="flex justify-between text-[10px] mt-1">
              <span style={{ color: coverColor }} className="font-black">{R.coverPct}% כיסוי ריטנר</span>
              <span className="text-white/25">חוזר בחודש {R.breakMonths}</span>
            </div>
          </div>

          {/* Net */}
          <div className="rounded-xl border px-4 py-3 text-center"
            style={{
              borderColor: R.netRet >= 0 ? "rgba(74,222,128,.4)" : "rgba(96,165,250,.25)",
              background:  R.netRet >= 0 ? "rgba(74,222,128,.06)" : "rgba(96,165,250,.04)"
            }}>
            <p className="text-[9px] text-white/30 mb-0.5">
              {R.netRet >= 0 ? "✓ ריטנר מכוסה · שארית — רווח נטו" : "חסר לכיסוי ריטנר"}
            </p>
            <p className="text-2xl font-black" style={{ color: coverColor }}>
              {R.netRet >= 0 ? "+" : ""}{R.netRet}M ₪
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-gray-600 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span className="text-white/15">הנחות: Float spread 2% · כרטיסים חדשים = 50% מ-year 1</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

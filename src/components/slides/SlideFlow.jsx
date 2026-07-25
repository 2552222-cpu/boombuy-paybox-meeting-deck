import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── TWO-COLUMN SIMULATOR ────────────────────────────────────────────────────
// LEFT:  הכנסות אורגניות (Interchange, Float, Transactions)
// RIGHT: סחר The Box (Gifts, על האש, אחר)
// BOTTOM: Summary — before/after + when retainer hits 0

const RETAINER    = 4.2;   // M NIS/year
const FLOAT_BASE  = 938;   // M NIS balance
const GIFT_BASE   = 400;   // M NIS in gift groups (reported)
const LOSS_TODAY  = 63.7;  // M NIS annual loss (Discount Bank 2024)
const REV_TODAY   = 55;    // M NIS total revenue today

const SCRIPT = `"שמאל — מה שכבר שלכם, רק גדל.
ימין — מה The Box מביא חדש.
למטה — מתי הריטנר מחזיר את עצמו."`;

function Slider({ label, sub, min, max, step, value, onChange, unit = "", color = "#D4AF37", decimals = 0 }) {
  const display = decimals ? value.toFixed(decimals) : value;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-end mb-0.5">
        <span className="text-[10px] text-white/45 leading-snug pr-2">{label}</span>
        <span className="text-sm font-black shrink-0" style={{ color }}>{display}{unit}</span>
      </div>
      {sub && <p className="text-[9px] text-white/20 italic mb-1">{sub}</p>}
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full cursor-pointer" style={{ accentColor: color }} />
      <div className="flex justify-between text-[9px] text-white/15 mt-0.5">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Section({ title, icon, color, gain, children }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-3 mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-white/70">{icon} {title}</span>
        <span className="text-base font-black" style={{ color }}>+{gain}M ₪</span>
      </div>
      {children}
    </div>
  );
}

export default function SlideFlow() {

  // ── LEFT: Organic Revenue ─────────────────────────────────────────────────
  const [fiwNow,    setFiwNow]    = useState(10);
  const [fiwTarget, setFiwTarget] = useState(22);
  const [iRate,     setIRate]     = useState(0.25);
  const [floatSpread, setFloatSpread] = useState(2);
  const [floatGrowth, setFloatGrowth] = useState(25);
  const [txnFee,    setTxnFee]    = useState(2);
  const [txnGrowth, setTxnGrowth] = useState(30);

  // ── RIGHT: Commerce ───────────────────────────────────────────────────────
  const [giftConv,  setGiftConv]  = useState(20);   // % of 400M to The Box
  const [giftComm,  setGiftComm]  = useState(1.0);  // % commerce on gifts
  const [ashGmv,    setAshGmv]    = useState(50);   // M NIS GMV "על האש"
  const [ashComm,   setAshComm]   = useState(1.5);  // % commerce "על האש"
  const [otherGmv,  setOtherGmv]  = useState(80);   // M NIS other categories
  const [otherComm, setOtherComm] = useState(1.0);  // % other

  const R = useMemo(() => {
    // Interchange
    const BASE_VOL = 560; // M NIS/month (300K×1800 + 100K×200)
    const fiwTgt   = Math.max(fiwNow + 1, fiwTarget);
    // Each FIW% point gained ≈ +3.5% volume (primary users spend ~4x secondary)
    const volBoost = (fiwTgt - fiwNow) * 3.5;
    const volNew   = BASE_VOL * (1 + volBoost / 100);
    const intBase  = +(BASE_VOL * (iRate / 100) * 12).toFixed(1);
    const intNew   = +(volNew   * (iRate / 100) * 12).toFixed(1);
    const intGain  = +(intNew - intBase).toFixed(1);

    // Float
    const floatBase = +(FLOAT_BASE * (floatSpread / 100)).toFixed(1);
    const floatNew  = +(FLOAT_BASE * (1 + floatGrowth / 100) * (floatSpread / 100)).toFixed(1);
    const floatGain = +(floatNew - floatBase).toFixed(1);

    // Transactions (2M/month, each txnFee NIS)
    const txnBase   = +(2 * txnFee * 12).toFixed(1);    // M NIS today
    const txnNew    = +(2 * (1 + txnGrowth / 100) * txnFee * 12).toFixed(1);
    const txnGain   = +(txnNew - txnBase).toFixed(1);

    const layer1 = +(intGain + floatGain + txnGain).toFixed(1);

    // Commerce — Gifts
    const giftGmv     = +(GIFT_BASE * (giftConv / 100)).toFixed(1);
    const giftRev     = +(giftGmv * (giftComm / 100)).toFixed(1);

    // Commerce — "על האש"
    const ashRev      = +(ashGmv * (ashComm / 100)).toFixed(1);

    // Commerce — Other
    const otherRev    = +(otherGmv * (otherComm / 100)).toFixed(1);

    const totalGmv    = +(giftGmv + ashGmv + otherGmv).toFixed(1);
    const layer2      = +(giftRev + ashRev + otherRev).toFixed(1);

    // Summary
    const totalGain   = +(layer1 + layer2).toFixed(1);
    const netRet      = +(totalGain - RETAINER).toFixed(1);
    const coverPct    = Math.round(totalGain / RETAINER * 100);

    // Break-even: months until PayBox's annual loss reaches 0
    // Monthly improvement = totalGain/12
    // Starting deficit = LOSS_TODAY
    const monthsToZero = totalGain > 0
      ? Math.round(LOSS_TODAY / (totalGain / 12))
      : 999;

    // After-BoomBuy P&L
    const newRev  = +(REV_TODAY + totalGain).toFixed(1);
    const newLoss = +(newRev - (REV_TODAY + LOSS_TODAY + RETAINER)).toFixed(1); // costs = rev_today + loss_today + retainer added

    return {
      intBase, intGain, intNew,
      floatBase, floatGain,
      txnBase, txnGain, txnNew,
      layer1,
      giftGmv, giftRev,
      ashRev, otherRev, totalGmv, layer2,
      totalGain, netRet, coverPct, monthsToZero,
      newRev, newLoss,
    };
  }, [fiwNow, fiwTarget, iRate, floatSpread, floatGrowth, txnFee, txnGrowth,
      giftConv, giftComm, ashGmv, ashComm, otherGmv, otherComm]);

  const cc = R.coverPct >= 100 ? "#4ade80" : R.coverPct >= 60 ? "#D4AF37" : "#60A5FA";

  return (
    <div className="relative min-h-full w-full flex flex-col px-5 md:px-9 py-6 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right mb-3 shrink-0">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור</span>
        <div className="w-0.5 h-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-1 mb-1" />
        <h1 className="text-xl md:text-2xl font-black">הניחו מספרים — ראו תוצאה</h1>
        <p className="text-white/25 text-[10px]">אתם קובעים · אנחנו מחשבים · הכל בזמן אמת</p>
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0 overflow-y-auto">

        {/* ── LEFT: הכנסות אורגניות ─────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-[#60A5FA]/30" />
            <span className="text-[10px] font-black text-[#60A5FA]/70 tracking-widest whitespace-nowrap">
              Layer 1 — הכנסות שכבר שלכם, רק גדלות
            </span>
          </div>

          <Section title="Interchange — שימוש בכרטיס ראשי" icon="💳" color="#60A5FA" gain={R.intGain}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#60A5FA]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                בסיס: 560M ₪/חודש (300K×1,800₪ + 100K×200₪) = {R.intBase}M ₪/שנה היום.<br/>
                כל 1% שיפור ב-FIW = ~3.5% גידול במחזור (כרטיס ראשי = הוצאה פי 4).<br/>
                מחזור חדש × Interchange% × 12 = הכנסה נוספת.<br/>
                <span className="text-[#60A5FA]/50">* FIW = % לקוחות שמשתמשים בכרטיס כראשי</span>
              </p>
            </div>
            <Slider label="FIW נוכחי — כמה % משתמשים בכרטיס כראשי?" sub="אמרתם 10% — האם נכון?" min={5} max={40} step={1} value={fiwNow} onChange={v => { setFiwNow(v); if (v >= fiwTarget) setFiwTarget(v + 2); }} unit="%" color="#93C5FD" />
            <Slider label="FIW עם The Box — לאן תגיעו?" min={fiwNow + 1} max={60} step={1} value={Math.max(fiwTarget, fiwNow + 1)} onChange={setFiwTarget} unit="%" color="#60A5FA" />
            <Slider label="שיעור Interchange שלכם" sub="המספר האמיתי — אתם יודעים" min={0.1} max={0.5} step={0.01} value={iRate} onChange={setIRate} unit="%" color="#3B82F6" decimals={2} />
          </Section>

          <Section title="Float — ריבית על כסף שיושב" icon="🏦" color="#34D399" gain={R.floatGain}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#34D399]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                938M ₪ יתרת לקוחות (דוחות דיסקונט 2024 ✓) = {R.floatBase}M ₪/שנה היום.<br/>
                ריבית בנק ישראל ~4.5% פחות מה שמשלמים ללקוחות = פער נטו.<br/>
                ZUZ מותיר כסף בארנק יותר זמן ← יתרה גדלה ← יותר ריבית לדיסקונט.<br/>
                <span className="text-[#34D399]/50">* זמן שהייה בארנק: אין נתון מדויק — הנחה</span>
              </p>
            </div>
            <Slider label="פער ריבית נטו (BoI פחות מה שמשלמים ללקוחות)" min={0.5} max={4} step={0.25} value={floatSpread} onChange={setFloatSpread} unit="%" color="#34D399" decimals={2} />
            <Slider label="גידול יתרה עם ZUZ — כסף יושב יותר זמן" sub="400M ₪ בקבוצות מתנה — Float אמיתי" min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth} unit="%" color="#10B981" />
          </Section>

          <Section title="עמלות טרנזקציות — 2M/חודש" icon="⚡" color="#FB923C" gain={R.txnGain}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#FB923C]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                2M טרנזקציות/חודש (נאמר בשיחה ✓) = {R.txnBase}M ₪/שנה היום.<br/>
                The Box מגדיל מספר פעולות (קניות, חלוקת כסף, מתנות).<br/>
                2M × (1+גידול%) × עמלה ממוצעת × 12 = הכנסה.<br/>
                <span className="text-[#FB923C]/50">* היום: פייבוקס בהפסד על עמלות — אמרו בשיחה</span>
              </p>
            </div>
            <Slider label="עמלה ממוצעת לטרנזקציה" sub="כמה ₪ פייבוקס מרוויח על כל פעולה?" min={0.5} max={20} step={0.5} value={txnFee} onChange={setTxnFee} unit="₪" color="#FB923C" decimals={1} />
            <Slider label="גידול מספר טרנזקציות עם The Box" sub={`2M → ${(2*(1+txnGrowth/100)).toFixed(1)}M/חודש`} min={0} max={100} step={5} value={txnGrowth} onChange={setTxnGrowth} unit="%" color="#EA580C" />
          </Section>

          {/* Layer 1 Total */}
          <div className="rounded-xl p-3 text-center" style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.25)" }}>
            <p className="text-[9px] text-[#60A5FA]/60 mb-0.5">סה״כ Layer 1 — הכנסות אורגניות</p>
            <p className="text-2xl font-black text-[#60A5FA]">+{R.layer1}M ₪/שנה</p>
          </div>
        </div>

        {/* ── RIGHT: Commerce ────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-[#D4AF37]/30" />
            <span className="text-[10px] font-black text-[#D4AF37]/70 tracking-widest whitespace-nowrap">
              Layer 2 — סחר The Box (הבונוס)
            </span>
          </div>

          <Section title="קבוצות מתנה → The Box" icon="🎁" color="#F472B6" gain={R.giftRev}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#F472B6]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                400M ₪ יושבים בקבוצות מתנה פעילות (דיווחתם ✓).<br/>
                לא כולם יעברו ל-The Box — אתם קובעים כמה %.<br/>
                400M × % המרה = GMV · GMV × Commerce% = הכנסה.<br/>
                <span className="text-[#F472B6]/50">→ {R.giftGmv}M ₪ GMV ממתנות עם הנחות אלו</span>
              </p>
            </div>
            <Slider label="כמה % מהקבוצות יקנו דרך The Box?" sub={`5% = 20M GMV   ·   50% = 200M GMV`} min={5} max={50} step={5} value={giftConv} onChange={setGiftConv} unit="%" color="#F472B6" />
            <Slider label="% Commerce לפייבוקס על מתנות" min={0.5} max={3.0} step={0.25} value={giftComm} onChange={setGiftComm} unit="%" color="#EC4899" decimals={2} />
          </Section>

          <Section title='"על האש" — דילים מהירים' icon="🔥" color="#F97316" gain={R.ashRev}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#F97316]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                ארוחות, בילויים, חוויות — קנייה ישירה דרך The Box.<br/>
                GMV × % Commerce = הכנסה לפייבוקס.<br/>
                <span className="text-[#F97316]/50">* GMV: הניחו מה ריאלי לשנה 1</span>
              </p>
            </div>
            <Slider label="GMV שנתי — כמה ריאלי?" min={0} max={300} step={10} value={ashGmv} onChange={setAshGmv} unit="M₪" color="#F97316" />
            <Slider label="% Commerce לפייבוקס על האש" min={0.5} max={4.0} step={0.25} value={ashComm} onChange={setAshComm} unit="%" color="#EA580C" decimals={2} />
          </Section>

          <Section title="שאר קטגוריות The Box" icon="🛍️" color="#D4AF37" gain={R.otherRev}>
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
              <p className="text-[9px] text-[#D4AF37]/70 font-bold mb-0.5">איך מחושב:</p>
              <p className="text-[9px] text-white/35 leading-relaxed">
                מוצרים, חופשות, כרטיסים לאירועים, ביטוח — כל קנייה ב-The Box.<br/>
                GMV × % Commerce = הכנסה לפייבוקס.<br/>
                <span className="text-[#D4AF37]/50">* הניחו GMV ריאלי — זה מעבר לקבוצות המתנה</span>
              </p>
            </div>
            <Slider label="GMV שנתי — קטגוריות אחרות" min={0} max={500} step={25} value={otherGmv} onChange={setOtherGmv} unit="M₪" color="#D4AF37" />
            <Slider label="% Commerce לפייבוקס" min={0.5} max={2.0} step={0.1} value={otherComm} onChange={setOtherComm} unit="%" color="#B45309" decimals={1} />
          </Section>

          {/* Layer 2 Total */}
          <div className="rounded-xl p-3 text-center" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <p className="text-[9px] text-[#D4AF37]/60 mb-0.5">סה״כ Layer 2 — Commerce · GMV כולל: {R.totalGmv}M ₪</p>
            <p className="text-2xl font-black text-[#D4AF37]">+{R.layer2}M ₪/שנה</p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: ONE NUMBER ─────────────────────────────────────────── */}
      <div className="mt-3 rounded-2xl p-4 shrink-0 flex items-center gap-6"
        style={{ background: `${cc}08`, border: `1px solid ${cc}30` }}>

        {/* THE ONE NUMBER */}
        <div className="text-center flex-1">
          <p className="text-[10px] font-bold tracking-widest mb-1" style={{ color: `${cc}80` }}>
            כמה כסף פייבוקס מרוויח מהפעילות איתנו — שנה 1
          </p>
          <p className="text-5xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
          <p className="text-xs text-white/30 mt-1">הכנסות אורגניות {R.layer1}M + Commerce {R.layer2}M</p>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-white/10 shrink-0" />

        {/* Context */}
        <div className="flex gap-5 shrink-0">
          <div className="text-center">
            <p className="text-[9px] text-white/25">הפסד היום</p>
            <p className="text-xl font-black text-red-400">-{LOSS_TODAY}M</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-white/25">ריטנר שנתי</p>
            <p className="text-xl font-black text-red-300">-{RETAINER}M</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] mb-0.5" style={{ color: `${cc}80` }}>נטו — הפסד חדש</p>
            <p className="text-xl font-black" style={{ color: cc }}>
              {R.newLoss >= 0 ? "+" : ""}{R.newLoss}M ₪
            </p>
          </div>
          <div className="text-center rounded-xl px-3 py-1" style={{ background: `${cc}12` }}>
            <p className="text-[9px] text-white/25">Break-Even</p>
            <p className="text-xl font-black" style={{ color: cc }}>
              {R.monthsToZero < 120 ? R.monthsToZero : "∞"}
            </p>
            <p className="text-[9px] text-white/20">
              {R.monthsToZero < 120 ? "חודשים" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>הכנסות היום: הערכה · Interchange: מודל מדורג לא ידוע</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

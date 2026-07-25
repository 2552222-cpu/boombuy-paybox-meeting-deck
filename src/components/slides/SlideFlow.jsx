import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { useSimulator, RETAINER, LOSS_TODAY } from "@/contexts/SimulatorContext";

// ─── TWO-COLUMN SIMULATOR ────────────────────────────────────────────────────
// LEFT:  הכנסות אורגניות (Interchange, Float, Transactions)
// RIGHT: סחר The Box (Gifts, על האש, אחר)
// BOTTOM: Summary + ONE BIG NUMBER

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

function Section({ title, icon, color, gain, gainLabel, children }) {
  const gainDisplay = gain === null
    ? <span className="text-sm font-black text-white/30">TBD 🔵</span>
    : <span className="text-base font-black" style={{ color }}>+{gain}M ₪</span>;
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-3 mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-white/70">{icon} {title}</span>
        {gainDisplay}
      </div>
      {children}
    </div>
  );
}

function QuestionBox({ color, question }) {
  return (
    <div className="rounded-lg px-2.5 py-2 mb-2 text-right"
      style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
      <p className="text-[9px] font-black mb-0.5" style={{ color: `${color}CC` }}>
        ❓ שאלה לפייבוקס:
      </p>
      <p className="text-[9px] text-white/55 leading-relaxed italic">
        "{question}"
      </p>
    </div>
  );
}

function HowBox({ color, children }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 mb-2 text-right">
      <p className="text-[9px] font-bold mb-0.5" style={{ color: `${color}B0` }}>איך מחושב:</p>
      <div className="text-[9px] text-white/35 leading-relaxed">{children}</div>
    </div>
  );
}

export default function SlideFlow() {
  const {
    fiwNow, setFiwNow,
    fiwTarget, setFiwTarget,
    iRate, setIRate,
    floatSpread, setFloatSpread,
    floatGrowth, setFloatGrowth,
    txnGrowth, setTxnGrowth,
    giftConv, setGiftConv,
    giftComm, setGiftComm,
    ashGmv, setAshGmv,
    ashComm, setAshComm,
    otherGmv, setOtherGmv,
    otherComm, setOtherComm,
    R,
  } = useSimulator();

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

          {/* ── INTERCHANGE ── */}
          <Section title="Interchange — שימוש בכרטיס ראשי" icon="💳" color="#60A5FA" gain={R.intGain}>
            <QuestionBox color="#60A5FA"
              question="לאיזה אחוז FIW (שימוש בכרטיס כראשי) אתם מצפים להגיע תוך שנה עם ZUZ?" />
            <HowBox color="#60A5FA">
              בסיס: 560M ₪/חודש × {iRate}% × 12 = {R.intBase}M ₪/שנה היום.<br/>
              כל 1% שיפור ב-FIW = ~3.5% גידול במחזור (ראשי = הוצאה פי 4 מכרטיס משני).<br/>
              מחזור חדש × Interchange% × 12 = הכנסה נוספת.<br/>
              <span className="text-[#60A5FA]/50">* מודל Interchange מדורג — לא אומת</span>
            </HowBox>
            <Slider label="FIW נוכחי — כמה % משתמשים בכרטיס כראשי?" sub="אמרתם 10% — האם נכון?"
              min={0} max={40} step={1} value={fiwNow}
              onChange={v => { setFiwNow(v); if (v >= fiwTarget) setFiwTarget(v + 2); }}
              unit="%" color="#93C5FD" />
            <Slider label="FIW עם The Box — לאן תגיעו?"
              min={fiwNow + 1} max={60} step={1} value={Math.max(fiwTarget, fiwNow + 1)}
              onChange={setFiwTarget} unit="%" color="#60A5FA" />
            <Slider label="שיעור Interchange שלכם" sub="המספר האמיתי — אתם יודעים"
              min={0} max={0.5} step={0.01} value={iRate} onChange={setIRate}
              unit="%" color="#3B82F6" decimals={2} />
          </Section>

          {/* ── FLOAT ── */}
          <Section title="Float — ריבית על כסף שיושב" icon="🏦" color="#34D399" gain={R.floatGain}>
            <QuestionBox color="#34D399"
              question="לכמה ימים בממוצע הכסף שוהה בארנק PayBox לפני שנמשך לבנק? — ומה התחזית אם ZUZ ישנה את ההרגל?" />
            <HowBox color="#34D399">
              938M ₪ יתרת לקוחות (דוחות דיסקונט 2024 ✓) = {R.floatBase}M ₪/שנה היום.<br/>
              ZUZ גורם ללקוחות לשמור כסף בארנק יותר זמן → יתרה גדלה → יותר ריבית.<br/>
              938M × (1 + גידול%) × פער ריבית% = הכנסה חדשה.<br/>
              <span className="text-[#34D399]/50">* זמן שהייה בארנק: אין נתון מדויק — הנחה בלבד</span>
            </HowBox>
            <Slider label="פער ריבית נטו (BoI פחות מה שמשלמים ללקוחות)"
              min={0} max={4} step={0.25} value={floatSpread} onChange={setFloatSpread}
              unit="%" color="#34D399" decimals={2} />
            <Slider label="גידול יתרה עם ZUZ — כסף יושב יותר זמן"
              sub="0% = אין שינוי · 80% = יתרה כמעט כפולה"
              min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth}
              unit="%" color="#10B981" />
          </Section>

          {/* ── TRANSACTIONS ── */}
          <Section title="טרנזקציות — 2M/חודש (הפסד היום)" icon="⚡" color="#FB923C" gain={null}>
            <QuestionBox color="#FB923C"
              question="בכמה אחוז צפוי לגדול מספר הטרנזקציות השנתי עם כניסת The Box?" />
            <HowBox color="#FB923C">
              2M טרנזקציות/חודש = 24M/שנה (נאמר בשיחה ✓). היום: הפסד על כל טרנזקציה.<br/>
              The Box מגדיל מספר פעולות (קניות, מתנות, חלוקת כסף) → יותר טרנזקציות.<br/>
              ההכנסה לטרנזקציה תלויה בהסכם הטוקנים עם BoomBuy — לא ידוע עדיין.<br/>
              <span className="text-[#FB923C]/50">* לכן: מציגים גידול נפח בלבד. רווח = TBD</span>
            </HowBox>
            <Slider label="גידול צפוי במספר הטרנזקציות עם The Box"
              sub={`2M → ${R.txnVolNew}M/חודש | +${R.txnYearAdd}M טרנזקציות/שנה`}
              min={0} max={100} step={5} value={txnGrowth} onChange={setTxnGrowth}
              unit="%" color="#FB923C" />
            <div className="rounded-lg bg-white/5 border border-white/8 px-2.5 py-2 text-right">
              <p className="text-[9px] text-white/30">
                נפח שנתי נוסף: <span className="text-[#FB923C] font-black">+{R.txnYearAdd}M טרנזקציות</span>
                &nbsp;|&nbsp; הכנסה לטרנזקציה: <span className="text-white/50 font-black">TBD (הסכם טוקנים)</span>
              </p>
            </div>
          </Section>

          {/* Layer 1 Total */}
          <div className="rounded-xl p-3 text-center" style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.25)" }}>
            <p className="text-[9px] text-[#60A5FA]/60 mb-0.5">סה״כ Layer 1 — Interchange + Float</p>
            <p className="text-2xl font-black text-[#60A5FA]">+{R.layer1}M ₪/שנה</p>
            <p className="text-[8px] text-white/15 mt-0.5">טרנזקציות לא כלולות — TBD</p>
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

          {/* ── GIFT GROUPS ── */}
          <Section title="קבוצות מתנה → The Box" icon="🎁" color="#F472B6" gain={R.giftRev}>
            <QuestionBox color="#F472B6"
              question="מה האחוז הריאלי של הכסף בקבוצות המתנה (400M ₪) שתצליחו להמיר ל-The Box בשנה 1?" />
            <HowBox color="#F472B6">
              400M ₪ יושבים בקבוצות מתנה פעילות (דיווחתם ✓). לא כולם יעברו לThe Box.<br/>
              400M × % המרה = GMV · GMV × Commerce% = הכנסה לפייבוקס.<br/>
              <span className="text-[#F472B6]/50">→ {R.giftGmv}M ₪ GMV ממתנות עם הנחות אלו</span>
            </HowBox>
            <Slider label="כמה % מהקבוצות יקנו דרך The Box?"
              sub="5% = 20M GMV   ·   50% = 200M GMV"
              min={0} max={50} step={5} value={giftConv} onChange={setGiftConv}
              unit="%" color="#F472B6" />
            <Slider label="% Commerce לפייבוקס על מתנות"
              min={0} max={3.0} step={0.25} value={giftComm} onChange={setGiftComm}
              unit="%" color="#EC4899" decimals={2} />
          </Section>

          {/* ── על האש ── */}
          <Section title='"על האש" — דילים מהירים' icon="🔥" color="#F97316" gain={R.ashRev}>
            <QuestionBox color="#F97316"
              question='מה ה-GMV השנתי הריאלי שאתם מצפים לו מ"על האש" — ארוחות, בילויים, חוויות — בשנה 1?' />
            <HowBox color="#F97316">
              קניות מהירות דרך The Box: ארוחות, בילויים, חוויות, שירותים.<br/>
              GMV × % Commerce = הכנסה לפייבוקס.<br/>
              <span className="text-[#F97316]/50">* הניחו מה ריאלי לשנה 1 — 0 = שמרני</span>
            </HowBox>
            <Slider label='GMV שנתי "על האש" — כמה ריאלי?'
              min={0} max={300} step={10} value={ashGmv} onChange={setAshGmv}
              unit="M₪" color="#F97316" />
            <Slider label='% Commerce לפייבוקס על האש'
              min={0} max={4.0} step={0.25} value={ashComm} onChange={setAshComm}
              unit="%" color="#EA580C" decimals={2} />
          </Section>

          {/* ── OTHER ── */}
          <Section title="שאר קטגוריות The Box" icon="🛍️" color="#D4AF37" gain={R.otherRev}>
            <QuestionBox color="#D4AF37"
              question="מה ה-GMV הצפוי משאר קטגוריות The Box (מוצרים, חופשות, כרטיסים, ביטוח) בשנה 1?" />
            <HowBox color="#D4AF37">
              מוצרים, חופשות, כרטיסים לאירועים, ביטוח — כל קנייה נוספת ב-The Box.<br/>
              GMV × % Commerce = הכנסה לפייבוקס.<br/>
              <span className="text-[#D4AF37]/50">* מעבר לקבוצות המתנה — 0 = שמרני</span>
            </HowBox>
            <Slider label="GMV שנתי — קטגוריות אחרות"
              min={0} max={500} step={25} value={otherGmv} onChange={setOtherGmv}
              unit="M₪" color="#D4AF37" />
            <Slider label="% Commerce לפייבוקס"
              min={0} max={2.0} step={0.1} value={otherComm} onChange={setOtherComm}
              unit="%" color="#B45309" decimals={1} />
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
            <p className="text-[9px] mb-0.5" style={{ color: `${cc}80` }}>נטו — P&L חדש</p>
            <p className="text-xl font-black" style={{ color: cc }}>
              {R.netResult >= 0 ? "+" : ""}{R.netResult}M ₪
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
        <span>הכנסות היום: הערכה · Interchange: מודל מדורג לא ידוע · טרנזקציות: TBD</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

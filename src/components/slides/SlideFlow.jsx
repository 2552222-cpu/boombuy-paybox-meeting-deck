import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import {
  useSimulator,
  INT_BASE, FLOAT_BASE_REV, GIFT_BASE,
  RETAINER, LOSS_TODAY,
} from "@/contexts/SimulatorContext";

const SCRIPT = `"אתם קובעים את ההנחות — אנחנו מחשבים את המספר."`;

// ─────────────────────────────────────────────────────────────────────────────
function Slider({ label, min, max, step, value, onChange, unit = "", color = "#D4AF37", decimals = 0 }) {
  const display = decimals ? value.toFixed(decimals) : value;
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-[10px] text-white/40">{label}</span>
        <span className="text-sm font-black" style={{ color }}>{display}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full cursor-pointer" style={{ accentColor: color }} />
      <div className="flex justify-between text-[9px] text-white/15 mt-0.5">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Block({ icon, title, color, baseLabel, gain, tbd, question, children }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-3 mb-2.5">
      {/* Title row */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <span className="text-[11px] font-black text-white/80">{icon} {title}</span>
          {baseLabel && <p className="text-[9px] text-white/25 mt-0.5">{baseLabel}</p>}
        </div>
        {tbd
          ? <span className="text-[11px] font-black text-white/30">TBD 🔵</span>
          : <span className="text-lg font-black" style={{ color }}>
              {gain > 0 ? "+" : ""}{gain}M ₪
            </span>
        }
      </div>

      {/* Question */}
      <div className="rounded-lg px-2.5 py-1.5 mb-2.5 text-right"
        style={{ background: `${color}10`, border: `1px solid ${color}22` }}>
        <span className="text-[9px] font-black" style={{ color: `${color}99` }}>❓ </span>
        <span className="text-[9px] text-white/45 italic">{question}</span>
      </div>

      {/* Sliders */}
      {children}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function SlideFlow() {
  const {
    intGrowth, setIntGrowth,
    floatGrowth, setFloatGrowth,
    txnGrowth, setTxnGrowth,
    giftConv, setGiftConv,
    giftComm, setGiftComm,
    generalGmv, setGeneralGmv,
    generalComm, setGeneralComm,
    R,
  } = useSimulator();

  const cc = R.netResult >= 0 ? "#4ade80" : R.totalGain >= RETAINER ? "#D4AF37" : "#60A5FA";

  return (
    <div className="relative min-h-full w-full flex flex-col px-5 md:px-9 py-6 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right mb-3 shrink-0">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור</span>
        <h1 className="text-xl md:text-2xl font-black mt-1">הניחו מספרים — ראו תוצאה</h1>
        <p className="text-white/25 text-[10px]">אתם קובעים את ההנחות · אנחנו מחשבים · הכל בזמן אמת</p>
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0 overflow-y-auto">

        {/* ══ LEFT: הכנסות אורגניות ══════════════════════════════════════════ */}
        <div>
          <p className="text-[9px] font-black text-[#60A5FA]/60 tracking-widest mb-2 text-right">
            Layer 1 — הכנסות שכבר שלכם, רק גדלות
          </p>

          {/* INTERCHANGE */}
          <Block icon="💳" title="רווח סליקה (Interchange)"
            color="#60A5FA"
            baseLabel={`היום: ${INT_BASE}M ₪/שנה (560M ₪/חודש × 0.3% × 12)`}
            gain={R.intGain}
            question="בכמה % תגדל הפעילות בכרטיס PayBox כתוצאה מ-ZUZ?">
            <Slider label="גידול % בשימוש בכרטיס עם ZUZ"
              min={0} max={100} step={5} value={intGrowth} onChange={setIntGrowth}
              unit="%" color="#60A5FA" />
            {intGrowth > 0 && (
              <p className="text-[9px] text-white/30 text-right mt-1">
                {INT_BASE}M → <span className="text-[#60A5FA] font-bold">{R.intTotal}M ₪</span> | רווח נוסף: +{R.intGain}M
              </p>
            )}
          </Block>

          {/* FLOAT */}
          <Block icon="🏦" title="ריבית Float — כסף שיושב"
            color="#34D399"
            baseLabel={`היום: ${FLOAT_BASE_REV}M ₪/שנה (938M ₪ יתרה × 2% פער ריבית)`}
            gain={R.floatGain}
            question="לכמה ימים בממוצע הכסף יישאר בארנק לפני משיכה לבנק — ובכמה % צפוי לגדול עם ZUZ?">
            <Slider label="גידול % ביתרה הממוצעת עם ZUZ"
              min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth}
              unit="%" color="#34D399" />
            {floatGrowth > 0 && (
              <p className="text-[9px] text-white/30 text-right mt-1">
                {FLOAT_BASE_REV}M → <span className="text-[#34D399] font-bold">{R.floatTotal}M ₪</span> | רווח נוסף: +{R.floatGain}M
              </p>
            )}
          </Block>

          {/* TRANSACTIONS */}
          <Block icon="⚡" title="טרנזקציות — 2M/חודש"
            color="#FB923C"
            baseLabel="היום: 2M/חודש · פייבוקס בהפסד על כל טרנזקציה"
            tbd
            question="בכמה % צפוי לגדול מספר הטרנזקציות השנתי עם כניסת The Box?">
            <Slider label="גידול % בכמות הטרנזקציות"
              min={0} max={100} step={5} value={txnGrowth} onChange={setTxnGrowth}
              unit="%" color="#FB923C" />
            <p className="text-[9px] text-white/30 text-right mt-1">
              2M → <span className="text-[#FB923C] font-bold">{R.txnVolNew}M/חודש</span>
              &nbsp;(+{R.txnYearAdd}M/שנה) | הכנסה לטרנזקציה: <span className="text-white/40">הסכם טוקנים (TBD)</span>
            </p>
          </Block>

          {/* Layer 1 total */}
          <div className="rounded-xl p-3 text-center"
            style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.25)" }}>
            <p className="text-[9px] text-[#60A5FA]/60 mb-0.5">Layer 1 — Interchange + Float</p>
            <p className="text-2xl font-black text-[#60A5FA]">+{R.layer1}M ₪/שנה</p>
            <p className="text-[8px] text-white/15">טרנזקציות לא כלולות — TBD</p>
          </div>
        </div>

        {/* ══ RIGHT: Commerce ════════════════════════════════════════════════ */}
        <div>
          <p className="text-[9px] font-black text-[#D4AF37]/60 tracking-widest mb-2 text-right">
            Layer 2 — סחר The Box
          </p>

          {/* GIFT GROUPS */}
          <Block icon="🎁" title="קבוצות מתנה → The Box"
            color="#F472B6"
            baseLabel={`${GIFT_BASE}M ₪ יושבים בקבוצות מתנה פעילות (דיווחתם ✓)`}
            gain={R.giftRev}
            question="כמה % מהכסף בקבוצות המתנה (400M ₪) יעבור לרכישה דרך The Box?">
            <Slider label="% המרה לThe Box"
              min={0} max={50} step={5} value={giftConv} onChange={setGiftConv}
              unit="%" color="#F472B6" />
            {giftConv > 0 && (
              <p className="text-[9px] text-white/30 text-right mb-1">
                GMV: <span className="text-[#F472B6] font-bold">{R.giftGmv}M ₪</span>
              </p>
            )}
            <Slider label="% רווח לפייבוקס מהסחר"
              min={0.5} max={3.0} step={0.5} value={giftComm} onChange={setGiftComm}
              unit="%" color="#EC4899" decimals={1} />
          </Block>

          {/* GENERAL COMMERCE */}
          <Block icon="🔥" title="סחר כללי — כל הפעילות"
            color="#D4AF37"
            baseLabel="על האש · פוקר · האזנה פרטית · חופשות · הופעות · ועוד"
            gain={R.generalRev}
            question="כמה ₪ GMV צפוי מכלל הפעילות דרך The Box בשנה 1? (10M שמרני · 1B אופטימי)">
            <Slider label="GMV שנתי כולל (M ₪)"
              min={10} max={1000} step={10} value={generalGmv} onChange={setGeneralGmv}
              unit="M₪" color="#D4AF37" />
            <p className="text-[9px] text-white/30 text-right mb-1">
              GMV: <span className="text-[#D4AF37] font-bold">{generalGmv}M ₪</span>
            </p>
            <Slider label="% רווח לפייבוקס מהסחר"
              min={0.5} max={3.0} step={0.5} value={generalComm} onChange={setGeneralComm}
              unit="%" color="#B45309" decimals={1} />
          </Block>

          {/* Layer 2 total */}
          <div className="rounded-xl p-3 text-center"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <p className="text-[9px] text-[#D4AF37]/60 mb-0.5">Layer 2 — Commerce · GMV כולל: {R.totalGmv}M ₪</p>
            <p className="text-2xl font-black text-[#D4AF37]">+{R.layer2}M ₪/שנה</p>
          </div>
        </div>
      </div>

      {/* ══ BOTTOM: ONE NUMBER ════════════════════════════════════════════════ */}
      <div className="mt-3 rounded-2xl p-4 shrink-0 flex items-center gap-6"
        style={{ background: `${cc}08`, border: `1px solid ${cc}30` }}>

        <div className="text-center flex-1">
          <p className="text-[10px] font-bold tracking-widest mb-1" style={{ color: `${cc}80` }}>
            כמה כסף פייבוקס מרוויח עם BoomBuy — שנה 1
          </p>
          <p className="text-5xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
          <p className="text-xs text-white/30 mt-1">Layer 1: {R.layer1}M + Layer 2: {R.layer2}M</p>
        </div>

        <div className="w-px h-16 bg-white/10 shrink-0" />

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
            <p className="text-[9px] mb-0.5" style={{ color: `${cc}80` }}>P&L חדש</p>
            <p className="text-xl font-black" style={{ color: cc }}>
              {R.netResult >= 0 ? "+" : ""}{R.netResult}M ₪
            </p>
          </div>
          <div className="text-center rounded-xl px-3 py-1" style={{ background: `${cc}12` }}>
            <p className="text-[9px] text-white/25">Break-Even</p>
            <p className="text-xl font-black" style={{ color: cc }}>
              {R.monthsToZero < 120 ? R.monthsToZero : "∞"}
            </p>
            <p className="text-[9px] text-white/20">{R.monthsToZero < 120 ? "חודשים" : ""}</p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>Interchange: הנחת 0.3% · Float: 2% פער ריבית · טרנזקציות: TBD</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

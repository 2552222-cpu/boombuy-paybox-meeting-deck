import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { useSimulator, RETAINER, LOSS_TODAY, REV_TODAY } from "@/contexts/SimulatorContext";

const SCRIPT = `"זה לא מצגת — זה המספרים שלכם.
אתם קבעתם את ההנחות. אנחנו רק חישבנו."`;

function Row({ label, val, color, sub, big }) {
  return (
    <div className={`flex justify-between items-center py-1.5 border-b border-white/5 ${big ? "py-2.5" : ""}`}>
      <div>
        <span className={`font-bold text-white/70 ${big ? "text-sm" : "text-[11px]"}`}>{label}</span>
        {sub && <p className="text-[9px] text-white/25 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-black tabular-nums ${big ? "text-2xl" : "text-base"}`} style={{ color }}>
        {val}
      </span>
    </div>
  );
}

function Card({ title, icon, color, children }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
      <p className="text-[10px] font-black tracking-widest mb-3" style={{ color: `${color}90` }}>
        {icon} {title}
      </p>
      {children}
    </div>
  );
}

export default function SlideResults() {
  const { R } = useSimulator();

  const cc = R.netResult >= 0 ? "#4ade80" : R.totalGain >= RETAINER ? "#D4AF37" : "#60A5FA";

  // P&L rows
  const costsEstimate = +(REV_TODAY + LOSS_TODAY).toFixed(1); // ~118.7M
  const newRevTotal   = +(REV_TODAY + R.totalGain).toFixed(1);
  const newCosts      = +(costsEstimate + RETAINER).toFixed(1);

  return (
    <div className="relative min-h-full w-full flex flex-col px-5 md:px-9 py-6 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right mb-4 shrink-0">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">התוצאה</span>
        <div className="w-0.5 h-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-1 mb-1" />
        <h1 className="text-xl md:text-2xl font-black">לפי ההנחות שלכם — כך נראית שנה 1</h1>
        <p className="text-white/25 text-[10px]">כל המספרים נגזרים ישירות מהסימולטור שמילאתם</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">

        {/* ── COL 1: Layer 1 breakdown ── */}
        <Card title="Layer 1 — הכנסות אורגניות" icon="💳🏦" color="#60A5FA">
          <Row label="Interchange — שימוש בכרטיס ראשי"
            val={`+${R.intGain}M ₪`} color="#60A5FA"
            sub={`בסיס ${R.intBase}M ₪ → חדש ${R.intNew}M ₪`} />
          <Row label="Float — כסף שיושב בארנק"
            val={`+${R.floatGain}M ₪`} color="#34D399"
            sub={`938M ₪ יתרה × פער ריבית × גידול יתרה`} />
          <Row label="טרנזקציות — גידול נפח"
            val="TBD 🔵" color="#FB923C"
            sub={`2M → ${R.txnVolNew}M/חודש | הכנסה: הסכם טוקנים`} />

          <div className="mt-3 pt-2 border-t border-[#60A5FA]/20">
            <Row label="סה״כ Layer 1"
              val={`+${R.layer1}M ₪`} color="#60A5FA" big />
          </div>
        </Card>

        {/* ── COL 2: Layer 2 breakdown ── */}
        <Card title="Layer 2 — Commerce The Box" icon="🎁🔥🛍️" color="#D4AF37">
          <Row label="קבוצות מתנה → The Box"
            val={`+${R.giftRev}M ₪`} color="#F472B6"
            sub={`${R.giftGmv}M ₪ GMV · Commerce`} />
          <Row label='"על האש" — דילים מהירים'
            val={`+${R.ashRev}M ₪`} color="#F97316"
            sub={`GMV × Commerce%`} />
          <Row label="שאר קטגוריות The Box"
            val={`+${R.otherRev}M ₪`} color="#D4AF37"
            sub={`GMV × Commerce%`} />

          <div className="mt-2 text-[9px] text-white/25 text-right">
            GMV כולל: <span className="text-white/40 font-bold">{R.totalGmv}M ₪</span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#D4AF37]/20">
            <Row label="סה״כ Layer 2"
              val={`+${R.layer2}M ₪`} color="#D4AF37" big />
          </div>
        </Card>

        {/* ── COL 3: P&L Summary ── */}
        <Card title="P&L — לפני ואחרי BoomBuy" icon="📊" color={cc}>

          {/* Before */}
          <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
            <p className="text-[9px] font-black text-red-400/70 mb-2 tracking-widest">ללא BoomBuy — היום</p>
            <Row label="הכנסות" val={`${REV_TODAY}M ₪`} color="rgba(255,255,255,0.5)" />
            <Row label="עלויות (הערכה)" val={`~${costsEstimate}M ₪`} color="rgba(255,255,255,0.3)" />
            <Row label="הפסד שנתי" val={`-${LOSS_TODAY}M ₪`} color="#f87171" big />
          </div>

          {/* Arrow */}
          <div className="text-center my-1">
            <span className="text-xl font-black" style={{ color: cc }}>↓ עם BoomBuy</span>
          </div>

          {/* After */}
          <div className="rounded-xl p-3 mt-2" style={{ background: `${cc}08`, border: `1px solid ${cc}25` }}>
            <p className="text-[9px] font-black mb-2 tracking-widest" style={{ color: `${cc}90` }}>עם BoomBuy — שנה 1</p>
            <Row label="הכנסות כולל BoomBuy"
              val={`${newRevTotal}M ₪`} color="rgba(255,255,255,0.5)" />
            <Row label="עלויות + ריטנר"
              val={`~${newCosts}M ₪`} color="rgba(255,255,255,0.3)" />
            <Row label={R.netResult >= 0 ? "רווח שנתי 🎉" : "הפסד חדש"}
              val={`${R.netResult >= 0 ? "+" : ""}${R.netResult}M ₪`}
              color={cc} big />
          </div>

          {/* Break even */}
          <div className="mt-3 rounded-xl p-2 text-center" style={{ background: `${cc}10` }}>
            <p className="text-[9px] text-white/30">הריטנר מחזיר את עצמו תוך</p>
            <p className="text-3xl font-black" style={{ color: cc }}>
              {R.monthsToZero < 120 ? R.monthsToZero : "∞"}
            </p>
            <p className="text-[9px] text-white/30">
              {R.monthsToZero < 120 ? "חודשים מהיום" : "—שנו הנחות"}
            </p>
          </div>
        </Card>
      </div>

      {/* THE ONE BIG NUMBER */}
      <div className="mt-4 rounded-2xl p-5 shrink-0 text-center"
        style={{ background: `${cc}10`, border: `2px solid ${cc}40` }}>
        <p className="text-[11px] font-bold tracking-widest mb-1" style={{ color: `${cc}80` }}>
          סה״כ — כמה כסף פייבוקס מרוויח מהפעילות עם BoomBuy שנה 1
        </p>
        <p className="text-6xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
        <p className="text-sm text-white/30 mt-2">
          Layer 1 (אורגני): {R.layer1}M ₪  ·  Layer 2 (Commerce): {R.layer2}M ₪
          &nbsp;·&nbsp; טרנזקציות: TBD
        </p>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>כל המספרים לפי הנחות שהוזנו · Interchange: מודל מדורג לא ידוע · טרנזקציות: TBD</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import {
  useSimulator,
  INT_BASE, FLOAT_BASE_REV, GIFT_BASE,
  RETAINER, LOSS_TODAY, REV_TODAY,
} from "@/contexts/SimulatorContext";

const SCRIPT = `"זה לא מצגת — זה המספרים שלכם. אתם קבעתם את ההנחות."`;

const COSTS_EST = +(REV_TODAY + LOSS_TODAY).toFixed(1); // ~118.7M

function Row({ label, val, color, sub, big }) {
  return (
    <div className={`flex justify-between items-center ${big ? "py-2" : "py-1.5"} border-b border-white/5`}>
      <div>
        <span className={`font-bold text-white/65 ${big ? "text-sm" : "text-[11px]"}`}>{label}</span>
        {sub && <p className="text-[9px] text-white/25 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-black tabular-nums ${big ? "text-xl" : "text-base"}`} style={{ color }}>
        {val}
      </span>
    </div>
  );
}

export default function SlideResults() {
  const { R } = useSimulator();

  const cc = R.netResult >= 0 ? "#4ade80" : R.totalGain >= RETAINER ? "#D4AF37" : "#60A5FA";
  const newRevTotal = +(REV_TODAY + R.totalGain).toFixed(1);
  const newCosts    = +(COSTS_EST + RETAINER).toFixed(1);

  return (
    <div className="relative min-h-full w-full flex flex-col px-5 md:px-9 py-6 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right mb-4 shrink-0">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">התוצאה</span>
        <h1 className="text-xl md:text-2xl font-black mt-1">לפי ההנחות שלכם — כך נראית שנה 1</h1>
        <p className="text-white/25 text-[10px]">כל המספרים נגזרים ישירות מהסימולטור</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">

        {/* ── COL 1: Layer 1 ── */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.18)" }}>
          <p className="text-[9px] font-black text-[#60A5FA]/70 tracking-widest mb-3">💳🏦 Layer 1 — הכנסות אורגניות</p>

          <Row label="רווח סליקה (Interchange)"
            val={`+${R.intGain}M ₪`} color="#60A5FA"
            sub={`בסיס ${INT_BASE}M ₪ → חדש ${R.intTotal}M ₪`} />
          <Row label="ריבית Float — יתרה גדלה"
            val={`+${R.floatGain}M ₪`} color="#34D399"
            sub={`בסיס ${FLOAT_BASE_REV}M ₪ → חדש ${R.floatTotal}M ₪`} />
          <Row label="טרנזקציות — גידול נפח"
            val="TBD 🔵" color="#FB923C"
            sub={`2M → ${R.txnVolNew}M/חודש | הכנסה: TBD`} />

          <div className="mt-3 pt-2 border-t border-[#60A5FA]/20">
            <Row label="סה״כ Layer 1" val={`+${R.layer1}M ₪`} color="#60A5FA" big />
            <p className="text-[8px] text-white/15 text-right mt-1">טרנזקציות לא כלולות</p>
          </div>
        </div>

        {/* ── COL 2: Layer 2 ── */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)" }}>
          <p className="text-[9px] font-black text-[#D4AF37]/70 tracking-widest mb-3">🎁🔥 Layer 2 — Commerce The Box</p>

          <Row label="קבוצות מתנה"
            val={`+${R.giftRev}M ₪`} color="#F472B6"
            sub={`${GIFT_BASE}M ₪ → GMV ${R.giftGmv}M ₪`} />
          <Row label="סחר כללי (כל הפעילות)"
            val={`+${R.generalRev}M ₪`} color="#D4AF37"
            sub={`GMV ${R.generalGmv || 0}M ₪ × Commerce%`} />

          <p className="text-[9px] text-white/20 text-right mt-2">
            GMV כולל: <span className="text-white/35 font-bold">{R.totalGmv}M ₪</span>
          </p>

          <div className="mt-3 pt-2 border-t border-[#D4AF37]/20">
            <Row label="סה״כ Layer 2" val={`+${R.layer2}M ₪`} color="#D4AF37" big />
          </div>
        </div>

        {/* ── COL 3: P&L ── */}
        <div className="rounded-2xl p-4" style={{ background: `${cc}06`, border: `1px solid ${cc}20` }}>
          <p className="text-[9px] font-black tracking-widest mb-3" style={{ color: `${cc}70` }}>📊 P&L — לפני ואחרי BoomBuy</p>

          {/* Before */}
          <div className="rounded-xl p-3 mb-2" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.18)" }}>
            <p className="text-[9px] font-black text-red-400/70 mb-1.5">ללא BoomBuy — היום</p>
            <Row label="הכנסות" val={`${REV_TODAY}M ₪`} color="rgba(255,255,255,0.45)" />
            <Row label="עלויות" val={`~${COSTS_EST}M ₪`} color="rgba(255,255,255,0.25)" />
            <Row label="הפסד" val={`-${LOSS_TODAY}M ₪`} color="#f87171" big />
          </div>

          <div className="text-center py-1">
            <span className="text-lg font-black" style={{ color: cc }}>↓ עם BoomBuy</span>
          </div>

          {/* After */}
          <div className="rounded-xl p-3 mt-1" style={{ background: `${cc}08`, border: `1px solid ${cc}22` }}>
            <p className="text-[9px] font-black mb-1.5" style={{ color: `${cc}80` }}>עם BoomBuy — שנה 1</p>
            <Row label="הכנסות + BoomBuy" val={`${newRevTotal}M ₪`} color="rgba(255,255,255,0.45)" />
            <Row label="עלויות + ריטנר" val={`~${newCosts}M ₪`} color="rgba(255,255,255,0.25)" />
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
              {R.monthsToZero < 120 ? "חודשים" : "שנו הנחות"}
            </p>
          </div>
        </div>
      </div>

      {/* THE ONE BIG NUMBER */}
      <div className="mt-4 rounded-2xl p-5 shrink-0 text-center"
        style={{ background: `${cc}10`, border: `2px solid ${cc}40` }}>
        <p className="text-[11px] font-bold tracking-widest mb-1" style={{ color: `${cc}80` }}>
          סה״כ — פייבוקס מרוויח מהפעילות עם BoomBuy שנה 1
        </p>
        <p className="text-6xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
        <p className="text-sm text-white/30 mt-2">
          Layer 1 (אורגני): {R.layer1}M ₪ · Layer 2 (Commerce): {R.layer2}M ₪ · טרנזקציות: TBD
        </p>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>הנחות: Interchange 0.3% · Float 2% · שאר לפי הסימולטור</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

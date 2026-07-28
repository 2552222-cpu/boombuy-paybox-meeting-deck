import React from "react";
import { motion } from "framer-motion";
import { useSimulator } from "@/contexts/SimulatorContext";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { ArrowDown } from "lucide-react";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const PURPLE  = "#8b5cf6";
const GREEN   = "#4ade80";

const SCRIPT = `"והנה התוצאה.

כל מספר כאן חושב ישירות מהנתונים שהזנתם — שקוף וברור. רואים בדיוק איך כל רווח נגזר, ואיך שלושת מנועי ההכנסה מתחברים לרווח שנתי אחד."`;

const fmt = (n) => Math.round(n).toLocaleString("en-US");

function CalcRow({ color, badge, lines, result }) {
  return (
    <div className="rounded-2xl p-4 border"
      style={{ background: color + "0D", borderColor: color + "33" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: color + "22", color }}>
          {badge}
        </span>
      </div>
      <div className="space-y-1 text-sm text-white/70 leading-relaxed text-right" dir="rtl">
        {lines.map((l, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: l }} />
        ))}
      </div>
      <div className="mt-3 pt-3 border-t text-right" style={{ borderColor: color + "22" }}>
        <div className="text-[11px] text-white/40">רווח שנתי משוער</div>
        <div className="text-2xl font-black" style={{ color }}>₪{fmt(result)}</div>
      </div>
    </div>
  );
}

const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function SlideResults() {
  const {
    calculated,
    interchangeCurrent, interchangeGrowthPct,
    floatBalance, floatGrowthPct,
    giftAnnualVolume,
    R,
  } = useSimulator();

  if (!calculated) {
    return (
      <div dir="rtl" className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 text-white"
        style={{ background: "linear-gradient(160deg, #060e1c 0%, #0B1930 60%, #0D1F3C 100%)", fontFamily: "'Heebo', sans-serif" }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🧮</div>
          <h2 className="text-2xl font-black mb-2">התוצאות מופיעות כאן לאחר החישוב</h2>
          <p className="text-white/45 flex items-center justify-center gap-1.5 text-sm">
            חזרו לשקף הסימולטור <ArrowDown className="w-4 h-4 rotate-90" /> הזינו נתונים ולחצו חשב
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative min-h-screen w-full flex flex-col px-6 md:px-12 py-8 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060e1c 0%, #0B1930 60%, #0D1F3C 100%)", fontFamily: "'Heebo', sans-serif" }}>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
        className="flex-1 flex flex-col min-h-0">

        {/* Header + total */}
        <motion.div variants={item} className="shrink-0 flex items-start justify-between mb-5 gap-5">
          <div className="flex items-start gap-5">
            <div className="w-0.5 h-16 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent mt-1" />
            <div className="text-right">
              <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>תוצאות הסימולטור</span>
              <h1 className="mt-2 text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em]">
                רווח שנתי משוער <span style={{ color: GREEN }}>מהפעילות</span>
              </h1>
              <p className="mt-1 text-white/45 text-sm">כל מספר חושב ישירות מהנתונים שהזנתם · לפניכם הסבר מלא</p>
            </div>
          </div>
          <div className="text-right rounded-2xl px-5 py-3 border shrink-0"
            style={{ background: GREEN + "12", borderColor: GREEN + "44" }}>
            <div className="text-xs text-white/50">סה"כ רווח שנתי משוער</div>
            <div className="text-3xl md:text-4xl font-black mt-0.5" style={{ color: GREEN }}>₪{fmt(R.totalYearly)}</div>
          </div>
        </motion.div>

        {/* Breakdown */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
          <motion.div variants={item}>
            <CalcRow
              color={PB_BLUE}
              badge="Interchange · הכרטיס"
              lines={[
                `רווח נוכחי: ₪${fmt(interchangeCurrent)}/חודש`,
                `צפי גידול: ${interchangeGrowthPct}%`,
                `רווח חודשי נוסף = ${interchangeGrowthPct}% × ₪${fmt(interchangeCurrent)} = <b style="color:${PB_BLUE}">₪${fmt(R.intMonthlyGain)}</b>`,
                `רווח שנתי = ₪${fmt(R.intMonthlyGain)} × 12 חודשים`,
              ]}
              result={R.intYearlyGain}
            />
          </motion.div>

          <motion.div variants={item}>
            <CalcRow
              color={PURPLE}
              badge="Float · יתרות לקוחות"
              lines={[
                `יתרה חודשית ממוצעת: ₪${fmt(floatBalance)}`,
                `צפי גידול: ${floatGrowthPct}% (ZUZ מגדיל זמן שהייה)`,
                `רווח חודשי נוסף = ${floatGrowthPct}% × ₪${fmt(floatBalance)} × 2% = <b style="color:${PURPLE}">₪${fmt(R.floatMonthlyGain)}</b>`,
                `רווח שנתי = ₪${fmt(R.floatMonthlyGain)} × 12 חודשים`,
              ]}
              result={R.floatYearlyGain}
            />
          </motion.div>

          <motion.div variants={item}>
            <CalcRow
              color={GOLD}
              badge="מתנות והטבות"
              lines={[
                `מחזור שנתי: ₪${fmt(giftAnnualVolume)}`,
                `אחוז עמלה קבוע: 3%`,
                `רווח שנתי = ₪${fmt(giftAnnualVolume)} × 3%`,
              ]}
              result={R.giftYearlyProfit}
            />
          </motion.div>
        </div>

        {/* Total equation */}
        <motion.div variants={item} className="shrink-0 mt-5 rounded-2xl px-5 py-4 border flex items-center justify-center gap-3 flex-wrap"
          style={{ background: GREEN + "0D", borderColor: GREEN + "33" }}>
          <span className="text-sm" style={{ color: PB_BLUE }}>₪{fmt(R.intYearlyGain)}</span>
          <span className="text-white/40">+</span>
          <span className="text-sm" style={{ color: PURPLE }}>₪{fmt(R.floatYearlyGain)}</span>
          <span className="text-white/40">+</span>
          <span className="text-sm" style={{ color: GOLD }}>₪{fmt(R.giftYearlyProfit)}</span>
          <span className="text-white/40 text-lg">=</span>
          <span className="text-2xl font-black" style={{ color: GREEN }}>₪{fmt(R.totalYearly)}</span>
          <span className="text-xs text-white/40">רווח שנתי משוער מהפעילות</span>
        </motion.div>

        <motion.div variants={item} className="shrink-0 mt-4 rounded-2xl px-6 py-5 text-center"
          style={{ background: "rgba(146,39,176,0.10)", border: "1px solid rgba(146,39,176,0.30)" }}>
          <div className="text-2xl mb-2">⚠️</div>
          <p className="text-base font-black text-white leading-snug">
            הערכה זו מתייחסת לרווח לפני פיתוח ערוצי הכנסה משותפים
          </p>
          <p className="text-sm text-white/70 mt-1.5 leading-relaxed">
            (כגון ארנק מתנות לחגים ועוד) — <span className="font-black" style={{ color: "#E879F9" }}>מדובר בפוטנציאל נוסף שטרם מומש</span>
          </p>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-white/20 text-[11px] mt-4 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>11 / 16</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
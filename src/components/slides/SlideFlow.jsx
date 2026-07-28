import React from "react";
import { motion } from "framer-motion";
import { useSimulator } from "@/contexts/SimulatorContext";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const PURPLE  = "#8b5cf6";
const GREEN   = "#4ade80";

const SCRIPT = `"סימולטור צפי הכנסות ורווחים.

אנחנו מבקשים מכם להזין שלושה נתונים שאתם מכירים היטב — שניים מהם מהפעילות הפיננסית שלכם היום, ואחד מהמחזור השנתי של מתנות והטבות.

לכל נתון יש הערכת גידול — הזיזו את הסליידר לפי ההערכה שלכם, בלחצו חשב, ובשקף הבא נראה את הרווח השנתי המשוער עם הסבר מלא איך הוא חושב."`;

const fmt = (n) => Math.round(n).toLocaleString("en-US");

function NumberField({ label, value, onChange, hint }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-white/80 font-medium">{label}</span>
      </div>
      <div className="relative">
        <input
          type="number"
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Math.max(0, +e.target.value || 0))}
          placeholder="0"
          className="w-full text-right pr-12 pl-3 py-2.5 rounded-xl text-lg font-bold text-white bg-white/5 border border-white/15 focus:outline-none focus:border-white/40 transition-colors"
          style={{ fontFamily: "'Heebo', sans-serif" }}
          dir="ltr"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold pointer-events-none">₪</span>
      </div>
      {hint && <div className="text-[11px] text-white/35 mt-1 leading-snug">{hint}</div>}
    </div>
  );
}

function Slider({ label, sub, value, min, max, step, format, onChange, color }) {
  const pct = Math.min(100, ((value - min) / (max - min)) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-white/80 font-medium">{label}</span>
        <span className="text-base font-black" style={{ color }}>{format ? format(value) : value}</span>
      </div>
      {sub && <div className="text-[11px] text-white/35 mb-2 leading-snug">{sub}</div>}
      <div className="relative h-2.5 rounded-full bg-white/10">
        <div className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}

function Section({ color, title, icon, children }) {
  return (
    <div className="rounded-2xl p-4 border"
      style={{ background: color + "0D", borderColor: color + "33" }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: color + "22" }}>
        <span className="text-xl">{icon}</span>
        <span className="font-black text-base" style={{ color }}>{title}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function SlideFlow() {
  const sim = useSimulator();
  const {
    interchangeCurrent,  setInterchangeCurrent,
    interchangeGrowthPct, setInterchangeGrowthPct,
    floatBalance,   setFloatBalance,
    floatGrowthPct,  setFloatGrowthPct,
    giftAnnualVolume,  setGiftAnnualVolume,
    giftCommissionPct, setGiftCommissionPct,
    calculated, setCalculated,
    reset, R,
  } = sim;

  const hasInput = interchangeCurrent > 0 || floatBalance > 0 || giftAnnualVolume > 0;

  function handleCalc() {
    setCalculated(true);
  }
  function handleReset() {
    reset();
  }

  return (
    <div dir="rtl" className="relative min-h-screen w-full flex flex-col px-6 md:px-12 py-8 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060e1c 0%, #0B1930 60%, #0D1F3C 100%)", fontFamily: "'Heebo', sans-serif" }}>
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
        className="flex-1 flex flex-col min-h-0">

        {/* Header */}
        <motion.div variants={item} className="shrink-0 text-right mb-4">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: GOLD }}>סימולטור אינטראקטיבי</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em]">
            סימולטור צפי <span style={{ color: PB_BLUE }}>הכנסות</span> ו<span style={{ color: GOLD }}>רווחים</span>
          </h1>
          <p className="mt-1 text-white/45 text-sm">הזינו את הנתונים שלכם · לחצו חשב · קבלו הערכת רווח שנתי עם הסבר מלא</p>
        </motion.div>

        {/* Inputs */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
          <motion.div variants={item}>
            <Section color={PB_BLUE} icon="💳" title="Interchange — גדילה מהכרטיס">
              <NumberField
                label="רווח נוכחי מהעמלות"
                value={interchangeCurrent}
                onChange={setInterchangeCurrent}
                hint="רווח חודשי נוכחי מעמלת הסליקה (מספר)"
              />
              <Slider
                label="צפי לגדילה באחוזים"
                sub="גידול בפעולות באמצעות נקודות והצעות ערך יחודיות למחזיקי האשראי"
                value={interchangeGrowthPct}
                min={0} max={50} step={1}
                format={(v) => `${v}%`}
                onChange={setInterchangeGrowthPct}
                color={PB_BLUE}
              />
              <div className="text-[11px] text-white/45 rounded-lg px-2 py-1.5" style={{ background: PB_BLUE + "11" }}>
                חישוב: הרווח החודשי הנוסף = {interchangeGrowthPct}% × ₪{fmt(interchangeCurrent)}
                {interchangeCurrent > 0 && interchangeGrowthPct > 0 && (
                  <div className="mt-0.5 font-bold" style={{ color: PB_BLUE }}>= ₪{fmt(R.intMonthlyGain)}/חודש</div>
                )}
              </div>
            </Section>
          </motion.div>

          <motion.div variants={item}>
            <Section color={PURPLE} icon="🏦" title="Float — יתרות לקוחות">
              <NumberField
                label="יתרה חודשית ממוצעת בחודש"
                value={floatBalance}
                onChange={setFloatBalance}
                hint="סכום היתרות הממוצע של לקוחות (מספר)"
              />
              <Slider
                label="גידול צפוי באחוזים"
                sub="ZUZ מגדיל זמן שהייה — תמריץ להשאיר כסף בפייבוקס במקום למשוך"
                value={floatGrowthPct}
                min={0} max={50} step={1}
                format={(v) => `${v}%`}
                onChange={setFloatGrowthPct}
                color={PURPLE}
              />
              <div className="text-[11px] text-white/45 rounded-lg px-2 py-1.5" style={{ background: PURPLE + "11" }}>
                חישוב: רווח חודשי = {floatGrowthPct}% × ₪{fmt(floatBalance)} × 2% ריבית
                {floatBalance > 0 && floatGrowthPct > 0 && (
                  <div className="mt-0.5 font-bold" style={{ color: PURPLE }}>= ₪{fmt(R.floatMonthlyGain)}/חודש</div>
                )}
              </div>
            </Section>
          </motion.div>

          <motion.div variants={item}>
            <Section color={GOLD} icon="🎁" title="מחזור מכירות מתנות והטבות">
              <NumberField
                label="מחזור שנתי משוער"
                value={giftAnnualVolume}
                onChange={setGiftAnnualVolume}
                hint="מחזור מכירות מתנות והטבות שנתי משוער (סכום)"
              />
              <Slider
                label="אחוז עמלה מהמחזור"
                sub="אחוז העמלה שמתקבל ממחזור המתנות וההטבות"
                value={giftCommissionPct}
                min={0} max={10} step={0.5}
                format={(v) => `${v}%`}
                onChange={setGiftCommissionPct}
                color={GOLD}
              />
              <div className="text-[11px] text-white/45 rounded-lg px-2 py-1.5" style={{ background: GOLD + "11" }}>
                חישוב: רווח שנתי = ₪{fmt(giftAnnualVolume)} × {giftCommissionPct}%
                {giftAnnualVolume > 0 && (
                  <div className="mt-0.5 font-bold" style={{ color: GOLD }}>= ₪{fmt(R.giftYearlyProfit)}/שנה</div>
                )}
              </div>
            </Section>
          </motion.div>
        </div>

        {/* Continue button */}
        <motion.div variants={item} className="shrink-0 mt-4 flex flex-col items-center gap-2">
          {!calculated ? (
            <>
              <button
                onClick={handleCalc}
                disabled={!hasInput}
                className="px-10 py-3 rounded-2xl font-black text-lg transition-transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)", color: "#0B1930" }}>
                חשב →
              </button>
              <div className="text-xs text-white/40">לחצו לאחר הזנת הנתונים</div>
            </>
          ) : (
            <div className="w-full rounded-2xl px-5 py-4 border flex items-center justify-between gap-4"
              style={{ background: GREEN + "10", borderColor: GREEN + "33" }}>
              <div className="text-right">
                <div className="text-sm text-white/50">רווח שנתי משוער מכלל הפעילות</div>
                <div className="text-3xl font-black" style={{ color: GREEN }}>₪{fmt(R.totalYearly)}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-white/50 text-right">רדו לשקף הבא<br />לפירוט מלא והסבר החישוב ↓</div>
                <button onClick={handleReset}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">
                  ↺ איפוס והתחלה מחדש
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-white/20 text-[11px] mt-4 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>10 / 16</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Percent, ArrowRight } from "lucide-react";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// Commerce % shown to PayBox is ONLY 0.5–1% of GMV.
// BoomBuy's actual purchase/sale margin is NEVER disclosed here.
const OFFSETS = [
  {
    icon: ShoppingBag,
    title: "Commerce — מחזור The Box",
    desc: "% מוסכם מה-GMV של המועדון. מתנות, על האש, פוקר, נסיעות — כל קטגוריה מולידה הכנסה.",
    est: "GMV × % עמלה",
    color: "#34D399",
  },
  {
    icon: TrendingUp,
    title: "Interchange — First in Wallet",
    desc: "מודל Interchange מדורג — שיפור FIW מ-10% ל-22%+ = מחזור גדל = Interchange גדל לפייבוקס.",
    est: "~20M ₪ → 25M+ ₪/שנה (מדורג)",
    color: "#5BA4CF",
  },
  {
    icon: Percent,
    title: "כרטיסים חדשים + Float",
    desc: "ZUZ מושך 60K כרטיסים חדשים בשנה. כסף שיושב יותר זמן = float גבוה יותר = ריבית לדיסקונט.",
    est: "+12M ₪/שנה שנה 1",
    color: "#FBBF24",
  },
];

const SCRIPT = `"אתם משלמים לנו ריטיינר של 350 אלף שקל בחודש.

מה זה כולל? הכל. טכנולוגיה. שני מועדונים. צוות סחר. שירות לקוחות. ובעיקר — הסבסוד שאין לכם תקציב לממן.

ועכשיו לחלק החשוב: The Box מניע שלושה מנועי הכנסה. הראשון — Commerce: % מוסכם מה-GMV של המועדון. השני — Interchange: כשהכרטיס הופך לראשי, כל שקל עובר דרככם. השלישי — כרטיסים חדשים ו-float גדל.

כשה-GMV מגיע לנקודת האיזון — הריטנר מתכסה. נקודת האיזון נחשב יחד בסימולטור."`;

const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Slide4() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-12 overflow-hidden"
      style={{ background: "#0B1930" }}>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        className="flex-1 flex flex-col justify-between">

        {/* Header */}
        <motion.div variants={item} className="text-right flex items-start gap-5 justify-end">
          <div>
            <span className="text-sm font-bold text-[#5BA4CF] tracking-[0.18em] uppercase">המודל העסקי</span>
            <h1 className="mt-2 text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-[-0.02em]">
              שותפות מבוססת הצלחה.<br />
              <span className="text-[#5BA4CF]">סיכון כניסה מוגבל, מדיד וחוזי.</span>
            </h1>
          </div>
          <div className="h-16 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent shrink-0 mt-1" />
        </motion.div>

        {/* Retainer box */}
        <motion.div variants={item}
          className="rounded-2xl border p-7 my-8"
          style={{ borderColor: "#D4AF37" + "40", background: "#D4AF37" + "0a" }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-right">
              <p className="text-[#D4AF37] font-bold text-xs tracking-[0.18em] uppercase mb-1">ריטיינר חודשי</p>
              <p className="text-white font-black text-5xl md:text-6xl">₪350,000</p>
              <p className="text-gray-400 text-sm mt-1.5">= 350K ₪/חודש · 4.2M ₪/שנה</p>
            </div>
            <div className="text-white/20 text-2xl font-thin mx-2">·</div>
            <ul className="space-y-2.5 text-right">
              {["הקמה ורישוי טכנולוגיה (NEXUS OS)", "ניהול 2 מועדונים (PayBox CC + Young)", "צוותי סחר, שירות ותפעול", "סבסוד ההטבות — על חשבוננו"].map((t, i) => (
                <li key={i} className="flex items-center gap-2 flex-row-reverse text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Income stream cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFSETS.map((o, i) => (
            <motion.div key={i} variants={item}
              className="rounded-2xl p-6 border text-right"
              style={{ background: `${o.color}0d`, borderColor: `${o.color}28` }}>
              <o.icon className="w-5 h-5 mb-4" style={{ color: o.color }} strokeWidth={1.5} />
              <p className="text-white font-black text-base mb-2">{o.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">{o.desc}</p>
              <span className="rounded-full px-3 py-1 text-xs font-black"
                style={{ background: `${o.color}1a`, color: o.color }}>
                {o.est}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div variants={item}
          className="mt-5 rounded-2xl bg-white/4 border border-white/8 px-8 py-4 flex items-center justify-center gap-4 text-center">
          <span className="text-white font-black text-lg">350K ריטנר</span>
          <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" strokeWidth={1.5} />
          <span className="text-[#34D399] font-black text-lg">Commerce + Interchange + כרטיסים</span>
          <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" strokeWidth={1.5} />
          <span className="text-white font-black text-lg">עלות נטו: <span className="text-[#34D399]">₪0</span></span>
          <span className="text-gray-500 text-sm">· לפי תוצאות הפיילוט</span>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-gray-600 text-[11px] shrink-0 mt-6">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>04 / 12</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

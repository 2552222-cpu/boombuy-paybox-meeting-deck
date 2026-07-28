import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const SCRIPT = `"שתי שכבות הכנסה ברורות.

שכבה 1 — הכסף שכבר בפנים, פשוט גדל. Interchange עולה כי הכרטיס הופך ראשי. Float עולה כי הלקוחות משאירים כסף ומקבלים נקודות. כרטיסים חדשים נוספים כי הערך עולה — וכל הנפקה דוחפת סליקה נוספת.

שכבה 2 — כסף חדש לגמרי. קבוצות מתנה שממירים לקנייה. עמלות סחר מכל מחזור הקניות. ורווחים מתקציבי מתנות חדשים — ארנק מתנות לחגים, ערוצים משותפים.

המספרים? עכשיו הסימולטור."`;

const L1 = [
  {
    icon: "💳",
    title: "Interchange",
    desc: "גדילה מהרוויחים של עמלת הסליקה בזכות שימוש גדול יותר בכרטיס האשראי",
    color: "#4F7FE0",
  },
  {
    icon: "🏦",
    title: "Float",
    desc: "יתרת לקוחות גדלה בזכות עידוד השארת כסף באפליקציה וקבלת נקודות",
    color: "#8b5cf6",
  },
  {
    icon: "🪪",
    title: "כרטיסים חדשים",
    desc: "יותר ערך לכרטיס האשראי = יותר הנפקות",
    color: "#34D399",
  },
];

const L2 = [
  {
    icon: "🎁",
    title: "קבוצות מתנה",
    desc: "400M ₪ פעיל בקבוצות מתנה → % המרה לקנייה ב-The Box",
    color: "#D4AF37",
  },
  {
    icon: "🛍️",
    title: "עמלות סחר",
    desc: "עמלות הנוצרות ממחזור קניות מוצרים ומתנות של המשתמשים",
    color: "#fb923c",
  },
  {
    icon: "✨",
    title: "תקציבי מתנות וערוצים משותפים",
    desc: "הכנסות ממוצרים ושירותים חדשים שיופעלו במסגרת השותפות כגון ארנק מתנות לחגים",
    color: "#ec4899",
  },
];

const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function Slide9() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col px-8 md:px-16 py-12 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #07101E 0%, #0B1930 60%, #0D1F3C 100%)" }}
    >
      {/* Gold top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        className="flex-1 flex flex-col">

        {/* Header */}
        <motion.div variants={item} className="text-right shrink-0">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: "#D4AF37" }}>ערך השותפות</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black leading-[1.06] tracking-[-0.02em]">
            שתי שכבות הכנסה.<br />
            <span style={{ color: "#4F7FE0" }}>הכסף כבר בפנים — הוא פשוט גדל.</span>
          </h1>
          <p className="mt-3 text-white/40 text-base">שכבה 1 מגדילה את מה שיש · שכבה 2 מייצרת מה שאין</p>
        </motion.div>

        {/* Two layers */}
        <div className="flex-1 flex gap-8 mt-8 min-h-0">

          {/* Layer 1 */}
          <motion.div variants={item} className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #4F7FE0, transparent)" }} />
              <span className="text-sm font-black tracking-widest" style={{ color: "#4F7FE0" }}>
                שכבה 1 — הכנסות קיימות שגדלות
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {L1.map((e, i) => (
                <div key={i} className="flex-1 flex items-center gap-4 rounded-2xl px-5 py-4 border"
                  style={{ background: e.color + "0B", borderColor: e.color + "26" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: e.color + "22", border: `1px solid ${e.color}40` }}>
                    {e.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-lg" style={{ color: e.color }}>{e.title}</p>
                    <p className="text-sm text-white/55 leading-relaxed mt-0.5">{e.desc}</p>
                  </div>
                  <div className="text-2xl font-black shrink-0" style={{ color: e.color }}>↑</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-px self-stretch" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }} />

          {/* Layer 2 */}
          <motion.div variants={item} className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #D4AF37, transparent)" }} />
              <span className="text-sm font-black tracking-widest" style={{ color: "#D4AF37" }}>
                שכבה 2 — הכנסות חדשות לגמרי
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {L2.map((e, i) => (
                <div key={i} className="flex-1 flex items-center gap-4 rounded-2xl px-5 py-4 border"
                  style={{ background: e.color + "0B", borderColor: e.color + "26" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: e.color + "22", border: `1px solid ${e.color}40` }}>
                    {e.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-lg" style={{ color: e.color }}>{e.title}</p>
                    <p className="text-sm text-white/55 leading-relaxed mt-0.5">{e.desc}</p>
                  </div>
                  <div className="text-2xl font-black shrink-0" style={{ color: e.color }}>+</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between text-white/20 text-[11px] mt-6 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>09 / 16</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
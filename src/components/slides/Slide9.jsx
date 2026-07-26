import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const SCRIPT = `"אני רוצה להסביר לכם למה הריטנר הוא ההשקעה הכי טובה שתעשו.

The Box מניע שני מנועי הכנסה מקבילים.

שכבה ראשונה — הכסף שלכם, פשוט גדל. Interchange גדל כי כרטיס פייבוקס הופך לראשי. Float גדל כי כסף נשאר יותר זמן בחשבון.

שכבה שנייה — כסף חדש לגמרי. קבוצות מתנה שממירים לקנייה. ZUZ מטרנזקציות שהופך לגלגל קנייה ב-The Box. סחר כללי.

הריטנר? ברגע שה-GMV מגיע ל-420 מיליון — 1% מחזיר אותו מלא. מה שמעל — שלכם.

עכשיו הסימולטור מזין מספרים — הסימולטור מחשב לכם את הכל בזמן אמת."`;

const L1 = [
  { icon: "💳", title: "Interchange", note: "560M ₪ סליקה חודשית → FIW עולה מ-10% ל-22%+", color: "#4F7FE0" },
  { icon: "🏦", title: "Float", note: "938M ₪ יתרת לקוחות × 2% ריבית נטו", color: "#8b5cf6" },
  { icon: "💳", title: "כרטיסים חדשים", note: "ZUZ מושך 60K כרטיסים/שנה → סליקה גדלה", color: "#4F7FE0" },
];

const L2 = [
  { icon: "🎁", title: "קבוצות מתנה", note: "400M ₪ פעיל → % המרה לקנייה ב-The Box", color: "#D4AF37" },
  { icon: "⚡", title: "ZUZ מטרנזקציות", note: "2M עסקאות → ZUZ → 3% המרה → GMV חדש", color: "#22d3ee" },
  { icon: "🛍️", title: "סחר כללי", note: "כלל הפעילות של BoomBuy דרך הפלטפורמה", color: "#fb923c" },
];

const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function Slide9() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col px-8 md:px-16 py-10 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #07101E 0%, #0B1930 60%, #0D1F3C 100%)" }}
    >
      {/* Gold top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        className="flex-1 flex flex-col justify-between">

        {/* Header */}
        <motion.div variants={item} className="text-right">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: "#D4AF37" }}>ערך השותפות</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black leading-[1.06] tracking-[-0.02em]">
            שתי שכבות הכנסה.<br />
            <span style={{ color: "#4F7FE0" }}>הכסף כבר בפנים | הוא פשוט גדל.</span>
          </h1>
          <p className="mt-2 text-white/35 text-sm">שכבה 1 מגדילה את מה שיש · שכבה 2 מייצרת מה שאין</p>
        </motion.div>

        {/* Two layers */}
        <div className="flex gap-4 mt-6">

          {/* Layer 1 */}
          <motion.div variants={item} className="flex-1">
            <div className="text-xs font-black tracking-widest mb-3 text-right" style={{ color: "#4F7FE0" }}>
              שכבה 1 | הכנסות קיימות שגדלות
            </div>
            <div className="space-y-2">
              {L1.map((e, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: e.color + "18" }}>
                    {e.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-white">{e.title}</p>
                    <p className="text-[11px] text-white/40 leading-snug">{e.note}</p>
                  </div>
                  <div className="text-xs font-black" style={{ color: e.color }}>↑</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl px-4 py-3 text-center border"
              style={{ background: "#0a1628", borderColor: "#4F7FE033" }}>
              <div className="text-xs text-white/40">תוצאה שנה 1</div>
              <div className="text-lg font-black mt-0.5" style={{ color: "#4F7FE0" }}>לפי נתוני PayBox</div>
              <div className="text-xs text-white/25">תזינו בסימולטור → המספר יחושב עלפי נתוניכם</div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-1" />

          {/* Layer 2 */}
          <motion.div variants={item} className="flex-1">
            <div className="text-xs font-black tracking-widest mb-3 text-right" style={{ color: "#D4AF37" }}>
              שכבה 2 | הכנסות חדשות לגמרי
            </div>
            <div className="space-y-2">
              {L2.map((e, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: e.color + "18" }}>
                    {e.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-white">{e.title}</p>
                    <p className="text-[11px] text-white/40 leading-snug">{e.note}</p>
                  </div>
                  <div className="text-xs font-black" style={{ color: e.color }}>+</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl px-4 py-3 text-center border"
              style={{ background: "#120a00", borderColor: "#D4AF3733" }}>
              <div className="text-xs text-white/40">תלוי בתשובותיכם | נחשב יחד</div>
              <div className="text-2xl font-black mt-0.5" style={{ color: "#D4AF37" }}>X%  × GMV</div>
              <div className="text-xs text-white/25">הסימולטור מחשב בזמן אמת</div>
            </div>
          </motion.div>
        </div>

        {/* Retainer summary */}
        <motion.div variants={item}
          className="mt-5 rounded-2xl px-6 py-4 flex items-center justify-between border"
          style={{ background: "rgba(212,175,55,0.07)", borderColor: "rgba(212,175,55,0.2)" }}>
          <div className="text-right">
            <div className="text-xs text-white/35">ריטנר חודשי | שותפות, לא ספק</div>
            <div className="text-3xl font-black" style={{ color: "#D4AF37" }}>350,000 ₪</div>
          </div>
          <div className="text-white/35 text-3xl font-thin">→</div>
          <div className="text-right">
            <div className="text-xs text-white/35">Break-even Commerce</div>
            <div className="text-3xl font-black text-white">420M ₪ GMV</div>
            <div className="text-xs text-white/25">× 1% = 4.2M ₪ = ריטנר</div>
          </div>
          <div className="text-white/35 text-3xl font-thin">→</div>
          <div className="text-center">
            <div className="text-xs font-black tracking-widest mb-1" style={{ color: "#4ade80" }}>עכשיו | בואו נחשב</div>
            <div className="text-sm text-white/50">👇 סימולטור</div>
          </div>
        </motion.div>

      </motion.div>

      <div className="flex items-center justify-between text-white/20 text-[11px] mt-4 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>09 / 16</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

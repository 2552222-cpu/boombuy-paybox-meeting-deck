import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PayBoxLogo } from "@/components/slides/Logos";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const THE_BOX_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png";
const BOOMBUY_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/f01a26580_.png";

const CATS = [
  { e: "🎁", t: "Box Gifts",            l: "מתנות כלליות" },
  { e: "💳", t: "Box Gift Cards",       l: "כרטיסי מתנה" },
  { e: "📚", t: "Box Teacher Gifts",    l: "למורות וגננות" },
  { e: "👟", t: "Box Fashion & Footwear",l: "אופנה והנעלה" },
  { e: "✈️", t: "Box Holidays & Travel", l: "חופשות וטיולים" },
  { e: "🎭", t: "Box Culture",           l: "תרבות ופנאי" },
  { e: "🍷", t: "Box Alcohol & Wine",    l: "אלכוהול ויין" },
  { e: "🥩", t: "Box Barbecue",          l: "על האש" },
];

const SCRIPT = `"תסתכלו לרגע על הלוגו שלכם. PayBox — ארנק ההעברות הגדול בישראל.

מה אם נגיד לכם שבלי לשנות שום דבר מהיסוד, פייבוקס כבר היום הוא המועדון הצרכנות הגדול בישראל — אתם פשוט לא ידעתם שאתם כזה?

הכירו את The Box — ובשעה הקרובה נראה לכם בדיוק מה זה אומר לתחתית השורה שלכם."`;

// Entrance animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } }
};
const itemLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 26 } }
};
const itemRight = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 26, delay: 0.3 } }
};
const heroText = {
  hidden: { opacity: 0, y: 36, skewY: 2 },
  show: { opacity: 1, y: 0, skewY: 0, transition: { type: "spring", stiffness: 260, damping: 24, delay: 0.25 } }
};

export default function Slide1() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Intro flash overlay */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{ background: "white" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* Top bar */}
      <motion.div
        className="relative flex items-center justify-between shrink-0"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <img src={BOOMBUY_LOGO}
          alt="BoomBuy" className="h-8 w-auto object-contain brightness-0 invert opacity-80" />
        <PayBoxLogo size={32} textColor="white" />
      </motion.div>

      {/* Main */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="relative flex-1 flex flex-col md:flex-row items-center justify-center gap-14 py-8">

        {/* Left — text */}
        <div className="flex-1 text-white text-right max-w-lg">
          <motion.div variants={itemLeft} className="flex justify-end mb-6">
            <img src={THE_BOX_LOGO} alt="The Box" className="h-14 w-auto object-contain brightness-0 invert" />
          </motion.div>

          <motion.h1 variants={heroText}
            className="text-5xl md:text-[4.5rem] font-black leading-[1.04] tracking-[-0.03em]">
            Out of<br/>the box.
          </motion.h1>
          <motion.p variants={item} className="mt-5 text-xl md:text-2xl text-white/85 font-medium leading-relaxed">
            הופכים את ארנק ההעברות הגדול בישראל<br/>
            <span className="text-white font-black">למועדון הצרכנות הגדול בישראל</span>
          </motion.p>

          {/* Stats row */}
          <motion.div variants={item} className="mt-10 flex gap-8 justify-end">
            {[["4M","משתמשים"],["300K","כרטיסי אשראי"],["2M","טרנזקציות/חודש"]].map(([v,l],i)=>(
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px bg-white/25 self-stretch" />}
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{v}</div>
                  <div className="text-xs text-white/65 font-semibold mt-0.5">{l}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right — app card (The Box mockup) */}
        <motion.div variants={itemRight} className="shrink-0">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ width: 290, background: "#A1C2E8" }}>
            {/* Header */}
            <div className="px-5 pt-6 pb-4 flex flex-col items-center text-center">
              <img
                src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png"
                alt="The Box"
                className="w-20 h-20 object-contain mb-2"
              />
              <h3 className="text-white font-black text-2xl tracking-tight">The Box</h3>
              <p className="mt-2 text-[#1D2644] text-[13px] font-bold leading-snug">
                מתחם ההטבות והמתנות של PayBox<br/>
                ממשו את הנקודות שצברתם<br/>
                וקנו מוצרים בעד חצי מחיר
              </p>
            </div>

            {/* Categories grid */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
              {CATS.map((cat, i) => (
                <motion.div key={i} variants={item}
                  className="rounded-2xl bg-white flex flex-col items-center justify-center gap-1 px-2 py-3 text-center shadow-sm">
                  <span className="text-2xl leading-none">{cat.e}</span>
                  <span className="text-[#1D2644] text-[11px] font-black leading-tight">{cat.t}</span>
                  <span className="text-[#5a6b8c] text-[10px] leading-tight">{cat.l}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-5 pb-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white font-black text-base shadow-lg"
                style={{ color: "#1D2644" }}>
                Box it!
                <span className="text-sm">🎉</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="relative flex items-center justify-between text-white/35 text-[11px] shrink-0">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>01 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
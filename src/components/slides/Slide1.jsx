import React from "react";
import { motion } from "framer-motion";
import {
  Gift, CreditCard, GraduationCap, Footprints,
  Plane, Drama, Wine, Beef
} from "lucide-react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const THE_BOX_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png";
const BOOMBUY_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/f01a26580_.png";
const PAYBOX_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/9452db55b_61.png";

const CATS = [
  { icon: Gift,        t: "Box Gifts",             l: "מתנות כלליות" },
  { icon: CreditCard, t: "Box Gift Cards",        l: "כרטיסי מתנה" },
  { icon: GraduationCap, t: "Box Teacher Gifts",   l: "למורות וגננות" },
  { icon: Footprints, t: "Box Fashion & Footwear", l: "אופנה והנעלה" },
  { icon: Plane,      t: "Box Holidays & Travel",  l: "חופשות וטיולים" },
  { icon: Drama,      t: "Box Culture",            l: "תרבות ופנאי" },
  { icon: Wine,       t: "Box Alcohol & Wine",     l: "אלכוהול ויין" },
  { icon: Beef,       t: "Box Barbecue",           l: "על האש" },
];

const SCRIPT = `"תסתכלו לרגע על הלוגו שלכם. PayBox — ארנק ההעברות הגדול בישראל.

מה אם נגיד לכם שבלי לשנות שום דבר מהיסוד, פייבוקס כבר היום הוא המועדון הצרכנות הגדול בישראל — אתם פשוט לא ידעתם שאתם כזה?

הכירו את The Box — ובשעה הקרובה נראה לכם בדיוק מה זה אומר לתחתית השורה שלכם."`;

const ease = [0.22, 1, 0.36, 1];

export default function Slide1() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}
    >
      {/* Top bar */}
      <motion.div
        className="relative flex items-center justify-between shrink-0"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
      >
        <img src={BOOMBUY_LOGO} alt="BoomBuy"
          className="h-8 w-auto object-contain brightness-0 invert opacity-90" />
        <img src={PAYBOX_LOGO} alt="PayBox"
          className="h-10 w-auto object-contain rounded-lg" />
      </motion.div>

      {/* Main */}
      <div className="relative flex-1 flex flex-col md:flex-row items-center justify-center gap-14 py-8">
        {/* Left — text */}
        <div className="flex-1 text-white text-right max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="flex justify-end mb-6"
          >
            <img src={THE_BOX_LOGO} alt="The Box"
              className="h-16 w-auto object-contain" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-5xl md:text-[4.5rem] font-black leading-[1.04] tracking-[-0.03em]"
          >
            Out of<br />the box.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-5 text-xl md:text-2xl text-white/85 font-medium leading-relaxed"
          >
            הופכים את ארנק ההעברות הגדול בישראל<br />
            <span className="text-white font-black">למועדון הצרכנות הגדול בישראל</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="mt-10 flex gap-8 justify-end"
          >
            {[["4M", "משתמשים"], ["300K", "כרטיסי אשראי"], ["2M", "טרנזקציות/חודש"]].map(([v, l], i) => (
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

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="shrink-0"
        >
          <div className="rounded-[3rem] bg-black p-2.5 shadow-2xl"
            style={{ width: 300 }}>
            <div className="rounded-[2.4rem] overflow-hidden flex flex-col"
              style={{ background: "#A1C2E8" }}>
              {/* Notch */}
              <div className="relative h-7 bg-white">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black" />
              </div>

              {/* Header */}
              <div className="px-5 pt-5 pb-4 flex flex-col items-center text-center">
                <img src={THE_BOX_LOGO} alt="The Box"
                  className="w-16 h-16 object-contain mb-2" />
                <h3 className="text-white font-black text-2xl tracking-tight">The Box</h3>
                <p className="mt-2 text-[#1D2644] text-[13px] font-bold leading-snug">
                  מתחם ההטבות והמתנות של PayBox
                  <br />
                  ממשו את הנקודות שצברתם
                  <br />
                  וקנו מוצרים בעד חצי מחיר
                </p>
              </div>

              {/* Categories grid */}
              <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
                {CATS.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.05 }}
                    className="rounded-2xl bg-white flex flex-col items-center justify-center gap-1.5 px-2 py-3.5 text-center shadow-sm"
                  >
                    <cat.icon className="w-6 h-6 text-[#1D2644]" strokeWidth={1.6} />
                    <span className="text-[#1D2644] text-[11px] font-black leading-tight">{cat.t}</span>
                    <span className="text-[#5a6b8c] text-[10px] leading-tight">{cat.l}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-6">
                <button className="w-full py-3.5 rounded-full bg-white font-black text-base shadow-md"
                  style={{ color: "#1D2644" }}>
                  Box it!
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between text-white/35 text-[11px] shrink-0">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>01 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
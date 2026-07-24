import React from "react";
import { motion } from "framer-motion";
import { Gift, Plane, Wine, Shirt, Theater, Dumbbell, UtensilsCrossed, CreditCard, Sun, ShoppingBag } from "lucide-react";
import { TheBoxLogo, PayBoxLogo } from "@/components/slides/Logos";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const CATS = [
  { icon: Gift,           label: "Gifts" },
  { icon: CreditCard,     label: "Gift Cards" },
  { icon: UtensilsCrossed,label: "Barbecue" },
  { icon: Wine,           label: "Alcohol" },
  { icon: Shirt,          label: "Fashion" },
  { icon: Plane,          label: "Travel" },
  { icon: Theater,        label: "Culture" },
  { icon: Dumbbell,       label: "Wellness" },
  { icon: Sun,            label: "Eilat" },
  { icon: ShoppingBag,    label: "Teacher" },
];

const SCRIPT = `"תסתכלו לרגע על הלוגו שלכם. PayBox — ארנק ההעברות הגדול בישראל.

מה אם נגיד לכם שבלי לשנות שום דבר מהיסוד, פייבוקס כבר היום הוא המועדון הצרכנות הגדול בישראל — אתם פשוט לא ידעתם שאתם כזה?

הכירו את The Box — ובשעה הקרובה נראה לכם בדיוק מה זה אומר לתחתית השורה שלכם."`;

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function Slide1() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Top bar */}
      <div className="relative flex items-center justify-between shrink-0">
        <img src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/f01a26580_.png"
          alt="BoomBuy" className="h-8 w-auto object-contain brightness-0 invert opacity-80" />
        <PayBoxLogo size={32} textColor="white" />
      </div>

      {/* Main */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="relative flex-1 flex flex-col md:flex-row items-center justify-center gap-14 py-8">

        {/* Left — text */}
        <motion.div variants={item} className="flex-1 text-white text-right max-w-lg">
          <div className="flex justify-end mb-6">
            <TheBoxLogo size={52} textColor="white" />
          </div>

          <h1 className="text-5xl md:text-[4.5rem] font-black leading-[1.04] tracking-[-0.03em]">
            Out of<br/>the box.
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/85 font-medium leading-relaxed">
            הופכים את ארנק ההעברות הגדול בישראל<br/>
            <span className="text-white font-black">למועדון הצרכנות הגדול בישראל</span>
          </p>

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
        </motion.div>

        {/* Right — app card */}
        <motion.div variants={item} className="shrink-0">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl"
            style={{ width: 270, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.3)" }}>
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-white/15">
              <div className="flex items-center justify-between">
                <PayBoxLogo size={20} textColor="white" />
                <TheBoxLogo size={20} textColor="white" />
              </div>
              <p className="text-white/60 text-[10px] mt-2 text-right">מתחם ההטבות והמתנות</p>
            </div>

            {/* Categories grid */}
            <div className="p-4 grid grid-cols-2 gap-2">
              {CATS.map((cat, i) => (
                <motion.div key={i} variants={item}
                  className="rounded-xl flex items-center gap-2 px-3 py-2.5"
                  style={{ background:"rgba(255,255,255,0.18)" }}>
                  <cat.icon className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
                  <span className="text-white text-[10px] font-bold">Box {cat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-4 pb-5">
              <button className="w-full py-3 rounded-full bg-white font-black text-sm shadow-lg"
                style={{ color:"#5BA4CF" }}>
                Box it!
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

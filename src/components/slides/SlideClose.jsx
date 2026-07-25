import React from "react";
import { motion } from "framer-motion";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const LOGO_BASE = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/";
const BOOMBUY_LOGO = LOGO_BASE + "f01a26580_.png";
const PAYBOX_LOGO  = LOGO_BASE + "9452db55b_61.png";
const THEBOX_LOGO  = LOGO_BASE + "96ca92369_60.png";

const EASE = [0.22, 1, 0.36, 1];

const THREE = [
  { num: "4.2M ₪", label: "ריטנר שנתי", sub: "השקעה, לא הוצאה", color: "#D4AF37" },
  { num: "0 ₪", label: "סיכון לפייבוקס", sub: "BoomBuy נושאת הכל", color: "#34D399" },
  { num: "∞", label: "פוטנציאל הצמיחה", sub: "Layer 1 + Layer 2", color: "#4F7FE0" },
];

const SCRIPT = `"שלושה מספרים לסיכום.

4.2 מיליון ריטנר — זו לא הוצאה. זו ההשקעה שמניעה מנוע כלכלי שלם.

אפס סיכון — כי BoomBuy נושאת את הסבסוד, האחריות המשפטית, והתפעול.

ואינסוף פוטנציאל — כי ברגע שה-GMV מגיע לנקודת האיזון, כל שקל נוסף הוא רווח טהור לפייבוקס.

תודה על הזמן. אנחנו מוכנים."`;

export default function SlideClose() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 md:px-20 py-16 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #07101E 0%, #0B1930 50%, #0D1F3C 100%)" }}
    >
      {/* Gold top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(79,127,224,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Logos */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-5 mb-12"
      >
        <img src={BOOMBUY_LOGO} alt="BoomBuy" className="h-8 w-auto brightness-0 invert opacity-70" />
        <span className="text-white/20 text-2xl font-thin">×</span>
        <div
          className="rounded-xl"
          style={{
            width: 40, height: 40,
            backgroundImage: `url(${THEBOX_LOGO})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <span className="text-white/20 text-2xl font-thin">=</span>
        <div className="rounded-xl bg-white/5 p-1.5 flex items-center">
          <img src={PAYBOX_LOGO} alt="PayBox" className="h-6 w-auto" />
        </div>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="text-center mb-14"
      >
        <h1
          className="font-black leading-[1.05] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          שותפות שמשלמת<br />
          <span style={{ color: "#D4AF37" }}>את עצמה.</span>
        </h1>
      </motion.div>

      {/* 3 numbers */}
      <div className="grid grid-cols-3 gap-5 w-full max-w-2xl mb-14">
        {THREE.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
            className="rounded-2xl p-5 text-center border"
            style={{
              background: `${t.color}09`,
              borderColor: `${t.color}25`,
            }}
          >
            <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: t.color }}>
              {t.num}
            </div>
            <div className="text-sm font-black text-white">{t.label}</div>
            <div className="text-xs text-white/35 mt-0.5">{t.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        className="text-center"
      >
        <p className="text-white/25 text-sm tracking-widest uppercase mb-3">הצעד הבא</p>
        <div
          className="inline-block rounded-2xl px-8 py-4 font-black text-lg"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)",
            color: "#07101E",
          }}
        >
          NDA + Term Sheet · מוכן לחתימה
        </div>
        <p className="text-white/20 text-xs mt-4">uri@boombuy.co.il · 050-XXX-XXXX</p>
      </motion.div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

const BASE = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/";
const PAYBOX_LOGO = BASE + "e41d5e20e_59.png";
const BOOMBUY_LOGO = BASE + "fb3c29ac1_200.png";
const THE_BOX_LOGO = BASE + "2b893cba0_image.png";
const EASE = [0.22, 1, 0.36, 1];

export default function IntroSlide() {
  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg,#07101E 0%,#0B1930 55%,#0D1F3C 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(91,164,207,0.18) 0%, transparent 70%)",
        }}
      />

      {/* "PayBox מציגה" caption */}
      <motion.p
        dir="rtl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        className="relative text-white/55 text-sm font-bold tracking-[0.3em] uppercase"
      >
        PAYBOX מציגה
      </motion.p>

      {/* The Box logo — hero rise */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 190, damping: 18 }}
        className="relative mt-8 flex items-center gap-6"
      >
        <img
          src={PAYBOX_LOGO}
          alt="PayBox"
          className="h-28 w-28 object-contain rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
        />
        <span className="text-white/40 text-2xl font-black">×</span>
        <img
          src={BOOMBUY_LOGO}
          alt="BoomBuy"
          className="h-20 w-auto object-contain"
          style={{ mixBlendMode: "lighten" }}
        />
      </motion.div>

      {/* THE BOX headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
        className="relative mt-7 font-black tracking-[-0.04em] text-white text-center"
        style={{ fontSize: "clamp(3rem,7vw,4.5rem)" }}
      >
        THE BOX
      </motion.h1>

      {/* Gold underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 220, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.65, ease: EASE }}
        className="relative mt-3 h-px"
        style={{ background: "linear-gradient(90deg,transparent 0%,#D4AF37 50%,transparent 100%)" }}
      />

      {/* Brand lockup */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
        className="relative mt-5 flex items-center gap-3"
      >
        <img src={PAYBOX_LOGO} alt="PayBox" className="h-9 w-9 object-contain rounded-lg shadow shrink-0" />
        <span className="text-white/40 text-xs font-black">×</span>
        <img
          src={BOOMBUY_LOGO}
          alt="BoomBuy"
          className="h-6 w-auto object-contain shrink-0"
          style={{ mixBlendMode: "lighten" }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        dir="rtl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.65, ease: EASE }}
        className="relative mt-6 text-white/65 text-base md:text-lg font-semibold text-center"
      >
        מתחם ההטבות והמתנות החדש ללקוחות PayBox
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/45 text-[10px] font-bold tracking-[3px]">SCROLL</span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
        />
      </motion.div>
    </div>
  );
}
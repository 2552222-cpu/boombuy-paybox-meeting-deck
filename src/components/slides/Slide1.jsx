import React from "react";
import { motion } from "framer-motion";
import { PayBoxLogo } from "@/components/slides/Logos";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const BASE = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/";
const THE_BOX_LOGO = BASE + "c645cca81_65.png";
const BOOMBUY_LOGO = BASE + "fb3c29ac1_200.png";

// Product images from the marketplace — used in the phone mockup
const TILES = [
  { img: BASE + "d1ad484b4_.jpg",              label: "Box Gifts" },
  { img: BASE + "0e73b93dc_.jpg",              label: "Box Fashion" },
  { img: BASE + "92021a586_.jpg",              label: "Box Home" },
  { img: BASE + "9bd28df25_.jpg",              label: "Box Culture" },
  { img: BASE + "d31f8cf43_generated_image.png", label: "Box Travel" },
  { img: BASE + "11dd7c6df_generated_image.png", label: "Box Luggage" },
];

const SCRIPT = `"תסתכלו לרגע על הלוגו שלכם. PayBox — ארנק ההעברות הגדול בישראל.

מה אם נגיד לכם שבלי לשנות שום דבר מהיסוד, פייבוקס כבר היום הוא המועדון הצרכנות הגדול בישראל — אתם פשוט לא ידעתם שאתם כזה?

הכירו את The Box — ובשעה הקרובה נראה לכם בדיוק מה זה אומר לתחתית השורה שלכם."`;

// Shorthand animation helper — each element gets animate (not whileInView) so it plays on load
const a = (delay = 0, yFrom = 20, xFrom = 0) => ({
  initial: { opacity: 0, y: yFrom, x: xFrom },
  animate: { opacity: 1, y: 0, x: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
});

export default function Slide1() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top bar */}
      <motion.div {...a(0.1)} className="relative flex items-center justify-between shrink-0">
        <img
          src={BOOMBUY_LOGO}
          alt="BoomBuy"
          className="h-16 w-auto opacity-95"
          style={{
            mixBlendMode: "lighten",
            filter: "brightness(1.6) contrast(1.3) drop-shadow(0 0 14px rgba(173,216,230,0.7))",
          }}
        />
        <PayBoxLogo size={28} textColor="white" />
      </motion.div>

      {/* ── Main layout ── */}
      <div className="relative flex-1 flex flex-col md:flex-row items-center justify-center gap-12 py-6">

        {/* LEFT — intro + logo + copy */}
        <div className="flex-1 text-white text-right max-w-lg">

          {/* "Meet..." tag — appears first */}
          <motion.p {...a(0.2)} className="text-white/60 text-[11px] font-black tracking-[0.28em] uppercase mb-6">
            BoomBuy × PayBox מציגים ›
          </motion.p>

          {/* The Box logo — HERO RISE */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 190, damping: 20 }}
            className="flex justify-end mb-8"
          >
            <img
              src={THE_BOX_LOGO}
              alt="The Box"
              className="rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.28)] object-contain"
              style={{ height: 150, width: "auto", maxWidth: 280 }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32, skewY: 1.5 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 240, damping: 26 }}
            className="text-5xl md:text-[4.5rem] font-black leading-[1.04] tracking-[-0.03em]"
          >
            Out of<br />the box.
          </motion.h1>

          <motion.p {...a(1.3)} className="mt-5 text-xl text-white/85 font-medium leading-relaxed">
            הופכים את ארנק ההעברות הגדול בישראל<br />
            <span className="text-white font-black">למועדון הצרכנות הגדול בישראל</span>
          </motion.p>

          {/* Stats */}
          <motion.div {...a(1.6)} className="mt-10 flex gap-8 justify-end">
            {[
              ["4M", "משתמשים"],
              ["400K", "כרטיסים (CC+Young)"],
              ["2M", "טרנזקציות/חודש"],
            ].map(([v, l], i) => (
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

        {/* RIGHT — phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 210, damping: 26 }}
          className="shrink-0"
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 270,
              borderRadius: "2.8rem",
              background: "#fff",
              border: "7px solid rgba(255,255,255,0.55)",
              boxShadow:
                "0 40px 90px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Status bar */}
            <div style={{ background: "#5BA4CF" }} className="px-5 pt-3 pb-1.5 flex items-center justify-between">
              <span className="text-white/60 text-[9px] font-bold">9:41</span>
              <div className="w-14 h-3 rounded-full bg-black/15" />
              <span className="text-white/60 text-[9px] font-bold">⬡⬡⬡</span>
            </div>

            {/* App header */}
            <div style={{ background: "#5BA4CF" }} className="px-4 pb-4 pt-1 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
                style={{
                  backgroundImage: `url(${THE_BOX_LOGO})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <div>
                <p className="text-white font-black text-[13px] leading-none">The Box</p>
                <p className="text-white/70 text-[9px] mt-0.5">מתחם ההטבות של PayBox</p>
              </div>
              <div className="mr-auto text-right">
                <p className="text-[#FFE97A] font-black text-[11px] leading-none">150 ZUZ</p>
                <p className="text-white/50 text-[8px]">הטוקן שלך</p>
              </div>
            </div>

            {/* Product grid */}
            <div className="bg-[#F4F7FB] px-3 pt-3 pb-2">
              <p className="text-[#1D2644] text-[10px] font-black mb-2 text-right">קטגוריות מובילות</p>
              <div className="grid grid-cols-3 gap-1.5">
                {TILES.map((tile, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden"
                    style={{ aspectRatio: "1" }}
                  >
                    <img
                      src={tile.img}
                      alt={tile.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-1 inset-x-0 text-center text-white text-[7.5px] font-bold px-0.5 leading-tight drop-shadow">
                      {tile.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full mt-2.5 py-2.5 rounded-full font-black text-[13px] text-white shadow-lg"
                style={{ background: "linear-gradient(90deg,#5BA4CF,#4A8EC7)" }}
              >
                Box it! 🎉
              </button>
            </div>

            {/* Footer balance strip */}
            <div
              className="px-4 py-2.5 flex items-center justify-between"
              style={{ background: "#FFF9E3", borderTop: "1px solid #F0D878" }}
            >
              <span className="text-[#D4AF37] font-black text-[12px]">150 ZUZ</span>
              <span className="text-[#8B6914] text-[9px] font-bold">ממש עכשיו בחנות ›</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        {...a(0.1)}
        className="relative flex items-center justify-between text-white/35 text-[11px] shrink-0"
      >
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>01 / 12</span>
      </motion.div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
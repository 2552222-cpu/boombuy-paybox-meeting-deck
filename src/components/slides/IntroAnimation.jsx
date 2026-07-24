import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THE_BOX_LOGO =
  "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png";

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),   // logo in
      setTimeout(() => setStep(2), 1100),  // "THE BOX" text
      setTimeout(() => setStep(3), 1900),  // brand lockup
      setTimeout(() => setStep(4), 2800),  // white-flash exit
      setTimeout(() => onComplete?.(), 3350),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {step < 4 ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "#071020" }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: "easeInOut" } }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, #5BA4CF1A 0%, transparent 70%)",
            }}
          />

          {/* The Box logo */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="logo"
                initial={{ scale: 0.45, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src={THE_BOX_LOGO}
                  alt="The Box"
                  className="w-28 h-28 object-contain brightness-0 invert"
                />
                {/* Gold pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE BOX headline */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                key="headline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 text-center"
              >
                <h1
                  className="font-black leading-none tracking-[-0.04em] text-white"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
                >
                  THE BOX
                </h1>
                <motion.div
                  className="mt-3 mx-auto h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                    width: 0,
                  }}
                  animate={{ width: 220 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOOMBUY × PAYBOX */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.p
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-5 text-[#5BA4CF] font-black text-sm tracking-[0.32em] uppercase"
              >
                BoomBuy × PayBox
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* White flash exit */
        <motion.div
          key="flash"
          className="fixed inset-0 z-[100] bg-white pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}

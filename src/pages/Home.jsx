import React, { useState } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/slides/IntroAnimation";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";
import Slide8 from "@/components/slides/Slide8";
import Slide9 from "@/components/slides/Slide9";
import Slide10 from "@/components/slides/Slide10";
import Slide11 from "@/components/slides/Slide11";
import Slide12 from "@/components/slides/Slide12";

const SLIDES = [
  Slide1,   // Hero — The Box × PayBox
  Slide2,   // The Problem (diagnostic data)
  Slide3,   // The Solution — 10 categories
  Slide4,   // Economic Model — Retainer + Offset
  Slide5,   // Loyalty Engine — PayBox Coins
  Slide6,   // App UX mockup
  Slide7,   // Product catalog demo
  Slide8,   // PayGift demo
  Slide9,   // ROI Financial Table ★
  Slide10,  // Roadmap
  Slide11,  // Q&A — Objection handling
  Slide12,  // Term Sheet + Action Items
];

const LABELS = [
  "The Box", "הבעיה", "הפתרון", "המודל", "מנוע הנאמנות",
  "UX", "הדמו", "PayGift", "ROI", "מפת דרכים", "Q&A", "Term Sheet",
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="relative w-full bg-black">
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      {/* Slide counter pill */}
      <div className="fixed top-4 right-4 z-40 flex gap-1.5 flex-wrap max-w-[calc(100vw-2rem)] justify-end">
        {LABELS.map((label, i) => (
          <a
            key={i}
            href={`#slide-${i + 1}`}
            className="text-[9px] font-bold px-2 py-1 rounded-full bg-black/50 text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            {i + 1}
          </a>
        ))}
      </div>

      {SLIDES.map((Slide, i) => (
        <motion.section
          key={i}
          id={`slide-${i + 1}`}
          className="min-h-screen w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15, once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Slide />
        </motion.section>
      ))}
    </div>
  );
}

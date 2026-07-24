import React from "react";
import { motion } from "framer-motion";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";
import Slide8 from "@/components/slides/Slide8";
import Slide9 from "@/components/slides/Slide9";
import SlideFlow from "@/components/slides/SlideFlow";
import Slide10 from "@/components/slides/Slide10";
import Slide11 from "@/components/slides/Slide11";
import Slide12 from "@/components/slides/Slide12";

const SLIDES = [
  Slide1,     // 01 — Hero — The Box × PayBox
  Slide2,     // 02 — The Problem (diagnostic data)
  Slide3,     // 03 — The Solution — 10 categories
  Slide4,     // 04 — Economic Model — Retainer + Offset
  Slide5,     // 05 — Loyalty Engine — PayBox Coins
  Slide6,     // 06 — App UX mockup
  Slide7,     // 07 — Product catalog demo
  Slide8,     // 08 — PayGift demo
  Slide9,     // 09 — ROI Financial Table ★
  SlideFlow,  // 10 — Full Money Flow — 4 Revenue Streams ★
  Slide10,    // 11 — Roadmap
  Slide11,    // 12 — Q&A — Objection handling
  Slide12,    // 13 — Term Sheet + Action Items
];

const LABELS = [
  "The Box", "הבעיה", "הפתרון", "המודל", "נאמנות",
  "UX", "דמו", "PayGift", "ROI", "פלואו", "רודמאפ", "Q&A", "Term",
];

export default function Home() {
  return (
    <div className="relative w-full bg-black">
      {/* Slide counter pills */}
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

import React from "react";
import { motion } from "framer-motion";
import IntroSlide from "@/components/slides/IntroSlide";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";
import Slide8 from "@/components/slides/Slide8";
import Slide9 from "@/components/slides/Slide9";
import SlideValueModel from "@/components/slides/SlideValueModel";
import SlideFlow from "@/components/slides/SlideFlow";
import Slide10 from "@/components/slides/Slide10";
import SlideAd1 from "@/components/slides/SlideAd1";
import SlideAd2 from "@/components/slides/SlideAd2";
import Slide11 from "@/components/slides/Slide11";
import Slide12 from "@/components/slides/Slide12";

const SLIDES = [
  IntroSlide,      // 00 — Launch Animation
  Slide1,          // 01 — Hero
  Slide2,          // 02 — הבעיה
  Slide3,          // 03 — הפתרון
  Slide4,          // 04 — המודל
  Slide5,          // 05 — ZUZ
  Slide6,          // 06 — UX
  Slide7,          // 07 — דמו
  Slide8,          // 08 — PayGift
  Slide9,          // 09 — ריטנר + שתי שכבות
  SlideValueModel, // 10 — מודל ערך מלא (היום + תרחישים)
  SlideFlow,       // 11 — סימולטור Commerce בלבד
  Slide10,         // 12 — רודמאפ
  SlideAd1,        // 13 — קמפיין Young A
  SlideAd2,        // 14 — קמפיין Young B
  Slide11,         // 15 — Q&A
  Slide12,         // 16 — Term Sheet
];

const LABELS = [
  "🎬", "The Box", "בעיה", "פתרון", "מודל",
  "ZUZ", "UX", "דמו", "Gift",
  "ריטנר", "ערך", "סימולטור", "רודמאפ", "📢", "📢", "Q&A", "Term",
];

export default function Home() {
  return (
    <div className="relative w-full bg-black">
      <div className="fixed top-4 right-4 z-40 flex gap-1.5 flex-wrap max-w-[calc(100vw-2rem)] justify-end">
        {LABELS.map((label, i) => (
          <a key={i} href={`#slide-${i + 1}`}
            className="text-[9px] font-bold px-2 py-1 rounded-full bg-black/50 text-white/50 hover:bg-white/10 hover:text-white transition-all">
            {label}
          </a>
        ))}
      </div>

      {SLIDES.map((Slide, i) => (
        <motion.section key={i} id={`slide-${i + 1}`} className="min-h-screen w-full"
          initial={i === 0 ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={i === 0 ? undefined : { opacity: 1, y: 0 }}
          viewport={{ amount: 0.15, once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <Slide />
        </motion.section>
      ))}
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { SimulatorProvider } from "@/contexts/SimulatorContext";
import IntroSlide from "@/components/slides/IntroSlide";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";
import Slide9 from "@/components/slides/Slide9";
import SlideFlow from "@/components/slides/SlideFlow";
import SlideResults from "@/components/slides/SlideResults";
import SlideAd1 from "@/components/slides/SlideAd1";
import SlidePricing from "@/components/slides/SlidePricing";
import SlideOnePager from "@/components/slides/SlideOnePager";

const SLIDES = [
  IntroSlide,      // 00 — Launch Animation
  Slide1,          // 01 — Hero
  Slide2,          // 02 — הבעיה
  Slide3,          // 03 — הפתרון
  Slide5,          // 04 — ZUZ
  Slide6,          // 05 — משתמשים קונים בחצי מחיר
  Slide7,          // 06 — עד 50% הנחה על מוצרים
  Slide9,          // 09 — שתי שכבות הערך
  SlideFlow,       // 10 — סימולטור
  SlideResults,    // 11 — תוצאות
  SlidePricing,    // 14 — הצעת מחיר (4 מסלולים)
  SlideAd1,        // 15 — קמפיין Young (A+B)
  SlideOnePager,     // 16 — One Pager סיכום אחד
];

const LABELS = [
  "🎬", "The Box", "בעיה", "פתרון", "ZUZ",
  "UX", "דמו",
  "ריטנר", "סימולטור", "תוצאות",   "💰", "📢", "1️⃣",
];

export default function Home() {
  return (
    <SimulatorProvider>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Slide />
          </motion.section>
        ))}
      </div>
    </SimulatorProvider>
  );
}
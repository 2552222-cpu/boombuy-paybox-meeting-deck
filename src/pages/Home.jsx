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

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

export default function Home() {
  return (
    <div className="w-full bg-black snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth no-scrollbar">
      {SLIDES.map((Slide, i) => (
        <motion.section
          key={i}
          className="min-h-screen w-full snap-start"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Slide />
        </motion.section>
      ))}
    </div>
  );
}
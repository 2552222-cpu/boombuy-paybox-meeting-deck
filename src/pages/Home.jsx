import React from "react";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];

export default function Home() {
  return (
    <div className="w-full bg-black">
      {SLIDES.map((Slide, i) => (
        <section key={i} className="h-screen w-full">
          <Slide />
        </section>
      ))}
    </div>
  );
}
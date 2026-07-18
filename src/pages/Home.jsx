import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/deck/Sidebar";
import SlideNav from "@/components/deck/SlideNav";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";

const TOTAL = 7;
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (n) => {
      const next = Math.max(1, Math.min(TOTAL, n));
      if (next === current) return;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const onPrev = useCallback(() => go(current - 1), [go, current]);
  const onNext = useCallback(() => go(current + 1), [go, current]);
  const onReset = useCallback(() => go(1), [go]);

  useEffect(() => {
    const handler = (e) => {
      // RTL: ArrowRight = previous, ArrowLeft = next
      if (e.key === "ArrowLeft") onNext();
      else if (e.key === "ArrowRight") onPrev();
      else if (e.key === "ArrowDown" || e.key === "PageDown") onNext();
      else if (e.key === "ArrowUp" || e.key === "PageUp") onPrev();
      else if (e.key.toLowerCase() === "r") onReset();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onReset]);

  const ActiveSlide = SLIDES[current - 1];

  return (
    <div className="fixed inset-0 bg-[#000000] flex">
      <Sidebar current={current} onSelect={go} />

      {/* Mobile slide dots */}
      <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i + 1)}
            className={`h-1.5 rounded-full transition-all ${
              i + 1 === current ? "w-5 bg-[#F97316]" : "w-1.5 bg-white/40"
            }`}
            aria-label={`שקופית ${i + 1}`}
          />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center p-3 md:p-8 overflow-hidden">
        <div
          key={current}
          className="relative w-full max-w-[1180px] aspect-[16/9] rounded-xl overflow-hidden deck-shadow bg-white"
          style={{ animation: "slideIn 0.4s ease-out" }}
        >
          <ActiveSlide />
        </div>
      </div>

      <SlideNav
        current={current}
        total={TOTAL}
        onPrev={onPrev}
        onNext={onNext}
        onReset={onReset}
      />

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(${direction >= 0 ? "12px" : "-12px"}); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
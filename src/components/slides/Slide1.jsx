import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const CATS = [
  { e: "🎁", l: "Gifts" },
  { e: "🎴", l: "Gift Cards" },
  { e: "🍖", l: "Barbecue" },
  { e: "🍷", l: "Alcohol" },
  { e: "👗", l: "Fashion" },
  { e: "✈️", l: "Travel" },
  { e: "🎭", l: "Culture" },
  { e: "💆", l: "Wellness" },
];

const SCRIPT = `"תסתכלו לרגע על הלוגו שלכם. PayBox — ארנק ההעברות הגדול בישראל.

מה אם נגיד לכם שבלי לשנות שום דבר מהיסוד, פייבוקס כבר היום הוא המועדון הצרכנות הגדול בישראל — אתם פשוט לא ידעתם שאתם כזה?

בשעה הקרובה נראה לכם בדיוק איך אנחנו עושים את זה — ולמה ה-300 אלף ₪ שנבקש הם לא הוצאה, אלא ההשקעה שמחזירה את עצמה תוך חודשים.

בואו נצא Out of the box."`;

export default function Slide1() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible"
      style={{
        background:
          "linear-gradient(155deg, #5BA4CF 0%, #6FB3E0 45%, #4A8EC7 100%)",
      }}
    >
      {/* Top: logos */}
      <div className="flex items-center justify-between shrink-0">
        <img
          src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/f01a26580_.png"
          alt="BoomBuy"
          className="h-9 w-auto object-contain brightness-0 invert opacity-90"
        />
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-base">×</span>
          <span className="text-white font-black text-xl tracking-tight">PayBox</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10 py-6">
        {/* Left: text */}
        <div className="flex-1 text-white text-right max-w-lg">
          <div className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-widest mb-6">
            EXPERIENCE AS A SERVICE
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight drop-shadow-sm">
            The Box
          </h1>
          <p className="mt-3 text-2xl md:text-3xl font-bold text-white/90 italic">
            Out of the box.
          </p>
          <p className="mt-6 text-lg md:text-xl leading-[1.75] text-white/85 font-medium">
            הופכים את ארנק ההעברות הגדול בישראל
            <br />
            <span className="text-white font-black">
              למועדון הצרכנות הגדול בישראל
            </span>
          </p>

          {/* Stats */}
          <div className="mt-8 flex gap-6 justify-end">
            <div className="text-center">
              <div className="text-3xl font-black text-white">4M</div>
              <div className="text-xs text-white/70 font-semibold">משתמשים</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-white">300K</div>
              <div className="text-xs text-white/70 font-semibold">כרטיסי אשראי</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-white">2M</div>
              <div className="text-xs text-white/70 font-semibold">טרנזקציות/חודש</div>
            </div>
          </div>
        </div>

        {/* Right: The Box app preview */}
        <div className="shrink-0">
          <div
            className="rounded-3xl p-6 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.35)",
              width: 260,
            }}
          >
            {/* Mini header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-xs font-bold">PayBox</span>
              <div className="text-lg">🎁</div>
            </div>
            <h3 className="text-white font-black text-2xl mb-1">The Box</h3>
            <p className="text-white/70 text-[11px] leading-tight mb-4">
              מתחם ההטבות והמתנות של משתמשי PayBox
            </p>

            {/* Categories grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {CATS.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <span className="text-xl">{cat.e}</span>
                  <span className="text-white text-[10px] font-bold">
                    Box {cat.l}
                  </span>
                </div>
              ))}
            </div>

            {/* Box it button */}
            <button className="w-full py-3 rounded-full bg-white text-[#5BA4CF] font-black text-sm shadow-lg">
              Box it! 🎉
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-white/40 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>01</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

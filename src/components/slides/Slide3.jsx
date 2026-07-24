import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const CATS = [
  { e: "🎁", name: "Box Gifts", he: "מתנות כלליות" },
  { e: "🎴", name: "Box Gift Cards", he: "כרטיסי מתנה" },
  { e: "👩‍🏫", name: "Box Teacher Gifts", he: "למורות וגננות" },
  { e: "👗", name: "Box Fashion", he: "אופנה והנעלה" },
  { e: "✈️", name: "Box Holidays", he: "חופשות וטיולים" },
  { e: "🎭", name: "Box Culture", he: "תרבות ופנאי" },
  { e: "🍷", name: "Box Alcohol & Wine", he: "אלכוהול ויין" },
  { e: "🍖", name: "Box Barbecue", he: "על האש" },
  { e: "🏖️", name: "Box Eilat", he: "כרטיס אילת" },
  { e: "💆", name: "Box Wellness", he: "ספא ועיסויים" },
];

const SCRIPT = `"אז מה הפתרון?

The Box — מתחם ההטבות והמתנות הבלעדי של משתמשי PayBox.

10 קטגוריות. כל אחת מהן מתחברת ישירות להתנהגות שהלקוחות שלכם כבר עושים היום — פותחים קבוצה לאיסוף כסף למתנה? יש להם Box Gifts. אוספים כסף לעל האש? Box Barbecue. רוצים לחלק כרטיסים לאילת? Box Eilat.

אנחנו לא ממציאים התנהגויות חדשות — אנחנו רק עוצרים את הכסף מלברוח החוצה ומאפשרים לו ליצור ערך בתוך המערכת שלכם.

ובכל קטגוריה — מחיר הטוב ביותר בישראל, כי אנחנו עובדים ישירות עם יבואנים."`;

export default function Slide3() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible"
      style={{
        background: "linear-gradient(155deg, #5BA4CF 0%, #6FB3E0 45%, #4A8EC7 100%)",
      }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-white/70 tracking-[0.15em]">
          הפתרון
        </span>
        <div className="w-14 h-1 rounded-full bg-white/50 mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-white leading-[1.15] tracking-tight">
          The Box — 10 עולמות ערך.
          <br />
          <span className="text-white/80 font-bold text-2xl md:text-3xl">
            מחיר הטוב ביותר בישראל בכל אחד מהם.
          </span>
        </h1>
      </div>

      {/* Categories grid */}
      <div className="flex-1 flex flex-col justify-center mt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CATS.map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 flex flex-col items-center text-center gap-2 transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <span className="text-3xl">{cat.e}</span>
              <div>
                <p className="text-white font-black text-[11px] leading-tight">{cat.name}</p>
                <p className="text-white/70 text-[10px] mt-0.5">{cat.he}</p>
              </div>
            </div>
          ))}
        </div>

        {/* EaaS badge */}
        <div
          className="mt-6 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <div className="text-right">
            <p className="text-white font-black text-xl">Experience as a Service (EaaS)</p>
            <p className="text-white/70 text-sm mt-1">
              לא SaaS — לא קטלוג — לא קופונים. מנוע חוויה מלא מקצה לקצה.
            </p>
          </div>
          <div className="shrink-0 flex gap-4">
            {["טכנולוגיה", "סחר", "סבסוד", "אופרציה"].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  {["⚙️", "🛍️", "💰", "🔧"][i]}
                </div>
                <span className="text-white/80 text-[9px] font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-white/40 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>03</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

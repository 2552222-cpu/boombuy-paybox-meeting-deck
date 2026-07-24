import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const STATS = [
  {
    value: "100%",
    headline: "מכספי הקבוצות",
    sub: "נמשכים ישירות לעו\"ש בנקים אחרים",
    detail: "כל שקל שנאסף לאירוע, מתנה או על האש — בורח מהמערכת",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
  },
  {
    value: "10%",
    headline: "First in Wallet",
    sub: "90% מהמחזיקים משתמשים בכרטיס פייבוקס כמשני",
    detail: "פוטנציאל עצום לגידול סליקה × 3 עם מנוע הנאמנות הנכון",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    value: "₪0",
    headline: "תקציב סבסוד קיים",
    sub: "הסיבה האמיתית שלא נבנה מועדון עד היום",
    detail: "בלי סבסוד — אין מימוש. בלי מימוש — אין מועדון. עד עכשיו.",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.25)",
  },
];

const SCRIPT = `"בואו נראה את המצב כפי שהוא — בלי ניפוח.

540 מיליון שקל סליקת אשראי בחודש. 4 מיליון משתמשים. 2 מיליון טרנזקציות.

אבל מה קורה עם הכסף שנאסף בקבוצות? 100% ממנו נמשך לעו"ש. כל שקל שאנשים אוספים דרך פייבוקס — יוצא לבנק אחר.

ויש רק 10% שמשתמשים בכרטיס כראשי. כלומר, 90% מהלקוחות שלכם בוחרים כרטיס אחר כשהם הולכים לסופר.

הסיבה? אין סבסוד. ובלי סבסוד — אין מועדון. אין סיבה להישאר.

זאת בדיוק הבעיה שאנחנו פותרים."`;

export default function Slide2() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-12 overflow-visible text-white"
      style={{
        background: "linear-gradient(145deg, #0B1930 0%, #0D1F3C 60%, #07101e 100%)",
      }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#60A5FA] tracking-[0.15em]">
          תמונת המצב
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
          הכסף עובר דרככם.
          <br />
          <span className="text-[#60A5FA]">הגיע הזמן שיישאר.</span>
        </h1>
      </div>

      {/* Stat cards */}
      <div className="flex-1 flex flex-col justify-center gap-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 flex flex-col gap-3 border"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <span
                className="text-5xl md:text-6xl font-black"
                style={{ color: s.color }}
              >
                {s.value}
              </span>
              <p className="text-lg font-bold leading-snug">{s.headline}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{s.sub}</p>
              <p
                className="text-xs leading-relaxed mt-1 pt-3 border-t"
                style={{ color: s.color + "bb", borderColor: s.border }}
              >
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom context bar */}
        <div className="rounded-2xl bg-white/5 border border-white/10 px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            <p className="text-base md:text-lg font-bold text-[#FBBF24] leading-relaxed">
              540M ₪ סליקת אשראי חודשית · 2M טרנזקציות · 4M משתמשים
            </p>
            <div className="shrink-0 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-5 py-2">
              <span className="text-[#FBBF24] font-black text-sm">
                הנכס קיים. המנוע חסר.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>02</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

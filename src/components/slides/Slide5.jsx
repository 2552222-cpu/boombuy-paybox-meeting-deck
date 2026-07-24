import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const FLOWS = [
  {
    num: "01",
    icon: "💸",
    title: "לקוח אוסף כסף בקבוצה",
    desc: "אירוע, מתנה, על האש — כסף מגיע לפייבוקס",
    color: "#60A5FA",
  },
  {
    num: "02",
    icon: "🪙",
    title: "מקבל PayBox Coins",
    desc: "10-30% קאשבק על הפעולה — אוטומטי, בזמן אמת",
    color: "#FBBF24",
  },
  {
    num: "03",
    icon: "🎁",
    title: "ממש ב-The Box",
    desc: "משתמש בנקודות + מעט כסף למוצרים פרימיום",
    color: "#34D399",
  },
  {
    num: "04",
    icon: "💳",
    title: "סולק באשראי פייבוקס",
    desc: "הכסף נשאר בבית. PayBox מרוויחה עמלה צולבת",
    color: "#A78BFA",
  },
];

const EXAMPLES = [
  {
    trigger: "קבוצת 'על האש' אספה 2,100 ₪",
    reward: "קאשבק של 20% = 420 נקודות",
    redeem: "בשר מבלדי ב-250 ₪ + אלכוהול מפאנקו ב-170 ₪",
    save: "חוסך ~420 ₪",
  },
  {
    trigger: "קבוצת מתנה אספה 900 ₪",
    reward: "קאשבק של 20% = 180 נקודות",
    redeem: "מתנה פרימיום ב-Box Gifts ב-180 ₪ מתוך 360 ₪",
    save: "חוסך ~180 ₪",
  },
];

const SCRIPT = `"הנה בדיוק איך זה עובד בפועל — דוגמה חיה.

14 חברים אוספים כסף לעל האש. מגיעים ל-2,100 שקל. פייבוקס מעניקה להם 20% קאשבק — 420 נקודות.

עכשיו, במקום שאחד מהם ימשוך את הכסף לחשבון הבנק, הקבוצה נכנסת ל-Box Barbecue ו-Box Alcohol, קונה בשר ממקצביה מובחרת ואלכוהול בהנחה של עד 50%.

הכסף נשאר בפייבוקס. הלקוח מרגיש שקיבל מתנה. פייבוקס גוזרת עמלה. ואנחנו לקחנו מרווח מהסחר.

Win-Win-Win."`;

export default function Slide5() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-14 py-10 overflow-visible text-white"
      style={{
        background: "linear-gradient(145deg, #1a2a40 0%, #0D1F3C 60%, #0a101d 100%)",
      }}
    >
      <div className="text-center shrink-0">
        <span className="text-sm font-bold text-[#FBBF24] tracking-[0.15em]">
          מנוע הנאמנות
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mx-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.2] tracking-tight">
          כל פעולה בפייבוקס הופכת לערך ב-The Box
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-7 mt-7">
        {/* Flow steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FLOWS.map((s, i) => (
            <div key={i} className="relative">
              <div
                className="rounded-2xl p-6 flex flex-col gap-3 h-full border"
                style={{
                  background: `${s.color}0f`,
                  borderColor: `${s.color}30`,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  <span
                    className="text-3xl font-black"
                    style={{ color: s.color + "50" }}
                  >
                    {s.num}
                  </span>
                </div>
                <p
                  className="text-base font-black leading-snug"
                  style={{ color: s.color }}
                >
                  {s.title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
              {i < FLOWS.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -left-2.5 -translate-y-1/2 z-10 text-gray-600 text-xl">
                  ←
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-right border border-white/10 bg-white/5"
            >
              <p className="text-[#FBBF24] font-black text-sm mb-3">
                🔔 {ex.trigger}
              </p>
              <p className="text-gray-300 text-xs mb-1">
                <span className="text-white font-bold">→ תגמול:</span> {ex.reward}
              </p>
              <p className="text-gray-300 text-xs mb-1">
                <span className="text-white font-bold">→ מימוש:</span> {ex.redeem}
              </p>
              <p className="text-[#34D399] text-xs font-bold mt-2">
                💚 {ex.save}
              </p>
            </div>
          ))}
        </div>

        {/* Yellow punch */}
        <div className="rounded-full bg-[#FBBF24] flex items-center justify-center gap-4 px-8 py-4 mx-auto shadow-2xl">
          <span className="text-base font-black text-black">הנחה של עד</span>
          <span className="text-4xl font-black text-black">50%</span>
          <span className="text-base font-black text-black">
            על מוצרים שהלקוחות שלכם קונים ממילא
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>05</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

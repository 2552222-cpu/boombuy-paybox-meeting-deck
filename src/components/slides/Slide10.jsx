import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const MILESTONES = [
  {
    period: "חודש 1",
    title: "הקמה ואינטגרציה",
    items: [
      "חיבור API ל-PayBox (שבועות בלבד)",
      "הקמת The Box בתוך האפליקציה",
      "גיוס ספקים לקטגוריות מתנות ועל האש",
      "עלייה לאוויר של פיילוט ל-10K משתמשים",
    ],
    color: "#60A5FA",
    icon: "🚀",
  },
  {
    period: "חודש 2-3",
    title: "פיילוט ואופטימיזציה",
    items: [
      "הרחבה ל-100K משתמשים",
      "הוספת Box Eilat + Box Wellness",
      "מדידת אחוזי מימוש (יעד: 15%+)",
      "אופטימיזציה של מסלולי קאשבק",
    ],
    color: "#FBBF24",
    icon: "📊",
  },
  {
    period: "חודש 4-6",
    title: "גידול וקיזוז",
    items: [
      "פתיחה לכל 400K משתמשים (CC + Young)",
      "הפעלת מועדון PayBox Young בנפרד",
      "ריטיינר מתאפס מהכנסות",
      "קמפיין 'First in Wallet' עם כאל",
    ],
    color: "#34D399",
    icon: "📈",
  },
  {
    period: "חודש 7-12",
    title: "רווחיות ופרימיום",
    items: [
      "הוספת Box Travel (חופשות) + Box Tickets",
      "השקת PayBox Business (מודל Wolt עסקים)",
      "גידול עמלה מגיהוץ בסופרמרקטים",
      "PayBox — ארנק ראשי ל-25% מהלקוחות",
    ],
    color: "#A78BFA",
    icon: "🏆",
  },
];

const SCRIPT = `"מפת הדרכים — פשוטה ומהירה.

חודש 1: ה-API שלכם מוכן, אנחנו מתחברים תוך שבועות. פיילוט קטן, ייאסף מידע אמיתי.

חודשים 2-3: בדוק, מתקנים, מרחיבים. Box Eilat עולה לאוויר — מנוע הכנסות ראשוני.

חודשים 4-6: כל המשתמשים פנימה. PayBox Young מקבל מועדון נפרד בעיצוב משלו. ריטיינר מתאפס.

חודשים 7-12: פייבוקס הופכת לפלטפורמת On. הוספת עסקים. גידול סופרמרקטים. חצינו ל-Break-Even ועבר.

ותוך 5 שנים? אנחנו הופכים את פייבוקס לוולט של ישראל — אקו-סיסטם שלם."`;

export default function Slide10() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible"
      style={{ background: "#ffffff" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#2D7FF9] tracking-[0.15em]">
          מפת הדרכים
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.1] tracking-tight">
          מחתימה לרווחיות — 6 חודשים.
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center mt-8">
        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#60A5FA] via-[#34D399] to-[#A78BFA]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative flex flex-col">
                {/* Circle on timeline */}
                <div className="hidden md:flex absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg"
                    style={{ background: m.color }}
                  >
                    {i + 1}
                  </div>
                </div>

                <div
                  className="mt-8 rounded-2xl p-6 flex flex-col gap-3 border-2 h-full"
                  style={{
                    borderColor: m.color + "40",
                    background: m.color + "08",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{m.icon}</span>
                    <span
                      className="text-[11px] font-black tracking-wider rounded-full px-3 py-1"
                      style={{ background: m.color + "20", color: m.color }}
                    >
                      {m.period}
                    </span>
                  </div>
                  <h3
                    className="font-black text-lg text-right"
                    style={{ color: m.color }}
                  >
                    {m.title}
                  </h3>
                  <ul className="space-y-2 text-right">
                    {m.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 flex-row-reverse">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: m.color }}
                        />
                        <span className="text-xs text-[#374151] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision footer */}
        <div className="mt-6 rounded-2xl bg-[#0B1930] px-8 py-5 text-center">
          <p className="text-white font-black text-lg md:text-2xl">
            🎯 חזון 5 שנים:{" "}
            <span className="text-[#FBBF24]">
              PayBox = הוולט של ישראל
            </span>{" "}
            — ארנק, אשראי, מועדון, עסקים. הכל תחת קורת גג אחת.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[#9CA3AF] text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>10</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import { Rocket, LineChart, TrendingUp, Building2, Flame } from "lucide-react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const MILESTONES = [
  {
    period: "חודש 1",
    title: "הקמה ואינטגרציה",
    icon: Rocket,
    color: "#2D7FF9",
    items: [
      "חיבור API ל-PayBox — שבועות בלבד",
      "הקמת The Box בתוך האפליקציה",
      "גיוס ספקים לקטגוריות מתנות ועל האש",
      "עלייה לאוויר — פיילוט ל-10K משתמשים",
    ],
  },
  {
    period: "חודש 2–3",
    title: "פיילוט ואופטימיזציה",
    icon: LineChart,
    color: "#F59E0B",
    items: [
      "הרחבה ל-100K משתמשים",
      "הוספת Box Wellness + Box Culture",
      "מדידת אחוזי מימוש — יעד 15%+",
      "אופטימיזציה של מסלולי קאשבק",
    ],
  },
  {
    period: "חודש 4–6",
    title: "גידול וקיזוז",
    icon: TrendingUp,
    color: "#34D399",
    items: [
      "פתיחה לכל 400K משתמשים (CC + Young)",
      "מועדון PayBox Young בעיצוב נפרד",
      "הכנסות מכסות את הריטיינר",
      "קמפיין 'First in Wallet'",
    ],
  },
  {
    period: "חודש 7–12",
    title: "רווחיות ופרימיום",
    icon: Building2,
    color: "#A78BFA",
    items: [
      "הוספת Box Travel + Box Tickets",
      "השקת PayBox לעסקים",
      "גידול סליקה בסופרמרקטים",
      "25% מהלקוחות עם פייבוקס כארנק ראשי",
    ],
  },
  {
    period: "שנה 2 →",
    title: "קטגוריות גדילה אגרסיבית",
    icon: Flame,
    color: "#F97316",
    items: [
      "🃏 Box Gaming — שולחנות פוקר, בילארד, קלפים (מועדוני בידור)",
      "🍔 Box Food — שת״פ 2–3 רשתות מזון מהיר (הנחות ישירות)",
      "🚗 Box Auto — רכישת כלי רכב ורישיון פרטי דרך ZUZ",
      "📱 PayBox Young — מועדון נפרד לדור הצעיר (18–35)",
    ],
  },
];

const SCRIPT = `"מפת הדרכים — פשוטה ומהירה.

חודש 1: ה-API שלכם מוכן, אנחנו מתחברים תוך שבועות. פיילוט קטן שאוסף מידע אמיתי.

חודשים 2-3: בודקים, מתקנים, מרחיבים. מקטגוריות חדשות עולות לאוויר.

חודשים 4-6: כל המשתמשים פנימה. ההכנסות כבר מכסות את הריטיינר.

חודשים 7-12: פייבוקס חוצה את נקודת האיזון ועוברת לרווח נקי.

שנה 2 — זה השלב שאני רוצה לדבר עליו לרגע. Box Gaming: מועדוני פוקר, שולחנות בילארד — רכישת ציוד דרך ZUZ. Box Food: שת"פ 2-3 רשתות מזון מהיר. Box Auto: רישיון פרטי וכלי רכב דרך הטוקן. PayBox Young: מועדון נפרד לגיל 18-35. זה לא סייד-שו — זה פייבוקס כמנוע צרכנות אמיתי.

ותוך 5 שנים: PayBox = הוולט של ישראל."`;

export default function Slide10() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden bg-white">

      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#2D7FF9] tracking-[0.18em]">מפת הדרכים</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.1] tracking-[-0.02em]">
          מחתימה לרווחיות — 6 חודשים.
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center mt-6">
        {/* Vertical timeline */}
        <div className="relative pr-9">
          <div
            className="absolute top-3 bottom-3 w-px"
            style={{ right: "15px", background: "linear-gradient(180deg,#2D7FF9 0%,#F59E0B 35%,#34D399 65%,#A78BFA 100%)" }}
          />
          <div className="space-y-4">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative">
                {/* Node */}
                <div
                  className="absolute right-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm"
                  style={{ border: `2px solid ${m.color}` }}
                >
                  <m.icon className="w-4 h-4" style={{ color: m.color }} strokeWidth={1.7} />
                </div>

                {/* Card */}
                <div
                  className="mr-11 rounded-2xl p-5 text-right border"
                  style={{ borderColor: `${m.color}22`, background: `${m.color}06` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-black tracking-wider rounded-full px-3 py-1"
                      style={{ background: `${m.color}15`, color: m.color }}
                    >
                      {m.period}
                    </span>
                    <h3 className="font-black text-lg text-[#0B1930]">{m.title}</h3>
                  </div>

                  <ul className="space-y-1.5">
                    {m.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2 flex-row-reverse">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: m.color }}
                        />
                        <span className="text-[13px] text-[#374151] leading-snug">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision footer */}
        <div className="mt-7 rounded-3xl px-8 py-6 text-center text-white"
          style={{ background: "linear-gradient(135deg,#0B1930 0%,#10254a 100%)", border: "1.5px solid #D4AF37" }}>
          <span className="text-[#D4AF37] text-xs font-black tracking-[0.22em]">חזון 5 שנים</span>
          <p className="font-black text-2xl md:text-3xl mt-2 leading-tight">
            PayBox = <span className="text-[#D4AF37]">הוולט של ישראל</span>
          </p>
          <p className="text-white/65 text-sm mt-2">
            Gaming · Food · Auto · Young · Travel · Business — הכל תחת קורת גג אחת
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[#9CA3AF] text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>10 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
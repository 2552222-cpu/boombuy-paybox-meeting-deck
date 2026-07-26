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
    period: "שנה 2–5",
    title: "מארנק — למנוע צרכנות לאומי",
    icon: Flame,
    color: "#F97316",
    items: [
      "🍶 דליברי מקומי — וולט לאלכוהול, בשר, מכולת שכונתית",
      "🏛️ תשלומי ממשל — רישיונות נהיגה, דוחות, ארנונה, אגרות",
      "💼 PayBox לעסקים — ארנק B2B, קבלת תשלומים, עסקים קטנים",
      "🎮 Box Gaming · ✈️ Box Travel · 🚗 Box Auto · 📱 Young — מגרש אחד",
    ],
  },
];

const SCRIPT = `"מפת הדרכים — פשוטה ומהירה.

חודש 1: ה-API שלכם מוכן, אנחנו מתחברים תוך שבועות. פיילוט קטן שאוסף מידע אמיתי.

חודשים 2-3: בודקים, מתקנים, מרחיבים. קטגוריות חדשות עולות לאוויר.

חודשים 4-6: כל המשתמשים פנימה. ההכנסות כבר מכסות את הריטיינר.

חודשים 7-12: פייבוקס חוצה את נקודת האיזון ועוברת לרווח נקי.

שנה 2 עד 5 — ואנחנו צריכים לדבר על זה רגע.

פייבוקס היום היא ארנק להעברות — הגדול בישראל. אבל יש פה פוטנציאל להיות הרבה יותר.

אנחנו כבר עובדים על וולט לאלכוהול, וולט לבשר — דליברי מקומי עם PayBox. זה רק ההתחלה.

תשלומי ממשל: רישיונות נהיגה, דוחות, ארנונה — הכל דרך PayBox. כי למה לא?

PayBox לעסקים — ארנק B2B לעצמאים ולעסקים קטנים שמקבלים תשלומים.

ואז Gaming, Travel, Auto, Young — כל אחד מהם שוק בפני עצמו.

החזון הוא לא 'עוד אפליקציה'. החזון הוא: ארנק אחד לכל חיי הצרכן הישראלי. מועדון הצרכנות הגדול במדינה.

ועם BoomBuy — זה לא בעוד 5 שנים. זה מתחיל עכשיו."`;

export default function Slide10() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden bg-white">

      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#2D7FF9] tracking-[0.18em]">מפת הדרכים</span>
        <div className="text-[#D4AF37] font-black text-xl mt-1 mb-1 ml-auto">·</div>
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
            PayBox = <span className="text-[#D4AF37]">סופר-אפ הצרכנות של ישראל</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl py-2 px-3" style={{background:"#D4AF3715"}}>
              <div className="font-black text-[#D4AF37]">💸 העברות</div>
              <div className="text-white/55 mt-0.5">ארנק ה-P2P הגדול בישראל</div>
            </div>
            <div className="rounded-xl py-2 px-3" style={{background:"#4F7FE015"}}>
              <div className="font-black text-[#4F7FE0]">🛒 מועדון</div>
              <div className="text-white/55 mt-0.5">The Box — מנוע צרכנות לאומי</div>
            </div>
            <div className="rounded-xl py-2 px-3" style={{background:"#34D39915"}}>
              <div className="font-black text-[#34D399]">🍶 דליברי</div>
              <div className="text-white/55 mt-0.5">אלכוהול · בשר · מקומי</div>
            </div>
            <div className="rounded-xl py-2 px-3" style={{background:"#F9731615"}}>
              <div className="font-black text-[#F97316]">🏛️ ממשל</div>
              <div className="text-white/55 mt-0.5">רישיונות · דוחות · ארנונה</div>
            </div>
            <div className="rounded-xl py-2 px-3" style={{background:"#A78BFA15"}}>
              <div className="font-black text-[#A78BFA]">💼 עסקים</div>
              <div className="text-white/55 mt-0.5">B2B · עצמאים · עסקים קטנים</div>
            </div>
            <div className="rounded-xl py-2 px-3" style={{background:"#F59E0B15"}}>
              <div className="font-black text-[#F59E0B]">🎮 בילוי</div>
              <div className="text-white/55 mt-0.5">Gaming · Travel · Auto · Young</div>
            </div>
          </div>
          <p className="text-white/40 text-[11px] mt-3">
            ארנק אחד · כל חיי הצרכן הישראלי · מועדון הצרכנות הגדול במדינה
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
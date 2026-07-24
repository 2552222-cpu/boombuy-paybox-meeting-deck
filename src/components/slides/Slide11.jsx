import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const QA = [
  {
    q: "למה 300,000 ₪ בחודש? זה לא יקר?",
    a: "זה 1 ₪ על כרטיס אשראי — לתפעול מלא של שני מועדונים, טכנולוגיה, סבסוד, ושירות. חברות מועדונים מסורתיות גובות 300-500K הקמה בלבד, ואז עוד עשרות אלפים בחודש — בלי לסבסד כלום. אצלנו ה-300K מתאפסים מהכנסות תוך 6 חודשים.",
    color: "#60A5FA",
  },
  {
    q: "מה קורה אם אחוזי המימוש נמוכים?",
    a: "בכל המועדונים שניהלנו — אחוזי המימוש אצלנו גבוהים פי 3-5 מהתעשייה כי יש סבסוד אמיתי. הלקוח הישראלי לא פראייר — אם ההטבה שווה, הוא ממש. המתחרים שלכם לא מממשים כי אין להם מחיר. לנו יש.",
    color: "#34D399",
  },
  {
    q: "מי שולט בדאטה ובלקוחות?",
    a: "הדאטה 100% שלכם. אנחנו מנהלים את הפלטפורמה בשמכם. כאל שותף אסטרטגי שלכם ולא שלנו — הלקוחות הם לקוחות PayBox, לא לקוחות BoomBuy.",
    color: "#FBBF24",
  },
  {
    q: "כמה זמן עד שיש לנו מוצר חי?",
    a: "ה-API שלכם מוכן ומתועד. אינטגרציה: שבועות. פיילוט ל-10K משתמשים: חודש אחד. פתיחה מלאה: חודש 3. אנחנו לא מדברים על פרויקט שנה — אנחנו מדברים על Q3 של השנה.",
    color: "#A78BFA",
  },
  {
    q: "מה אם פייבוקס רוצה לצאת מהשותפות?",
    a: "המסגרת כוללת exit clause ברור. לאחר שנה — ניתן לצאת עם התראה של 90 יום. הטכנולוגיה שבניתם יחד נשארת נגישה לכם. אנחנו לא רוצים שבויים — אנחנו רוצים שותפים שרוצים להיות פה.",
    color: "#F97316",
  },
];

const SCRIPT = `"קחו ממני שאלות — זו הרצה שלכם.

השאלה שסמנכ"ל הכספים תמיד שואל: 'אם לא עמדתם ביעדים — מי משלם?'

התשובה: אנחנו. אנחנו נושאים בסבסוד. אנחנו מגדלים את הסחר. הריטיינר שלכם הוא Fixed — ואנחנו לוקחים את הסיכון.

אחרי שזה ברור — כל שאלה אחרת היא רק פרטים."`;

export default function Slide11() {
  const [active, setActive] = useState(0);

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible text-white"
      style={{
        background: "linear-gradient(145deg, #0B1930 0%, #0D1F3C 50%, #0a101d 100%)",
      }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#FBBF24] tracking-[0.15em]">
          שאלות ותשובות
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
          כל ההתנגדויות.{" "}
          <span className="text-[#34D399]">כל התשובות.</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 mt-8">
        {/* Questions sidebar */}
        <div className="md:w-2/5 flex flex-col gap-3">
          {QA.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="text-right px-5 py-4 rounded-2xl border transition-all"
              style={{
                background: active === i ? `${item.color}18` : "rgba(255,255,255,0.04)",
                borderColor: active === i ? item.color : "rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-lg font-black shrink-0 mt-0.5"
                  style={{ color: item.color }}
                >
                  Q{i + 1}
                </span>
                <p className="text-sm font-bold text-right leading-snug">
                  {item.q}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Answer */}
        <div className="md:w-3/5">
          <div
            className="rounded-3xl p-8 h-full flex flex-col justify-between border"
            style={{
              background: `${QA[active].color}0f`,
              borderColor: `${QA[active].color}30`,
              minHeight: 280,
            }}
          >
            <div>
              <div
                className="text-4xl font-black mb-4"
                style={{ color: QA[active].color }}
              >
                A{active + 1}
              </div>
              <p className="text-white text-lg md:text-xl leading-[1.8] text-right font-medium">
                {QA[active].a}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-right">
              <p className="text-gray-500 text-xs">
                {active + 1} / {QA.length} — לחצו על שאלה לפתיחה
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>11</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

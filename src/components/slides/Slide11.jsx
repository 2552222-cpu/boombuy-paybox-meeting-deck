import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, fadeUp } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const QA = [
  {
    q: "למה 350,000 ₪ בחודש? זה לא יקר?",
    a: "1 ₪ על כרטיס — לתפעול מלא: טכנולוגיה, שני מועדונים, סבסוד אמיתי, ושירות לקוחות. חברות מועדונים מסורתיות גובות 400-600K הקמה ועוד ריטנר — בלי שותפות ובלי סבסוד. הריטנר שלנו הוא השקעה שמחזירה את עצמה.",
    color: "#4F7FE0",
  },
  {
    q: "למה לא לבנות לבד?",
    a: "בנייה עצמית = 12-18 חודשים, 5M+ ₪ הון, צוות טכנולוגי ייעודי. BoomBuy מוכן מחר. PayBox לא לוקחת שום סיכון הון — שילמה ריטנר, קיבלה מערכת חיה.",
    color: "#8b5cf6",
  },
  {
    q: "למה לא BUYME, כאל, MAX?",
    a: "BUYME יושב על אי-מימוש — הרווח שלהם הוא שאתם לא ממשים. אין להם סחר אמיתי. כל מועדון הטבות בישראל ובעולם עובד על הקמה + ריטנר בלבד — לא שותף, לא מחזיר רווחים. BoomBuy לוקחת על עצמה גם הקמה וגם המערכת שמביאה את הסבסוד — חיסכון של עשרות מיליונים לפייבוקס.",
    color: "#D4AF37",
  },
  {
    q: "מה אם אחוזי ההמרה נמוכים?",
    a: "אנחנו נושאים בסיכון הסבסוד. המרה נמוכה = עלות נמוכה לנו, לא הפסד לפייבוקס. הפיילוט של 90 יום קובע KPIs ברורים מראש — אם לא עמדנו בהם, פייבוקס רשאית לצאת.",
    color: "#22d3ee",
  },
  {
    q: "מי אחראי משפטית ללקוח?",
    a: "BoomBuy = המוכר הרשמי. חשבונית, משלוח, שירות, ביטולים, החזרות — הכל עלינו. PayBox = מותג ופלטפורמה בלבד. אנחנו משפים את PayBox בכל תביעה שנוגעת לסחר.",
    color: "#34D399",
  },
  {
    q: "מי שולט בדאטה ובלקוחות?",
    a: "הדאטה 100% של PayBox. BoomBuy = מעבד מידע בלבד לצרכי הזמנה. מינימום נתונים. NDA מלא. איסור מוחלט על שימוש עצמאי בלקוחות פייבוקס.",
    color: "#fb923c",
  },
  {
    q: "מה ימנע מ-BoomBuy לפנות ישירות ללקוחות?",
    a: "חוזה: איסור מוחלט על גישה ישירה ללקוחות PayBox. הנתונים בבעלות פייבוקס. ביום שהשותפות מסתיימת — הנתונים נשארים אצלכם, לא אצלנו. אנחנו רוצים שותפות ארוכת טווח, לא עסקה חד-פעמית.",
    color: "#f43f5e",
  },
  {
    q: "מה קורה אם פייבוקס רוצה לצאת?",
    a: "Exit clause ברור — 90 יום התראה לאחר 12 חודש. הנתונים שלכם, הטכנולוגיה נשארת בידיכם. אנחנו לא כובלים — אנחנו בונים שותפות שכדאי להמשיך בה.",
    color: "#a78bfa",
  },
];

const SCRIPT = `"קחו ממני שאלות — זו הרצה שלכם.

השאלה שסמנכ"ל הכספים תמיד שואל: 'אם לא עמדתם ביעדים — מי משלם?'

התשובה: אנחנו. אנחנו נושאים בסיכון הסבסוד. אנחנו מגדלים את הסחר. הריטיינר שלכם הוא Fixed — ואנחנו לוקחים את הסיכון.

לגבי BUYME ומתחרים — הם חיים מהכסף שאתם לא ממשים. אנחנו חיים מהסחר שאתם כן מממשים. זה הבדל יסודי בתמריצים.

אחרי שזה ברור — כל שאלה אחרת היא רק פרטים."`;

export default function Slide11() {
  const [active, setActive] = useState(0);

  return (
    <div
      dir="rtl"
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible text-white"
      style={{ background: "linear-gradient(145deg, #07101E 0%, #0B1930 50%, #0a101d 100%)" }}
    >
      {/* Gold top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

      {/* Header */}
      <motion.div {...fadeUp(0)} className="text-right shrink-0">
        <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: "#D4AF37" }}>
          שאלות ותשובות
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
          כל ההתנגדויות.{" "}
          <span style={{ color: "#4F7FE0" }}>כל התשובות.</span>
        </h1>
        <p className="mt-1 text-white/30 text-sm">לחצו על שאלה לפתיחה</p>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-5 mt-6 min-h-0">

        {/* Questions sidebar */}
        <div className="md:w-[42%] flex flex-col gap-2 overflow-y-auto">
          {QA.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="text-right px-4 py-3 rounded-2xl border transition-all"
              style={{
                background: active === i ? `${item.color}15` : "rgba(255,255,255,0.03)",
                borderColor: active === i ? item.color : "rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-black shrink-0 mt-0.5" style={{ color: item.color }}>
                  Q{i + 1}
                </span>
                <p className="text-sm font-bold text-right leading-snug text-white/85">
                  {item.q}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Answer */}
        <div className="md:w-[58%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-3xl p-7 h-full flex flex-col border"
              style={{
                background: `${QA[active].color}0c`,
                borderColor: `${QA[active].color}28`,
                minHeight: 260,
              }}
            >
              <div className="flex-1">
                <div className="text-3xl font-black mb-4" style={{ color: QA[active].color }}>
                  A{active + 1}
                </div>
                <p className="text-white text-lg leading-[1.9] text-right font-medium">
                  {QA[active].a}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/8 flex justify-between items-center">
                <div className="flex gap-1">
                  {QA.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ background: i === active ? QA[active].color : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {active > 0 && (
                    <button
                      onClick={() => setActive(active - 1)}
                      className="text-xs text-white/40 hover:text-white/70 transition-colors"
                    >← הקודמת</button>
                  )}
                  {active < QA.length - 1 && (
                    <button
                      onClick={() => setActive(active + 1)}
                      className="text-xs text-white/40 hover:text-white/70 transition-colors"
                    >הבאה →</button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-white/20 text-[11px] shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>Q&A</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

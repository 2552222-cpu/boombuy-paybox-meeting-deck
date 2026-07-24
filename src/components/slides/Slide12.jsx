import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const TERMS = [
  {
    section: "א. שותף",
    title: "זהות הצדדים",
    content: "BoomBuy (להלן: 'ספק') ו-PayBox (להלן: 'שותף') — שותפות אסטרטגית לניהול מועדון הטבות.",
    color: "#60A5FA",
  },
  {
    section: "ב. מודל",
    title: "Experience as a Service",
    content: "BoomBuy מספקת תשתית טכנולוגית, ניהול שני מועדונים (PayBox CC + Young), סחר וסבסוד הטבות.",
    color: "#FBBF24",
  },
  {
    section: "ג. תשלום",
    title: "ריטיינר חודשי",
    content: "300,000 ₪/חודש (1 ₪ × 300K כרטיסים). מנגנון קיזוז: כל הכנסה ממימוש/סחר/עמלות מופחתת מהריטיינר.",
    color: "#34D399",
  },
  {
    section: "ד. הכנסות",
    title: "חלוקת Rev-Share",
    content: "רווחי סחר (Commerce): 50/50. עמלה צולבת נוספת מגידול הסליקה: 70% PayBox / 30% BoomBuy. Box Eilat: 30 ₪ קבוע לעסקה לכל צד.",
    color: "#A78BFA",
  },
  {
    section: "ה. דאטה",
    title: "בעלות מידע",
    content: "כל הדאטה שייך ל-PayBox. BoomBuy מקבלת גישת Read-Only לצרכי ניהול הפלטפורמה בלבד. הסכם סודיות מלא.",
    color: "#F97316",
  },
  {
    section: "ו. יציאה",
    title: "Exit Clause",
    content: "לאחר 12 חודש — כל צד יכול לצאת עם התראה של 90 יום. הטכנולוגיה נשארת מוקפאת במצב פעיל ל-PayBox.",
    color: "#EC4899",
  },
];

const ACTIONS = [
  { num: "01", action: "אישור עקרוני למסגרת השותפות", timeline: "בפגישה זו" },
  { num: "02", action: "חתימה על NDA + Term Sheet", timeline: "תוך 7 ימים" },
  { num: "03", action: "ישיבת טכנולוגיה (API Kickoff)", timeline: "שבוע 2" },
  { num: "04", action: "עלייה לאוויר — פיילוט 10K", timeline: "חודש 1" },
];

const SCRIPT = `"מסמך עמוד אחד. ארבעה Action Items.

אני לא מבקש מכם לחתום על חוזה של 100 עמודים היום. אני מבקש אישור עקרוני בפגישה הזו.

תוך 7 ימים — NDA וTerm Sheet. שבוע שני — ישיבת Kickoff טכנית. חודש ראשון — משתמשים ראשונים חיים.

המסמך אצלי בתיק. עמוד אחד. בואו נחתום ונתחיל לבנות ביחד."`;

export default function Slide12() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 overflow-visible"
      style={{ background: "#ffffff" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#2D7FF9] tracking-[0.15em]">
          Term Sheet · מסגרת שותפות
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.1] tracking-tight">
          נוסחה פשוטה. שותפות ל-200 שנה.
        </h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 mt-7">
        {/* Term sheet */}
        <div className="md:w-3/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TERMS.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border text-right"
                style={{
                  borderColor: t.color + "35",
                  background: t.color + "07",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-black tracking-wider"
                    style={{ color: t.color }}
                  >
                    {t.section}
                  </span>
                  <p className="font-black text-sm text-[#0B1930]">{t.title}</p>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">{t.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action items */}
        <div className="md:w-2/5 flex flex-col gap-4">
          <h3 className="text-[#0B1930] font-black text-xl text-right">
            ✅ Action Items
          </h3>
          <div className="flex flex-col gap-3">
            {ACTIONS.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border border-[#E5E7EB] bg-[#F9FAFB] text-right flex items-center gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0B1930] flex items-center justify-center text-white font-black text-sm">
                  {a.num}
                </div>
                <div className="flex-1">
                  <p className="font-black text-[#0B1930] text-sm">{a.action}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">📅 {a.timeline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-[#0B1930] p-6 text-white text-center mt-2">
            <p className="font-black text-xl mb-1">בואו נחתום.</p>
            <p className="text-gray-400 text-sm">
              המסמך מוכן · עמוד אחד · היום
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5BA4CF] flex items-center justify-center text-white font-black text-xs">
                PB
              </div>
              <span className="text-gray-400">×</span>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-black text-xs">
                BB
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[#9CA3AF] text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Users, Layers, DollarSign, PieChart, Database, LogOut, CheckCircle2, Calendar } from "lucide-react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { EASE, fadeUp, deckItem, deckContainer, GoldBar } from "@/components/slides/deckAnim";

const LOGO_BASE = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/";
const BOOMBUY_LOGO = LOGO_BASE + "f01a26580_.png";
const PAYBOX_LOGO = LOGO_BASE + "9452db55b_61.png";
const THEBOX_LOGO = LOGO_BASE + "96ca92369_60.png";

const TERMS = [
  { icon: Users,      section:"א. שותפות", title:"Experience as a Service",  content:"BoomBuy מספקת תשתית, ניהול 2 מועדונים, סחר וסבסוד. PayBox מספקת תשתית API ובסיס הלקוחות.", color:"#5BA4CF" },
  { icon: DollarSign, section:"ב. תשלום",  title:"ריטיינר חודשי",            content:"300,000 ₪ (1 ₪ × 300K כרטיסים). מנגנון קיזוז: כל הכנסה ממימוש/סחר/עמלות מופחתת מהריטיינר.", color:"#D4AF37" },
  { icon: PieChart,   section:"ג. הכנסות", title:"חלוקת Rev-Share",          content:"סחר: 50/50. עמלה צולבת נוספת: 70% PayBox / 30% BoomBuy. Box Eilat: 30 ₪ לעסקה לכל צד.", color:"#34D399" },
  { icon: Database,   section:"ד. דאטה",   title:"בעלות מידע",               content:"כל הדאטה שייך ל-PayBox. BoomBuy — גישת Read-Only לצרכי הפלטפורמה בלבד. הסכם NDA מלא.", color:"#A78BFA" },
  { icon: Layers,     section:"ה. SLA",    title:"זמינות ויעדים",            content:"99.5% uptime. יעד Break-Even: חודש 6. דוחות ביצוע חודשיים שקופים לשני הצדדים.", color:"#F97316" },
  { icon: LogOut,     section:"ו. יציאה",  title:"Exit Clause",              content:"לאחר 12 חודש — כל צד יכול לצאת עם התראה של 90 יום. הטכנולוגיה נשארת במצב פעיל ל-PayBox.", color:"#EC4899" },
];

const ACTIONS = [
  { num:"01", action:"אישור עקרוני למסגרת השותפות",   timeline:"פגישה זו", icon: CheckCircle2 },
  { num:"02", action:"חתימה על NDA + Term Sheet",       timeline:"7 ימים",   icon: CheckCircle2 },
  { num:"03", action:"ישיבת Kickoff טכנית (API)",       timeline:"שבוע 2",   icon: Calendar },
  { num:"04", action:"עלייה לאוויר — פיילוט 10K",      timeline:"חודש 1",   icon: Calendar },
];

const SCRIPT = `"זה המבנה המוצע — שישה סעיפים פשוטים.

אנחנו לא מגיעים לכאן בלחץ. אנחנו מגיעים עם הצעה שמדברת בעד עצמה.

כשתחושו שהמספרים עושים הגיון ושהכיוון נכון — נשמח לפתוח שיחה על פרטי המסגרת.

הצעד הבא הוא שיחה קצרה על NDA ועל Term Sheet. אנחנו זמינים בכל עיתוי שמתאים לכם."`;

export default function Slide12() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-12 overflow-hidden bg-white">
      {/* Header */}
      <motion.header {...fadeUp(0)} className="text-right shrink-0">
        <span className="text-sm font-bold text-[#5BA4CF] tracking-[0.2em] uppercase">
          Term Sheet · מסגרת שותפות
        </span>
        <GoldBar className="mt-4" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.1] tracking-[-0.02em]">
          נוסחה פשוטה.<br />
          <span className="text-[#0B1930]/55">שותפות לטווח ארוך.</span>
        </h1>
      </motion.header>

      <div className="flex-1 flex flex-col md:flex-row gap-8 mt-10">
        {/* Term sheet grid */}
        <motion.div
          variants={deckContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="md:flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 content-start"
        >
          {TERMS.map((t, i) => (
            <motion.div
              key={i}
              variants={deckItem}
              className="rounded-2xl p-5 text-right border transition-colors"
              style={{ borderColor: "#ECEEF2", background: "#FAFBFC" }}
            >
              <div className="flex items-center justify-between mb-3">
                <t.icon className="w-4 h-4 shrink-0" style={{ color: t.color }} strokeWidth={1.6} />
                <div className="text-right">
                  <span className="text-[10px] font-black tracking-wider" style={{ color: t.color }}>
                    {t.section}
                  </span>
                  <p className="font-black text-sm text-[#0B1930] mt-0.5">{t.title}</p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{t.content}</p>
              <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: t.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Side: next steps + CTA */}
        <div className="md:w-[340px] flex flex-col gap-4">
          <motion.h3 {...fadeUp(0.1)} className="text-[#0B1930] font-black text-xl text-right">
            השלבים הבאים
          </motion.h3>

          <motion.ul
            variants={deckContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3"
          >
            {ACTIONS.map((a, i) => (
              <motion.li
                key={i}
                variants={deckItem}
                className="rounded-2xl p-4 border border-[#ECEEF2] bg-[#F9FAFB] flex items-center gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0B1930] flex items-center justify-center text-white font-black text-sm">
                  {a.num}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-black text-[#0B1930] text-sm">{a.action}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5 flex items-center gap-1 justify-end">
                    <a.icon className="w-3 h-3" strokeWidth={1.6} />
                    {a.timeline}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA — economic engine ignition */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-3xl p-6 text-white text-center mt-1"
            style={{ background: "linear-gradient(160deg,#0B1930 0%,#0D1F3C 100%)", border: "1.5px solid #D4AF37" }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <img src={BOOMBUY_LOGO} alt="BoomBuy" className="h-6 w-auto brightness-0 invert" />
              <span className="text-[#D4AF37] text-lg font-light">×</span>
              <div className="rounded-xl bg-white p-1 flex items-center h-9">
                <img src={THEBOX_LOGO} alt="The Box" className="h-7 w-auto" />
              </div>
              <span className="text-[#D4AF37] text-lg font-light">=</span>
              <div className="rounded-xl bg-white p-1 flex items-center h-9">
                <img src={PAYBOX_LOGO} alt="PayBox" className="h-7 w-auto" />
              </div>
            </div>
            <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.22em] uppercase">
              המנוע הכלכלי מוכן
            </span>
            <p className="font-black text-xl mt-1.5 leading-tight">
              כשיהיה נוח לכם —<br />
              אנחנו כאן ומוכנים.
            </p>
            <p className="text-gray-500 text-[10px] mt-3">NDA + Term Sheet · מוכן לחתימה</p>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[#9CA3AF] text-[11px] shrink-0 mt-6">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>12 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
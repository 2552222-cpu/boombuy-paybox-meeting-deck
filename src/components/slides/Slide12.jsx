import React from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, DollarSign, Database, BarChart2, LogOut } from "lucide-react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";
import { EASE, fadeUp, deckItem, deckContainer, GoldBar } from "@/components/slides/deckAnim";

const LOGO_BASE = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/";
const BOOMBUY_LOGO = LOGO_BASE + "f01a26580_.png";
const PAYBOX_LOGO  = LOGO_BASE + "9452db55b_61.png";
const THEBOX_LOGO  = LOGO_BASE + "96ca92369_60.png";

const TERMS = [
  {
    icon: Users,
    section: "א. שותפות",
    title: "Experience as a Service",
    content: "BoomBuy: תשתית, טכנולוגיה, שני מועדונים, סחר וסבסוד. PayBox: מותג, API ובסיס הלקוחות. המוצר נראה ללקוח כמוצר PayBox.",
    color: "#4F7FE0",
  },
  {
    icon: DollarSign,
    section: "ב. תשלום",
    title: "ריטנר פתיחה | יורד אוטומטית עם הצמיחה",
    content: "350K ₪/חודש | 4.2M ₪/שנה. כולל: טכנולוגיה, סחר, שירות, סבסוד ו-ZUZ | הכל על BoomBuy. נוסחת הפחתה: GMV 210M ₪ → ריטנר ×50%. GMV 420M ₪ → ריטנר = 0. הנוסחה תיחשב לפי תוצאות הפיילוט.",
    color: "#D4AF37",
  },
  {
    icon: BarChart2,
    section: "ג. הכנסות",
    title: "חלוקת ערך דו-כיוונית | ייקבע בפיילוט",
    content: "PayBox: 0–3% מה-GMV של The Box. BoomBuy: חלק מוסכם מהערך הפיננסי החדש (Interchange + Float). שתי השכבות ביחד מורידות את הריטנר האפקטיבי. אחוזים סופיים | יוסכמו יחד.",
    color: "#34D399",
  },
  {
    icon: ShieldCheck,
    section: "ד. אחריות",
    title: "BoomBuy = המוכר הרשמי",
    content: "חשבוניות, משלוחים, שירות, ביטולים, החזרות | עלינו. PayBox לא נושא אחריות מסחרית. BoomBuy משפה את PayBox בכל מקרה.",
    color: "#22d3ee",
  },
  {
    icon: Database,
    section: "ה. דאטה",
    title: "הנתונים שייכים ל-PayBox",
    content: "BoomBuy = מעבד מידע בלבד. מינימום נתונים לצרכי ביצוע הזמנה. NDA מלא. איסור מוחלט על שימוש עצמאי בלקוחות PayBox.",
    color: "#a78bfa",
  },
  {
    icon: LogOut,
    section: "ו. פיילוט + יציאה",
    title: "90 יום עם KPIs ברורים",
    content: "פיילוט 90 יום עם KPIs מוסכמים. בתום הפיילוט | החלטה משותפת להמשיך. תקופת התקשרות מסחרית: 12 חודש. זכות יציאה: בתום 12 החודש, עם 90 יום התראה. נתונים ונכסי PayBox | תמיד אצלכם.",
    color: "#fb923c",
  },
];

const ACTIONS = [
  { num: "01", action: "אישור עקרוני למסגרת", timeline: "פגישה זו" },
  { num: "02", action: "חתימה על NDA + Term Sheet", timeline: "7 ימים" },
  { num: "03", action: "Kickoff טכני (API + אינטגרציה)", timeline: "שבוע 2" },
  { num: "04", action: "פיילוט חי | 10,000 משתמשים", timeline: "חודש 1" },
];

const SCRIPT = `"זה המבנה המוצע — שישה סעיפים פשוטים.

אנחנו לא מגיעים לכאן בלחץ. אנחנו מגיעים עם הצעה שמדברת בעד עצמה.

נקודה חשובה: ככל שהשותפות גדלה ואנחנו נשתף גם ב-upside של Layer 1 — הריטנר יכול להצטמצם. המטרה שלנו: שותפות אמיתית ב-upside, לא ספק שמקבל תשלום.

הצעד הבא: NDA + Term Sheet. אנחנו מוכנים."`;

export default function Slide12() {
  return (
    <div dir="rtl" className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-12 overflow-hidden bg-white">

      {/* Header */}
      <motion.header {...fadeUp(0)} className="text-right shrink-0">
        <span className="text-xs font-black text-[#4F7FE0] tracking-[0.2em] uppercase">
          Term Sheet · מסגרת שותפות
        </span>
        <GoldBar className="mt-4" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.1] tracking-[-0.02em]">
          נוסחה פשוטה.<br />
          <span className="text-[#0B1930]/40">שותפות לטווח ארוך.</span>
        </h1>
      </motion.header>

      <div className="flex-1 flex flex-col md:flex-row gap-8 mt-8">

        {/* Terms grid */}
        <motion.div
          variants={deckContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="md:flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 content-start"
        >
          {TERMS.map((t, i) => (
            <motion.div
              key={i}
              variants={deckItem}
              className="rounded-2xl p-5 text-right border"
              style={{ borderColor: "#ECEEF2", background: "#FAFBFC" }}
            >
              <div className="flex items-center justify-between mb-2">
                <t.icon className="w-4 h-4 shrink-0" style={{ color: t.color }} strokeWidth={1.5} />
                <div className="text-right">
                  <span className="text-[10px] font-black tracking-wider" style={{ color: t.color }}>
                    {t.section}
                  </span>
                  <p className="font-black text-sm text-[#0B1930] mt-0.5">{t.title}</p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{t.content}</p>
              <div className="mt-3 h-[2px] w-8 rounded-full" style={{ background: t.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Side: next steps + CTA */}
        <div className="md:w-[300px] flex flex-col gap-4">
          <motion.h3 {...fadeUp(0.1)} className="text-[#0B1930] font-black text-lg text-right">
            השלבים הבאים
          </motion.h3>

          <motion.ul
            variants={deckContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-2"
          >
            {ACTIONS.map((a, i) => (
              <motion.li
                key={i}
                variants={deckItem}
                className="rounded-2xl p-4 border border-[#ECEEF2] bg-[#F9FAFB] flex items-center gap-4"
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-[#0B1930] flex items-center justify-center text-white font-black text-xs">
                  {a.num}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-black text-[#0B1930] text-sm">{a.action}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">{a.timeline}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.3)}
            className="rounded-3xl p-6 text-white text-center mt-1"
            style={{ background: "linear-gradient(160deg,#0B1930 0%,#0D1F3C 100%)", border: "1.5px solid #D4AF37" }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <img src={BOOMBUY_LOGO} alt="BoomBuy" className="h-6 w-auto brightness-0 invert" />
              <span className="text-[#D4AF37] text-lg font-light">×</span>
              <div
                className="rounded-xl overflow-hidden flex items-center"
                style={{
                  width: 36, height: 36,
                  backgroundImage: `url(${THEBOX_LOGO})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
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

      <div className="flex items-center justify-between text-[#9CA3AF] text-[11px] shrink-0 mt-5">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>Term Sheet</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Users, Layers, DollarSign, PieChart, Database, LogOut, CheckCircle2, Calendar } from "lucide-react";
import { BrandLockup } from "@/components/slides/Logos";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

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

const item = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0} };
const container = { hidden:{}, show:{transition:{staggerChildren:0.07}} };

export default function Slide12() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden bg-white">

      {/* Header */}
      <motion.div initial={{opacity:0,y:-10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
        className="text-right shrink-0 flex items-start gap-5 justify-end">
        <div>
          <span className="text-sm font-bold text-[#5BA4CF] tracking-[0.18em] uppercase">Term Sheet · מסגרת שותפות</span>
          <h1 className="mt-2 text-3xl md:text-5xl font-black text-[#0B1930] leading-[1.08] tracking-[-0.02em]">
            נוסחה פשוטה.<br/>שותפות לטווח ארוך.
          </h1>
        </div>
        <div className="h-16 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent shrink-0 mt-1" />
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.2}}
        className="flex-1 flex flex-col md:flex-row gap-6 mt-8">

        {/* Term sheet grid */}
        <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-3 content-start">
          {TERMS.map((t,i)=>(
            <motion.div key={i} variants={item}
              className="rounded-2xl p-5 border text-right"
              style={{borderColor:`${t.color}28`, background:`${t.color}07`}}>
              <div className="flex items-center justify-between mb-3">
                <t.icon className="w-4 h-4 shrink-0" style={{color:t.color}} strokeWidth={1.5} />
                <div className="text-right">
                  <span className="text-[10px] font-black tracking-wider" style={{color:t.color}}>{t.section}</span>
                  <p className="font-black text-sm text-[#0B1930] mt-0.5">{t.title}</p>
                </div>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">{t.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Action items */}
        <div className="md:w-2/5 flex flex-col gap-4">
          <h3 className="text-[#0B1930] font-black text-xl text-right">השלבים הבאים</h3>
          <div className="flex flex-col gap-3">
            {ACTIONS.map((a,i)=>(
              <motion.div key={i} variants={item}
                className="rounded-2xl p-5 border border-[#E5E7EB] bg-[#F9FAFB] flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0B1930] flex items-center justify-center text-white font-black text-sm">
                  {a.num}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-black text-[#0B1930] text-sm">{a.action}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5 flex items-center gap-1 justify-end">
                    <a.icon className="w-3 h-3" strokeWidth={1.5} />
                    {a.timeline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft CTA */}
          <motion.div variants={item}
            className="rounded-2xl bg-[#0B1930] p-6 text-white text-center mt-1">
            <div className="flex items-center justify-center mb-4">
              <BrandLockup size={28} />
            </div>
            <p className="font-bold text-base text-white/80 leading-relaxed">
              כשיהיה נוח לכם להתקדם —<br/>
              <span className="text-white font-black">אנחנו כאן ומוכנים.</span>
            </p>
            <p className="text-gray-500 text-xs mt-3">המסמך מוכן · NDA + Term Sheet</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between text-[#9CA3AF] text-[11px] shrink-0 mt-5">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>12 / 12</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

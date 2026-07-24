import React from "react";
import { motion } from "framer-motion";
import { Coins, Store, CreditCard, ArrowLeft } from "lucide-react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const FLOWS = [
  { icon: Coins,      title: "לקוח פעיל בפייבוקס",        desc:"מעביר כסף, שומר יתרה, משתמש בכרטיס",           color:"#5BA4CF" },
  { icon: Coins,      title: "צובר PayBox Coins",           desc:"10–30% קאשבק על כל פעולה רצויה — אוטומטי",     color:"#FBBF24" },
  { icon: Store,      title: "ממש ב-The Box",               desc:"משתמש בנקודות + מעט כסף למוצרי פרימיום",        color:"#34D399" },
  { icon: CreditCard, title: "סולק באשראי פייבוקס",        desc:"הכסף נשאר בבית · PayBox מרוויחה עמלה",          color:"#A78BFA" },
];

const EXAMPLES = [
  { trigger:"קבוצת 'על האש' אספה 2,100 ₪", reward:"קאשבק 20% = 420 נקודות", redeem:"בשר מבלדי 250 ₪ + אלכוהול מפאנקו 170 ₪", save:"חיסכון: ~420 ₪" },
  { trigger:"קבוצת מתנה אספה 900 ₪",       reward:"קאשבק 20% = 180 נקודות", redeem:"מתנה פרימיום ב-Box Gifts ב-180 ₪ מתוך 360 ₪", save:"חיסכון: ~180 ₪" },
];

const SCRIPT = `"הנה בדיוק איך זה עובד.

14 חברים אוספים 2,100 שקל לעל האש דרך פייבוקס. הם מקבלים 20% קאשבק — 420 נקודות.

במקום למשוך לעו"ש, הם נכנסים ל-Box Barbecue ו-Box Alcohol, קונים בשר ואלכוהול עם הנקודות.

הכסף נשאר בפייבוקס. הלקוח מרגיש שקיבל מתנה. פייבוקס גוזרת עמלה. אנחנו לוקחים מרווח. Win-Win-Win."`;

const item = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0} };
const container = { hidden:{}, show:{transition:{staggerChildren:0.1}} };

export default function Slide5() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden text-white"
      style={{background:"linear-gradient(145deg,#1a2a40 0%,#0D1F3C 60%,#0a101d 100%)"}}>

      {/* Header */}
      <motion.div initial={{opacity:0,y:-10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
        className="text-center shrink-0">
        <span className="text-sm font-bold text-[#FBBF24] tracking-[0.18em] uppercase">מנוע הנאמנות</span>
        <div className="flex justify-center mt-4 mb-1">
          <div className="h-10 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black leading-[1.15] tracking-[-0.02em]">
          כל פעולה בפייבוקס הופכת לערך ב-The Box
        </h1>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.2}}
        className="flex-1 flex flex-col justify-center gap-7 mt-8">

        {/* Flow steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FLOWS.map((s,i)=>(
            <React.Fragment key={i}>
              <motion.div variants={item}
                className="rounded-2xl p-6 border flex flex-col gap-3"
                style={{background:`${s.color}0d`, borderColor:`${s.color}28`}}>
                <s.icon className="w-5 h-5 shrink-0" style={{color:s.color}} strokeWidth={1.5} />
                <p className="font-black text-sm leading-snug" style={{color:s.color}}>{s.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </motion.div>
              {i < FLOWS.length-1 && (
                <div className="hidden md:col-span-0 md:flex items-center justify-center absolute"
                  style={{display:"none"}} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLES.map((ex,i)=>(
            <motion.div key={i} variants={item}
              className="rounded-2xl p-6 border border-white/8 bg-white/4 text-right">
              <p className="text-[#FBBF24] font-black text-sm mb-3">{ex.trigger}</p>
              <p className="text-gray-300 text-xs mb-1"><span className="text-white font-bold">→ תגמול:</span> {ex.reward}</p>
              <p className="text-gray-300 text-xs mb-1"><span className="text-white font-bold">→ מימוש:</span> {ex.redeem}</p>
              <p className="text-[#34D399] text-xs font-bold mt-2">{ex.save}</p>
            </motion.div>
          ))}
        </div>

        {/* Punch line */}
        <motion.div variants={item}
          className="rounded-full bg-[#FBBF24] flex items-center justify-center gap-4 px-8 py-4 mx-auto shadow-2xl">
          <span className="text-base font-black text-black">הנחה של עד</span>
          <span className="text-4xl font-black text-black">50%</span>
          <span className="text-base font-black text-black">על מה שהלקוח קונה ממילא</span>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-gray-600 text-[11px] shrink-0 mt-5">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>05 / 12</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

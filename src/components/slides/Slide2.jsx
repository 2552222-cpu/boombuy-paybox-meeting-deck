import React from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, CreditCard, Wallet } from "lucide-react";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const STATS = [
  { value:"100%", label:"מכספי הקבוצות", sub:"נמשכים לעו\"ש בנקים אחרים — הכסף בורח מהמערכת", icon: ArrowDownToLine, color:"#EF4444" },
  { value:"10%",  label:"First in Wallet",sub:"90% מהמחזיקים משתמשים בכרטיס פייבוקס כמשני",     icon: CreditCard,        color:"#F59E0B" },
  { value:"₪0",   label:"תקציב סבסוד",   sub:"הסיבה האמיתית שלא נבנה מועדון עד היום",          icon: Wallet,            color:"#94A3B8" },
];

const SCRIPT = `"540 מיליון שקל סליקה חודשית. 4 מיליון משתמשים. 2 מיליון טרנזקציות.

אבל מה קורה עם הכסף? 100% מכספי הקבוצות נמשך לעו"ש. כסף שנאסף דרך פייבוקס — יוצא לבנק אחר.

10% בלבד משתמשים בכרטיס כראשי. 90% מהלקוחות בוחרים כרטיס אחר כשהם הולכים לסופר.

הסיבה? אין סבסוד. ובלי סבסוד — אין מועדון. זאת הבעיה שאנחנו פותרים."`;

const item = { hidden:{opacity:0,y:22}, show:{opacity:1,y:0,transition:{duration:0.7,ease:EASE}} };
const container = { hidden:{}, show:{ transition:{staggerChildren:0.12} } };

export default function Slide2() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-12 overflow-hidden"
      style={{ background:"linear-gradient(145deg,#0B1930 0%,#0D1F3C 60%,#07101e 100%)" }}>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.3}}
        className="flex-1 flex flex-col justify-between">

        {/* Header */}
        <motion.div variants={item} className="text-right">
          <span className="text-sm font-bold text-[#5BA4CF] tracking-[0.18em] uppercase">תמונת המצב</span>
          <div className="flex justify-end mt-4 mb-1">
            <div className="h-14 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.08] tracking-[-0.02em]">
            הכסף עובר דרככם.<br/>
            <span className="text-[#5BA4CF]">הגיע הזמן שיישאר.</span>
          </h1>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10">
          {STATS.map((s,i)=>(
            <motion.div key={i} variants={item}
              className="rounded-2xl p-7 border text-right"
              style={{ background:`${s.color}0d`, borderColor:`${s.color}25` }}>
              <s.icon className="w-6 h-6 mb-4" style={{color:s.color}} strokeWidth={1.5} />
              <p className="text-5xl md:text-6xl font-black mb-3" style={{color:s.color}}>{s.value}</p>
              <p className="text-white font-bold text-base mb-2">{s.label}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Context bar */}
        <motion.div variants={item}
          className="rounded-2xl bg-white/4 border border-white/8 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#FBBF24] font-bold text-base md:text-lg text-center md:text-right">
            540M ₪ סליקת אשראי · 2M טרנזקציות · 4M משתמשים
          </p>
          <div className="shrink-0 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/25 px-5 py-2">
            <span className="text-[#FBBF24] font-black text-sm">הנכס קיים. המנוע חסר.</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-gray-600 text-[11px] shrink-0 mt-6">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>02 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}
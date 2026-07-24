import React from "react";
import { motion } from "framer-motion";
import { Gift, CreditCard, UtensilsCrossed, Wine, Shirt, Plane, Theater, Dumbbell, Sun, GraduationCap, Settings, ShoppingBag, Layers } from "lucide-react";
import { TheBoxLogo } from "@/components/slides/Logos";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const CATS = [
  { icon: Gift,            name: "Box Gifts",         he: "מתנות כלליות" },
  { icon: CreditCard,      name: "Box Gift Cards",    he: "כרטיסי מתנה" },
  { icon: GraduationCap,   name: "Box Teacher",       he: "למורות וגננות" },
  { icon: Shirt,           name: "Box Fashion",       he: "אופנה והנעלה" },
  { icon: Plane,           name: "Box Holidays",      he: "חופשות וטיולים" },
  { icon: Theater,         name: "Box Culture",       he: "תרבות ופנאי" },
  { icon: Wine,            name: "Box Alcohol",       he: "אלכוהול ויין" },
  { icon: UtensilsCrossed, name: "Box Barbecue",      he: "על האש" },
  { icon: Sun,             name: "Box Eilat",         he: "כרטיס אילת" },
  { icon: Dumbbell,        name: "Box Wellness",      he: "ספא ועיסויים" },
];

const SCRIPT = `"The Box — מתחם ההטבות הבלעדי של משתמשי PayBox.

10 קטגוריות. כל אחת מחוברת ישירות להתנהגויות שהלקוחות שלכם כבר עושים היום.

פותחים קבוצה לאיסוף כסף למתנה? יש Box Gifts. אוספים לעל האש? Box Barbecue. רוצים לחלק כרטיסים לאילת? Box Eilat.

לא ממציאים התנהגויות חדשות — עוצרים את הכסף מלברוח החוצה.

ובכל קטגוריה — המחיר הטוב ביותר בישראל. כי אנחנו עובדים ישירות עם יבואנים."`;

const item = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0} };
const container = { hidden:{}, show:{transition:{staggerChildren:0.06}} };

export default function Slide3() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background:"linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}>

      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize:"48px 48px" }} />

      {/* Header */}
      <motion.div initial={{opacity:0,y:-10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
        className="relative text-right shrink-0 flex items-start gap-5 justify-end">
        <div>
          <span className="text-sm font-bold text-white/60 tracking-[0.18em] uppercase">הפתרון</span>
          <h1 className="mt-2 text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-[-0.02em]">
            10 עולמות ערך. מחיר שלא ניתן לקנות בשוק.
          </h1>
        </div>
        <div className="h-16 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent shrink-0 mt-1" />
      </motion.div>

      {/* Category grid */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.2}}
        className="relative flex-1 grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
        {CATS.map((cat,i)=>(
          <motion.div key={i} variants={item}
            className="rounded-2xl px-4 py-5 flex flex-col items-center text-center gap-3 transition-all hover:scale-[1.03]"
            style={{ background:"rgba(255,255,255,0.18)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.35)" }}>
            <cat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            <div>
              <p className="text-white font-black text-[11px] leading-tight">{cat.name}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{cat.he}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* EaaS footer bar */}
      <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.3}}
        className="relative rounded-2xl px-7 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background:"rgba(0,0,0,0.2)", border:"1px solid rgba(255,255,255,0.2)" }}>
        <div className="text-right">
          <p className="text-white font-black text-lg">Experience as a Service</p>
          <p className="text-white/60 text-sm mt-0.5">לא SaaS · לא קטלוג · לא קופונים — מנוע חוויה מלא מקצה לקצה</p>
        </div>
        <div className="flex gap-6 shrink-0">
          {[["⚙️ טכנולוגיה", Settings],["🛍️ סחר", ShoppingBag],["💰 סבסוד", Gift],["🔧 אופרציה", Layers]].map(([label, Icon],i)=>(
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{background:"rgba(255,255,255,0.18)"}}>
                <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-white/70 text-[9px] font-bold">{label.split(" ")[1]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="relative flex items-center justify-between text-white/35 text-[11px] shrink-0 mt-5">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>03 / 12</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Store, Sparkles, Boxes } from "lucide-react";
import { Image } from "@/components/ui/image";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const CATS = [
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/e2af722d7_generated_image.png", name: "Box Gifts",      he: "מתנות כלליות" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/12139db8e_generated_image.png", name: "Box Gift Cards", he: "כרטיסי מתנה" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/fd8275af5_generated_image.png", name: "Box Teacher",     he: "למורות וגננות" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/accd19591_generated_image.png", name: "Box Fashion",     he: "אופנה והנעלה" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/c6f062222_generated_image.png", name: "Box Holidays",    he: "חופשות וטיולים" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/38812a91a_generated_image.png", name: "Box Culture",     he: "תרבות ופנאי" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/7ab7c449a_generated_image.png", name: "Box Alcohol",     he: "אלכוהול ויין" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/2a0045fac_generated_image.png", name: "Box Barbecue",     he: "על האש" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/4da64371c_generated_image.png", name: "Box Eilat",        he: "כרטיס אילת" },
  { img: "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/f336c2d59_generated_image.png", name: "Box Wellness",     he: "ספא ועיסויים" },
];

const SCRIPT = `"The Box — מתחם ההטבות הבלעדי של משתמשי PayBox.

10 קטגוריות. כל אחת מחוברת ישירות להתנהגויות שהלקוחות שלכם כבר עושים היום.

פותחים קבוצה לאיסוף כסף למתנה? יש Box Gifts. אוספים לעל האש? Box Barbecue.

לא ממציאים התנהגויות חדשות — עוצרים את הכסף מלברוח החוצה, והופכים כל פעולה למנוע כלכלי שעובד בשבילכם.

ובכל קטגוריה — המחיר הטוב ביותר בישראל, כי אנחנו עובדים ישירות עם יבואנים."`;

const EAAS = [
  { icon: Cpu,      label: "טכנולוגיה" },
  { icon: Store,    label: "מסחר" },
  { icon: Sparkles, label: "סבסוד" },
  { icon: Boxes,    label: "אופרציה" },
];

const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

export default function Slide3() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5BA4CF 0%,#6FB3E0 50%,#4A8EC7 100%)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}
        className="relative text-right shrink-0 flex items-start gap-5 justify-end">
        <div>
          <span className="text-sm font-bold text-white/60 tracking-[0.18em] uppercase">הפתרון</span>
          <h1 className="mt-2 text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-[-0.02em]">
            10 עולמות ערך. מחיר שלא ניתן לקנות בשוק.
          </h1>
        </div>
        <div className="h-16 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent shrink-0 mt-1" />
      </motion.div>

      {/* Category grid with images */}
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
        className="relative flex-1 grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
        {CATS.map((cat, i) => (
          <motion.div key={i} variants={item}
            className="group rounded-2xl overflow-hidden text-right flex flex-col transition-transform hover:scale-[1.03]"
            style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="relative h-28 w-full overflow-hidden">
              <Image src={cat.img} alt={cat.name} className="w-full h-full" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <div className="p-2.5">
              <p className="text-white font-black text-[12px] leading-tight">{cat.name}</p>
              <p className="text-white/65 text-[10px] mt-0.5">{cat.he}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* EaaS — emphasized economic engine */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-3xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shrink-0"
        style={{ background: "linear-gradient(135deg,#0B1930 0%,#10254a 100%)", border: "1.5px solid #D4AF37", boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)" }}>
        <div className="absolute left-0 top-0 h-full w-1" style={{ background: "linear-gradient(#D4AF37,#F5D883)" }} />
        <div className="text-right">
          <span className="text-[#D4AF37] text-xs font-black tracking-[0.22em] uppercase">Experience as a Service</span>
          <p className="text-white font-black text-2xl md:text-3xl mt-1.5 leading-tight">
            לא קטלוג. <span className="text-[#D4AF37]">מנוע כלכלי</span> שעובד בשבילכם.
          </p>
          <p className="text-white/65 text-sm mt-1">Expression-as-a-Service — מקצה לקצה, מקצועי, מחובר ליבואנים.</p>
        </div>
        <div className="flex gap-7 shrink-0">
          {EAAS.map((e, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.14)", border: "1px solid rgba(212,175,55,0.4)" }}>
                <e.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.6} />
              </div>
              <span className="text-white/75 text-[10px] font-bold">{e.label}</span>
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
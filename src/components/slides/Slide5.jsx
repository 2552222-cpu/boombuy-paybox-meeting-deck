import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/slides/deckAnim";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── ZUZ COIN SVG ────────────────────────────────────────────────────────────
function ZuzCoin({ size = 220 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="coinGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#F0F4F8"/>
          <stop offset="40%" stopColor="#C8D6E0"/>
          <stop offset="80%" stopColor="#A8B8C8"/>
          <stop offset="100%" stopColor="#7090A8"/>
        </radialGradient>
        <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#9AB0C0"/>
          <stop offset="100%" stopColor="#6888A0"/>
        </radialGradient>
        <filter id="coinShadow">
          <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#1a3a5c" floodOpacity="0.35"/>
        </filter>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a4a7a"/>
          <stop offset="100%" stopColor="#0d2d50"/>
        </linearGradient>
      </defs>

      {/* Outer rim (ridged edge effect) */}
      <circle cx="110" cy="110" r="108" fill="url(#rimGrad)" filter="url(#coinShadow)"/>
      {/* Rim dashes */}
      {Array.from({length:60},(_,i)=>{
        const angle = (i/60)*360;
        const r1=98, r2=106;
        const rad=angle*Math.PI/180;
        return <line key={i}
          x1={110+r1*Math.cos(rad)} y1={110+r1*Math.sin(rad)}
          x2={110+r2*Math.cos(rad)} y2={110+r2*Math.sin(rad)}
          stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>;
      })}
      {/* Main coin face */}
      <circle cx="110" cy="110" r="96" fill="url(#coinGrad)"/>
      {/* Inner ring */}
      <circle cx="110" cy="110" r="88" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      {/* Highlight arc */}
      <path d="M 55 65 A 70 70 0 0 1 165 65" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round"/>

      {/* Crown (top of logo) */}
      <path d="M 110 32 L 103 44 L 96 36 L 99 50 L 121 50 L 124 36 L 117 44 Z"
        fill="url(#logoGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>

      {/* ZUZ infinity/figure-8 logo (ΩZΩ shape) */}
      <g transform="translate(110, 82)">
        {/* Left circle */}
        <circle cx="-22" cy="0" r="18" fill="none" stroke="url(#logoGrad)" strokeWidth="5.5"/>
        {/* Right circle */}
        <circle cx="22" cy="0" r="18" fill="none" stroke="url(#logoGrad)" strokeWidth="5.5"/>
        {/* Center Z */}
        <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="900"
          fill="url(#logoGrad)" fontFamily="system-ui,sans-serif" letterSpacing="-1">Z</text>
        {/* Connector fill at center */}
        <ellipse cx="0" cy="0" rx="6" ry="14" fill="url(#coinGrad)" stroke="none"/>
      </g>

      {/* ZUZ text */}
      <text x="110" y="140" textAnchor="middle" fontSize="26" fontWeight="900"
        fill="url(#logoGrad)" fontFamily="system-ui,sans-serif" letterSpacing="4">ZUZ</text>

      {/* "1 ZUZ TOKEN" */}
      <text x="110" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700"
        fill="#3a6080" fontFamily="system-ui,sans-serif" letterSpacing="1.5">1 ZUZ TOKEN</text>

      {/* Bottom arc text "ISSUED BY PAYBOX" */}
      <path id="bottomArc" d="M 30 150 A 80 80 0 0 0 190 150" fill="none"/>
      <text fontSize="7" fontWeight="700" fill="#4a7090" fontFamily="system-ui,sans-serif" letterSpacing="1">
        <textPath href="#bottomArc" startOffset="10%">ISSUED BY PAYBOX · ZUZIM ECOSYSTEM</textPath>
      </text>

      {/* Sheen overlay */}
      <ellipse cx="88" cy="80" rx="30" ry="18" fill="rgba(255,255,255,0.12)" transform="rotate(-25,88,80)"/>
    </svg>
  );
}

// ─── EARN MECHANICS ──────────────────────────────────────────────────────────
const EARN_WAYS = [
  { emoji:"💳", title:"שימוש בכרטיס אשראי", desc:"כל עסקת אשראי = ZUZ אוטומטי", example:"500 ₪ = 50 ZUZ" },
  { emoji:"🏦", title:"כסף שוכב בחשבון", desc:"יתרה שבועית = ZUZ על הזמן", example:"5,000 ₪ שבוע = 100 ZUZ" },
  { emoji:"🎁", title:"קבוצת מתנה פועלת", desc:"כל קבוצה שנפתחת = בונוס", example:"קבוצה = 200 ZUZ" },
  { emoji:"🍖", title:"על האש / אירוע", desc:"גמר קבוצה = ZUZ כפול", example:"2,100 ₪ = 420 ZUZ" },
];

const SPEND_WAYS = [
  { emoji:"🛍️", label:"The Box", sub:"מוצרים ומתנות" },
  { emoji:"✈️", label:"Box Travel", sub:"טיולים ונסיעות" },
  { emoji:"🍔", label:"Box Food", sub:"מסעדות ורשתות" },
  { emoji:"🎮", label:"Box Gaming", sub:"בידור ופנאי" },
];

const SCRIPT = `"הזוז — ZUZ — הוא המנוע שגורם לכל זה לזוז.

כל פעולה בפייבוקס מייצרת ZUZ: שילמת עם הכרטיס? ZUZ. כסף שכב שבוע? ZUZ. קבוצה התחילה לאסוף? ZUZ.

למשל: 5,000 שקל יושבים בחשבון שבוע — 100 ZUZ מופקדים אוטומטית. הלקוח לא עשה כלום. הם הגיעו.

ZUZ מממשים ב-The Box: מתנות, על האש, טיולים, אוכל.

למה זה גאוני? כי ה-ZUZ לא יוצא לחוץ. הוא קיים רק בתוך מערכת פייבוקס. כל ZUZ שנוצר = לחץ נוסף לקנות דרך The Box = GMV גבוה יותר = עמלה גבוהה יותר לפייבוקס."`;

const item = { hidden:{opacity:0,y:22}, show:{opacity:1,y:0,transition:{duration:0.7,ease:EASE}} };
const container = { hidden:{}, show:{transition:{staggerChildren:0.09}} };

export default function Slide5() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-16 py-10 overflow-hidden text-white"
      style={{ background:"linear-gradient(145deg,#0a1628 0%,#0D1F3C 55%,#0f2040 100%)" }}>

      {/* Subtle blue glow bottom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 60% 40% at 50% 105%, rgba(91,164,207,0.12) 0%, transparent 70%)" }}/>

      {/* Header */}
      <motion.div initial={{opacity:0,y:-12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.7,ease:EASE}}
        className="text-center shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.18em] uppercase">מנוע הנאמנות</span>
        <div className="flex justify-center mt-3 mb-1">
          <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent"/>
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-[1.15] tracking-[-0.02em]">
          ZUZ — המטבע שגורם לכסף לזוז
        </h1>
        <p className="mt-2 text-white/40 text-sm">כל פעולה בפייבוקס = ZUZ · כל ZUZ = עסקה ב-The Box</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once:true,amount:0.15}}
        className="flex-1 flex flex-col justify-center mt-5 gap-5">

        {/* Main row: coin + earn ways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* ZUZ Coin */}
          <motion.div variants={item} className="flex flex-col items-center gap-3">
            <motion.img
              src="https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/a1b988afc_generated_image.png"
              alt="ZUZ Token"
              width={210}
              height={210}
              animate={{ rotateY:[0,8,-8,0], y:[0,-6,0] }}
              transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
              style={{ mixBlendMode:"screen", filter:"drop-shadow(0 20px 40px rgba(91,164,207,0.4))" }}
            />
            <div className="text-center">
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Issued by PayBox</p>
              <p className="text-lg font-black text-white mt-1">1 ZUZ ≈ 1 ₪ ערך הטבה</p>
              <p className="text-[11px] text-white/40 mt-0.5">זוז — עברית לוקדמון + "לזוז" + מטבע יהודי עתיק</p>
            </div>
          </motion.div>

          {/* Earn ways */}
          <div className="space-y-3">
            <p className="text-[9.5px] text-white/35 font-bold tracking-widest uppercase mb-3">איך מרוויחים ZUZ</p>
            {EARN_WAYS.map((w,i)=>(
              <motion.div key={i} variants={item}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                <span className="text-2xl shrink-0">{w.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{w.title}</p>
                  <p className="text-[11px] text-white/45">{w.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-black text-[#D4AF37] whitespace-nowrap">{w.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spend row */}
        <motion.div variants={item}>
          <p className="text-[9.5px] text-white/35 font-bold tracking-widest uppercase mb-3 text-center">ממשים ZUZ ב</p>
          <div className="grid grid-cols-4 gap-3">
            {SPEND_WAYS.map((s,i)=>(
              <div key={i} className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/05 px-3 py-3 text-center">
                <span className="text-2xl">{s.emoji}</span>
                <p className="text-xs font-black text-[#D4AF37] mt-1">{s.label}</p>
                <p className="text-[9.5px] text-white/35 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom insight */}
        <motion.div variants={item}
          className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/06 px-6 py-4 text-center">
          <p className="text-sm font-black text-white">
            💡 ZUZ לא יוצא החוצה — הוא חי <span className="text-[#D4AF37]">רק בתוך פייבוקס</span>
          </p>
          <p className="text-xs text-white/45 mt-1">
            כל ZUZ שנוצר = לחץ נוסף לקנות ב-The Box = GMV גדל = עמלה גדלה = ריטיינר מתקזז
          </p>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between text-gray-600 text-[11px] shrink-0 mt-4">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>05 / 13</span>
      </div>
      <SpeakerNotes notes={SCRIPT}/>
    </div>
  );
}
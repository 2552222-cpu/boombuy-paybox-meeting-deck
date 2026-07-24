import React from "react";
import { motion } from "framer-motion";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const ZUZ_COIN_SVG = (
  <svg width="160" height="160" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="adCoinGrad" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#F0F4F8"/>
        <stop offset="40%" stopColor="#C8D6E0"/>
        <stop offset="80%" stopColor="#A8B8C8"/>
        <stop offset="100%" stopColor="#7090A8"/>
      </radialGradient>
      <filter id="adCoinShadow">
        <feDropShadow dx="4" dy="8" stdDeviation="12" floodColor="#1a3a5c" floodOpacity="0.45"/>
      </filter>
      <linearGradient id="adLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a4a7a"/>
        <stop offset="100%" stopColor="#0d2d50"/>
      </linearGradient>
    </defs>
    <circle cx="110" cy="110" r="108" fill="#9AB0C0" filter="url(#adCoinShadow)"/>
    {Array.from({length:60},(_,i)=>{
      const a=(i/60)*360, rad=a*Math.PI/180, r1=98, r2=106;
      return <line key={i} x1={110+r1*Math.cos(rad)} y1={110+r1*Math.sin(rad)} x2={110+r2*Math.cos(rad)} y2={110+r2*Math.sin(rad)} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>;
    })}
    <circle cx="110" cy="110" r="96" fill="url(#adCoinGrad)"/>
    <circle cx="110" cy="110" r="88" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
    <path d="M 55 65 A 70 70 0 0 1 165 65" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 110 32 L 103 44 L 96 36 L 99 50 L 121 50 L 124 36 L 117 44 Z" fill="url(#adLogoGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    <g transform="translate(110, 82)">
      <circle cx="-22" cy="0" r="18" fill="none" stroke="url(#adLogoGrad)" strokeWidth="5.5"/>
      <circle cx="22" cy="0" r="18" fill="none" stroke="url(#adLogoGrad)" strokeWidth="5.5"/>
      <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="900" fill="url(#adLogoGrad)" fontFamily="system-ui,sans-serif">Z</text>
      <ellipse cx="0" cy="0" rx="6" ry="14" fill="url(#adCoinGrad)" stroke="none"/>
    </g>
    <text x="110" y="140" textAnchor="middle" fontSize="26" fontWeight="900" fill="url(#adLogoGrad)" fontFamily="system-ui,sans-serif" letterSpacing="4">ZUZ</text>
    <text x="110" y="158" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#3a6080" fontFamily="system-ui,sans-serif" letterSpacing="1.5">1 ZUZ TOKEN</text>
    <path id="adBottomArc" d="M 30 150 A 80 80 0 0 0 190 150" fill="none"/>
    <text fontSize="7" fontWeight="700" fill="#4a7090" fontFamily="system-ui,sans-serif" letterSpacing="1">
      <textPath href="#adBottomArc" startOffset="5%">ISSUED BY PAYBOX · ZUZIM ECOSYSTEM</textPath>
    </text>
    <ellipse cx="88" cy="80" rx="30" ry="18" fill="rgba(255,255,255,0.12)" transform="rotate(-25,88,80)"/>
  </svg>
);

const THE_BOX_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png";

const SCRIPT = `"הנה דוגמה לאיך זה ייראה בשוק.

מסר פשוט: רוצים מתנות בחצי מחיר? מצטרפים ל-PayBox Young ומקבלים 200 ZUZ ישר לחשבון.

זה לא שיווק מסובך. זו הצעה שאי אפשר לסרב לה."`;

export default function SlideAd() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ background: "linear-gradient(130deg, #4F7FE0 0%, #5B5FC7 40%, #7B4FD0 70%, #6B3FC0 100%)" }}>

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'rgba(255,255,255,0.05)', top:-200, right:-200 }}/>
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.04)', bottom:-100, left:-100 }}/>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-10 md:px-16 py-10" dir="rtl">

        {/* PayBox logo top left */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.1, duration:0.5}}
          className="flex items-center gap-3 shrink-0 mb-8">
          <div className="rounded-2xl bg-white px-3 py-2 flex items-center gap-2 shadow-lg">
            <svg width="32" height="32" viewBox="0 0 120 120">
              <rect width="120" height="120" rx="28" fill="#4F7FE0"/>
              <text x="60" y="75" textAnchor="middle" fontSize="42" fontWeight="900" fill="white" fontFamily="system-ui">P</text>
            </svg>
            <span style={{ color:'#4F7FE0', fontWeight:900, fontSize:18, fontFamily:'system-ui' }}>PayBox</span>
          </div>
          <span className="text-white/50 text-sm font-bold">× The Box — מצגת שותפות</span>
        </motion.div>

        {/* Main layout */}
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-2 gap-10 w-full items-center">

            {/* LEFT — text */}
            <div>
              <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.6}}
                className="text-2xl font-bold text-white/90 mb-3">
                רוצים מתנות והטבות בחצי מחיר?
              </motion.p>

              <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.4, duration:0.7}}
                className="font-black leading-[1.05] mb-6"
                style={{ fontSize: 64, color:'#D4AF37', textShadow:'0 4px 20px rgba(212,175,55,0.3)' }}>
                גם לילדים<br/>מגיע זוזים!
              </motion.h1>

              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.7, duration:0.6}}
                className="space-y-3 mb-8">
                <p className="text-white text-xl font-bold">
                  מצטרפים ל-<span className="text-[#D4AF37]">PayBox young</span>
                </p>
                <p className="text-white text-xl font-bold">
                  מקבלים <span className="text-white">גישה למועדון</span>
                </p>
                <p className="text-white text-xl font-bold">
                  ונהנים מ-<span className="text-[#D4AF37] font-black">200 זוזים</span> לחשבון!
                </p>
              </motion.div>

              {/* ZUZ note */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0, duration:0.5}}
                className="rounded-2xl bg-white/10 border border-white/20 px-5 py-4 inline-block">
                <p className="text-white/80 text-sm font-bold leading-relaxed">
                  זוז = 1 ₪ ש"ח<br/>
                  לממוש הטבות ומתנות אופנה נפש<br/>
                  <span className="text-[#D4AF37]">וולנס מסעדות ועוד בעד- חצי מחיר!</span>
                </p>
              </motion.div>
            </div>

            {/* RIGHT — visuals */}
            <div className="flex flex-col items-center gap-6">

              {/* Phone mockup */}
              <motion.div initial={{opacity:0,x:40,rotate:8}} animate={{opacity:1,x:0,rotate:-3}} transition={{delay:0.5, duration:0.8, type:'spring'}}
                className="relative">
                <div className="rounded-[36px] border-4 border-white/80 shadow-2xl overflow-hidden"
                  style={{ width:160, height:300, background:'linear-gradient(160deg, #4F7FE0 0%, #3a5cc0 100%)' }}>
                  {/* Phone screen */}
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <span style={{ fontSize:16 }}>P</span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-black">PayBox</p>
                        <p className="text-white/60 text-[9px]">Young</p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-3">
                      <p className="text-white/60 text-[9px] font-bold">Zuzim wallet</p>
                      <p className="text-[#D4AF37] font-black text-4xl">ZUZ</p>
                      <p className="text-white/50 text-[9px]">1 ZUZ = 1₪</p>
                      <div className="rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-2 text-center mt-2">
                        <p className="text-[#D4AF37] font-black text-lg">200</p>
                        <p className="text-white/60 text-[8px]">זוזים זמינים</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ZUZ coin */}
              <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} transition={{delay:0.8, duration:0.7, type:'spring'}}
                style={{ filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}>
                {ZUZ_COIN_SVG}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.2, duration:0.5}}
          className="shrink-0 flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {/* Benefits icons */}
            {["🎁","👗","🎮","✈️","🍔"].map((e,i)=>(
              <div key={i} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">{e}</div>
            ))}
            <span className="text-white/40 text-xs font-bold">+ עוד המון הטבות ב-The Box</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={THE_BOX_LOGO} alt="The Box" style={{ height:44, filter:'brightness(0) invert(1)', opacity:0.9 }}/>
          </div>
        </motion.div>

        {/* Slide label */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-[9px] font-bold tracking-widest text-white/25 uppercase">MARKETING CONCEPT</span>
        </div>
      </div>

      <SpeakerNotes notes={SCRIPT}/>
    </div>
  );
}

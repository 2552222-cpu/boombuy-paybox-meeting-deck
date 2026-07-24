import React, { useState, useEffect, useRef } from "react";

// ─── ANIMATION HELPERS (ported from The Box Launch Animation design) ──────────
function clamp01(t) { return Math.max(0, Math.min(1, t)); }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
function seg(t, a, b) {
  if (b <= a) return t >= b ? 1 : 0;
  return clamp01((t - a) / (b - a));
}
function lerp(a, b, t) { return a + (b - a) * t; }

const BG = '#4F7FE0';
const LINE = '#FFFFFF';
const DURATION = 8000; // ms — matches original OM_SCENES dur:8

// The Box logo from Base44 media
const THE_BOX_LOGO = "https://media.base44.com/images/public/6a5bfeae7b17fd8c674492a6/96ca92369_60.png";

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function BoxGraphic({ opacity, scale, lidRotate, lidLift, lidOpacity }) {
  return (
    <div style={{ position:'absolute', opacity, transform:`scale(${scale})`, width:220, height:220 }}>
      {/* Box body */}
      <svg viewBox="0 0 200 200" width="220" height="220" style={{ position:'absolute', inset:0 }}>
        <rect x="46" y="92" width="108" height="74" rx="7" fill="none" stroke={LINE} strokeWidth="9"/>
        <path d="M100 92 L100 166" fill="none" stroke={LINE} strokeWidth="6" opacity="0.85"/>
      </svg>
      {/* Box lid */}
      <svg viewBox="0 0 200 200" width="220" height="220"
        style={{
          position:'absolute', inset:0, opacity:lidOpacity,
          transform:`translateY(${-lidLift}px) rotate(${-lidRotate}deg)`,
          transformOrigin:'46px 92px',
        }}>
        <rect x="40" y="76" width="120" height="24" rx="5" fill="none" stroke={LINE} strokeWidth="9"/>
        <rect x="90" y="40" width="20" height="36" rx="4" fill="none" stroke={LINE} strokeWidth="8"/>
        <path d="M100 40 C80 20, 62 30, 68 48 C74 62, 92 56, 100 40 Z" fill="none" stroke={LINE} strokeWidth="7" strokeLinejoin="round"/>
        <path d="M100 40 C120 20, 138 30, 132 48 C126 62, 108 56, 100 40 Z" fill="none" stroke={LINE} strokeWidth="7" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function PersonIcon({ opacity, translateY, rotate }) {
  return (
    <svg viewBox="0 0 200 160" width="160" height="128"
      style={{
        position:'absolute', top:-120, opacity,
        transform:`translateY(${translateY}px) rotate(${rotate}deg)`,
      }}>
      <circle cx="100" cy="42" r="24" fill="none" stroke={LINE} strokeWidth="9"/>
      <path d="M100 66 L100 130" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round"/>
      <path d="M100 76 C70 76, 55 40, 40 24" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round"/>
      <path d="M100 76 C130 76, 145 40, 160 24" fill="none" stroke={LINE} strokeWidth="9" strokeLinecap="round"/>
    </svg>
  );
}

function Sparkle({ x, y, size, opacity, rotate }) {
  return (
    <div style={{ position:'absolute', left:x, top:y, opacity, transform:`rotate(${rotate}deg) scale(${size})`, width:24, height:24 }}>
      <div style={{ position:'absolute', left:11, top:0, width:2, height:24, background:'#FFFFFF', borderRadius:1 }}/>
      <div style={{ position:'absolute', left:0, top:11, width:24, height:2, background:'#FFFFFF', borderRadius:1 }}/>
    </div>
  );
}

// PayBox Logo SVG (inline)
function PayBoxLogo({ opacity, scale }) {
  return (
    <div style={{ position:'absolute', opacity, transform:`scale(${scale})`, display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="28" fill="white"/>
        <text x="60" y="72" textAnchor="middle" fontSize="36" fontWeight="900" fill={BG} fontFamily="system-ui,sans-serif">P</text>
        <circle cx="60" cy="60" r="52" fill="none" stroke={BG} strokeWidth="4" opacity="0.15"/>
      </svg>
      <span style={{ color:'white', fontWeight:900, fontSize:22, marginTop:10, letterSpacing:2, fontFamily:'system-ui,sans-serif' }}>PayBox</span>
    </div>
  );
}

const SPARKLE_SPOTS = [
  {x:-120,y:-70,d:0},{x:120,y:-60,d:0.05},{x:-150,y:10,d:0.12},
  {x:150,y:20,d:0.08},{x:-60,y:-110,d:0.15},{x:70,y:-120,d:0.03},
];

// ─── MAIN INTRO SLIDE ────────────────────────────────────────────────────────
export default function IntroSlide() {
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    startRef.current = performance.now();
    function tick(now) {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const p = progress;

  // ── Compute all animation values (ported 1:1 from design) ──
  const captionOpacity  = easeOutCubic(seg(p,0.0,0.06)) * (1 - seg(p,0.16,0.24));
  const payboxOpacity   = easeOutCubic(seg(p,0.04,0.16)) * (1 - seg(p,0.22,0.3));
  const payboxScale     = lerp(0.85,1,easeOutCubic(seg(p,0.04,0.16))) - 0.05*seg(p,0.22,0.3);

  const boxIn           = seg(p,0.24,0.34);
  const boxOpacity      = boxIn * (1 - seg(p,0.82,0.9));
  const boxScale        = lerp(0.85,1,easeOutBack(seg(p,0.32,0.46)));
  const lidT            = easeInOutCubic(seg(p,0.46,0.58));
  const lidRotate       = lerp(0,58,lidT);
  const lidLift         = lerp(0,48,lidT);
  const lidOpacity      = boxIn * (1 - seg(p,0.56,0.64));

  const personRise      = easeOutBack(seg(p,0.64,0.78));
  const wiggle          = Math.sin(seg(p,0.78,0.88)*Math.PI*4)*6*(1-seg(p,0.84,0.88));
  const personOpacity   = seg(p,0.63,0.7) * (1 - seg(p,0.86,0.9));
  const personY         = lerp(60,-18,personRise);

  const glowT           = seg(p,0.53,0.7);
  const glowScale       = lerp(0.3,2.6,easeOutCubic(glowT));
  const glowOpacity     = glowT < 0.5 ? glowT*1.6 : Math.max(0,1-(glowT-0.5)*2);

  const sparkleWindow   = seg(p,0.62,0.86);
  const boxSceneOpacity = 1 - seg(p,0.88,0.95);

  const theboxT         = easeOutCubic(seg(p,0.9,0.98));
  const theboxOpacity   = theboxT;
  const theboxScale     = lerp(0.85,1,theboxT);
  const taglineT        = easeOutCubic(seg(p,0.95,1.0));
  const taglineOpacity  = taglineT;
  const taglineY        = lerp(24,0,taglineT);

  return (
    <div style={{
      position:'relative', width:'100%', height:'100vh',
      background:BG, overflow:'hidden',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Rubik','Heebo',sans-serif",
    }}>
      {/* "PayBox מציגה" */}
      <div dir="rtl" style={{
        position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)',
        opacity:captionOpacity, whiteSpace:'nowrap',
        fontSize:38, fontWeight:700, color:'#FFFFFF', letterSpacing:0.5,
        textShadow:'0 2px 20px rgba(0,0,0,0.2)',
      }}>
        PayBox מציגה
      </div>

      {/* PayBox Logo */}
      <div style={{ position:'absolute' }}>
        <PayBoxLogo opacity={payboxOpacity} scale={payboxScale} />
      </div>

      {/* Box scene */}
      <div style={{ position:'relative', width:220, height:220, opacity:boxSceneOpacity, display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Glow */}
        <div style={{
          position:'absolute', width:480, height:480, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
          opacity:glowOpacity, transform:`scale(${glowScale})`,
        }}/>
        {/* Sparkles */}
        {SPARKLE_SPOTS.map((s,i) => {
          const local = seg(sparkleWindow, s.d, s.d+0.4);
          const twinkle = Math.sin(local*Math.PI);
          return <Sparkle key={i} x={110+s.x} y={110+s.y} size={0.6+twinkle*0.8} opacity={twinkle} rotate={i*23}/>;
        })}
        <BoxGraphic opacity={boxOpacity} scale={boxScale} lidRotate={lidRotate} lidLift={lidLift} lidOpacity={lidOpacity}/>
        <PersonIcon opacity={personOpacity} translateY={personY} rotate={wiggle}/>
      </div>

      {/* The Box Logo */}
      <img src={THE_BOX_LOGO} alt="The Box"
        style={{
          position:'absolute', width:320, opacity:theboxOpacity,
          transform:`translateY(-30px) scale(${theboxScale})`,
          filter:'drop-shadow(0 4px 24px rgba(0,0,0,0.15))',
        }}/>

      {/* Tagline */}
      <div dir="rtl" style={{
        position:'absolute', bottom:'10%', left:'50%',
        transform:`translate(-50%, ${taglineY}px)`,
        opacity:taglineOpacity, textAlign:'center', width:700,
        display:'flex', alignItems:'center', justifyContent:'center', gap:12,
      }}>
        <span style={{ fontSize:26, fontWeight:600, color:'#FFFFFF', textShadow:'0 2px 12px rgba(0,0,0,0.2)' }}>
          מתחם ההטבות והמתנות החדש ללקוחות PayBox
        </span>
      </div>

      {/* Scroll indicator — appears at end */}
      <div style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        opacity: Math.max(0, (p-0.97)*33),
        display:'flex', flexDirection:'column', alignItems:'center', gap:6,
      }}>
        <span style={{ color:'rgba(255,255,255,0.6)', fontSize:11, fontWeight:700, letterSpacing:3 }}>SCROLL</span>
        <div style={{ width:1, height:32, background:'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }}/>
      </div>
    </div>
  );
}

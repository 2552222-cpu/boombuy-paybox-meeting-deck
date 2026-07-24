import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── COMMERCE SIMULATOR — SIMPLE ─────────────────────────────────────────────
// Shows PayBox ONLY what they earn from commerce (The Box GMV × commission %)
// They know their own interchange/float — we don't need to show them that.
// Question: at what GMV does the retainer pay back?

const RETAINER_ANNUAL = 4.2; // M NIS

const SCRIPT = `"שאלה אחת פשוטה — ורק אחת.

כמה תקבלו מהמחזור של The Box, ומתי הריטנר חוזר?

גררו את הסליידר. בחרו את האחוז שאתם רוצים. תראו את התשובה.

זה הכל מהצד שלנו. את הInterchange, ה-Float, הכרטיסים החדשים — את זה אתם יודעים לחשב לבד, ואנחנו יודעים שהמספרים שם הרבה יותר גדולים.

זה? זה הבונוס."`;

export default function SlideFlow() {
  const [gmv, setGmv] = useState(300);      // M NIS
  const [commPct, setCommPct] = useState(1.0); // %

  const annual = useMemo(() => +(gmv * commPct / 100).toFixed(1), [gmv, commPct]);
  const monthly = useMemo(() => +(annual / 12).toFixed(2), [annual]);
  const retainerMonths = useMemo(() => {
    if (annual <= 0) return "∞";
    const m = RETAINER_ANNUAL / annual * 12;
    return m > 60 ? ">60" : m.toFixed(1);
  }, [annual]);

  const coversPct = useMemo(() => Math.min(100, +(annual / RETAINER_ANNUAL * 100).toFixed(0)), [annual]);
  const barColor = coversPct >= 100 ? "#4ade80" : coversPct >= 60 ? "#D4AF37" : "#60A5FA";

  const milestones = [
    { gmv: 100, label: "100M ₪" },
    { gmv: 200, label: "200M ₪" },
    { gmv: 420, label: `420M ₪ — מכסה ריטנר ב-${(1/commPct*100).toFixed(0)}%`, key: true },
    { gmv: 600, label: "600M ₪" },
    { gmv: 1000, label: "1B ₪" },
  ];

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור Commerce</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
          כמה מגיע לכם מהמחזור — ומתי הריטנר חוזר?
        </h1>
        <p className="mt-2 text-white/35 text-sm">רק מהצד שלנו — Commerce בלבד · Interchange ו-Float — שלכם ממילא</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6 mt-6">

        {/* Controls */}
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5">
            <p className="text-[10px] font-bold text-white/35 tracking-widest mb-3">GMV THE BOX — מחזור המועדון (M ₪/שנה)</p>
            <div className="text-4xl font-black text-white mb-4">{gmv}M ₪</div>
            <input
              type="range" min={50} max={1000} step={10} value={gmv}
              onChange={e => setGmv(+e.target.value)}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/25 mt-1">
              <span>50M</span><span>300M</span><span>600M</span><span>1B</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5">
            <p className="text-[10px] font-bold text-white/35 tracking-widest mb-3">אחוז COMMERCE לפייבוקס</p>
            <div className="text-4xl font-black text-[#D4AF37] mb-4">{commPct.toFixed(1)}%</div>
            <input
              type="range" min={0.5} max={2.0} step={0.1} value={commPct}
              onChange={e => setCommPct(+e.target.value)}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/25 mt-1">
              <span>0.5%</span><span>1%</span><span>1.5%</span><span>2%</span>
            </div>
            <p className="text-[10px] text-white/25 mt-2">* על ה-GMV מעל הראשוני — נסכים ביחד</p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl p-6 text-center border border-white/8 bg-white/3">
            <p className="text-[10px] text-white/35 mb-2">הכנסת Commerce שנתית</p>
            <p className="text-4xl font-black" style={{ color: barColor }}>{annual}M ₪</p>
            <p className="text-xs text-white/30 mt-1">= {monthly}M ₪/חודש</p>
          </div>

          <div className="rounded-2xl p-6 text-center border border-white/8 bg-white/3">
            <p className="text-[10px] text-white/35 mb-2">ריטנר שנתי (הוצאה)</p>
            <p className="text-4xl font-black text-red-400">{RETAINER_ANNUAL}M ₪</p>
            <p className="text-xs text-white/30 mt-1">350K ₪/חודש</p>
          </div>

          <div className="rounded-2xl p-6 text-center border" style={{
            borderColor: coversPct >= 100 ? "rgba(74,222,128,0.4)" : "rgba(96,165,250,0.3)",
            background: coversPct >= 100 ? "rgba(74,222,128,0.07)" : "rgba(96,165,250,0.05)"
          }}>
            <p className="text-[10px] text-white/35 mb-2">ריטנר מתכסה ב</p>
            <p className="text-4xl font-black" style={{ color: barColor }}>
              {retainerMonths} חודש
            </p>
            <p className="text-xs text-white/30 mt-1">
              {coversPct >= 100 ? "✓ מכוסה במלואו" : `מכוסה ${coversPct}%`}
            </p>
          </div>
        </div>

        {/* Coverage bar */}
        <div>
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>כיסוי ריטנר מ-Commerce</span>
            <span className="font-bold" style={{ color: barColor }}>{coversPct}%</span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${Math.max(4, coversPct)}%`, background: barColor }}
            >
              {coversPct >= 20 && <span className="text-[9px] font-black text-[#0B1930]">{coversPct}%</span>}
            </div>
          </div>
          {/* Milestones */}
          <div className="relative mt-3 h-6">
            {milestones.map((m, i) => {
              const pct = Math.min(100, (m.gmv / 1000) * 100);
              return (
                <div key={i} className="absolute flex flex-col items-center" style={{ right: `${100 - pct}%`, transform: "translateX(50%)" }}>
                  <div className="w-px h-2" style={{ background: m.key ? "#D4AF37" : "rgba(255,255,255,0.2)" }} />
                  <span className="text-[9px] whitespace-nowrap" style={{ color: m.key ? "#D4AF37" : "rgba(255,255,255,0.25)" }}>
                    {m.key ? `← ${m.gmv}M` : m.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-white/20 mt-2 text-left">
            ← גרור: כמה GMV נדרש להחזיר את הריטנר לחלוטין?
          </p>
        </div>

        {/* Simple table: selected GMV milestones */}
        <div className="rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/4 text-right">
                <th className="px-4 py-3 text-[10px] text-white/35 font-bold">GMV The Box</th>
                <th className="px-4 py-3 text-[10px] text-white/35 font-bold">{commPct.toFixed(1)}% Commerce</th>
                <th className="px-4 py-3 text-[10px] text-white/35 font-bold">ריטנר</th>
                <th className="px-4 py-3 text-[10px] text-white/35 font-bold">נטו Commerce</th>
                <th className="px-4 py-3 text-[10px] text-white/35 font-bold">כיסוי ריטנר</th>
              </tr>
            </thead>
            <tbody>
              {[100, 200, 300, 420, 600, 1000].map((g, i) => {
                const comm = +(g * commPct / 100).toFixed(1);
                const net = +(comm - RETAINER_ANNUAL).toFixed(1);
                const cov = Math.min(100, +(comm / RETAINER_ANNUAL * 100).toFixed(0));
                const isSelected = g === gmv || (gmv > g && (i === 5 || [100,200,300,420,600,1000][i+1] > gmv));
                return (
                  <tr key={g}
                    className="border-t border-white/5 text-right"
                    style={{ background: g === 420 ? "rgba(212,175,55,0.06)" : isSelected ? "rgba(255,255,255,0.03)" : "transparent" }}>
                    <td className="px-4 py-2.5 font-bold" style={{ color: g === 420 ? "#D4AF37" : "rgba(255,255,255,0.7)" }}>
                      {g >= 1000 ? "1B" : `${g}M`} ₪{g === 420 ? " ★" : ""}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-[#D4AF37]">+{comm}M ₪</td>
                    <td className="px-4 py-2.5 text-red-400">-4.2M ₪</td>
                    <td className="px-4 py-2.5 font-black" style={{ color: net >= 0 ? "#4ade80" : "rgba(255,255,255,0.4)" }}>
                      {net >= 0 ? "+" : ""}{net}M ₪
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full overflow-hidden bg-white/8">
                          <div className="h-full rounded-full" style={{ width: `${cov}%`, background: cov >= 100 ? "#4ade80" : "#D4AF37" }} />
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: cov >= 100 ? "#4ade80" : "rgba(255,255,255,0.4)" }}>{cov}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-center text-white/20 text-[10px]">
          ★ 420M GMV = נקודת האיזון המדויקת ב-{commPct.toFixed(1)}% עמלה · Commerce הוא רק אחד מ-4 מנועי הכנסה · Interchange + Float + כרטיסים — שלכם בנפרד
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>11 / 16</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

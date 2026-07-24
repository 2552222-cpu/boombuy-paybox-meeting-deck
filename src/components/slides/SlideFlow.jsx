import React, { useState } from "react";
import { motion } from "framer-motion";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── CONSTANTS ───────────────────────────────────────────
const RETAINERS = [4.2, 3.0, 1.8, 1.8, 1.8]; // M NIS per year
const INTERCHANGE = [36, 90, 144, 165, 180];   // M NIS per year
const COLORS = ["#F59E0B","#34D399","#5BA4CF","#A78BFA","#D4AF37"];

const COMMISSION_EXAMPLES = [
  { rate: 0.5, label: "0.5%", desc: "מינימום" },
  { rate: 1.0, label: "1%",   desc: "בסיס" },
  { rate: 1.5, label: "1.5%", desc: "ממוצע שוק" },
  { rate: 2.0, label: "2%",   desc: "אפסייד" },
];

function fmtM(val, digits = 1) {
  return (val >= 0 ? "+" : "") + val.toFixed(digits) + "M";
}
function fmtGMV(b) {
  return b >= 1 ? b.toFixed(1) + "B ₪" : (b * 1000).toFixed(0) + "M ₪";
}

const SCRIPT = `"שאלה חשובה — במקום לקבע עמלה, בואו נראה יחד מה הגיוני לכם.

המנגנון פשוט: לכל שקל שעובר ב-The Box, פייבוקס מקבלת X אחוז.
אנחנו לא כופים מספר — אתם בוחרים מה נוח לכם.

גם ב-0.5% בלבד: שנה 1 מגיע 5M ₪, שמכסה יותר מהריטיינר.
ב-1%: 10M ₪ — פי 2.4 מהריטיינר.

וזה רק Commerce. הInterchange, הפלואט, והכרטיסים החדשים — אלו רווחים נוספים שלא תלויים בעמלה הזו בכלל.

בשנה 5: GMV של 2B+ ₪, גידול 15% בשנה. אפילו ב-0.5% — 10M ₪ לפייבוקס.

מה שמעניין: ככל שאתם דוחפים את המועדון — יותר GMV — יותר עמלה לכם. האינטרסים מיושרים לחלוטין."`;

// ─── MAIN ─────────────────────────────────────────────────
export default function SlideFlow() {
  const [selectedComm, setSelectedComm] = useState(1);
  const [gmvBase, setGmvBase] = useState(1.0); // B NIS

  // Compute 5-year table
  const rows = [];
  let gmv = gmvBase * 1000; // to M NIS
  let cumulative = 0;
  for (let y = 0; y < 5; y++) {
    const commIncome = gmv * selectedComm / 100;
    const retainer   = RETAINERS[y];
    const interchange= INTERCHANGE[y];
    const netComm    = commIncome - retainer;
    const totalNet   = netComm + interchange;
    cumulative      += totalNet;
    rows.push({ year: y + 1, gmv, commIncome, retainer, interchange, netComm, totalNet, cumulative });
    gmv *= 1.15;
  }

  const totalComm5 = rows.reduce((s, r) => s + r.commIncome, 0);
  const totalRet5  = rows.reduce((s, r) => s + r.retainer, 0);
  const maxComm    = Math.max(...rows.map(r => r.commIncome));

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-14 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #060F1E 0%, #0B1930 60%, #0D1F3C 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[.15em]">מנגנון הכסף</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-3 mb-1 mr-0 ml-auto" />
        <h1 className="mt-2 text-3xl md:text-4xl font-black leading-[1.1] tracking-tight">
          אתם בוחרים את העמלה — ותראו כמה יוצא
        </h1>
        <p className="mt-1.5 text-white/40 text-sm">בכל GMV שגדל ב-15% בשנה · 5 שנות הרצה</p>
      </div>

      {/* Top controls row */}
      <div className="mt-5 flex gap-3 items-center shrink-0 flex-wrap">
        {/* Commission selector */}
        <div className="flex-1 min-w-[240px]">
          <p className="text-[9.5px] text-white/35 font-bold tracking-widest mb-2">% עמלת Commerce לפייבוקס</p>
          <div className="grid grid-cols-4 gap-2">
            {COMMISSION_EXAMPLES.map((c) => (
              <button
                key={c.rate}
                onClick={() => setSelectedComm(c.rate)}
                className="rounded-xl py-3 text-center border transition-all"
                style={{
                  borderColor: selectedComm === c.rate ? "#D4AF37" : "rgba(255,255,255,0.1)",
                  background: selectedComm === c.rate ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-lg font-black" style={{ color: selectedComm === c.rate ? "#D4AF37" : "#fff" }}>{c.label}</p>
                <p className="text-[9px] text-white/35 font-bold mt-0.5">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* GMV selector */}
        <div className="flex-1 min-w-[200px]">
          <p className="text-[9.5px] text-white/35 font-bold tracking-widest mb-2">GMV שנה 1</p>
          <div className="grid grid-cols-3 gap-2">
            {[0.5, 1.0, 1.5].map((g) => (
              <button
                key={g}
                onClick={() => setGmvBase(g)}
                className="rounded-xl py-3 text-center border transition-all"
                style={{
                  borderColor: gmvBase === g ? "#5BA4CF" : "rgba(255,255,255,0.1)",
                  background: gmvBase === g ? "rgba(91,164,207,0.1)" : "rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-base font-black" style={{ color: gmvBase === g ? "#5BA4CF" : "#fff" }}>{fmtGMV(g)}</p>
                <p className="text-[9px] text-white/35 font-bold mt-0.5">
                  {g === 0.5 ? "שמרני" : g === 1.0 ? "יעד שנה 1" : "אופטימי"}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="flex gap-3">
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/05 px-4 py-3 text-center min-w-[100px]">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">Commerce 5Y</p>
            <p className="text-xl font-black text-[#D4AF37] mt-1">{totalComm5.toFixed(0)}M ₪</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/05 px-4 py-3 text-center min-w-[100px]">
            <p className="text-[9px] text-white/35 font-bold tracking-widest">ROI על ריטיינר</p>
            <p className="text-xl font-black text-emerald-400 mt-1">{(totalComm5/totalRet5*100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border border-white/8 overflow-hidden shrink-0">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {["שנה","GMV The Box","עמלת Commerce","ריטיינר","נטו מ-Commerce","+ Interchange","סה\"כ נטו חדש","מצטבר"].map((h,i) => (
                  <th key={i} className="text-right px-3 py-2.5"
                    style={{ fontSize: "8.5px", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isBreakeven = r.netComm >= 0 && (i === 0 || rows[i-1]?.netComm < 0);
                return (
                  <tr key={i}
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      background: isBreakeven ? "rgba(52,211,153,0.05)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: `${COLORS[i]}25`, color: COLORS[i] }}>
                        שנה {r.year}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-sm font-bold text-white/80">{fmtGMV(r.gmv/1000)}</td>
                    <td className="px-3 py-2.5 text-sm font-black" style={{ color: "#D4AF37" }}>{r.commIncome.toFixed(1)}M ₪</td>
                    <td className="px-3 py-2.5 text-sm font-bold" style={{ color: "#EF4444" }}>-{r.retainer}M ₪</td>
                    <td className="px-3 py-2.5 text-sm font-black"
                      style={{ color: r.netComm >= 0 ? "#34D399" : "#EF4444" }}>
                      {fmtM(r.netComm)}M ₪
                    </td>
                    <td className="px-3 py-2.5 text-sm font-bold" style={{ color: "#5BA4CF" }}>+{r.interchange}M ₪</td>
                    <td className="px-3 py-2.5 text-base font-black"
                      style={{ color: r.totalNet >= 0 ? "#34D399" : "#F59E0B" }}>
                      {fmtM(r.totalNet)}M ₪
                    </td>
                    <td className="px-3 py-2.5 text-sm font-black text-white">
                      {fmtM(r.cumulative)}M ₪
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar chart */}
      <div className="mt-4 shrink-0">
        <p className="text-[9px] text-white/25 font-bold tracking-widest mb-2">Commerce שנתי ← vs → ריטיינר</p>
        <div className="space-y-2">
          {rows.map((r, i) => {
            const pct = maxComm > 0 ? (r.commIncome / maxComm * 85) : 0;
            const retPct = maxComm > 0 ? (r.retainer / maxComm * 85) : 0;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[9.5px] font-bold text-white/35 w-10 shrink-0">שנה {r.year}</span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden relative" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="h-full rounded-lg flex items-center justify-end px-3"
                    style={{ background: `linear-gradient(90deg,${COLORS[i]}70,${COLORS[i]})`, width: `${pct}%` }}
                    key={`${selectedComm}-${gmvBase}-${i}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22,1,.36,1] }}
                  >
                    <span className="text-[10px] font-black text-white">{r.commIncome.toFixed(1)}M ₪</span>
                  </motion.div>
                  {/* Retainer marker */}
                  <div className="absolute top-0 bottom-0 flex items-center"
                    style={{ right: `calc(100% - ${retPct}%)`, borderRight: "2px dashed rgba(239,68,68,0.5)" }}>
                    <span className="text-[8px] font-black text-red-400/70 mr-1 whitespace-nowrap">{r.retainer}M</span>
                  </div>
                </div>
                <span className="text-[10px] font-black w-16 shrink-0"
                  style={{ color: r.netComm >= 0 ? "#34D399" : "#EF4444" }}>
                  {fmtM(r.netComm)}M
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom insight */}
      <div className="mt-4 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/04 px-5 py-3 shrink-0">
        <p className="text-[10px] text-[#D4AF37]/70 font-bold tracking-widest mb-1">💡 האינטרס המשותף</p>
        <p className="text-sm text-white/70 leading-relaxed">
          כל שקל GMV שפייבוקס מביאה — חוזר אליה כעמלה.
          <span className="text-white font-bold"> ככל שהם דוחפים את המועדון → יותר GMV → יותר עמלה → ריטיינר מתקזז מוקדם יותר.</span>
          {" "}זה גם לפני Interchange (+{INTERCHANGE[0]}-{INTERCHANGE[4]}M ₪/שנה), Float, וכרטיסים חדשים.
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span className="text-[9px] text-white/20">גידול 15%/שנה · Commerce בלבד מוצג · שאר המנועים בנוסף</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

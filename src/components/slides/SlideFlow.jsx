import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── FULL SIMULATOR + BEFORE/AFTER — ONE SLIDE ───────────────────────────────
// Tab 1: Set every assumption (all 6 layers)
// Tab 2: Before/After BoomBuy — real numbers based on what they set

const RETAINER_ANNUAL = 4.2;
const FLOAT_BASE_M    = 938;
const GIFT_BASE_M     = 400;
const BASE_TXN_M      = 2;    // M transactions/month (confirmed)

// Revenue TODAY (from Discount Bank 2024 reports)
const TODAY = {
  interchange: 19,   // M NIS (estimated)
  float:       19,   // M NIS (estimated)
  txnFees:     9,    // M NIS (estimated)
  other:       8,    // M NIS (estimated)
  totalRev:    55,   // M NIS
  costs:       120,  // M NIS
  loss:        -63.7,// M NIS
};

const SCRIPT = `"זה השקף הכי חשוב בפגישה.
כאן אתם קובעים את כל ההנחות — ואני מחשב את הכל.
לחצו על 'תוצאה' כדי לראות לפני ואחרי BoomBuy."`;

// ── Components ────────────────────────────────────────────────────────────────
function Slider({ label, sub, min, max, step, value, onChange, unit = "", color = "#D4AF37", decimals = 0 }) {
  const display = decimals ? value.toFixed(decimals) : value;
  return (
    <div className="mb-2">
      <div className="flex justify-between items-end mb-0.5">
        <span className="text-[10px] text-white/40 leading-tight pr-1">{label}</span>
        <span className="text-xs font-black shrink-0 ml-1" style={{ color }}>{display}{unit}</span>
      </div>
      {sub && <p className="text-[9px] text-white/20 italic mb-0.5">{sub}</p>}
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full cursor-pointer" style={{ accentColor: color }} />
      <div className="flex justify-between text-[9px] text-white/15">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function MiniCard({ title, icon, color, gain, gainLabel = "גידול", children }) {
  return (
    <div className="rounded-xl border bg-white/3 p-3" style={{ borderColor: `${color}35` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <span className="text-sm">{icon}</span>
          <span className="text-[10px] font-black text-white">{title}</span>
        </div>
        <div className="text-left">
          <p className="text-[8px] text-white/25">{gainLabel}</p>
          <p className="text-base font-black" style={{ color }}>+{gain}M</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SlideFlow() {
  const [tab, setTab] = useState("sim");

  // 1. Interchange
  const [cardsK,    setCardsK]    = useState(400);
  const [fiwNow,    setFiwNow]    = useState(10);
  const [fiwTarget, setFiwTarget] = useState(22);
  const [iRate,     setIRate]     = useState(0.25);
  const [primSpend, setPrimSpend] = useState(5000);

  // 2. Float
  const [floatSpread, setFloatSpread] = useState(2);
  const [floatGrowth, setFloatGrowth] = useState(25);

  // 3. New Cards
  const [newCardsK, setNewCardsK] = useState(40);
  const [avgSpend,  setAvgSpend]  = useState(1800);

  // 4. Gift Groups
  const [giftConv,  setGiftConv]  = useState(20);
  const [giftComm,  setGiftComm]  = useState(1.0);

  // 5. Commerce Other
  const [otherGmv, setOtherGmv] = useState(100);
  const [commPct,  setCommPct]  = useState(1.0);

  // 6. Transactions
  const [txnAvgVal, setTxnAvgVal] = useState(150);
  const [txnFee,    setTxnFee]    = useState(2);
  const [txnGrowth, setTxnGrowth] = useState(30);

  const R = useMemo(() => {
    // 1. Interchange
    const totalCards = cardsK * 1000;
    const primNow    = totalCards * (fiwNow / 100);
    const secNow     = totalCards * (1 - fiwNow / 100);
    const secSpend   = secNow > 0 ? Math.max(300, (560e6 - primNow * primSpend) / secNow) : 800;
    const volNow     = (primNow * primSpend + secNow * secSpend) / 1e6;
    const fiwTgt     = Math.max(fiwNow, fiwTarget);
    const primTgt    = totalCards * (fiwTgt / 100);
    const volTgt     = (primTgt * primSpend + (totalCards - primTgt) * secSpend) / 1e6;
    const intToday   = +(volNow * (iRate / 100) * 12).toFixed(1);
    const intNew     = +(volTgt * (iRate / 100) * 12).toFixed(1);
    const intGain    = +(intNew - intToday).toFixed(1);

    // 2. Float
    const floatToday  = +(FLOAT_BASE_M * (floatSpread / 100)).toFixed(1);
    const floatNewBal = FLOAT_BASE_M * (1 + floatGrowth / 100);
    const floatNew    = +(floatNewBal * (floatSpread / 100)).toFixed(1);
    const floatGain   = +(floatNew - floatToday).toFixed(1);

    // 3. New Cards
    const newCardsGain = +(newCardsK * 1000 * avgSpend * (iRate / 100) * 12 * 0.5 / 1e6).toFixed(1);

    // 4. Gifts
    const giftGmv     = +(GIFT_BASE_M * (giftConv / 100)).toFixed(1);
    const giftRevenue = +(giftGmv * (giftComm / 100)).toFixed(1);

    // 5. Commerce other
    const otherRevenue = +(otherGmv * (commPct / 100)).toFixed(1);

    // 6. Transactions
    const txnVolMonth  = +(BASE_TXN_M * txnAvgVal).toFixed(0);        // M NIS/month
    const txnVolYear   = +(txnVolMonth * 12 / 1000).toFixed(1);        // B NIS/year (display)
    const txnRevToday  = +(BASE_TXN_M * txnFee * 12).toFixed(1);       // M NIS today
    const txnRevNew    = +(BASE_TXN_M * (1 + txnGrowth/100) * txnFee * 12).toFixed(1);
    const txnGain_     = +(txnRevNew - txnRevToday).toFixed(1);
    const txnNewCount  = +(BASE_TXN_M * (1 + txnGrowth/100)).toFixed(1);

    // Totals
    const totalComm  = +(giftRevenue + otherRevenue).toFixed(1);
    const totalGmv   = +(giftGmv + otherGmv).toFixed(1);
    const layer1     = +(intGain + floatGain + newCardsGain + txnGain_).toFixed(1);
    const totalGain  = +(layer1 + totalComm).toFixed(1);

    // After BoomBuy financials
    const newTotalRev = +(TODAY.totalRev + totalGain).toFixed(1);
    const newCosts    = +(TODAY.costs + RETAINER_ANNUAL).toFixed(1); // retainer is added cost
    const newLoss     = +(newTotalRev - newCosts).toFixed(1); // negative = loss, positive = profit
    const lossDelta   = +(newLoss - TODAY.loss).toFixed(1);  // improvement

    const netRet     = +(totalGain - RETAINER_ANNUAL).toFixed(1);
    const coverPct   = Math.round(totalGain / RETAINER_ANNUAL * 100);

    // Break-even: when does paybox reach 0 loss?
    // Monthly gain = totalGain/12, starting from -63.7M deficit
    // months to break-even from NOW = 63.7 / (totalGain/12)
    const monthsToBreakEven = totalGain > 0
      ? Math.round(Math.abs(TODAY.loss) / (totalGain / 12))
      : 999;

    return {
      intToday, intGain, intNew,
      volNow: +volNow.toFixed(0), volTgt: +volTgt.toFixed(0),
      secSpend: Math.round(secSpend),
      floatToday, floatGain, floatNew, floatNewBal: Math.round(floatNewBal),
      newCardsGain,
      giftGmv, giftRevenue,
      otherRevenue, totalGmv, totalComm,
      txnVolMonth, txnVolYear, txnRevToday, txnGain_, txnNewCount,
      layer1, totalGain,
      netRet, coverPct,
      newTotalRev, newCosts, newLoss, lossDelta,
      monthsToBreakEven,
    };
  }, [cardsK, fiwNow, fiwTarget, iRate, primSpend,
      floatSpread, floatGrowth, newCardsK, avgSpend,
      giftConv, giftComm, otherGmv, commPct,
      txnAvgVal, txnFee, txnGrowth]);

  const cc = R.coverPct >= 100 ? "#4ade80" : R.coverPct >= 60 ? "#D4AF37" : "#60A5FA";

  return (
    <div className="relative min-h-full w-full flex flex-col px-4 md:px-7 py-5 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header + Tabs */}
      <div className="flex items-center justify-between shrink-0 mb-3">
        <div className="flex gap-2">
          {[
            { id: "sim",    label: "🔧 הניחו מספרים" },
            { id: "result", label: "📊 לפני ואחרי" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 py-1.5 rounded-xl text-xs font-black transition-all"
              style={{
                background: tab === t.id ? "#D4AF37" : "rgba(255,255,255,0.06)",
                color: tab === t.id ? "#0B1930" : "rgba(255,255,255,0.45)",
                border: `1px solid ${tab === t.id ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
              }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#D4AF37] tracking-[0.1em]">סימולטור הנחות</span>
          <p className="text-white/25 text-[9px]">כל שינוי מתעדכן בזמן אמת</p>
        </div>
      </div>

      {/* ═══ TAB 1: SIMULATOR ═══════════════════════════════════════════════ */}
      {tab === "sim" && (
        <div className="flex gap-3 flex-1 min-h-0">

          {/* 6 Cards */}
          <div className="flex flex-col gap-2 w-[62%] shrink-0 overflow-y-auto">

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-2">
              <MiniCard title="💳 Interchange" icon="" color="#60A5FA" gain={R.intGain}>
                <Slider label="כרטיסים כיום" min={300} max={500} step={10} value={cardsK} onChange={setCardsK} unit="K" color="#60A5FA" />
                <Slider label="FIW נוכחי — % ראשי היום?" sub="אמרתם 10% — האם נכון?" min={5} max={40} step={1} value={fiwNow} onChange={v => { setFiwNow(v); if (v > fiwTarget) setFiwTarget(v + 1); }} unit="%" color="#93C5FD" />
                <Slider label="FIW יעד — עם The Box?" min={fiwNow + 1} max={60} step={1} value={Math.max(fiwTarget, fiwNow + 1)} onChange={setFiwTarget} unit="%" color="#60A5FA" />
                <Slider label="שיעור Interchange שלכם" sub="אתם יודעים — אנחנו לא" min={0.1} max={0.5} step={0.01} value={iRate} onChange={setIRate} unit="%" color="#3B82F6" decimals={2} />
                <Slider label="הוצאה כרטיס ראשי ₪/חודש" min={2000} max={12000} step={500} value={primSpend} onChange={setPrimSpend} unit="₪" color="#60A5FA" />
              </MiniCard>

              <MiniCard title="🏦 Float" icon="" color="#34D399" gain={R.floatGain}>
                <div className="rounded-lg bg-white/5 px-2 py-1.5 mb-1.5 text-right">
                  <p className="text-[9px] text-white/25">יתרת לקוחות — דוחות 2024 ✓</p>
                  <p className="text-base font-black text-white/60">938M ₪</p>
                </div>
                <Slider label="פער ריבית נטו" sub="BoI rate פחות מה שמשלמים ללקוחות" min={0.5} max={4} step={0.25} value={floatSpread} onChange={setFloatSpread} unit="%" color="#34D399" decimals={2} />
                <Slider label="גידול יתרה עם ZUZ" sub="כסף יושב יותר זמן — כמה %?" min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth} unit="%" color="#10B981" />
                <div className="rounded-lg bg-[#34D399]/8 border border-[#34D399]/20 px-2 py-1 mt-1">
                  <p className="text-[9px] text-[#34D399]/60 font-bold">→ יתרה חדשה: {R.floatNewBal}M ₪</p>
                </div>
              </MiniCard>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-2">
              <MiniCard title="🆕 כרטיסים חדשים" icon="" color="#A78BFA" gain={R.newCardsGain}>
                <Slider label="כמה כרטיסים חדשים שנה 1?" sub="ZUZ מתגמל פתיחת כרטיס" min={0} max={120} step={5} value={newCardsK} onChange={setNewCardsK} unit="K" color="#A78BFA" />
                <Slider label="הוצאה חודשית — כרטיס חדש" min={500} max={5000} step={100} value={avgSpend} onChange={setAvgSpend} unit="₪" color="#8B5CF6" />
              </MiniCard>

              <MiniCard title="⚡ עמלות טרנזקציות" icon="" color="#FB923C" gain={R.txnGain_}>
                <div className="rounded-lg bg-white/5 px-2 py-1.5 mb-1.5 text-right">
                  <p className="text-[9px] text-white/25">2M טרנזקציות/חודש — נאמר ✓</p>
                  <p className="text-[9px] text-white/30 mt-0.5">
                    ממוצע {txnAvgVal}₪ × 2M = <span className="font-bold text-[#FB923C]">{R.txnVolMonth}M ₪/חודש</span> עובר דרך פייבוקס
                  </p>
                </div>
                <Slider label="ממוצע ערך טרנזקציה" sub="20₪ = קפה · 200₪ = קנייה" min={20} max={500} step={10} value={txnAvgVal} onChange={setTxnAvgVal} unit="₪" color="#FB923C" />
                <Slider label="עמלה ממוצעת לטרנזקציה" sub="כמה פייבוקס מרוויח לטרנזקציה?" min={0.5} max={20} step={0.5} value={txnFee} onChange={setTxnFee} unit="₪" color="#F97316" decimals={1} />
                <Slider label="גידול טרנזקציות עם The Box" sub={`${BASE_TXN_M}M → ${R.txnNewCount.toFixed(1)}M/חודש`} min={0} max={100} step={5} value={txnGrowth} onChange={setTxnGrowth} unit="%" color="#EA580C" />
              </MiniCard>
            </div>

            {/* Row 3 - Gifts + Commerce */}
            <div className="grid grid-cols-2 gap-2">
              <MiniCard title="🎁 קבוצות מתנה → The Box" icon="" color="#F472B6" gain={R.giftRevenue} gainLabel="Commerce מתנות">
                <div className="rounded-lg bg-white/5 px-2 py-1.5 mb-1.5 text-right">
                  <p className="text-[9px] text-white/25">400M ₪ בקבוצות מתנה פעילות — דיווחתם ✓</p>
                </div>
                <Slider label="% שיקנו דרך The Box" sub="5% = 20M GMV · 50% = 200M GMV" min={5} max={50} step={5} value={giftConv} onChange={setGiftConv} unit="%" color="#F472B6" />
                <div className="text-[9px] text-[#F472B6] font-bold text-right mb-1">→ {R.giftGmv}M ₪ GMV ממתנות</div>
                <Slider label="% Commerce לפייבוקס על מתנות" min={0.5} max={3.0} step={0.25} value={giftComm} onChange={setGiftComm} unit="%" color="#EC4899" decimals={2} />
              </MiniCard>

              <MiniCard title="🛍️ Commerce — מקורות אחרים" icon="" color="#D4AF37" gain={R.otherRevenue} gainLabel="Commerce אחר">
                <div className="text-[9px] text-white/30 mb-1.5">מעבר למתנות: אוכל, חופשות, מוצרים</div>
                <Slider label="GMV ממקורות אחרים" min={0} max={500} step={25} value={otherGmv} onChange={setOtherGmv} unit="M₪" color="#D4AF37" />
                <Slider label="% Commerce לפייבוקס" min={0.5} max={2.0} step={0.1} value={commPct} onChange={setCommPct} unit="%" color="#B45309" decimals={1} />
                <div className="text-[9px] text-[#D4AF37] font-bold text-right mt-1">
                  סה״כ GMV: {R.totalGmv}M ₪ · Commerce: {R.totalComm}M ₪
                </div>
              </MiniCard>
            </div>
          </div>

          {/* RIGHT — Live total */}
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-[9px] font-bold text-white/25 tracking-widest text-center">סיכום חי</p>
            {[
              { label: "💳 Interchange", val: R.intGain,      color: "#60A5FA" },
              { label: "🏦 Float",       val: R.floatGain,    color: "#34D399" },
              { label: "🆕 כרטיסים",    val: R.newCardsGain, color: "#A78BFA" },
              { label: "⚡ טרנזקציות",   val: R.txnGain_,     color: "#FB923C" },
              { label: "🎁 Commerce מתנות", val: R.giftRevenue, color: "#F472B6" },
              { label: "🛍️ Commerce אחר",   val: R.otherRevenue, color: "#D4AF37" },
            ].map((row, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-white/3 px-3 py-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-white/40">{row.label}</span>
                  <span className="text-sm font-black" style={{ color: row.color }}>+{row.val}M</span>
                </div>
                <div className="h-1 rounded-full mt-1 overflow-hidden bg-white/8">
                  <div className="h-full rounded-full" style={{ width: `${R.totalGain > 0 ? Math.min(100, row.val / R.totalGain * 100) : 0}%`, background: row.color }} />
                </div>
              </div>
            ))}
            <div className="h-px bg-white/10 my-0.5" />
            <div className="rounded-xl border px-3 py-2 text-center" style={{ borderColor: `${cc}50`, background: `${cc}08` }}>
              <p className="text-[9px] text-white/30">סה״כ גידול / שנה</p>
              <p className="text-3xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
            </div>
            <div>
              <div className="h-2 rounded-full overflow-hidden bg-white/8">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, R.coverPct)}%`, background: cc }} />
              </div>
              <div className="flex justify-between text-[9px] mt-0.5">
                <span style={{ color: cc }} className="font-black">{R.coverPct}% ריטנר</span>
                <span className="text-white/20">חוזר בחודש {Math.round(RETAINER_ANNUAL / R.totalGain * 12)}</span>
              </div>
            </div>
            <button onClick={() => setTab("result")}
              className="rounded-xl py-2 text-xs font-black mt-auto transition-all"
              style={{ background: "#D4AF37", color: "#0B1930" }}>
              ← ראו לפני ואחרי
            </button>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: BEFORE / AFTER ══════════════════════════════════════════ */}
      {tab === "result" && (
        <div className="flex gap-4 flex-1 min-h-0">

          {/* BEFORE */}
          <div className="flex-1 rounded-2xl border border-red-500/20 bg-red-500/4 p-5">
            <p className="text-xs font-black text-red-400 tracking-widest mb-3 text-right">לפני BoomBuy — היום</p>
            {[
              { label: "💳 Interchange", val: TODAY.interchange, color: "#60A5FA" },
              { label: "🏦 Float",       val: TODAY.float,       color: "#34D399" },
              { label: "⚡ עמלות/טרנזקציות", val: TODAY.txnFees, color: "#FB923C" },
              { label: "📦 Plus + אחר",  val: TODAY.other,       color: "#A78BFA" },
            ].map((r, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-white/6">
                <span className="text-sm font-bold text-white/60">{r.label}</span>
                <span className="text-sm font-black" style={{ color: r.color }}>{r.val}M ₪</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-1">
              <span className="text-xs text-white/40">סה״כ הכנסות</span>
              <span className="text-lg font-black text-white/70">{TODAY.totalRev}M ₪</span>
            </div>
            <div className="flex justify-between py-1.5 border-t border-white/10">
              <span className="text-xs text-white/40">עלויות תפעול</span>
              <span className="text-sm font-black text-red-400">-{TODAY.costs}M ₪</span>
            </div>
            <div className="rounded-xl p-4 mt-3 text-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <p className="text-[10px] text-red-400/60 mb-1">הפסד נטו — מאומת 2024 ✓</p>
              <p className="text-4xl font-black text-red-400">{TODAY.loss}M ₪</p>
            </div>
          </div>

          {/* ARROW */}
          <div className="flex flex-col items-center justify-center shrink-0 gap-2">
            <div className="w-0.5 h-16 rounded-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            <div className="rounded-full w-10 h-10 flex items-center justify-center font-black text-[#0B1930] text-lg" style={{ background: "#D4AF37" }}>←</div>
            <div className="w-0.5 h-16 rounded-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37] to-transparent" />
            <p className="text-[9px] text-[#D4AF37]/50 writing-mode-vertical text-center font-bold">+{R.totalGain}M ₪/שנה</p>
          </div>

          {/* AFTER */}
          <div className="flex-1 rounded-2xl p-5" style={{ border: `1px solid ${cc}40`, background: `${cc}06` }}>
            <p className="text-xs font-black tracking-widest mb-3 text-right" style={{ color: cc }}>אחרי BoomBuy — שנה 1</p>

            {[
              { label: "💳 Interchange", val: +(TODAY.interchange + R.intGain).toFixed(1), gain: R.intGain, color: "#60A5FA" },
              { label: "🏦 Float",       val: +(TODAY.float + R.floatGain).toFixed(1),     gain: R.floatGain, color: "#34D399" },
              { label: "⚡ טרנזקציות",   val: +(TODAY.txnFees + R.txnGain_).toFixed(1),    gain: R.txnGain_, color: "#FB923C" },
              { label: "📦 Plus + אחר",  val: TODAY.other, gain: 0, color: "#A78BFA" },
              { label: "🎁 Commerce מתנות", val: R.giftRevenue, gain: R.giftRevenue, color: "#F472B6" },
              { label: "🛍️ Commerce אחר",   val: R.otherRevenue, gain: R.otherRevenue, color: "#D4AF37" },
              { label: "🆕 כרטיסים חדשים",  val: R.newCardsGain, gain: R.newCardsGain, color: "#A78BFA" },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/6">
                <span className="text-sm font-bold text-white/60">{r.label}</span>
                <div className="flex items-center gap-2">
                  {r.gain > 0 && <span className="text-[10px] text-green-400/70 font-bold">+{r.gain}M</span>}
                  <span className="text-sm font-black" style={{ color: r.color }}>{r.val}M ₪</span>
                </div>
              </div>
            ))}

            <div className="flex justify-between py-2 mt-1">
              <span className="text-xs text-white/40">סה״כ הכנסות</span>
              <span className="text-lg font-black" style={{ color: cc }}>{R.newTotalRev}M ₪</span>
            </div>
            <div className="flex justify-between py-1.5 border-t border-white/10">
              <span className="text-xs text-white/40">עלויות (כולל ריטנר 4.2M)</span>
              <span className="text-sm font-black text-red-400">-{R.newCosts}M ₪</span>
            </div>

            <div className="rounded-xl p-4 mt-3 text-center" style={{
              background: R.newLoss >= 0 ? "rgba(74,222,128,0.1)" : "rgba(212,175,55,0.08)",
              border: `1px solid ${R.newLoss >= 0 ? "rgba(74,222,128,0.35)" : "rgba(212,175,55,0.3)"}`,
            }}>
              <p className="text-[10px] mb-1" style={{ color: `${cc}99` }}>
                {R.newLoss >= 0 ? "✅ רווח נטו — Break Even!" : `הפסד ירד ב-${Math.abs(R.lossDelta).toFixed(1)}M ₪`}
              </p>
              <p className="text-4xl font-black" style={{ color: cc }}>{R.newLoss >= 0 ? "+" : ""}{R.newLoss}M ₪</p>
              {R.newLoss < 0 && (
                <p className="text-[10px] text-white/30 mt-1">
                  Break-Even מלא בעוד ~{R.monthsToBreakEven} חודש ({Math.ceil(R.monthsToBreakEven/12)} שנים)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>הכנסות היום: הערכה בלבד · כרטיסים חדשים = 50% Year 1</span>
      </div>
      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

import React, { useState, useMemo } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── LAYER-BY-LAYER SIMULATOR ─────────────────────────────────────────────────
// Every assumption = its own slider. PayBox decides the numbers. We calculate.

const RETAINER_ANNUAL = 4.2;   // M NIS/year (350K × 12)
const GIFT_BASE_M     = 400;   // M NIS — reported by PayBox in Discovery
const FLOAT_BASE_M    = 938;   // M NIS — Discount Bank 2024 annual report

const SCRIPT = `"כל מספר פה — אתם קובעים.
FIW נוכחי? אתם יודעים. שיעור Interchange? רק אתם.
400 מיליון בקבוצות מתנה — כמה % ריאלי שיעברו לThe Box?

גררו. ראו תוצאה. כשהמספרים שלכם — התוצאה שלכם."`;

// ── Reusable Components ───────────────────────────────────────────────────────

function Slider({ label, sub, min, max, step, value, onChange, unit = "", color = "#D4AF37", decimals = 0 }) {
  const display = decimals ? value.toFixed(decimals) : value;
  return (
    <div className="mb-2.5">
      <div className="flex justify-between items-end mb-0.5">
        <span className="text-[10px] text-white/40 leading-tight pr-1">{label}</span>
        <span className="text-sm font-black shrink-0 ml-1" style={{ color }}>
          {display}{unit}
        </span>
      </div>
      {sub && <p className="text-[9px] text-white/20 italic mb-0.5">{sub}</p>}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full cursor-pointer"
        style={{ accentColor: color }}
      />
      <div className="flex justify-between text-[9px] text-white/15">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Card({ title, icon, color, children, gainLabel = "גידול שנה 1", gain, today, note, todayLabel = "היום" }) {
  return (
    <div className="rounded-2xl border bg-white/3 p-3 flex flex-col"
      style={{ borderColor: `${color}35` }}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-base">{icon}</span>
        <span className="font-black text-white text-xs">{title}</span>
      </div>
      <div className="flex-1">{children}</div>
      <div className="rounded-lg p-2.5 border mt-2 flex justify-between items-center"
        style={{ background: `${color}10`, borderColor: `${color}30` }}>
        {today !== undefined && (
          <div>
            <p className="text-[9px] text-white/25">{todayLabel}</p>
            <p className="text-xs font-bold text-white/45">{today}M ₪</p>
          </div>
        )}
        <div className={today === undefined ? "w-full text-center" : "text-left"}>
          <p className="text-[9px] text-white/25">{gainLabel}</p>
          <p className="text-xl font-black" style={{ color }}>+{gain}M ₪</p>
        </div>
      </div>
      {note && <p className="text-[9px] text-white/15 mt-1 italic leading-tight">{note}</p>}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SlideFlow() {

  // 1. Interchange
  const [cardsK,    setCardsK]    = useState(400);   // K cards total
  const [fiwNow,    setFiwNow]    = useState(10);    // % current FIW
  const [fiwTarget, setFiwTarget] = useState(22);    // % FIW with The Box
  const [iRate,     setIRate]     = useState(0.25);  // % interchange rate
  const [primSpend, setPrimSpend] = useState(5000);  // NIS/month primary user

  // 2. Float
  const [floatSpread,  setFloatSpread]  = useState(2);    // % spread
  const [floatGrowth,  setFloatGrowth]  = useState(25);   // % balance growth

  // 3. New Cards
  const [newCardsK, setNewCardsK] = useState(40);    // K new cards/year
  const [avgSpend,  setAvgSpend]  = useState(1800);  // NIS/month per new card

  // 4. Gift Groups
  const [giftConv,  setGiftConv]  = useState(20);    // % of 400M that flows to The Box
  const [giftComm,  setGiftComm]  = useState(1.0);   // % Commerce on gift GMV

  // 5. Commerce (other / non-gift)
  const [otherGmv,  setOtherGmv]  = useState(100);   // M NIS other GMV
  const [commPct,   setCommPct]   = useState(1.0);   // % Commerce

  const R = useMemo(() => {
    const totalCards = cardsK * 1000;

    // ─ Interchange ──────────────────────────────────────────────────────────
    const primNow = totalCards * (fiwNow / 100);
    const secNow  = totalCards * (1 - fiwNow / 100);
    // back-calc secondary spend so current volume = 560M
    const secSpend = secNow > 0 ? Math.max(300, (560e6 - primNow * primSpend) / secNow) : 800;
    const volNow    = (primNow * primSpend + secNow * secSpend) / 1e6;

    const fiwTgt   = Math.max(fiwNow, fiwTarget);
    const primTgt  = totalCards * (fiwTgt / 100);
    const secTgt   = totalCards * (1 - fiwTgt / 100);
    const volTgt   = (primTgt * primSpend + secTgt * secSpend) / 1e6;

    const intToday = +(volNow * (iRate / 100) * 12).toFixed(1);
    const intNew   = +(volTgt * (iRate / 100) * 12).toFixed(1);
    const intGain  = +(intNew - intToday).toFixed(1);

    // ─ Float ────────────────────────────────────────────────────────────────
    const floatToday  = +(FLOAT_BASE_M * (floatSpread / 100)).toFixed(1);
    const floatNewBal = FLOAT_BASE_M * (1 + floatGrowth / 100);
    const floatNew    = +(floatNewBal * (floatSpread / 100)).toFixed(1);
    const floatGain   = +(floatNew - floatToday).toFixed(1);

    // ─ New Cards ─────────────────────────────────────────────────────────────
    const newCardsGain = +(newCardsK * 1000 * avgSpend * (iRate / 100) * 12 * 0.5 / 1e6).toFixed(1);

    // ─ Gift Groups ───────────────────────────────────────────────────────────
    const giftGmv      = +(GIFT_BASE_M * (giftConv / 100)).toFixed(1);  // M NIS GMV from gifts
    const giftRevenue  = +(giftGmv * (giftComm / 100)).toFixed(1);

    // ─ Commerce (other) ──────────────────────────────────────────────────────
    const otherRevenue = +(otherGmv * (commPct / 100)).toFixed(1);

    // ─ Totals ────────────────────────────────────────────────────────────────
    const totalGmv    = +(giftGmv + otherGmv).toFixed(1);
    const totalComm   = +(giftRevenue + otherRevenue).toFixed(1);
    const layer1      = +(intGain + floatGain + newCardsGain).toFixed(1);
    const totalGain   = +(layer1 + totalComm).toFixed(1);
    const netRet      = +(totalGain - RETAINER_ANNUAL).toFixed(1);
    const coverPct    = Math.round(totalGain / RETAINER_ANNUAL * 100);
    const breakMonths = totalGain > 0 ? +(RETAINER_ANNUAL / totalGain * 12).toFixed(1) : 99;

    return {
      intToday, intGain, intNew,
      volNow: +volNow.toFixed(0), volTgt: +volTgt.toFixed(0),
      secSpend: Math.round(secSpend),
      floatToday, floatGain, floatNewBal: Math.round(floatNewBal),
      newCardsGain,
      giftGmv, giftRevenue,
      otherRevenue, totalGmv, totalComm,
      layer1, totalGain, netRet, coverPct, breakMonths,
    };
  }, [cardsK, fiwNow, fiwTarget, iRate, primSpend,
      floatSpread, floatGrowth,
      newCardsK, avgSpend,
      giftConv, giftComm,
      otherGmv, commPct]);

  const cc = R.coverPct >= 100 ? "#4ade80" : R.coverPct >= 60 ? "#D4AF37" : "#60A5FA";

  return (
    <div className="relative min-h-full w-full flex flex-col px-4 md:px-7 py-5 text-white"
      style={{ background: "linear-gradient(145deg,#0D1F3C 0%,#0B1930 60%,#07101e 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#D4AF37,#F5D883,#D4AF37)" }} />

      {/* Header */}
      <div className="text-right shrink-0 mb-3">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.15em]">סימולטור הנחות</span>
        <div className="w-0.5 h-7 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent ml-auto mt-1 mb-1" />
        <h1 className="text-xl md:text-2xl font-black">כל שכבה — אתם קובעים את המספרים</h1>
        <p className="text-white/25 text-[10px] mt-0.5">גררו · ראו תוצאה חיה · אתם מאמתים</p>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">

        {/* LEFT — 5 Layer Cards */}
        <div className="flex flex-col gap-2 w-[62%] shrink-0 overflow-y-auto">

          {/* ROW 1: Interchange + Float */}
          <div className="grid grid-cols-2 gap-2">

            <Card title="Interchange — כרטיס ראשי" icon="💳" color="#60A5FA"
              today={R.intToday} gain={R.intGain}
              note={`${R.volNow}M → ${R.volTgt}M ₪/חודש · ₪${R.secSpend.toLocaleString()} כרטיס משני`}>
              <Slider label="כרטיסים סה״כ" min={300} max={500} step={10} value={cardsK} onChange={setCardsK} unit="K" color="#60A5FA" />
              <Slider label="FIW נוכחי — % ראשי היום" sub="אמרתם 10% — האם נכון?" min={5} max={40} step={1} value={fiwNow} onChange={v => { setFiwNow(v); if (v > fiwTarget) setFiwTarget(v); }} unit="%" color="#93C5FD" />
              <Slider label="FIW עם The Box — יעד" sub="לאן תגיעו בשנה 1?" min={fiwNow} max={60} step={1} value={Math.max(fiwTarget, fiwNow)} onChange={setFiwTarget} unit="%" color="#60A5FA" />
              <Slider label="שיעור Interchange שלכם" sub="המספר האמיתי — אתם יודעים" min={0.1} max={0.5} step={0.01} value={iRate} onChange={setIRate} unit="%" color="#3B82F6" decimals={2} />
              <Slider label="הוצאה חודשית — כרטיס ראשי" min={2000} max={12000} step={500} value={primSpend} onChange={setPrimSpend} unit="₪" color="#60A5FA" />
            </Card>

            <Card title="Float — כסף שיושב" icon="🏦" color="#34D399"
              today={R.floatToday} gain={R.floatGain}
              note={`938M → ${R.floatNewBal}M ₪ × ${floatSpread}%`}>
              <div className="rounded-lg bg-white/5 px-2.5 py-2 mb-2 text-right">
                <p className="text-[9px] text-white/30">יתרת לקוחות — דוחות דיסקונט 2024 ✓</p>
                <p className="text-lg font-black text-white/60">938M ₪</p>
              </div>
              <Slider label="פער ריבית נטו" sub="BoI rate פחות ריבית ללקוחות" min={0.5} max={4} step={0.25} value={floatSpread} onChange={setFloatSpread} unit="%" color="#34D399" decimals={2} />
              <Slider label="גידול יתרה עם ZUZ" sub="ZUZ משאיר כסף יותר זמן — כמה %?" min={0} max={80} step={5} value={floatGrowth} onChange={setFloatGrowth} unit="%" color="#10B981" />
              <div className="rounded-lg bg-[#34D399]/8 border border-[#34D399]/20 px-2.5 py-1.5 mt-1">
                <p className="text-[9px] text-[#34D399]/70 font-bold">400M ₪ בקבוצות מתנה</p>
                <p className="text-[9px] text-white/25">כסף שיושב עד חלוקה → Float אמיתי</p>
              </div>
            </Card>
          </div>

          {/* ROW 2: New Cards + Gift Groups */}
          <div className="grid grid-cols-2 gap-2">

            <Card title="כרטיסים חדשים" icon="🆕" color="#A78BFA"
              gain={R.newCardsGain} today={undefined}
              gainLabel="Interchange נוסף שנה 1"
              note={`${newCardsK}K × ${avgSpend.toLocaleString()}₪ × ${iRate.toFixed(2)}% × 12 × 50%`}>
              <Slider label="כרטיסים חדשים — כמה ריאלי שנה 1?" sub="ZUZ מתגמל פתיחת כרטיס" min={0} max={120} step={5} value={newCardsK} onChange={setNewCardsK} unit="K" color="#A78BFA" />
              <Slider label="הוצאה חודשית — כרטיס חדש" sub="₪/חודש ממוצע" min={500} max={5000} step={100} value={avgSpend} onChange={setAvgSpend} unit="₪" color="#8B5CF6" />
            </Card>

            {/* ★ GIFT GROUPS — הנחת יסוד עצמאית */}
            <Card title="קבוצות מתנה → The Box" icon="🎁" color="#F472B6"
              gain={R.giftRevenue} today={undefined}
              gainLabel="Commerce ממתנות"
              note={`${GIFT_BASE_M}M × ${giftConv}% = ${R.giftGmv}M GMV × ${giftComm}%`}>
              <div className="rounded-lg bg-white/5 px-2.5 py-2 mb-2 text-right">
                <p className="text-[9px] text-white/30">קבוצות מתנה פעילות — דיווחתם ✓</p>
                <p className="text-lg font-black text-white/60">400M ₪</p>
                <p className="text-[9px] text-white/20">כסף שיושב וממתין לחלוקה</p>
              </div>
              <Slider
                label="כמה % יעברו לקנות דרך The Box?"
                sub="5% = 20M GMV · 50% = 200M GMV"
                min={5} max={50} step={5}
                value={giftConv} onChange={setGiftConv}
                unit="%" color="#F472B6" />
              <div className="rounded-lg bg-[#F472B6]/10 border border-[#F472B6]/25 px-2.5 py-1.5 my-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-white/35">GMV ממתנות</span>
                  <span className="text-base font-black text-[#F472B6]">{R.giftGmv}M ₪</span>
                </div>
              </div>
              <Slider
                label="% Commerce לפייבוקס על מתנות"
                sub="מה ריאלי לכם?"
                min={0.5} max={3.0} step={0.25}
                value={giftComm} onChange={setGiftComm}
                unit="%" color="#EC4899" decimals={2} />
            </Card>
          </div>

          {/* ROW 3: Commerce (other) — full width */}
          <Card title="Commerce — מקורות נוספים (מעבר למתנות)" icon="🛍️" color="#D4AF37"
            gain={R.otherRevenue} today={undefined}
            gainLabel="Commerce מרכישות אחרות"
            note={`סה״כ GMV: ${R.giftGmv}M (מתנות) + ${otherGmv}M (אחר) = ${R.totalGmv}M × ממוצע`}>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <Slider label="GMV ממקורות אחרים (אוכל, חופשות, מוצרים...)" sub="מעבר לקבוצות המתנה" min={0} max={500} step={25} value={otherGmv} onChange={setOtherGmv} unit="M₪" color="#D4AF37" />
              <Slider label="% Commerce לפייבוקס על שאר" min={0.5} max={2.0} step={0.1} value={commPct} onChange={setCommPct} unit="%" color="#B45309" decimals={1} />
            </div>
          </Card>
        </div>

        {/* RIGHT — Live Summary */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[9px] font-bold text-white/25 tracking-widest text-center">סיכום חי</p>

          {[
            { label: "💳 Interchange",      val: R.intGain,      color: "#60A5FA" },
            { label: "🏦 Float",             val: R.floatGain,    color: "#34D399" },
            { label: "🆕 כרטיסים",           val: R.newCardsGain, color: "#A78BFA" },
            { label: "🎁 Commerce מתנות",    val: R.giftRevenue,  color: "#F472B6" },
            { label: "🛍️ Commerce אחר",      val: R.otherRevenue, color: "#D4AF37" },
          ].map((row, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 px-3 py-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-white/40">{row.label}</span>
                <span className="text-sm font-black" style={{ color: row.color }}>+{row.val}M</span>
              </div>
              <div className="h-1 rounded-full mt-1.5 overflow-hidden bg-white/8">
                <div className="h-full rounded-full"
                  style={{ width: `${R.totalGain > 0 ? Math.min(100, row.val / R.totalGain * 100) : 0}%`, background: row.color }} />
              </div>
            </div>
          ))}

          <div className="h-px bg-white/10 my-0.5" />

          {/* Layer 1 sub */}
          <div className="rounded-xl border border-white/10 bg-white/4 px-3 py-2">
            <div className="flex justify-between">
              <span className="text-[9px] text-white/35">Layer 1 — אורגני</span>
              <span className="text-sm font-black text-[#34D399]">+{R.layer1}M ₪</span>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl border px-3 py-3 text-center"
            style={{ borderColor: `${cc}50`, background: `${cc}08` }}>
            <p className="text-[9px] text-white/30 mb-0.5">סה״כ / שנה</p>
            <p className="text-3xl font-black" style={{ color: cc }}>+{R.totalGain}M ₪</p>
          </div>

          {/* Bar */}
          <div>
            <div className="h-2.5 rounded-full overflow-hidden bg-white/8">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, R.coverPct)}%`, background: cc }} />
            </div>
            <div className="flex justify-between text-[9px] mt-0.5">
              <span style={{ color: cc }} className="font-black">{R.coverPct}% ריטנר</span>
              <span className="text-white/20">חוזר בחודש {R.breakMonths}</span>
            </div>
          </div>

          {/* Net */}
          <div className="rounded-xl border px-3 py-3 text-center"
            style={{
              borderColor: R.netRet >= 0 ? "rgba(74,222,128,.4)" : "rgba(96,165,250,.25)",
              background:  R.netRet >= 0 ? "rgba(74,222,128,.06)" : "rgba(96,165,250,.04)"
            }}>
            <p className="text-[9px] text-white/25 mb-0.5">
              {R.netRet >= 0 ? "✓ ריטנר מכוסה · רווח נטו" : "חסר לכיסוי"}
            </p>
            <p className="text-2xl font-black" style={{ color: cc }}>
              {R.netRet >= 0 ? "+" : ""}{R.netRet}M ₪
            </p>
          </div>

          {/* GMV breakdown */}
          <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2 mt-auto">
            <p className="text-[9px] text-white/25 mb-1.5">GMV כולל</p>
            <div className="flex justify-between text-[9px]">
              <span className="text-[#F472B6]">🎁 {R.giftGmv}M</span>
              <span className="text-white/20">+</span>
              <span className="text-[#D4AF37]">🛍️ {otherGmv}M</span>
              <span className="text-white/20">=</span>
              <span className="text-white font-black">{R.totalGmv}M ₪</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-white/15 shrink-0">
        <span className="font-bold">BoomBuy × PayBox</span>
        <span>כרטיסים חדשים = 50% מ-year 1 · Float spread = הנחה</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

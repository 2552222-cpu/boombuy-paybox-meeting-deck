import { useState } from "react";
import { useSimulator, RETAINER } from "../../contexts/SimulatorContext";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const NAVY    = "#0B1930";
const GREEN   = "#4ade80";
const PURPLE  = "#8b5cf6";

function Badge({ who }) {
  const isPayBox = who === "PayBox";
  return (
    <span className="text-[9px] font-black px-2 py-0.5 rounded-full ml-auto"
      style={{
        background: isPayBox ? "#4F7FE022" : "#D4AF3722",
        color: isPayBox ? PB_BLUE : GOLD,
      }}>
      {who} מזינה
    </span>
  );
}

function Card({ icon, title, who, color = PB_BLUE, children }) {
  return (
    <div className="rounded-xl border border-gray-700 p-3 mb-3" style={{ background: "#0f1c32" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <span className="font-bold text-sm" style={{ color }}>{title}</span>
        {who && <Badge who={who} />}
      </div>
      {children}
    </div>
  );
}

function Slider({ label, sub, value, min, max, step = 1, format, set, color = PB_BLUE }) {
  const pct = Math.min(100, ((value - min) / (max - min)) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs text-gray-300">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{format ? format(value) : value}</span>
      </div>
      {sub && <div className="text-[11px] text-gray-500 mb-1 leading-tight">{sub}</div>}
      <div className="relative h-2 rounded-full bg-gray-700">
        <div className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => set(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
      </div>
    </div>
  );
}

export default function SlideFlow() {
  const {
    intRevNow,      setIntRevNow,
    intGrowthPct,   setIntGrowthPct,
    floatRevNow,    setFloatRevNow,
    floatGrowthPct, setFloatGrowthPct,
    giftVol,        setGiftVol,
    giftToBoxPct,   setGiftToBoxPct,
    payboxCommercePct, setPayboxCommercePct,
    boombuyLayer1Pct,  setBoombuyLayer1Pct,
    reset, R,
  } = useSimulator();

  const [calculated, setCalculated] = useState(false);

  function handleReset() { reset(); setCalculated(false); }

  const netColor = R.payboxNet >= 0 ? GREEN : "#f87171";

  return (
    <div dir="rtl" className="flex flex-col h-full text-white overflow-hidden"
      style={{ background: NAVY, fontFamily: "'Heebo', sans-serif" }}>

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700 shrink-0">
        <div>
          <div className="text-xl font-black" style={{ color: PB_BLUE }}>🧮 סימולטור | הזינו את המספרים שלכם</div>
          <div className="text-xs text-gray-400 mt-0.5">
            PayBox מזינה את הנתונים הפנימיים שלה · BoomBuy מציעה את מבנה העסקה
          </div>
        </div>
        {calculated && (
          <button onClick={handleReset}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
            ↺ איפוס
          </button>
        )}
      </div>

      {/* TWO COLUMNS */}
      <div className="flex-1 flex gap-3 px-4 pt-3 pb-2 overflow-y-auto min-h-0">

        {/* LEFT: LAYER 1 */}
        <div className="flex-1">
          <div className="text-center text-xs font-bold rounded-lg py-1 mb-2"
            style={{ background: PB_BLUE + "22", color: PB_BLUE }}>
            שכבה 1 | הכנסות פיננסיות קיימות שגדלות
          </div>

          <Card icon="💳" title="Interchange — הכרטיס" who="PayBox" color={PB_BLUE}>
            <div className="text-xs text-gray-500 mb-2">
              כמה PayBox מרוויחה <span className="text-white font-bold">היום</span> מהכרטיס? (Interchange נטו)
            </div>
            <Slider label="רווח נוכחי מהכרטיס" value={intRevNow} min={0} max={80} step={1}
              format={v => `${v}M ₪/שנה`} set={setIntRevNow} color={PB_BLUE} />
            <Slider label="גידול צפוי מ-FIW (כרטיס ראשי)" value={intGrowthPct} min={0} max={50}
              format={v => `+${v}%`} set={setIntGrowthPct} color={PB_BLUE}
              sub="כשפייבוקס הופך לכרטיס ראשי — יותר עסקאות, יותר נפח" />
            {intRevNow > 0 && intGrowthPct > 0 && (
              <div className="text-xs text-center font-bold mt-1 py-1 rounded" style={{ color: PB_BLUE, background: PB_BLUE + "11" }}>
                ערך חדש מהכרטיס: +{R.intGain}M ₪/שנה
              </div>
            )}
          </Card>

          <Card icon="🏦" title="Float — יתרות לקוחות" who="PayBox" color={PURPLE}>
            <div className="text-xs text-gray-500 mb-2">
              כמה PayBox מרוויחה <span className="text-white font-bold">היום</span> מהיתרות? (ריבית נטו)
            </div>
            <Slider label="רווח נוכחי מהיתרות" value={floatRevNow} min={0} max={60} step={1}
              format={v => `${v}M ₪/שנה`} set={setFloatRevNow} color={PURPLE} />
            <Slider label="גידול צפוי — ZUZ מגדיל זמן שהייה" value={floatGrowthPct} min={0} max={50}
              format={v => `+${v}%`} set={setFloatGrowthPct} color={PURPLE}
              sub="ZUZ = תמריץ להשאיר כסף בפייבוקס במקום למשוך" />
            {floatRevNow > 0 && floatGrowthPct > 0 && (
              <div className="text-xs text-center font-bold mt-1 py-1 rounded" style={{ color: PURPLE, background: PURPLE + "11" }}>
                ערך חדש מהיתרות: +{R.floatGain}M ₪/שנה
              </div>
            )}
          </Card>

          {/* L1 Total */}
          <div className="rounded-lg p-2 text-center border border-blue-900 mt-1"
            style={{ background: "#0a1628" }}>
            <div className="text-xs text-gray-400">שכבה 1 | ערך פיננסי חדש סה"כ</div>
            <div className="text-2xl font-black mt-1" style={{ color: PB_BLUE }}>
              {R.layer1New > 0 ? `+${R.layer1New}` : "—"}M ₪
            </div>
            {R.layer1New === 0 && (
              <div className="text-xs text-gray-600 mt-0.5">הזינו נתונים למעלה</div>
            )}
          </div>
        </div>

        {/* RIGHT: LAYER 2 + DEAL */}
        <div className="flex-1">
          <div className="text-center text-xs font-bold rounded-lg py-1 mb-2"
            style={{ background: GOLD + "22", color: GOLD }}>
            שכבה 2 | מסחר חדש דרך The Box
          </div>

          <Card icon="🎁" title="קבוצות מתנה | The Box" who="PayBox" color={GOLD}>
            <div className="text-xs text-gray-500 mb-2">
              כמה כסף נאסף בקבוצות מתנה בחודש?
            </div>
            <Slider label="מחזור קבוצות חודשי" value={giftVol} min={0} max={500} step={10}
              format={v => `${v}M ₪/חודש`} set={setGiftVol} color={GOLD} />
            <Slider label="% שיופנה לקנייה ב-The Box" value={giftToBoxPct} min={0} max={50}
              format={v => `${v}%`} set={setGiftToBoxPct} color={GOLD}
              sub="מה % הקבוצות שמסיימות בקנייה בפועל?" />
            {giftVol > 0 && giftToBoxPct > 0 && (
              <div className="text-xs text-center font-bold mt-1 py-1 rounded" style={{ color: GOLD, background: GOLD + "11" }}>
                GMV שנתי ב-The Box: {R.giftGmv}M ₪
              </div>
            )}
          </Card>

          <Card icon="🤝" title="מבנה העסקה | ייקבע בפיילוט" who="BoomBuy" color="#22d3ee">
            <div className="text-xs text-gray-500 mb-2">
              אלה הפרמטרים שנסגור יחד — BoomBuy מציעה, PayBox מאשרת
            </div>
            <Slider label="% רווח לפייבוקס מה-GMV של The Box" value={payboxCommercePct}
              min={0.5} max={3} step={0.1} format={v => `${v.toFixed(1)}%`}
              set={setPayboxCommercePct} color="#22d3ee" />
            <Slider label="% מהערך הפיננסי החדש ל-BoomBuy (Layer 1)" value={boombuyLayer1Pct}
              min={0} max={30} step={1} format={v => `${v}%`}
              set={setBoombuyLayer1Pct} color="#22d3ee"
              sub="ככל שBoomBuy מרוויחה מ-Layer 1 — הריטנר יורד בהתאם" />
            <div className="mt-2 rounded-lg px-2 py-1.5 text-xs text-emerald-300 border border-emerald-900"
              style={{ background: "#021208" }}>
              💡 BoomBuy נושאת את עלות ZUZ, הסבסוד, השירות והתפעול — ל-PayBox אין עלות ישירה
            </div>
          </Card>

          {/* L2 Total */}
          <div className="rounded-lg p-2 text-center border border-yellow-900 mt-1"
            style={{ background: "#0a1205" }}>
            <div className="text-xs text-gray-400">שכבה 2 | רווח מסחר ל-PayBox</div>
            <div className="text-2xl font-black mt-1" style={{ color: GOLD }}>
              {R.payboxCommerceRev > 0 ? `+${R.payboxCommerceRev}` : "—"}M ₪
            </div>
            {R.giftGmv > 0 && (
              <div className="text-xs text-gray-500 mt-0.5">{R.giftGmv}M ₪ GMV × {payboxCommercePct}%</div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM: כפתור חשב / תוצאות */}
      <div className="border-t border-gray-700 px-4 py-3 shrink-0" style={{ background: "#060e1c" }}>
        {!calculated ? (
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => setCalculated(true)}
              className="px-10 py-3 rounded-2xl font-black text-lg text-[#0B1930] shadow-lg transition-transform active:scale-95"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)" }}>
              ✦ חשב תרחיש ✦
            </button>
            <div className="text-xs text-gray-500">הזיזו את הסליידרים לפי הנתונים שלכם ולחצו לחישוב</div>
          </div>
        ) : (
          <div>
            {/* Equation */}
            <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
              <div className="text-center">
                <div className="text-lg font-black" style={{ color: PB_BLUE }}>+{R.payboxLayer1Share}M ₪</div>
                <div className="text-xs text-gray-500">שכבה 1 לפייבוקס</div>
              </div>
              <div className="text-gray-500">+</div>
              <div className="text-center">
                <div className="text-lg font-black" style={{ color: GOLD }}>+{R.payboxCommerceRev}M ₪</div>
                <div className="text-xs text-gray-500">שכבה 2 (סחר)</div>
              </div>
              <div className="text-gray-500">−</div>
              <div className="text-center">
                <div className="text-lg font-black text-orange-400">{R.effectiveRetainer}M ₪</div>
                <div className="text-xs text-gray-500">ריטנר אפקטיבי</div>
              </div>
              <div className="text-gray-500 text-xl">=</div>
              <div className="px-4 py-2 rounded-xl border-2 text-center"
                style={{ borderColor: netColor, background: netColor + "15" }}>
                <div className="text-2xl font-black" style={{ color: netColor }}>
                  {R.payboxNet > 0 ? "+" : ""}{R.payboxNet}M ₪
                </div>
                <div className="text-xs" style={{ color: netColor }}>
                  {R.payboxNet >= 0 ? "✅ תרומה נטו לפייבוקס" : "⏳ עדיין מתחת לריטנר"}
                </div>
              </div>
            </div>
            {R.effectiveRetainer < RETAINER && (
              <div className="text-center text-xs text-emerald-400 mb-1">
                💡 ריטנר בסיס {RETAINER}M ← יורד ל-{R.effectiveRetainer}M כי BoomBuy מרוויחה {R.boombuyLayer1Share}M מ-Layer 1
              </div>
            )}
            <div className="text-center text-xs text-gray-600">
              * מדידה לפי ערך חדש שהשותפות מייצרת בלבד — לא משווים ל-P&L הכולל של PayBox
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

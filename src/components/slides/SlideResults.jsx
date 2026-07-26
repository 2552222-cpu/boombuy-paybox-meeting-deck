import { useSimulator, RETAINER } from "../../contexts/SimulatorContext";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const NAVY    = "#0B1930";
const PURPLE  = "#8b5cf6";
const GREEN   = "#4ade80";

function Row({ label, val, color, sub, bold }) {
  const sign = val > 0 ? "+" : "";
  const display = typeof val === "number" ? `${sign}${val.toFixed(2)}M ₪` : val;
  return (
    <div className="flex justify-between items-start py-1.5 border-b border-gray-800">
      <div>
        <div className={`text-sm ${bold ? "font-bold text-white" : "text-gray-300"}`}>{label}</div>
        {sub && <div className="text-xs text-gray-500">{sub}</div>}
      </div>
      <div className="text-sm font-bold" style={{ color: color || (val >= 0 ? GREEN : "#f87171") }}>
        {display}
      </div>
    </div>
  );
}

export default function SlideResults() {
  const { R, intRevNow, floatRevNow, intGrowthPct, floatGrowthPct,
          giftVol, giftToBoxPct, payboxCommercePct, boombuyLayer1Pct } = useSimulator();

  const netColor = R.payboxNet >= 0 ? GREEN : "#f87171";

  const hasData = intRevNow > 0 || floatRevNow > 0 || giftVol > 0;

  return (
    <div dir="rtl" className="flex flex-col h-full text-white overflow-hidden"
      style={{ background: NAVY, fontFamily: "'Heebo', sans-serif" }}>

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-gray-700 flex justify-between items-center shrink-0">
        <div>
          <div className="text-xl font-black" style={{ color: GOLD }}>📊 תוצאות | לפי הנתונים שהוזנו</div>
          <div className="text-xs text-gray-400 mt-0.5">
            המספרים כאן נגזרים אך ורק מהנתונים שהכנסתם — לא מהנחות BoomBuy
          </div>
        </div>
        {hasData && (
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: netColor }}>
              {R.payboxNet > 0 ? "+" : ""}{R.payboxNet}M ₪
            </div>
            <div className="text-xs text-gray-400">תרומה נטו שנתית לפייבוקס</div>
          </div>
        )}
      </div>

      {!hasData ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🧮</div>
            <div className="text-xl font-bold text-gray-400">חזרו לסימולטור והזינו את המספרים שלכם</div>
            <div className="text-sm text-gray-600 mt-2">התוצאות מחושבות לפי הנתונים הפנימיים של PayBox</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex gap-3 px-4 pt-3 pb-2 overflow-y-auto min-h-0">

          {/* COL 1: Layer 1 */}
          <div className="flex-1">
            <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
              style={{ background: PB_BLUE + "22", color: PB_BLUE }}>
              שכבה 1 | ערך פיננסי חדש
            </div>
            <div className="rounded-xl p-3 border border-gray-700" style={{ background: "#0f1c32" }}>
              <Row label="Interchange — היום" val={intRevNow} color="#94a3b8"
                sub="רווח נוכחי שהזנתם" />
              <Row label={`גידול מ-FIW (+${intGrowthPct}%)`} val={R.intGain} color={PB_BLUE}
                sub="ערך חדש מהכרטיס הראשי" />
              <div className="border-t border-gray-800 mt-1 pt-1" />
              <Row label="Float — היום" val={floatRevNow} color="#94a3b8"
                sub="רווח נוכחי מהיתרות" />
              <Row label={`גידול מ-ZUZ (+${floatGrowthPct}%)`} val={R.floatGain} color={PURPLE}
                sub="זמן שהייה ארוך יותר" />
              <div className="mt-3 pt-2 border-t border-gray-700 text-center">
                <div className="text-xs text-gray-400">סה"כ ערך חדש שכבה 1</div>
                <div className="text-2xl font-black mt-1" style={{ color: PB_BLUE }}>
                  +{R.layer1New}M ₪
                </div>
              </div>

              {boombuyLayer1Pct > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-1">חלוקת Layer 1 לפי העסקה:</div>
                  <Row label={`לפייבוקס (${100-boombuyLayer1Pct}%)`} val={R.payboxLayer1Share} color={PB_BLUE} />
                  <Row label={`ל-BoomBuy (${boombuyLayer1Pct}%)`} val={R.boombuyLayer1Share} color={GOLD}
                    sub="מקזז את הריטנר" />
                </div>
              )}
            </div>
          </div>

          {/* COL 2: Layer 2 */}
          <div className="flex-1">
            <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
              style={{ background: GOLD + "22", color: GOLD }}>
              שכבה 2 | מסחר דרך The Box
            </div>
            <div className="rounded-xl p-3 border border-gray-700" style={{ background: "#0f1c32" }}>
              <Row label="מחזור קבוצות חודשי" val={giftVol} color="#94a3b8"
                sub="הזנתם (M ₪/חודש)" />
              <Row label={`% ל-The Box (${giftToBoxPct}%)`} val={R.giftGmv} color="#94a3b8"
                sub="GMV שנתי" />
              <Row label={`% PayBox מ-GMV (${payboxCommercePct}%)`} val={R.payboxCommerceRev} color={GOLD}
                sub="רווח מסחר לפייבוקס" />
              <div className="mt-2 rounded-lg px-2 py-1.5 text-xs text-emerald-300 border border-emerald-900"
                style={{ background: "#021208" }}>
                💡 עלות ZUZ וסבסוד על BoomBuy בלבד
              </div>
            </div>
          </div>

          {/* COL 3: Net */}
          <div className="flex-1">
            <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
              style={{ background: netColor + "22", color: netColor }}>
              תרומה נטו לפייבוקס
            </div>
            <div className="rounded-xl p-3 border border-gray-700" style={{ background: "#0f1c32" }}>
              <Row label="שכבה 1 | חלק PayBox" val={R.payboxLayer1Share} color={PB_BLUE} bold />
              <Row label="שכבה 2 | מסחר" val={R.payboxCommerceRev} color={GOLD} bold />
              <Row label="סה״כ ערך חדש" val={R.payboxTotal} color={GREEN} bold />
              <div className="border-t border-gray-700 mt-2 pt-2">
                <Row label="ריטנר בסיס" val={-RETAINER} color="#fb923c"
                  sub="350K ₪/חודש" />
                {R.boombuyLayer1Share > 0 && (
                  <Row label={`קיזוז BoomBuy Layer 1`} val={R.boombuyLayer1Share} color={GREEN}
                    sub="הכנסת BoomBuy מורידה ריטנר" />
                )}
                <Row label="ריטנר אפקטיבי" val={-R.effectiveRetainer} color="#fb923c" bold />
              </div>
              <div className="mt-3 pt-2 border-t-2 border-gray-600 text-center">
                <div className="text-xs text-gray-400">= תרומה שנתית נטו</div>
                <div className="text-3xl font-black mt-1" style={{ color: netColor }}>
                  {R.payboxNet > 0 ? "+" : ""}{R.payboxNet}M ₪
                </div>
                {R.payboxNet >= 0
                  ? <div className="text-xs text-green-400 mt-1">✅ השותפות תורמת ערך חיובי</div>
                  : <div className="text-xs text-red-400 mt-1">⏳ ייקבע בפיילוט לפי נתונים אמיתיים</div>}
              </div>
              <div className="mt-3 text-xs text-gray-600 text-center">
                * נמדד כיחידה עצמאית — לא לפי P&L הכולל של PayBox
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

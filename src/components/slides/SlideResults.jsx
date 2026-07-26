import { useSimulator, RETAINER, FLOAT_BASE_REV } from "../../contexts/SimulatorContext";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const NAVY    = "#0B1930";

function Row({ label, val, color, sub }) {
  const fmtVal = typeof val === "number"
    ? (val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2))
    : val;
  return (
    <div className="flex justify-between items-start py-1.5 border-b border-gray-800">
      <div>
        <div className="text-sm text-gray-200">{label}</div>
        {sub && <div className="text-xs text-gray-500">{sub}</div>}
      </div>
      <div className="text-sm font-bold text-right" style={{ color: color || (val >= 0 ? "#4ade80" : "#f87171") }}>
        {fmtVal}M ₪/שנה
      </div>
    </div>
  );
}

export default function SlideResults() {
  const { R } = useSimulator();

  const netSign  = R.netResult >= 0;
  const netColor = netSign ? "#4ade80" : "#f87171";

  return (
    <div dir="rtl" className="flex flex-col h-full text-white overflow-hidden"
      style={{ background: NAVY, fontFamily: "'Heebo', sans-serif" }}>

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-gray-700 flex justify-between items-center">
        <div>
          <div className="text-xl font-black" style={{ color: GOLD }}>📊 סיכום מודל — P&L</div>
          <div className="text-xs text-gray-400">תוצאות מהסימולטור — שנה 1 ותחזית 5 שנים</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black" style={{ color: netColor }}>
            {R.netResult > 0 ? "+" : ""}{R.netResult}M ₪
          </div>
          <div className="text-xs text-gray-400">נטו — שנה 1</div>
        </div>
      </div>

      {/* THREE COLUMNS */}
      <div className="flex-1 flex gap-3 px-4 pt-3 pb-2 overflow-y-auto min-h-0">

        {/* COL 1: Layer 1 */}
        <div className="flex-1">
          <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
            style={{ background: PB_BLUE + "22", color: PB_BLUE }}>
            שכבה 1 — ערוצים קיימים
          </div>
          <div className="rounded-xl p-3 border border-gray-700 h-auto" style={{ background: "#0f1c32" }}>
            <Row label="Interchange (בסיס)" val={R.intBase} color="#94a3b8"
              sub={`רווח נוכחי מסליקה — לא משתנה`} />
            <Row label="Interchange — גידול FIW" val={R.intGain} color={PB_BLUE}
              sub="נפח סליקה נוסף מ-FIW" />
            <Row label="Float — בסיס" val={FLOAT_BASE_REV} color="#94a3b8"
              sub="938M × 2% נטו — כבר קיים" />
            <Row label="Float — גידול ZUZ" val={R.floatGain} color="#8b5cf6"
              sub="dwell time גבוה יותר" />
            <div className="mt-3 pt-2 border-t border-gray-700 text-center">
              <div className="text-xs text-gray-400">רווח נוסף שכבה 1</div>
              <div className="text-2xl font-black mt-1" style={{ color: PB_BLUE }}>
                {R.layer1 > 0 ? "+" : ""}{R.layer1}M ₪
              </div>
            </div>
          </div>
        </div>

        {/* COL 2: Layer 2 */}
        <div className="flex-1">
          <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
            style={{ background: GOLD + "22", color: GOLD }}>
            שכבה 2 — מנוע סחר
          </div>
          <div className="rounded-xl p-3 border border-gray-700" style={{ background: "#0f1c32" }}>
            <Row label="קבוצות מתנה — GMV" val={R.giftGmv} color="#94a3b8"
              sub="400M × % המרה" />
            <Row label="קבוצות מתנה — רווח" val={R.giftRev} color={GOLD}
              sub={`GMV × ${"%"} עמלה`} />
            <div className="border-t border-gray-800 mt-1 pt-1" />
            <Row label="טרנזקציות → ZUZ → GMV" val={R.txnGmv} color="#94a3b8"
              sub={`${R.zuzIssued.toLocaleString()}M ZUZ × ${"%"} המרה`} />
            <Row label="טרנזקציות — רווח" val={R.txnCommerceRev} color="#22d3ee"
              sub="GMV × % עמלה" />
            <div className="border-t border-gray-800 mt-1 pt-1" />
            <Row label="סחר כללי — רווח" val={R.generalRev} color="#fb923c"
              sub="GMV ישיר × % עמלה" />
            <div className="mt-3 pt-2 border-t border-gray-700 text-center">
              <div className="text-xs text-gray-400">רווח נוסף שכבה 2</div>
              <div className="text-2xl font-black mt-1" style={{ color: GOLD }}>
                {R.layer2 > 0 ? "+" : ""}{R.layer2}M ₪
              </div>
            </div>
          </div>
        </div>

        {/* COL 3: תרומה לשותפות */}
        <div className="flex-1">
          <div className="text-center text-xs font-bold mb-2 rounded-lg py-1"
            style={{ background: netColor + "22", color: netColor }}>
            תרומה שנתית לשותפות
          </div>
          <div className="rounded-xl p-3 border border-gray-700" style={{ background: "#0f1c32" }}>
            {/* Breakdown */}
            <div className="mb-3 pb-2 border-b border-gray-800">
              <div className="text-xs font-bold text-gray-400 mb-1">ערך פיננסי חדש שהשותפות מייצרת</div>
              <Row label="שכבה 1 — רווח נוסף" val={R.layer1} color={PB_BLUE}
                sub="Interchange + Float שמגדלים" />
              <Row label="שכבה 2 — מנוע סחר" val={R.layer2} color={GOLD}
                sub="מתנות + ZUZ + סחר כללי" />
              <Row label="סהך ערך חדש" val={R.totalGain} color="#4ade80" />
            </div>

            {/* Cost */}
            <div className="mb-3 pb-2 border-b border-gray-800">
              <div className="text-xs font-bold text-gray-400 mb-1">עלות שותפות</div>
              <Row label="ריטנר BoomBuy" val={-RETAINER} color="#fb923c" sub="350K ₪/חודש — שותפות, לא ספק" />
            </div>

            {/* Net */}
            <div className="text-center py-2">
              <div className="text-xs text-gray-400">משוואה: +{R.totalGain} − {RETAINER} =</div>
              <div className="text-3xl font-black mt-1" style={{ color: netColor }}>
                {R.netResult > 0 ? "+" : ""}{R.netResult}M ₪
              </div>
              <div className="text-sm" style={{ color: netColor }}>
                {netSign
                  ? "✅ תרומה נטו לשותפות"
                  : `עד כיסוי ריטנר: ${R.monthsToZero === 999 ? "∞" : R.monthsToZero + " חודשים"}`}
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-600 text-center">
              * הP&L הכולל של PayBox אינו חלק מהחשבון
            </div>
          </div>
        </div>
      </div>

      {/* 5-YEAR PROJECTION */}
      <div className="border-t border-gray-700 px-4 py-3" style={{ background: "#060e1c" }}>
        <div className="text-center text-xs text-gray-400 mb-2">
          📈 תחזית 5 שנים — תרומה נטו לשותפות (10% גידול שנתי)
        </div>
        <div className="flex gap-2 mb-2">
          {R.yr5Net.map((net, i) => {
            const gross = R.yr5[i];
            const isPos = net > 0;
            return (
              <div key={i} className="flex-1 text-center rounded-xl py-2 border"
                style={{ borderColor: isPos ? "#4ade8055" : "#f8717155", background: isPos ? "#031403" : "#140303" }}>
                <div className="text-xs text-gray-500 font-bold">שנה {i + 1}</div>
                <div className="text-base font-black" style={{ color: isPos ? "#4ade80" : "#f87171" }}>
                  {net > 0 ? "+" : ""}{net}M
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{gross}M רווח</div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-sm font-bold" style={{ color: GOLD }}>
          סה"כ ערך חדש 5 שנים: {R.cumulative5}M ₪ |
          {" "}
          <span style={{ color: "#4ade80" }}>
            תרומה נטו: +{+(R.cumulative5 - RETAINER * 5).toFixed(1)}M ₪
          </span>
        </div>
      </div>
    </div>
  );
}

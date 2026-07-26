import { useSimulator, RETAINER, FLOAT_BASE_REV, VOL_MONTHLY, TXN_MONTHLY, GIFT_BASE } from "../../contexts/SimulatorContext";

const PB_BLUE = "#4F7FE0";
const GOLD    = "#D4AF37";
const NAVY    = "#0B1930";

/* ── tiny slider ───────────────────────────────────────────────────────────── */
function Slider({ label, sub, value, min, max, step = 1, format, set, color = PB_BLUE }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs text-gray-300">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{format ? format(value) : value}</span>
      </div>
      {sub && <div className="text-xs text-gray-500 mb-0.5 leading-tight">{sub}</div>}
      <div className="relative h-1.5 rounded-full bg-gray-700">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => set(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

/* ── section card ──────────────────────────────────────────────────────────── */
function Card({ icon, title, badge, question, children, color = PB_BLUE }) {
  return (
    <div className="rounded-xl border border-gray-700 p-3 mb-3" style={{ background: "#0f1c32" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="font-bold text-sm" style={{ color }}>{title}</span>
        {badge && (
          <span className="mr-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: color + "22", color }}>{badge}</span>
        )}
      </div>
      {children}
      {question && (
        <div className="mt-2 rounded-lg p-2 text-xs text-yellow-300 border border-yellow-800"
          style={{ background: "#1a1500" }}>
          <span className="font-bold">❓ שאלה לפייבוקס: </span>{question}
        </div>
      )}
    </div>
  );
}

/* ── number pill ───────────────────────────────────────────────────────────── */
function Pill({ label, val, color, big }) {
  const fmtVal = typeof val === "number"
    ? (Math.abs(val) >= 1 ? val.toFixed(1) : val.toFixed(2))
    : val;
  return (
    <div className="flex flex-col items-center">
      <div className={`font-black ${big ? "text-2xl" : "text-lg"}`}
        style={{ color: color || (val >= 0 ? "#4ade80" : "#f87171") }}>
        {typeof val === "number" && val > 0 ? "+" : ""}{fmtVal}M ₪
      </div>
      <div className="text-xs text-gray-400 text-center">{label}</div>
    </div>
  );
}

/* ── calculation row ────────────────────────────────────────────────────────── */
function CalcRow({ label, val, unit = "M ₪", color = "#94a3b8" }) {
  return (
    <div className="flex justify-between items-center text-xs py-0.5">
      <span style={{ color: "#94a3b8" }}>{label}</span>
      <span style={{ color }} className="font-semibold">{typeof val === "number" ? val.toLocaleString() : val} {unit}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function SlideFlow() {
  const {
    iRate, setIRate, intGrowth, setIntGrowth,
    floatGrowth, setFloatGrowth,
    giftConv, setGiftConv, giftComm, setGiftComm,
    txnGrowth, setTxnGrowth, avgTxnValue, setAvgTxnValue,
    zuzRate, setZuzRate, txnConv, setTxnConv, txnComm, setTxnComm,
    generalGmv, setGeneralGmv, generalComm, setGeneralComm,
    R,
  } = useSimulator();

  const netSign  = R.netResult >= 0;
  const netColor = netSign ? "#4ade80" : "#f87171";

  return (
    <div dir="rtl" className="flex flex-col h-full text-white overflow-hidden"
      style={{ background: NAVY, fontFamily: "'Heebo', sans-serif" }}>

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
        <div>
          <div className="text-xl font-black" style={{ color: PB_BLUE }}>🧮 סימולטור הזדמנויות</div>
          <div className="text-xs text-gray-400">הזז את הסליידרים — המספרים מחושבים בזמן אמת</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black" style={{ color: R.totalGain > 0 ? "#4ade80" : GOLD }}>
            {R.totalGain > 0 ? "+" : ""}{R.totalGain}M ₪
          </div>
          <div className="text-xs text-gray-400">סה"כ רווח שנתי חדש לפייבוקס</div>
        </div>
      </div>

      {/* TWO COLUMNS */}
      <div className="flex-1 flex gap-3 px-4 pt-3 pb-2 overflow-y-auto min-h-0">

        {/* ═══ LEFT: LAYER 1 — ORGANIC ══════════════════════════════════════ */}
        <div className="flex-1">
          <div className="text-center mb-2 text-xs font-bold rounded-lg py-1"
            style={{ background: PB_BLUE + "22", color: PB_BLUE }}>
            שכבה 1 — ערוצים קיימים ← כסף שכבר בתוך פייבוקס
          </div>

          {/* INTERCHANGE */}
          <Card icon="💳" title="Interchange" color={PB_BLUE}
            badge={`בסיס ${R.intBase}M ₪/שנה`}
            question="מה שיעור ה-Interchange שלכם מכאל? (לא נחשף לנו — שאלה קריטית)">
            <div className="text-xs text-gray-500 mb-2 leading-tight">
              {VOL_MONTHLY}M ₪ × {iRate}% × 12 = <span style={{color:PB_BLUE}} className="font-bold">{R.intBase}M ₪/שנה</span> — מה שאתם כבר מרוויחים
            </div>
            <Slider label="שיעור Interchange שלכם" value={iRate} min={0.10} max={0.50} step={0.01}
              format={v => `${v.toFixed(2)}%`} set={setIRate} color={PB_BLUE}
              sub="הערכת יועץ: 0.15%–0.35% (עמלת מעבר מכאל — לא נחשף לנו)" />
            <Slider label="גידול נפח סליקה (FIW נוסף)" value={intGrowth} min={0} max={50}
              format={v => `+${v}%`} set={setIntGrowth} color={PB_BLUE} />
            {intGrowth > 0 && (
              <div className="text-xs text-center mt-1 font-bold" style={{color: PB_BLUE}}>
                רווח נוסף: +{R.intGain}M ₪/שנה
              </div>
            )}
          </Card>

          {/* FLOAT */}
          <Card icon="🏦" title="Float — יתרות לקוחות" color="#8b5cf6"
            badge={`בסיס ${FLOAT_BASE_REV}M ₪/שנה`}
            question="כמה כסף יושב בממוצע בארנקי המשתמשים, וכמה זמן? האם ה-ZUZ יגרום לאנשים להשאיר יותר כסף יותר זמן לפני שהם ממשכים לבנק?">
            <div className="text-xs text-gray-500 mb-2 leading-tight">
              938M ₪ יתרת לקוחות × 2% ריבית נטו = <span style={{color:"#8b5cf6"}} className="font-bold">{FLOAT_BASE_REV}M ₪/שנה</span>
            </div>
            <Slider label="גידול יתרה ממוצעת (ZUZ מגדיל dwell time)" value={floatGrowth}
              min={0} max={100} format={v => `+${v}%`} set={setFloatGrowth} color="#8b5cf6" />
            {floatGrowth > 0 && (
              <div className="text-xs text-center mt-1 font-bold" style={{color:"#8b5cf6"}}>
                רווח נוסף: +{R.floatGain}M ₪/שנה
              </div>
            )}
          </Card>

          {/* LAYER 1 TOTAL */}
          <div className="rounded-lg p-2 text-center border border-blue-800 mt-1"
            style={{ background: "#0a1628" }}>
            <div className="text-xs text-gray-400 mb-1">שכבה 1 — רווח נוסף שנתי</div>
            <div className="text-2xl font-black" style={{ color: PB_BLUE }}>
              {R.layer1 > 0 ? "+" : ""}{R.layer1}M ₪
            </div>
            <div className="text-xs text-gray-500">
              Interchange {R.intGain > 0 ? `+${R.intGain}` : "0"} | Float {R.floatGain > 0 ? `+${R.floatGain}` : "0"}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: LAYER 2 — COMMERCE ════════════════════════════════════ */}
        <div className="flex-1">
          <div className="text-center mb-2 text-xs font-bold rounded-lg py-1"
            style={{ background: GOLD + "22", color: GOLD }}>
            שכבה 2 — מנוע סחר חדש ← כסף שעדיין לא קיים בפייבוקס
          </div>

          {/* GIFT GROUPS */}
          <Card icon="🎁" title="קבוצות מתנה" color={GOLD}
            badge={`${GIFT_BASE}M ₪ פעיל`}
            question="מה % ההמרה הנוכחי שלכם מקבוצות → רכישה? כמה קבוצות פעילות חודשית?">
            <div className="text-xs text-gray-500 mb-2">
              {GIFT_BASE}M ₪ קבוצות פעילות — כמה ממירים ל-GMV בפועל?
            </div>
            <Slider label="% קבוצות שממירות לקנייה" value={giftConv} min={0} max={100}
              format={v => `${v}%`} set={setGiftConv} color={GOLD} />
            <Slider label="% רווח לפייבוקס מה-GMV" value={giftComm} min={0.5} max={3} step={0.1}
              format={v => `${v}%`} set={setGiftComm} color={GOLD} />
            {giftConv > 0 && (
              <CalcRow label={`${GIFT_BASE}M × ${giftConv}% = GMV`} val={R.giftGmv} color={GOLD} />
            )}
            <div className="text-xs text-center mt-1 font-bold" style={{color: GOLD}}>
              {R.giftRev > 0 ? `+${R.giftRev}` : "0"}M ₪/שנה
            </div>
          </Card>

          {/* TRANSACTIONS → ZUZ → COMMERCE */}
          <Card icon="⚡" title="טרנזקציות → ZUZ → The Box" color="#22d3ee"
            question="מה הערך הממוצע לטרנזקציה בפועל? (אנחנו מניחים 200 ₪ — זקוקים לנתון שלכם)">
            <div className="text-xs text-gray-500 mb-2 leading-tight">
              2M טרנזקציות × ערך ממוצע = נפח שממנו מנוע ZUZ מוציא כסף לשוק
            </div>
            <Slider label="ערך ממוצע לטרנזקציה" value={avgTxnValue} min={50} max={1000} step={50}
              format={v => `${v} ₪`} set={setAvgTxnValue} color="#22d3ee"
              sub={`נפח שנתי: ${R.txnAnnualFlow.toLocaleString()}M ₪/שנה`} />
            <Slider label="% נפח → ZUZ לשוק" value={zuzRate} min={5} max={50}
              format={v => `${v}%`} set={setZuzRate} color="#22d3ee"
              sub={`ZUZ שיצאו: ${R.zuzIssued.toLocaleString()}M ₪`} />
            <Slider label="% ZUZ → קנייה ב-The Box" value={txnConv} min={1} max={15}
              format={v => `${v}%`} set={setTxnConv} color="#22d3ee"
              sub={`GMV: ${R.txnGmv}M ₪`} />
            <Slider label="% רווח לפייבוקס מה-GMV" value={txnComm} min={0.5} max={3} step={0.1}
              format={v => `${v}%`} set={setTxnComm} color="#22d3ee" />
            <div className="text-xs text-center mt-1 font-bold" style={{color:"#22d3ee"}}>
              {R.txnCommerceRev > 0 ? `+${R.txnCommerceRev}` : "0"}M ₪/שנה
            </div>
            <Slider label="גידול מספר טרנזקציות" value={txnGrowth} min={0} max={100}
              format={v => `+${v}%`} set={setTxnGrowth} color="#22d3ee" />
            <div className="mt-2 rounded-lg px-2 py-1.5 text-xs text-emerald-300 border border-emerald-900" style={{background:"#021208"}}>
              💡 עלות ZUZ וסבסוד = על BoomBuy בלבד. ל-PayBox אין עלות ישירה.
            </div>
          </Card>

          {/* GENERAL COMMERCE */}
          <Card icon="🛍️" title="סחר כללי — BoomBuy" color="#fb923c"
            question="כמה GMV אתם מצפים לנתב דרך The Box מסך הפעילות שלכם? (ריאלי — ₪ בחודש)">
            <Slider label="GMV שנתי דרך The Box" value={generalGmv} min={10} max={2000} step={10}
              format={v => `${v}M ₪`} set={setGeneralGmv} color="#fb923c" />
            <Slider label="% רווח לפייבוקס" value={generalComm} min={0.5} max={3} step={0.1}
              format={v => `${v}%`} set={setGeneralComm} color="#fb923c" />
            <div className="text-xs text-center mt-1 font-bold" style={{color:"#fb923c"}}>
              +{R.generalRev}M ₪/שנה
            </div>
          </Card>

          {/* LAYER 2 TOTAL */}
          <div className="rounded-lg p-2 text-center border border-yellow-800 mt-1"
            style={{ background: "#0a1205" }}>
            <div className="text-xs text-gray-400 mb-1">שכבה 2 — רווח נוסף שנתי</div>
            <div className="text-2xl font-black" style={{ color: GOLD }}>
              {R.layer2 > 0 ? "+" : ""}{R.layer2}M ₪
            </div>
            <div className="text-xs text-gray-500">
              מתנות {R.giftRev}M | ZUZ {R.txnCommerceRev}M | סחר {R.generalRev}M
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: תרומה שנתית + 5-YEAR STRIP */}
      <div className="border-t border-gray-700 px-4 py-2" style={{ background: "#060e1c" }}>

        {/* EQUATION ROW */}
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-lg font-black text-green-400">
              +{R.totalGain}M ₪
            </div>
            <div className="text-xs text-gray-500">ערך פיננסי חדש</div>
          </div>
          <div className="text-gray-500 text-lg font-bold">−</div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-black text-orange-400">
              {RETAINER}M ₪
            </div>
            <div className="text-xs text-gray-500">ריטנר שנתי</div>
          </div>
          <div className="text-gray-500 text-2xl font-bold">=</div>
          <div className="flex flex-col items-center px-3 py-1 rounded-xl border-2"
            style={{ borderColor: netColor, background: netColor + "15" }}>
            <div className="text-2xl font-black" style={{ color: netColor }}>
              {R.netResult > 0 ? "+" : ""}{R.netResult}M ₪
            </div>
            <div className="text-xs" style={{ color: netColor }}>
              {netSign
                ? "✅ תרומה נטו לשותפות"
                : `עד כיסוי ריטנר: ${R.monthsToZero === 999 ? "∞" : R.monthsToZero + " חודשים"}`}
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mb-2">
          * הפסד היסטורי של PayBox אינו חלק מהחשבון — השותפות נבחנת לפי הערך החדש שהיא מייצרת בלבד
        </div>

        {/* 5-YEAR PROJECTION */}
        <div className="border-t border-gray-800 pt-2">
          <div className="text-center text-xs text-gray-500 mb-1">📈 תחזית 5 שנים — תרומה נטו לשותפות (10% גידול שנתי)</div>
          <div className="flex justify-between gap-1">
            {R.yr5Net.map((net, i) => {
              const gross = R.yr5[i];
              const isPos = net > 0;
              return (
                <div key={i} className="flex-1 text-center rounded-lg py-1 border"
                  style={{ borderColor: isPos ? "#4ade8044" : "#f8717144", background: isPos ? "#052005" : "#200505" }}>
                  <div className="text-xs text-gray-500">שנה {i + 1}</div>
                  <div className="text-sm font-black" style={{ color: isPos ? "#4ade80" : "#f87171" }}>
                    {net > 0 ? "+" : ""}{net}M
                  </div>
                  <div className="text-xs text-gray-600">{gross}M רווח</div>
                </div>
              );
            })}
          </div>
          <div className="text-center text-xs text-green-400 mt-1">
            💰 תרומה מצטברת 5 שנים: +{R.cumulative5}M ₪ ערך חדש לפייבוקס
          </div>
        </div>
      </div>
    </div>
  );
}

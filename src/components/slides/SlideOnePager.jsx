import React from "react";

const NAVY = "#0B1930";
const GOLD = "#D4AF37";
const BLUE = "#4F7FE0";

export default function SlideOnePager() {
  return (
    <div dir="rtl" className="min-h-screen w-full flex flex-col items-center justify-center px-8 py-10"
      style={{ background: NAVY, fontFamily: "'Heebo', sans-serif" }}>

      {/* TOP LABEL */}
      <div className="text-xs font-black tracking-[0.25em] mb-4" style={{ color: GOLD }}>
        BoomBuy × PayBox — סיכום בשקף אחד
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl md:text-5xl font-black text-white text-center leading-tight mb-2">
        ארנק ההעברות הגדול בישראל<br />
        <span style={{ color: GOLD }}>הופך למועדון הצרכנות הגדול בישראל.</span>
      </h1>
      <p className="text-white/40 text-sm text-center mb-10">בלי לשנות שום דבר מהיסוד. הטכנולוגיה, הסחר והסיכון — עלינו.</p>

      {/* THREE COLUMNS */}
      <div className="w-full max-w-5xl grid grid-cols-3 gap-4 mb-8">

        {/* COL 1: הבעיה */}
        <div className="rounded-2xl p-5 border border-red-900/50 text-right" style={{ background: "#140a0a" }}>
          <div className="text-xs font-black tracking-widest text-red-400 mb-3">הבעיה היום</div>
          <div className="space-y-2 text-sm text-white/70">
            <div>💸 100% מהכסף בורח לבנקים אחרים</div>
            <div>😴 אין סיבה להשאיר כסף בפייבוקס</div>
            <div>📉 עלויות תפעול גבוהות, GMV לא גדל</div>
            <div>🚫 אין מועדון | אין נאמנות | אין סחר</div>
          </div>
        </div>

        {/* COL 2: הפתרון */}
        <div className="rounded-2xl p-5 border text-right" style={{ borderColor: GOLD + "55", background: "#0e1205" }}>
          <div className="text-xs font-black tracking-widest mb-3" style={{ color: GOLD }}>The Box | הפתרון</div>
          <div className="space-y-2 text-sm text-white/70">
            <div>🛒 מועדון הטבות חי בתוך פייבוקס</div>
            <div>⚡ ZUZ | נקודות שגורמות לכסף להישאר</div>
            <div>🎁 קבוצות מתנה ממירות לסחר אמיתי</div>
            <div>💳 Interchange + Float גדלים אוטומטית</div>
          </div>
          <div className="mt-4 pt-3 border-t text-center text-xs font-black" style={{ borderColor: GOLD + "33", color: GOLD }}>
            Layer 1 + Layer 2 | ריטנר = מועדון שמממן את עצמו
          </div>
        </div>

        {/* COL 3: המודל */}
        <div className="rounded-2xl p-5 border border-blue-900/50 text-right" style={{ background: "#080e1a" }}>
          <div className="text-xs font-black tracking-widest text-blue-400 mb-3">המודל העסקי</div>
          <div className="space-y-2 text-sm text-white/70">
            <div>💰 ריטנר 350K ₪/חודש | יורד עם הצמיחה</div>
            <div>📈 GMV 210M ₪ → ריטנר ÷2</div>
            <div>🎯 GMV 420M ₪ → ריטנר = 0</div>
            <div>🤝 PayBox: 0–3% מה-GMV של The Box</div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP: Numbers */}
      <div className="w-full max-w-5xl grid grid-cols-4 gap-3 mb-8">
        {[
          { num: "400K+", label: "משתמשי PayBox", sub: "CC + Young", color: BLUE },
          { num: "4.2M ₪", label: "ריטנר שנתי", sub: "השקעה — לא הוצאה", color: GOLD },
          { num: "90 יום", label: "פיילוט ראשון", sub: "KPIs מוסכמים", color: "#34D399" },
          { num: "0 ₪", label: "עלות ZUZ לפייבוקס", sub: "הכל על BoomBuy", color: "#22d3ee" },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-4 text-center border border-gray-800" style={{ background: "#0a0f1a" }}>
            <div className="text-2xl font-black" style={{ color: item.color }}>{item.num}</div>
            <div className="text-xs font-bold text-white mt-1">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl px-10 py-5 text-center" style={{ background: "linear-gradient(135deg,#1a1000,#0a1628)", border: `1.5px solid ${GOLD}` }}>
        <div className="text-white font-black text-xl mb-1">
          מוכנים לפיילוט 90 יום?
        </div>
        <div className="text-white/50 text-sm">
          API חיבור | שבועות בלבד | ללא סיכון תפעולי לפייבוקס
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-8 text-gray-600 text-xs">
        <span className="font-bold tracking-widest">BOOMBUY × PAYBOX</span>
        <span>·</span>
        <span>2025</span>
        <span>·</span>
        <span style={{ color: GOLD }}>The Box</span>
      </div>
    </div>
  );
}

import React from "react";

const NAVY = "#0B1930";
const GOLD = "#D4AF37";

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
          <div className="text-sm text-white/80 leading-relaxed font-bold mb-3">
            שותפות אמיתית בין החברות המגדילה משמעותית את ערוצי ההכנסה הקיימים ומייצרת ערוצי הכנסה חדשים
          </div>
          <div className="text-xs leading-relaxed pt-3 border-t border-blue-900/40" style={{ color: GOLD }}>
            <span className="font-black">מודל 4 —</span> BoomBuy מגדלה יותר סיכון, אך שותפה לגידול אך ורק מהערך שנוצר ל-PayBox
          </div>
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
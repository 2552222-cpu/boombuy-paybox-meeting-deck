import React from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

const SCRIPT = `"אז איך המודל עובד בפועל?

אתם משלמים לנו ריטיינר של 300 אלף שקל בחודש — זה 1 שקל בדיוק על כל כרטיס אשראי פעיל שיש לכם.

מה זה כולל? הכל. טכנולוגיה. ניהול שני מועדונים. צוות סחר. שירות לקוחות. ובעיקר — הסבסוד. את הסבסוד שאין לכם תקציב לשלם — אנחנו סופגים אותו.

עכשיו לחלק הכי חשוב: כל הכנסה שהמערכת שלנו מייצרת — מהסחר במתנות, מכרטיסי אילת, מהגדלת הסליקה — מתחלקת בינינו ומתקזזת מהריטיינר.

המטרה שלנו שבחודש 6 — הריטיינר כבר מתאפס. ובחודש 12 — אתם בפלוס."`;

export default function Slide4() {
  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-12 overflow-visible"
      style={{ background: "#0B1930" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#60A5FA] tracking-[0.15em]">
          המודל העסקי
        </span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
          שותפות מבוססת הצלחה.
          <br />
          <span className="text-[#60A5FA]">אפס סיכון לפייבוקס.</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6 mt-8">
        {/* Retainer box */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/8 p-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-right">
              <p className="text-[#D4AF37] font-bold text-sm tracking-widest">ריטיינר חודשי</p>
              <p className="text-white font-black text-4xl md:text-5xl mt-1">₪300,000</p>
              <p className="text-gray-400 text-sm mt-1">
                = 1 ₪ × 300,000 כרטיסי אשראי פעילים
              </p>
            </div>
            <div className="text-right md:text-left text-white/70 text-sm space-y-2 max-w-xs">
              {[
                "✅ הקמה ורישוי טכנולוגיה (NEXUS OS)",
                "✅ ניהול מלא של 2 מועדונים (PayBox + Young)",
                "✅ צוותי סחר, שירות ותפעול",
                "✅ סבסוד ההטבות — על חשבוננו",
              ].map((item, i) => (
                <p key={i} className="text-sm leading-snug">{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Offset mechanism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🛍️",
              title: "סחר במתנות ואירועים",
              desc: "30% מכספי הקבוצות יעברו ל-The Box. רווח ממכירות מתחלק 50/50.",
              est: "~ 150K ₪/חודש",
              color: "#34D399",
            },
            {
              icon: "💳",
              title: "גידול בסליקת האשראי",
              desc: "מ-10% ל-25% First in Wallet = +57M ₪ סליקה נוספת. עמלה צולבת מגיעה לכם.",
              est: "~ 120K ₪/חודש",
              color: "#60A5FA",
            },
            {
              icon: "🏖️",
              title: "Box Eilat + מנועי הכנסה",
              desc: "כרטיס אילת ב-199 ₪ במקום 450 ₪. לפייבוקס 30 ₪ עמלה על כל מכירה.",
              est: "~ 30K+ ₪/חודש",
              color: "#FBBF24",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-right border"
              style={{
                background: `${item.color}0f`,
                borderColor: `${item.color}30`,
              }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-white font-black text-base mb-2">{item.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">{item.desc}</p>
              <div
                className="rounded-full px-3 py-1 inline-block text-xs font-black"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                {item.est}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="rounded-2xl bg-white/5 border border-white/10 px-8 py-5 text-center">
          <p className="text-white font-black text-xl">
            300K ריטיינר{" "}
            <span className="text-gray-400 font-normal">−</span>{" "}
            <span className="text-[#34D399]">300K+ הכנסות</span>{" "}
            ={" "}
            <span className="text-[#34D399]">עלות נטו: 0 ₪</span>
          </p>
          <p className="mt-2 text-gray-400 text-sm">
            החל מחודש 6 · ומחודש 12 פייבוקס עוברת לרווח נקי חדש
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>04</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

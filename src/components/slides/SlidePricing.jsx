import React from "react";
import { motion } from "framer-motion";
import { fadeUp, deckItem, deckContainer } from "@/components/slides/deckAnim";
import { Check, Star, Wallet } from "lucide-react";

const GOLD = "#C8A028";
const GOLD_DEEP = "#7A5C12";
const INK = "#1A1A1A";
const MUTE = "#6B7280";
const LINE = "#E6E8EC";
const GREEN = "#0F9D58";

const TIERS = [
  {
    id: 1,
    tag: "מודל בסיס",
    name: "אתר צרכנות קלאסי",
    sub: "מסחר בסגנון דולצ'ה-ויטה",
    accent: "#3B6E8F",
    discount: "מחירי הנחה",
    discountSub: "לא שוברי שוק — מבוססים על הקטלוג הקיים של בומביי",
    commission: "שוברים בהנחה",
    commissionSub: "עשרות שוברים בהנחה של 10%",
    impact: "יצירת ערך נוסף ללקוחות",
    impactSub: "פחות השפעה על המדדים העיקריים (סליקה, השארת כסף וכו')",
    cost: "75,000",
    budget: [
      "סבסוד מינימלי של הטבות",
      "הקמה והטמעה של The Box בסביבת PayBox",
      "שירות לקוחות",
    ],
    recommended: false,
  },
  {
    id: 2,
    tag: "מומלץ · מודל שותפות",
    name: "מועדון הטבות — שותפות בומביי × פייבוקס",
    sub: "המסלול המועדף להשפעה מהירה על המדדים",
    accent: GOLD_DEEP,
    discount: "עד 50% הנחה",
    discountSub: "על כל המוצרים ביחס למחיר השוק",
    commission: "3.5% עמלת סחר",
    commissionSub: "מהמחזור* + שותפויות נקודתיות בפיננסים, תיירות ומתנות לחגים",
    impact: "השפעה מהירה על המדדים העיקריים",
    impactSub: "טכנולוגיית פריקת נקודות על-פי חוקים הנקבעים מראש",
    costLabel: "השתתפות חודשית של PayBox בתקציב ההקמה וההפעלה",
    cost: "350,000",
    budget: [
      "סבסוד הטבות מזון ובילויים",
      "הקמה והטמעה של The Box בתוך PayBox",
      "הקמת מערך סחר ייעודי",
      "הטבות פרימיום כגון עיסויים מסובסדים, פיננסי ועוד",
      "פיתוח מוצרים נוספים",
      "טכנולוגיית פריקת וניהול נקודות",
      "תכנון קמפיינים והנעת לקוחות",
      "מנהל לקוח ייעודי לפרויקט",
      "שירות לקוחות",
    ],
    recommended: true,
  },
  {
    id: 3,
    tag: "בומביי משקיעה יותר",
    name: "מועדון הטבות — בומביי לוקחת יותר סיכון",
    sub: "זהה למסלול המועדף — ההבדל בעמלת הסחר בלבד",
    accent: "#5A4FBF",
    discount: "עד 50% הנחה",
    discountSub: "על כל המוצרים ביחס למחיר השוק",
    commission: "1.5% עמלת סחר",
    commissionSub: "מהמחזור* + שותפויות נקודתיות בפיננסים, תיירות ומתנות לחגים",
    impact: "השפעה מהירה על המדדים העיקריים",
    impactSub: "טכנולוגיית פריקת נקודות על-פי חוקים הנקבעים מראש",
    costLabel: "השתתפות חודשית של PayBox בתקציב ההקמה וההפעלה",
    cost: "250,000",
    budget: [
      "אותן עלויות כמו מודל 2",
      "בומביי נוטלת על עצמה יותר סיכון",
    ],
    recommended: false,
  },
];

function BulletRow({ accent, label, sub, iconColor = GREEN }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 mt-[3px] shrink-0" style={{ color: iconColor }} />
      <div className="flex-1 text-right">
        <div className="text-[13px] font-bold leading-tight" style={{ color: INK }}>{label}</div>
        {sub && <div className="text-[11px] mt-0.5 leading-snug" style={{ color: MUTE }}>{sub}</div>}
      </div>
    </li>
  );
}

function Tier({ t }) {
  const isRec = t.recommended;
  return (
    <div
      dir="rtl"
      className="relative flex flex-col rounded-3xl p-5 h-full"
      style={{
        background: isRec ? "#FFFBEE" : "#FFFFFF",
        border: isRec ? "2px solid " + GOLD : "1px solid " + LINE,
        boxShadow: isRec
          ? "0 18px 44px -18px rgba(200,160,40,0.40)"
          : "0 10px 26px -16px rgba(0,0,0,0.10)",
      }}
    >
      {isRec && (
        <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full px-3 py-1"
          style={{ background: GOLD, color: "#fff" }}>
          <Star className="w-3 h-3 fill-current" />
          <span className="text-[10px] font-black">המועדפת</span>
        </div>
      )}

      {/* Header */}
      <div className="text-right">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: t.accent }}>
          {t.tag}
        </div>
        <h3 className="text-base font-black leading-tight" style={{ color: INK }}>{t.name}</h3>
        <p className="text-[11px] mt-0.5" style={{ color: MUTE }}>{t.sub}</p>
      </div>

      <div className="my-4 h-px" style={{ background: LINE }} />

      {/* Feature rows — every row gets a checkmark */}
      <ul className="space-y-3 mb-4">
        <BulletRow accent={t.accent} label={t.discount} sub={t.discountSub} iconColor={t.accent} />
        <BulletRow accent={t.accent} label={t.commission} sub={t.commissionSub} iconColor={t.accent} />
        <BulletRow accent={t.accent} label={t.impact} sub={t.impactSub} iconColor={t.accent} />
      </ul>

      <div className="my-1 h-px" style={{ background: LINE }} />

      {/* Cost — right aligned */}
      <div className="text-right mt-3">
        {t.costLabel && (
          <div className="text-[12px] font-medium mb-1.5 leading-snug" style={{ color: MUTE }}>{t.costLabel}</div>
        )}
        <div className="text-3xl font-black leading-tight" style={{ color: INK }}>{t.cost} ₪</div>
      </div>

      {/* Budget breakdown — prominent */}
      <div className="mt-4 rounded-2xl p-3.5"
        style={{
          background: isRec ? "rgba(200,160,40,0.10)" : "#FAFAFB",
          border: "1px solid " + (isRec ? "rgba(200,160,40,0.30)" : LINE),
        }}>
        <div className="flex items-center gap-1.5 justify-end pb-2 mb-2"
          style={{ borderBottom: "1px solid " + (isRec ? "rgba(200,160,40,0.25)" : LINE) }}>
          <span className="text-[11px] font-black" style={{ color: isRec ? GOLD_DEEP : INK }}>
            למה מיועד התקציב
          </span>
          <Wallet className="w-3.5 h-3.5 shrink-0" style={{ color: isRec ? GOLD_DEEP : MUTE }} />
        </div>
        <ul className="space-y-1.5">
          {t.budget.map((b, i) => (
            <BulletRow key={i} accent={t.accent} label={b} iconColor={t.accent} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SlidePricing() {
  return (
    <div dir="rtl" className="relative min-h-screen w-full flex flex-col px-6 md:px-16 py-10 overflow-hidden"
      style={{ background: "#FAFBFC" }}>
      {/* Header */}
      <motion.div {...fadeUp(0)} className="relative flex flex-col items-center text-center mb-7 shrink-0">
        <span className="text-[11px] font-black tracking-[0.28em] uppercase mb-3" style={{ color: GOLD_DEEP }}>
          3 הצעות · הצעת מחיר
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-[-0.02em]" style={{ color: INK }}>
          שלוש דרכים להטמיע את <span style={{ color: GOLD_DEEP }}>The Box</span>
        </h2>
        <p className="text-sm mt-3 max-w-xl" style={{ color: MUTE }}>
          בחרו את עומק השותפות — המסלול האמצעי ממוקד להניע את המדדים העיקריים במהירות המרבית.
        </p>
      </motion.div>

      {/* Tiers grid */}
      <motion.div
        variants={deckContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 items-stretch"
      >
        {TIERS.map((t) => (
          <motion.div key={t.id} variants={deckItem} className="flex">
            <div className="flex w-full">
              <Tier t={t} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Asterisk note */}
      <motion.div {...fadeUp(0.3)} className="relative mt-5 text-center shrink-0">
        <p className="text-[11px] leading-relaxed" style={{ color: MUTE }}>
          <span className="font-black" style={{ color: GOLD_DEEP }}>*</span> עמלת הסחר אינה כוללת מוצרי מזון, סופרים והטבות מסובסדות.
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div {...fadeUp(0.4)} className="relative flex items-center justify-between text-[11px] mt-4 shrink-0" style={{ color: "#B3B7BF" }}>
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>הצעת מחיר</span>
      </motion.div>
    </div>
  );
}
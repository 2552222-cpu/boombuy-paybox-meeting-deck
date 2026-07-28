import React from "react";
import { motion } from "framer-motion";
import { fadeUp, deckItem, deckContainer } from "@/components/slides/deckAnim";
import { Check, Star, Sparkles, Wallet } from "lucide-react";

const GOLD = "#C8A028";
const GOLD_DEEP = "#8B6914";
const GREEN = "#0F9D58";
const PURPLE = "#6C4EDD";
const BLUE = "#2B7FB9";
const INK = "#16181D";
const MUTE = "#6B7280";

const TIERS = [
  {
    id: 1,
    tag: "מודל בסיס",
    name: "אתר צרכנות קלאסי",
    sub: "מסחר בסגנון דולצה-ויטה",
    accent: BLUE,
    discount: "מחירי הנחה",
    discountNote: "לא שוברי שוק — מבוססים על הקטלוג הקיים של בומביי",
    commission: "5%",
    commissionLabel: "עמלת סחר מהמחזור",
    impact: "יצירת ערך נוסף ללקוחות",
    impactSub: "פחות השפעה על המדדים העיקריים (סליקה, השארת כסף וכו')",
    cost: "75,000",
    budget: [
      "שירות לקוחות",
      "סבסוד מינימלי של הטבות",
      "הקמה והטמעה של The Box בתוך סביבת PayBox",
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
    discountNote: "על כל המוצרים ביחס למחיר השוק",
    commission: "3.5%",
    commissionLabel: "עמלת סחר מהמחזור* + שותפויות נקודתיות בפיננסים, תיירות ומתנות לחגים",
    impact: "השפעה מהירה על המדדים העיקריים",
    impactSub: "טכנולוגיית פריקת נקודות על-פי חוקים הנקבעים מראש",
    cost: "350,000",
    budget: [
      "שירות לקוחות",
      "סבסוד הטבות מזון ובילויים",
      "הקמה והטמעה של The Box בתוך PayBox",
      "הקמת מערך סחר ייעודי",
      "פיתוח מוצרים נוספים",
      "טכנולוגיית פריקת וניהול נקודות",
      "תכנון קמפיינים והנעת לקוחות",
      "מנהל לקוח ייעודי לפרויקט",
    ],
    recommended: true,
  },
  {
    id: 3,
    tag: "בומביי משקיעה יותר",
    name: "מועדון הטבות — בומביי לוקחת יותר סיכון",
    sub: "זהה למסלול המועדף — ההבדל בעמלת הסחר בלבד",
    accent: PURPLE,
    discount: "עד 50% הנחה",
    discountNote: "על כל המוצרים ביחס למחיר השוק",
    commission: "1.5%",
    commissionLabel: "עמלת סחר מהמחזור* + שותפויות נקודתיות בפיננסים, תיירות ומתנות לחגים",
    impact: "השפעה מהירה על המדדים העיקריים",
    impactSub: "טכנולוגיית פריקת נקודות על-פי חוקים הנקבעים מראש",
    cost: "200,000",
    budget: [
      "אותן עלויות כמו מודל 2",
      "בומביי נוטלת על עצמה יותר סיכון",
    ],
    recommended: false,
  },
];

function Tier({ t }) {
  const isRec = t.recommended;
  return (
    <div
      className="relative flex flex-col rounded-3xl p-5 text-right h-full"
      dir="rtl"
      style={{
        background: isRec ? "#FFFCF0" : "#FFFFFF",
        border: isRec ? "2px solid " + GOLD : "1px solid #E6E8EC",
        boxShadow: isRec
          ? "0 22px 50px -18px rgba(200,160,40,0.45)"
          : "0 12px 30px -18px rgba(0,0,0,0.12)",
      }}
    >
      {isRec && (
        <div className="absolute -top-3.5 right-6 flex items-center gap-1 rounded-full px-3.5 py-1.5"
          style={{ background: GOLD, color: "#fff" }}>
          <Star className="w-3 h-3 fill-current" />
          <span className="text-[11px] font-black tracking-tight">המועדפת</span>
        </div>
      )}

      {/* Tag */}
      <div className="flex items-center gap-1.5 justify-end">
        {isRec && <Sparkles className="w-3.5 h-3.5" style={{ color: GOLD_DEEP }} />}
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: t.accent }}>
          {t.tag}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-black leading-tight mt-1.5 mb-0.5" style={{ color: INK }}>
        {t.name}
      </h3>
      <p className="text-[11px] leading-snug mb-4" style={{ color: MUTE }}>{t.sub}</p>

      {/* Discount */}
      <div className="mb-3">
        <div className="text-3xl font-black" style={{ color: t.accent }}>{t.discount}</div>
        <div className="text-[11px] mt-0.5" style={{ color: MUTE }}>{t.discountNote}</div>
      </div>

      {/* Commission */}
      <div className="rounded-2xl px-3.5 py-3 mb-3" style={{ background: "#F5F6F8" }}>
        <div className="flex items-baseline gap-1.5 justify-end mb-0.5">
          <span className="text-[12px] font-medium" style={{ color: MUTE }}>עמלת סחר</span>
          <span className="text-3xl font-black" style={{ color: t.accent }}>{t.commission}</span>
        </div>
        <div className="text-[10px] leading-snug" style={{ color: MUTE }}>{t.commissionLabel}</div>
      </div>

      {/* Impact */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 justify-end mb-1">
          <span className="text-[12px] font-bold" style={{ color: INK }}>{t.impact}</span>
          <Check className="w-4 h-4" style={{ color: GREEN }} />
        </div>
        <div className="text-[11px] leading-snug" style={{ color: MUTE }}>{t.impactSub}</div>
      </div>

      {/* Cost */}
      <div className="rounded-2xl pt-3 border-t" style={{ borderColor: "#E6E8EC" }}>
        <div className="flex items-baseline gap-1.5 justify-end">
          <span className="text-[12px]" style={{ color: MUTE }}>ש\"ח / חודש</span>
          <span className="text-4xl font-black" style={{ color: GREEN }}>₪{t.cost}</span>
        </div>
      </div>

      {/* Budget breakdown — prominent */}
      <div className="mt-4 rounded-2xl p-3.5"
        style={{ background: isRec ? "rgba(200,160,40,0.10)" : "#FAFAFB", border: "1px dashed " + (isRec ? GOLD : "#D5D8DD") }}>
        <div className="flex items-center gap-1.5 justify-end mb-2.5 pb-2"
          style={{ borderBottom: "1px solid " + (isRec ? "rgba(200,160,40,0.25)" : "#E6E8EC") }}>
          <span className="text-[11px] font-black" style={{ color: isRec ? GOLD_DEEP : INK }}>
            למה מיועד התקציב
          </span>
          <Wallet className="w-4 h-4" style={{ color: isRec ? GOLD_DEEP : MUTE }} />
        </div>
        <ul className="space-y-1.5 text-right">
          {t.budget.map((b, i) => (
            <li key={i} className="flex items-start gap-1.5 justify-end text-right">
              <span className="text-[11px] leading-snug" style={{ color: INK }}>{b}</span>
              <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: t.accent }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SlidePricing() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-6 md:px-16 py-10 overflow-hidden"
      dir="rtl" style={{ background: "#FAFBFC" }}>
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
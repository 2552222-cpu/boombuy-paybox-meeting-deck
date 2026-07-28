import React from "react";
import { motion } from "framer-motion";
import { fadeUp, deckItem, deckContainer } from "@/components/slides/deckAnim";
import { Check, Star, Sparkles } from "lucide-react";

const PB_BLUE = "#5BA4CF";
const GOLD = "#D4AF37";
const GREEN = "#4ADE80";
const PURPLE = "#A78BFA";

// 3 pricing tiers. Option 2 is the recommended partnership model.
const TIERS = [
  {
    id: 1,
    tag: "מודל בסיס",
    name: "אתר צרכנות קלאסי",
    sub: "מודל מסחר בסגנון דולצה-ויטה",
    accent: PB_BLUE,
    discount: "מחירי הנחה",
    discountNote: "לא שוברי שוק — מבוססים על הקטלוג הקיים של בומביי",
    commission: "5%",
    commissionLabel: "עמלת סחר מהמחזור",
    impact: "מתאים בעיקר ליצירת ערך נוסף ללקוחות",
    impactSub: "פחות השפעה על המדדים העיקריים (סליקה, השארת כסף וכו')",
    cost: "75,000",
    costSuffix: "ש\"ח / חודש",
    costNote: "מיועד ל: שירות לקוחות · סבסוד מינימלי של הטבות · הקמה והטמעה של The Box בתוך סביבת PayBox",
    recommended: false,
  },
  {
    id: 2,
    tag: "מומלץ · מודל שותפות",
    name: "מועדון הטבות — שותפות בומביי × פייבוקס",
    sub: "המסלול המועדף להשפעה מהירה על המדדים",
    accent: GOLD,
    discount: "עד 50% הנחה",
    discountNote: "על כל המוצרים ביחס למחיר השוק",
    commission: "3.5%",
    commissionLabel: "עמלת סחר מהמחזור* + שותפויות נקודתיות בפיננסים, תיירות ומתנות לחגים",
    impact: "השפעה מהירה על המדדים העיקריים",
    impactSub: "טכנולוגיית פריקת נקודות על-פי חוקים הנקבעים מראש",
    cost: "350,000",
    costSuffix: "ש\"ח / חודש",
    costNote: "מיועד ל: שירות לקוחות · סבסוד מזון ובילויים · הקמה והטמעה של The Box · מערך סחר ייעודי · פיתוח מוצרים נוספים · טכנולוגיית ניהול נקודות · תכנון קמפיינים · מנהל לקוח ייעודי",
    recommended: true,
  },
  {
    id: 3,
    tag: "מודל שותפות · בומביי משקיעה יותר",
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
    costSuffix: "ש\"ח / חודש",
    costNote: "מיועד ל: אותן עלויות כמו מודל 2 — בומביי נוטלת על עצמה יותר סיכון",
    recommended: false,
  },
];

function Tier({ t }) {
  return (
    <div
      className="relative flex flex-col rounded-3xl p-5 text-right transition-all"
      style={{
        background: t.recommended ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.025)",
        border: t.recommended
          ? "1.5px solid " + GOLD
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: t.recommended ? "0 18px 48px -16px rgba(212,175,55,0.45)" : "none",
      }}
    >
      {t.recommended && (
        <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full px-3 py-1"
          style={{ background: GOLD, color: "#1a1a1a" }}>
          <Star className="w-3 h-3 fill-current" />
          <span className="text-[10px] font-black tracking-tight">המועדפת</span>
        </div>
      )}

      {/* Tag */}
      <div className="flex items-center gap-1.5 justify-end mb-2">
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: t.accent }}>
          {t.tag}
        </span>
        {t.recommended && <Sparkles className="w-3 h-3" style={{ color: GOLD }} />}
      </div>

      {/* Name */}
      <h3 className="text-lg font-black text-white leading-tight mb-1">{t.name}</h3>
      <p className="text-[11px] text-white/45 leading-snug mb-4">{t.sub}</p>

      {/* Discount */}
      <div className="mb-3">
        <div className="text-2xl font-black" style={{ color: t.accent }}>{t.discount}</div>
        <div className="text-[11px] text-white/45 mt-0.5">{t.discountNote}</div>
      </div>

      {/* Commission */}
      <div className="rounded-xl px-3 py-2.5 mb-3"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex items-baseline gap-1.5 justify-end mb-0.5">
          <span className="text-sm text-white/50">עמלת סחר</span>
          <span className="text-2xl font-black" style={{ color: t.accent }}>{t.commission}</span>
        </div>
        <div className="text-[10px] text-white/40 leading-snug">{t.commissionLabel}</div>
      </div>

      {/* Impact */}
      <div className="mb-4 flex-1">
        <div className="flex items-center gap-1.5 justify-end mb-1">
          <Check className="w-3.5 h-3.5" style={{ color: GREEN }} />
          <span className="text-[12px] font-bold text-white">{t.impact}</span>
        </div>
        <div className="text-[11px] text-white/45 leading-snug">{t.impactSub}</div>
      </div>

      {/* Cost */}
      <div className="rounded-2xl pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-baseline gap-1.5 justify-end">
          <span className="text-sm text-white/50">{t.costSuffix}</span>
          <span className="text-3xl font-black" style={{ color: GREEN }}>₪{t.cost}</span>
        </div>
        <div className="text-[10px] text-white/35 leading-snug mt-2">{t.costNote}</div>
      </div>
    </div>
  );
}

export default function SlidePricing() {
  return (
    <div className="relative min-h-screen w-full flex flex-col px-8 md:px-20 py-10 overflow-hidden bg-black">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(212,175,55,0.08), transparent 70%)" }} />

      {/* Header */}
      <motion.div {...fadeUp(0)} className="relative flex flex-col items-center text-center mb-8 shrink-0">
        <span className="text-[11px] font-black tracking-[0.28em] uppercase mb-3" style={{ color: GOLD }}>
          3 הצעות · הצעת מחיר
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-[-0.02em]">
          שלוש דרכים להטמיע את <span style={{ color: GOLD }}>The Box</span>
        </h2>
        <p className="text-sm text-white/50 mt-3 max-w-xl">
          בחרו את עומק השותפות — המסלול האמצעי ממוקד כדי להניע את המדדים העיקריים במהירות המרבית.
        </p>
      </motion.div>

      {/* Tiers grid */}
      <motion.div
        variants={deckContainer(0.12)}
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
        <p className="text-[11px] text-white/40 leading-relaxed">
          <span className="text-white/70 font-bold">*</span> עמלת הסחר אינה כוללת מוצרי מזון, סופרים והטבות מסובסדות.
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div {...fadeUp(0.4)} className="relative flex items-center justify-between text-white/20 text-[11px] mt-4 shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>הצעת מחיר</span>
      </motion.div>
    </div>
  );
}
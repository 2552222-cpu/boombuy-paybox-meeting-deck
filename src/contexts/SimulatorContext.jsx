import React, { createContext, useContext, useState, useMemo } from "react";

export const RETAINER = 4.2; // M ₪/year (350K/month)

const SimulatorContext = createContext(null);

export function SimulatorProvider({ children }) {
  // ═══ LAYER 1: PayBox מזינה — הם יודעים את המספרים האלה ═══
  const [intRevNow,      setIntRevNow]      = useState(0);   // M ₪/שנה — רווח נוכחי מהכרטיס
  const [intGrowthPct,   setIntGrowthPct]   = useState(0);   // % גידול מ-FIW
  const [floatRevNow,    setFloatRevNow]    = useState(0);   // M ₪/שנה — רווח נוכחי מהיתרות
  const [floatGrowthPct, setFloatGrowthPct] = useState(0);   // % גידול מ-ZUZ (זמן שהייה)

  // ═══ LAYER 2: The Box — שניהם מסכימים ═══
  const [giftVol,        setGiftVol]        = useState(0);   // M ₪/חודש — מחזור קבוצות מתנה
  const [giftToBoxPct,   setGiftToBoxPct]   = useState(0);   // % שיופנה ל-The Box

  // ═══ מבנה העסקה — ייקבע בפיילוט ═══
  const [payboxCommercePct,  setPayboxCommercePct]  = useState(1.5); // % מהGMV לפייבוקס
  const [boombuyLayer1Pct,   setBoombuyLayer1Pct]   = useState(0);   // % מהערך הפיננסי החדש ל-BoomBuy

  function reset() {
    setIntRevNow(0);      setIntGrowthPct(0);
    setFloatRevNow(0);    setFloatGrowthPct(0);
    setGiftVol(0);        setGiftToBoxPct(0);
    setPayboxCommercePct(1.5);
    setBoombuyLayer1Pct(0);
  }

  const R = useMemo(() => {
    // ── Layer 1: ערך חדש מהפעילות הפיננסית הקיימת ──────────────────────────
    const intGain   = +(intRevNow   * (intGrowthPct   / 100)).toFixed(2); // M ₪
    const floatGain = +(floatRevNow * (floatGrowthPct / 100)).toFixed(2); // M ₪
    const layer1New = +(intGain + floatGain).toFixed(2);                   // M ₪

    // ── Layer 2: מסחר דרך The Box ────────────────────────────────────────────
    const giftGmv         = +(giftVol * 12 * (giftToBoxPct / 100)).toFixed(1); // M ₪/שנה
    const payboxCommerceRev = +(giftGmv * (payboxCommercePct / 100)).toFixed(2); // M ₪/שנה

    // ── חלוקת ערך ────────────────────────────────────────────────────────────
    // BoomBuy מקבלת % מהערך הפיננסי החדש (Layer 1) — מוסכם בעסקה
    const boombuyLayer1Share = +(layer1New * (boombuyLayer1Pct / 100)).toFixed(2);
    const payboxLayer1Share  = +(layer1New - boombuyLayer1Share).toFixed(2);

    // סה"כ ערך חדש ל-PayBox
    const payboxTotal = +(payboxLayer1Share + payboxCommerceRev).toFixed(2);

    // ── ריטנר אפקטיבי ────────────────────────────────────────────────────────
    // ריטנר יורד ככל שBoomBuy מרוויחה מהעסקה עצמה (לא רק מהריטנר)
    // כשהכנסות BoomBuy מהעסקה מגיעות ל-4.2M — הריטנר יורד לאפס
    const effectiveRetainer = +(Math.max(0, RETAINER - boombuyLayer1Share)).toFixed(2);

    // ── תוצאה נטו ל-PayBox ──────────────────────────────────────────────────
    const payboxNet = +(payboxTotal - effectiveRetainer).toFixed(2);

    return {
      intGain, floatGain, layer1New,
      giftGmv, payboxCommerceRev,
      boombuyLayer1Share, payboxLayer1Share,
      payboxTotal,
      effectiveRetainer,
      payboxNet,
    };
  }, [intRevNow, intGrowthPct, floatRevNow, floatGrowthPct,
      giftVol, giftToBoxPct, payboxCommercePct, boombuyLayer1Pct]);

  return (
    <SimulatorContext.Provider value={{
      intRevNow,      setIntRevNow,
      intGrowthPct,   setIntGrowthPct,
      floatRevNow,    setFloatRevNow,
      floatGrowthPct, setFloatGrowthPct,
      giftVol,        setGiftVol,
      giftToBoxPct,   setGiftToBoxPct,
      payboxCommercePct, setPayboxCommercePct,
      boombuyLayer1Pct,  setBoombuyLayer1Pct,
      reset, R,
    }}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  return useContext(SimulatorContext);
}

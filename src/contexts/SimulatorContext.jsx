import React, { createContext, useContext, useState, useMemo } from "react";

const SimulatorContext = createContext(null);

export function SimulatorProvider({ children }) {
  // ═══ Interchange — הכרטיס ═══
  const [interchangeCurrent,  setInterchangeCurrent]  = useState(0); // ₪/חודש — רווח נוכחי מהעמלות (מספר)
  const [interchangeGrowthPct, setInterchangeGrowthPct] = useState(0); // % צפי גידול (סליידר)

  // ═══ Float — יתרות לקוחות ═══
  const [floatBalance,   setFloatBalance]   = useState(0); // ₪ — יתרה חודשית ממוצעת (מספר)
  const [floatGrowthPct,  setFloatGrowthPct]  = useState(0); // % גידול צפוי — ZUZ (סליידר)
  const [floatAnnualRatePct, setFloatAnnualRatePct] = useState(2); // % שיעור ערך שנתי נטו של היתרות (ברירת מחדל 2% — הנחת המחשה)

  // ═══ מחזור מכירות מתנות והטבות שנתי ═══
  const [giftAnnualVolume,  setGiftAnnualVolume]  = useState(0); // ₪/שנה — מחזור שנתי (מספר)
  const [giftCommissionPct, setGiftCommissionPct] = useState(3); // % עמלה מהמחזור (סליידר)

  const [calculated, setCalculated] = useState(false);

  function reset() {
    setInterchangeCurrent(0);  setInterchangeGrowthPct(0);
    setFloatBalance(0);         setFloatGrowthPct(0);
    setFloatAnnualRatePct(2);
    setGiftAnnualVolume(0);    setGiftCommissionPct(3);
    setCalculated(false);
  }

  const R = useMemo(() => {
    // Interchange — רווח חודשי נוסף = אחוז × רווח נוכחי
    const intMonthlyGain = interchangeCurrent * (interchangeGrowthPct / 100);
    const intYearlyGain   = intMonthlyGain * 12;

    // Float — ערך שנתי חדש מהיתרות = יתרה × אחוז גידול × שיעור ערך שנתי (הנחת עבודה).
    // אין להכפיל שוב ב-12 — שיעור הערך כבר שנתי.
    const floatYearlyGain = floatBalance * (floatGrowthPct / 100) * (floatAnnualRatePct / 100);

    // מתנות — רווח שנתי = מחזור × אחוז עמלה
    const giftYearlyProfit = giftAnnualVolume * (giftCommissionPct / 100);

    const totalYearly = intYearlyGain + floatYearlyGain + giftYearlyProfit;

    return {
      intMonthlyGain, intYearlyGain,
      floatYearlyGain,
      giftYearlyProfit,
      totalYearly,
    };
  }, [interchangeCurrent, interchangeGrowthPct, floatBalance, floatGrowthPct, floatAnnualRatePct, giftAnnualVolume, giftCommissionPct]);

  return (
    <SimulatorContext.Provider value={{
      interchangeCurrent,  setInterchangeCurrent,
      interchangeGrowthPct, setInterchangeGrowthPct,
      floatBalance,   setFloatBalance,
      floatGrowthPct,  setFloatGrowthPct,
      floatAnnualRatePct, setFloatAnnualRatePct,
      giftAnnualVolume,  setGiftAnnualVolume,
      giftCommissionPct, setGiftCommissionPct,
      calculated, setCalculated,
      reset, R,
    }}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  return useContext(SimulatorContext);
}
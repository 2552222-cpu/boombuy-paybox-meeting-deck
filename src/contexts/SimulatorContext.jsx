import React, { createContext, useContext, useState, useMemo } from "react";

const SimulatorContext = createContext(null);

// ── Known / verified constants ────────────────────────────────────────────────
export const VOL_MONTHLY    = 560;   // M NIS/month credit volume (300K×1800 + 100K×200 ✓)
export const FLOAT_BASE_REV = 19;    // M NIS/year: 938M × 2% net spread
export const GIFT_BASE      = 400;   // M NIS in active gift groups (reported ✓)
export const RETAINER       = 4.2;   // M NIS/year
export const LOSS_TODAY     = 63.7;  // M NIS annual loss (Discount Bank 2024 ✓)
export const REV_TODAY      = 55;    // M NIS total revenue (estimate)

export function SimulatorProvider({ children }) {
  // Layer 1 — Organic
  const [iRate,       setIRate]       = useState(0.30); // % interchange rate (consultant est: 0.25-0.35)
  const [intGrowth,   setIntGrowth]   = useState(0);    // % growth in interchange volume
  const [floatGrowth, setFloatGrowth] = useState(0);    // % growth in float balance
  const [txnGrowth,   setTxnGrowth]   = useState(0);    // % growth in transactions (revenue TBD)

  // Layer 2 — Commerce
  const [giftConv,    setGiftConv]    = useState(0);    // % of 400M gift groups converted
  const [giftComm,    setGiftComm]    = useState(1.5);  // % commerce on gift GMV
  const [generalGmv,  setGeneralGmv]  = useState(50);   // M NIS general commerce GMV
  const [generalComm, setGeneralComm] = useState(1.5);  // % commerce on general GMV

  const R = useMemo(() => {
    // Interchange: dynamic base from rate × volume × 12
    const intBase   = +(VOL_MONTHLY * (iRate / 100) * 12).toFixed(1); // M NIS/year today
    const intGain   = +(intBase * (intGrowth / 100)).toFixed(1);
    const intTotal  = +(intBase + intGain).toFixed(1);

    // Float: base 19M, grows by floatGrowth%
    const floatGain  = +(FLOAT_BASE_REV * (floatGrowth / 100)).toFixed(1);
    const floatTotal = +(FLOAT_BASE_REV + floatGain).toFixed(1);

    // Transactions: volume only, revenue TBD
    const txnVolNew  = +(2 * (1 + txnGrowth / 100)).toFixed(2); // M/month
    const txnYearAdd = +((txnVolNew - 2) * 12).toFixed(1);       // M extra/year

    // Layer 1 (transactions NOT counted — revenue TBD)
    const layer1 = +(intGain + floatGain).toFixed(1);
    const floatBase = FLOAT_BASE_REV;

    // Gift groups
    const giftGmv = +(GIFT_BASE * (giftConv / 100)).toFixed(1);
    const giftRev = +(giftGmv * (giftComm / 100)).toFixed(1);

    // General commerce (all other The Box activity)
    const generalRev = +(generalGmv * (generalComm / 100)).toFixed(1);

    const totalGmv = +(giftGmv + generalGmv).toFixed(1);
    const layer2   = +(giftRev + generalRev).toFixed(1);

    // Summary
    const totalGain    = +(layer1 + layer2).toFixed(1);
    const coverPct     = Math.round(totalGain / RETAINER * 100);
    const netResult    = +(totalGain - LOSS_TODAY - RETAINER).toFixed(1);
    const monthsToZero = totalGain > 0
      ? Math.round(LOSS_TODAY / (totalGain / 12))
      : 999;

    return {
      intBase, intGain, intTotal,
      floatBase, floatGain, floatTotal,
      txnVolNew, txnYearAdd,
      layer1,
      giftGmv, giftRev,
      generalRev, totalGmv,
      layer2,
      totalGain, coverPct, netResult, monthsToZero,
    };
  }, [intGrowth, floatGrowth, txnGrowth, giftConv, giftComm, generalGmv, generalComm]);

  return (
    <SimulatorContext.Provider value={{
      iRate, setIRate,
      intGrowth, setIntGrowth,
      floatGrowth, setFloatGrowth,
      txnGrowth, setTxnGrowth,
      giftConv, setGiftConv,
      giftComm, setGiftComm,
      generalGmv, setGeneralGmv,
      generalComm, setGeneralComm,
      R,
    }}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext);
  if (!ctx) throw new Error("useSimulator must be used inside SimulatorProvider");
  return ctx;
}

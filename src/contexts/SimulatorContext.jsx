import React, { createContext, useContext, useState, useMemo } from "react";

const SimulatorContext = createContext(null);

// ── Verified constants ────────────────────────────────────────────────────────
export const VOL_MONTHLY    = 560;   // M NIS/month (300K×1800 + 100K×200 ✓)
export const FLOAT_BALANCE  = 938;   // M NIS balance (Discount Bank 2024 ✓)
export const FLOAT_BASE_REV = 19;    // M NIS/year: 938M × 2% net spread
export const GIFT_BASE      = 400;   // M NIS in active gift groups (reported ✓)
export const TXN_MONTHLY    = 2;     // M transactions/month (confirmed ✓)
export const RETAINER       = 4.2;   // M NIS/year
export const LOSS_TODAY     = 63.7;  // M NIS annual loss (Discount Bank 2024 ✓)
export const REV_TODAY      = 55;    // M NIS total revenue (estimate)

export function SimulatorProvider({ children }) {

  // ── Layer 1: Organic ──────────────────────────────────────────────────────
  const [iRate,       setIRate]       = useState(0.30); // % interchange (consultant est 0.25-0.35)
  const [intGrowth,   setIntGrowth]   = useState(0);    // % volume growth from FIW improvement
  const [floatGrowth, setFloatGrowth] = useState(0);    // % balance growth from ZUZ dwell time

  // ── Layer 2: Commerce ─────────────────────────────────────────────────────
  // Gift groups
  const [giftConv,    setGiftConv]    = useState(0);    // % of 400M converted
  const [giftComm,    setGiftComm]    = useState(1.5);  // % commerce on gift GMV

  // Transactions → ZUZ → The Box
  const [txnGrowth,   setTxnGrowth]   = useState(0);    // % more transactions
  const [avgTxnValue, setAvgTxnValue] = useState(200);  // NIS average per transaction
  const [zuzRate,     setZuzRate]     = useState(25);   // % of flow → ZUZ tokens issued
  const [txnConv,     setTxnConv]     = useState(3);    // % ZUZ → purchase at The Box
  const [txnComm,     setTxnComm]     = useState(1.5);  // % commerce on that GMV

  // General commerce
  const [generalGmv,  setGeneralGmv]  = useState(50);   // M NIS GMV
  const [generalComm, setGeneralComm] = useState(1.5);  // % commerce

  const R = useMemo(() => {

    // ── Interchange ──────────────────────────────────────────────────────────
    const intBase  = +(VOL_MONTHLY * (iRate / 100) * 12).toFixed(1);
    const intGain  = +(intBase * (intGrowth / 100)).toFixed(1);
    const intTotal = +(intBase + intGain).toFixed(1);

    // ── Float ─────────────────────────────────────────────────────────────────
    const floatGain  = +(FLOAT_BASE_REV * (floatGrowth / 100)).toFixed(1);
    const floatTotal = +(FLOAT_BASE_REV + floatGain).toFixed(1);

    // ── Layer 1 total ─────────────────────────────────────────────────────────
    const layer1 = +(intGain + floatGain).toFixed(1);

    // ── Transactions → ZUZ → Commerce ────────────────────────────────────────
    const txnVolNew      = +(TXN_MONTHLY * (1 + txnGrowth / 100)).toFixed(2);        // M/month
    const txnAnnualFlow  = Math.round(txnVolNew * avgTxnValue * 12);                  // M NIS/year
    const zuzIssued      = Math.round(txnAnnualFlow * (zuzRate / 100));               // M NIS ZUZ
    const txnGmv         = +(zuzIssued * (txnConv / 100)).toFixed(1);                 // M NIS GMV
    const txnCommerceRev = +(txnGmv * (txnComm / 100)).toFixed(2);                    // M NIS revenue

    // ── Gift groups ────────────────────────────────────────────────────────────
    const giftGmv = +(GIFT_BASE * (giftConv / 100)).toFixed(1);
    const giftRev = +(giftGmv * (giftComm / 100)).toFixed(2);

    // ── General commerce ──────────────────────────────────────────────────────
    const generalRev = +(generalGmv * (generalComm / 100)).toFixed(2);

    // ── Layer 2 total ─────────────────────────────────────────────────────────
    const totalGmv = +(giftGmv + txnGmv + generalGmv).toFixed(1);
    const layer2   = +(giftRev + txnCommerceRev + generalRev).toFixed(1);

    // ── Summary ───────────────────────────────────────────────────────────────
    const totalGain    = +(layer1 + layer2).toFixed(1);
    const coverPct     = Math.round(totalGain / RETAINER * 100);
    const netResult    = +(totalGain - LOSS_TODAY - RETAINER).toFixed(1);
    const monthsToZero = totalGain > 0
      ? Math.round(LOSS_TODAY / (totalGain / 12))
      : 999;

    // 5-year projection (10% annual growth)
    const yr5 = Array.from({ length: 5 }, (_, i) =>
      +(totalGain * Math.pow(1.10, i)).toFixed(1)
    );
    const cumulative5 = +(yr5.reduce((a, b) => a + b, 0)).toFixed(1);

    return {
      // Interchange
      intBase, intGain, intTotal,
      // Float
      floatGain, floatTotal,
      // Transactions chain
      txnVolNew, txnAnnualFlow, zuzIssued, txnGmv, txnCommerceRev,
      // Commerce
      giftGmv, giftRev, generalRev,
      totalGmv, layer2,
      // Totals
      layer1, totalGain, coverPct, netResult, monthsToZero,
      // 5yr
      yr5, cumulative5,
    };
  }, [iRate, intGrowth, floatGrowth,
      giftConv, giftComm,
      txnGrowth, avgTxnValue, zuzRate, txnConv, txnComm,
      generalGmv, generalComm]);

  return (
    <SimulatorContext.Provider value={{
      iRate, setIRate,
      intGrowth, setIntGrowth,
      floatGrowth, setFloatGrowth,
      giftConv, setGiftConv,
      giftComm, setGiftComm,
      txnGrowth, setTxnGrowth,
      avgTxnValue, setAvgTxnValue,
      zuzRate, setZuzRate,
      txnConv, setTxnConv,
      txnComm, setTxnComm,
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

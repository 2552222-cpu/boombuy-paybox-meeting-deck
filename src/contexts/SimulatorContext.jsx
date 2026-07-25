import React, { createContext, useContext, useState, useMemo } from "react";

const SimulatorContext = createContext(null);

export const RETAINER   = 4.2;    // M NIS/year — confirmed
export const FLOAT_BASE = 938;    // M NIS balance — Discount Bank 2024 ✓
export const GIFT_BASE  = 400;    // M NIS in active gift groups — reported
export const LOSS_TODAY = 63.7;   // M NIS annual loss — Discount Bank 2024 ✓
export const REV_TODAY  = 55;     // M NIS total revenue — estimate

export function SimulatorProvider({ children }) {
  // Layer 1 — Organic Revenue
  const [fiwNow,      setFiwNow]      = useState(10);   // % confirmed
  const [fiwTarget,   setFiwTarget]   = useState(22);   // % target
  const [iRate,       setIRate]       = useState(0.25); // % interchange rate (tiered — unconfirmed)
  const [floatSpread, setFloatSpread] = useState(2.0);  // % net interest spread
  const [floatGrowth, setFloatGrowth] = useState(25);   // % balance growth from ZUZ dwell time
  const [txnGrowth,   setTxnGrowth]   = useState(0);    // % transaction volume growth (revenue TBD)

  // Layer 2 — Commerce
  const [giftConv,  setGiftConv]  = useState(20);   // % of 400M gift groups → The Box
  const [giftComm,  setGiftComm]  = useState(1.0);  // % commerce on gift GMV
  const [ashGmv,    setAshGmv]    = useState(50);   // M NIS "על האש" GMV
  const [ashComm,   setAshComm]   = useState(1.5);  // % commerce "על האש"
  const [otherGmv,  setOtherGmv]  = useState(80);   // M NIS other categories GMV
  const [otherComm, setOtherComm] = useState(1.0);  // % other commerce

  const R = useMemo(() => {
    // ── Interchange ──────────────────────────────────────────────────────────
    const BASE_VOL = 560; // M NIS/month: 300K×1,800 + 100K×200
    const fiwTgt   = Math.max(fiwNow + 1, fiwTarget);
    const volBoost = (fiwTgt - fiwNow) * 3.5; // each FIW% point ≈ +3.5% volume
    const volNew   = BASE_VOL * (1 + volBoost / 100);
    const intBase  = +(BASE_VOL * (iRate / 100) * 12).toFixed(1);
    const intNew   = +(volNew   * (iRate / 100) * 12).toFixed(1);
    const intGain  = +(intNew - intBase).toFixed(1);

    // ── Float ─────────────────────────────────────────────────────────────────
    const floatBase = +(FLOAT_BASE * (floatSpread / 100)).toFixed(1);
    const floatNew  = +(FLOAT_BASE * (1 + floatGrowth / 100) * (floatSpread / 100)).toFixed(1);
    const floatGain = +(floatNew - floatBase).toFixed(1);

    // ── Transactions — VOLUME ONLY (revenue TBD from tokens deal) ─────────────
    const txnVolNow = 2;   // M/month confirmed
    const txnVolNew = +(txnVolNow * (1 + txnGrowth / 100)).toFixed(2);
    const txnVolAdd = +(txnVolNew - txnVolNow).toFixed(2);
    const txnYearAdd = +(txnVolAdd * 12).toFixed(1); // M additional transactions/year

    // Layer 1 total (transactions NOT counted — revenue TBD)
    const layer1 = +(intGain + floatGain).toFixed(1);

    // ── Commerce ─────────────────────────────────────────────────────────────
    const giftGmv  = +(GIFT_BASE * (giftConv / 100)).toFixed(1);
    const giftRev  = +(giftGmv * (giftComm / 100)).toFixed(1);
    const ashRev   = +(ashGmv * (ashComm / 100)).toFixed(1);
    const otherRev = +(otherGmv * (otherComm / 100)).toFixed(1);
    const totalGmv = +(giftGmv + ashGmv + otherGmv).toFixed(1);
    const layer2   = +(giftRev + ashRev + otherRev).toFixed(1);

    // ── Summary ───────────────────────────────────────────────────────────────
    const totalGain    = +(layer1 + layer2).toFixed(1);
    const coverPct     = Math.round(totalGain / RETAINER * 100);
    const netResult    = +(totalGain - LOSS_TODAY - RETAINER).toFixed(1); // positive = profit
    const monthsToZero = totalGain > 0
      ? Math.round(LOSS_TODAY / (totalGain / 12))
      : 999;

    return {
      // Interchange
      intBase, intGain, intNew,
      // Float
      floatBase, floatGain,
      // Transactions
      txnVolNew, txnVolAdd, txnYearAdd,
      // Totals
      layer1, layer2, totalGain, coverPct, netResult, monthsToZero,
      // Commerce detail
      giftGmv, giftRev, ashRev, otherRev, totalGmv,
    };
  }, [fiwNow, fiwTarget, iRate, floatSpread, floatGrowth, txnGrowth,
      giftConv, giftComm, ashGmv, ashComm, otherGmv, otherComm]);

  return (
    <SimulatorContext.Provider value={{
      // State + setters
      fiwNow, setFiwNow,
      fiwTarget, setFiwTarget,
      iRate, setIRate,
      floatSpread, setFloatSpread,
      floatGrowth, setFloatGrowth,
      txnGrowth, setTxnGrowth,
      giftConv, setGiftConv,
      giftComm, setGiftComm,
      ashGmv, setAshGmv,
      ashComm, setAshComm,
      otherGmv, setOtherGmv,
      otherComm, setOtherComm,
      // Computed
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

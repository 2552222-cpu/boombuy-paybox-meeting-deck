import React, { useState } from "react";
import SpeakerNotes from "@/components/slides/SpeakerNotes";

// ─── FINANCIAL MODEL ──────────────────────────────────────────────────────────
// Source: PayBox CFO meeting + Discovery
// Base: 2M transactions/year × conversion rate below
// GMV from category mix (gifts 60%, BBQ 25%, poker 10%, other 5%)
// PayBox sees only: X% of GMV + Interchange growth. BoomBuy margin NOT disclosed.

const GMV = [45, 112, 226, 340, 515]; // M NIS per year (Y1-Y5)
const RETAINER = [4.2, 3.0, 1.8, 1.8, 0]; // M NIS per year
const INTERCHANGE = [36, 63, 90, 120, 144]; // M NIS per year
const FLOAT = [6, 8, 15, 18, 22]; // M NIS per year
const NEW_CARDS = [12, 15, 20, 25, 30]; // M NIS per year
const CONVERSION = ["2%", "5%", "10%", "15%", "20%+"];

const COMMISSION_OPTIONS = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

const SCRIPT = `"אז כמה אנחנו משלמים לכם?

בכוונה לא כתבנו מספר קבוע. אתם בוחרים.

The Box מביא לכם מחזור. כל שקל שנמכר — אתם קובעים כמה אחוז תרצו מהמחזור הזה.

חצי אחוז? 1%? 2%? — ראו מה זה שווה לכם לאורך 5 שנים.

הנקודה: ככל שמועדון The Box יותר פעיל — יותר מחזור — יותר עמלה — הריטיינר שלנו הופך לזניח. שנה 3 הוא מתאפס. שנה 5 לא צריך אותו כלל.

אבל הסיפור הגדול: האינטרצ'יינג. זה לא תלוי בעמלה שתבחרו. ה-4 מיליארד שח בסליקה הנוספת — 144 מיליון שח לשנה — זה כסף נקי לפייבוקס. ללא קשר לאחוז שתבחרו."`;

export default function SlideFlow() {
  const [commIdx, setCommIdx] = useState(3); // default 2.0%
  const comm = COMMISSION_OPTIONS[commIdx];

  const rows = GMV.map((g, i) => {
    const commerce = +(g * comm / 100).toFixed(1);
    const ret = RETAINER[i];
    const inter = INTERCHANGE[i];
    const fl = FLOAT[i];
    const nc = NEW_CARDS[i];
    const net = +(commerce + inter + fl + nc - ret).toFixed(1);
    const cumulative = GMV.slice(0, i + 1).reduce((sum, gv) => {
      return sum + (gv * comm / 100) + INTERCHANGE[i > 0 ? i : 0];
    }, 0);
    return { yr: `שנה ${i + 1}`, g, conv: CONVERSION[i], commerce, ret, inter, fl, nc, net };
  });

  const cumNet = rows.reduce((acc, r) => acc + r.net, 0);

  return (
    <div
      className="relative min-h-full w-full flex flex-col px-6 md:px-16 py-10 text-white"
      style={{ background: "linear-gradient(145deg, #0D1F3C 0%, #0B1930 60%, #07101e 100%)" }}
    >
      {/* Header */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-[#D4AF37] tracking-[0.15em]">מודל הכנסות</span>
        <div className="w-14 h-1 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D883] mt-4 mb-1 mr-0 ml-auto" />
        <h1 className="mt-3 text-3xl md:text-5xl font-black leading-[1.1]">
          אתם בוחרים את האחוז
        </h1>
        <p className="mt-2 text-white/40 text-sm">
          ה-Big Money הוא Interchange — לא תלוי בעמלת Commerce
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6 mt-6">

        {/* Commission selector */}
        <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-6 py-5">
          <p className="text-[#D4AF37] text-xs font-black tracking-widest mb-3 text-right">
            בחרו אחוז עמלת Commerce מהGMV שתרצו
          </p>
          <div className="flex gap-2 flex-wrap justify-end">
            {COMMISSION_OPTIONS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCommIdx(i)}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: commIdx === i ? "#D4AF37" : "rgba(255,255,255,0.07)",
                  color: commIdx === i ? "#0B1930" : "#D4AF37",
                  border: `1px solid ${commIdx === i ? "#D4AF37" : "rgba(212,175,55,0.3)"}`,
                }}
              >
                {c}%
              </button>
            ))}
          </div>
          <p className="text-white/30 text-[10px] mt-3 text-right">
            * אחוז Commerce הוא הצד הגלוי. Interchange, Float וכרטיסים חדשים — הכנסה ישירה של פייבוקס.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-right text-[10px] text-gray-400 font-black tracking-wider">
                {[
                  "שנה", "המרה", "GMV (M₪)", `Commerce\n${comm}%`, "ריטיינר", "Interchange", "Float", "כרטיסים", "נטו לפייבוקס"
                ].map((h, i) => (
                  <th key={i} className="px-3 py-3 bg-white/3 whitespace-pre-line text-right font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}
                  className="border-t border-white/5 hover:bg-white/3 transition-colors"
                  style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                >
                  <td className="px-3 py-3 font-bold text-white text-right">{r.yr}</td>
                  <td className="px-3 py-3 text-[#D4AF37] text-right text-xs font-bold">{r.conv}</td>
                  <td className="px-3 py-3 text-white/60 text-right">{r.g}M</td>
                  <td className="px-3 py-3 text-[#D4AF37] font-bold text-right">+{r.commerce}M</td>
                  <td className="px-3 py-3 text-[#EF4444] text-right">{r.ret > 0 ? `-${r.ret}M` : "—"}</td>
                  <td className="px-3 py-3 text-[#60A5FA] font-bold text-right">+{r.inter}M</td>
                  <td className="px-3 py-3 text-[#34D399] text-right">+{r.fl}M</td>
                  <td className="px-3 py-3 text-[#A78BFA] text-right">+{r.nc}M</td>
                  <td className="px-3 py-3 font-black text-right text-lg"
                    style={{ color: r.net > 0 ? "#34D399" : "#EF4444" }}>
                    {r.net > 0 ? "+" : ""}{r.net}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "נטו מצטבר 5 שנים", val: `+${cumNet.toFixed(0)}M ₪`, color: "#34D399", sub: `בעמלת ${comm}% + Interchange` },
            { label: "Break-Even", val: "שנה 3", color: "#D4AF37", sub: "ריטיינר מתאפס" },
            { label: "Interchange שנה 5", val: "144M ₪", color: "#60A5FA", sub: "4B × 0.3% × 12 חודשים" },
            { label: "עמלת Commerce שנה 5", val: `${(515 * comm / 100).toFixed(0)}M ₪`, color: "#D4AF37", sub: `${comm}% × 515M GMV` },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 px-4 py-4 text-center">
              <p className="text-2xl font-black" style={{ color: item.color }}>{item.val}</p>
              <p className="text-xs text-white/50 mt-1 font-bold">{item.label}</p>
              <p className="text-[10px] text-white/25 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Interchange zoom-in */}
        <div className="rounded-2xl p-4 border border-[#60A5FA]/20 bg-[#60A5FA]/5">
          <p className="text-[10px] text-[#60A5FA]/60 font-bold tracking-widest mb-2 text-right">
            💳 מנוע Interchange — נפרד מהעמלה, גדל לבד
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-end text-right">
            <div>
              <p className="text-white/40 text-[10px]">היום</p>
              <p className="font-black text-white/50">1B ₪/חודש סליקה</p>
            </div>
            <span className="text-[#D4AF37] font-black">→</span>
            <div>
              <p className="text-white/40 text-[10px]">שנה 5 (FIW 50%+)</p>
              <p className="font-black text-[#60A5FA]">5B ₪/חודש סליקה</p>
            </div>
            <span className="text-[#D4AF37] font-black">→</span>
            <div>
              <p className="text-white/40 text-[10px]">4B הפרש × 0.3%</p>
              <p className="font-black text-[#34D399]">144M ₪/שנה</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600 text-xs shrink-0">
        <span className="font-bold tracking-widest">BoomBuy × PayBox</span>
        <span>11 / 15</span>
      </div>

      <SpeakerNotes notes={SCRIPT} />
    </div>
  );
}

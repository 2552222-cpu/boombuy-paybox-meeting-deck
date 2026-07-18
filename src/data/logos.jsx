import React from "react";
import { Infinity as InfinityIcon, Target, Landmark, Shield, TreePine, Leaf, Gem, Star, Waves, Mountain } from "lucide-react";

// Realistic-styled brand marks for the logo wall — icon/wordmark + brand colors
export const LOGOS = [
  { name: "MAX", render: () => <span className="text-2xl font-black tracking-tight text-[#111111]">MAX</span> },
  { name: "דלק", render: () => (
    <div className="w-11 h-11 rounded-full bg-[#E30613] flex items-center justify-center">
      <span className="text-white text-sm font-black">דלק</span>
    </div>
  )},
  { name: "ONE", render: () => (
    <div className="px-3 py-1.5 rounded-md bg-[#111111] flex items-center justify-center">
      <span className="text-white text-lg font-black tracking-widest">ONE</span>
    </div>
  )},
  { name: "סלקום", render: () => (
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-[#6B21A8] text-[#6B21A8]" />
      <span className="text-base font-black text-[#6B21A8]">סלקום</span>
    </div>
  )},
  { name: "teva", render: () => <span className="text-2xl font-bold lowercase text-[#0F9D8C]" style={{ fontFamily: "'Heebo', sans-serif" }}>teva</span> },
  { name: "דנאל", render: () => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-[9px] font-medium text-[#1E3A8A] tracking-wide">קבוצת</span>
      <span className="text-lg font-black text-[#1E3A8A]">דנאל</span>
    </div>
  )},
  { name: "מזרחי טפחות", render: () => (
    <div className="flex items-center gap-1.5">
      <InfinityIcon className="w-5 h-5 text-[#F97316]" strokeWidth={2.5} />
      <span className="text-[11px] font-bold text-[#111111]">מזרחי טפחות</span>
    </div>
  )},
  { name: "AMOT", render: () => (
    <div className="flex items-center gap-1.5">
      <Target className="w-5 h-5 text-[#DC2626]" strokeWidth={2.5} />
      <span className="text-lg font-black text-[#111111]">AMOT</span>
    </div>
  )},
  { name: "leumi", render: () => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-[10px] font-bold text-[#003F87]">לאומי</span>
      <span className="text-lg font-black text-[#003F87] italic">leumi</span>
    </div>
  )},
  { name: "8", render: () => (
    <div className="w-10 h-10 rounded-full bg-[#003F87] flex items-center justify-center">
      <span className="text-white text-lg font-black">8</span>
    </div>
  )},
  { name: "elisra", render: () => <span className="text-xl font-bold italic text-[#0F9D8C]">elisra</span> },
  { name: "בנק ישראל", render: () => (
    <div className="flex items-center gap-1.5">
      <Shield className="w-5 h-5 text-[#6B7280]" strokeWidth={2} />
      <span className="text-[11px] font-bold text-[#374151]">בנק ישראל</span>
    </div>
  )},
  { name: "אלבר", render: () => (
    <div className="flex items-center gap-1.5">
      <Mountain className="w-5 h-5 text-[#2563EB]" strokeWidth={2.5} />
      <span className="text-lg font-black text-[#111111]">אלבר</span>
    </div>
  )},
  { name: "ZIM", render: () => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-lg font-black text-[#0B1F45] tracking-wide">ZIM</span>
      <span className="text-[8px] font-semibold text-[#6B7280] tracking-widest">THE Z FACTOR</span>
    </div>
  )},
  { name: "דיסקונט", render: () => (
    <div className="flex items-center gap-1.5">
      <Leaf className="w-5 h-5 text-[#16A34A]" strokeWidth={2.5} />
      <span className="text-base font-black text-[#16A34A]">דיסקונט</span>
    </div>
  )},
  { name: "רשות המסים", render: () => (
    <div className="flex flex-col items-center leading-none gap-0.5">
      <TreePine className="w-4 h-4 text-[#6B7280]" />
      <span className="text-[9px] font-bold text-[#374151]">רשות המסים בישראל</span>
    </div>
  )},
  { name: "קבוצת בזן", render: () => (
    <div className="flex items-center gap-1.5">
      <Gem className="w-4 h-4 text-[#0EA5A4]" strokeWidth={2.5} />
      <span className="text-[11px] font-bold text-[#111111]">קבוצת בזן</span>
    </div>
  )},
  { name: "SAP", render: () => <span className="text-2xl font-black text-[#0057A0]">SAP</span> },
  { name: "שיח", render: () => (
    <div className="flex items-center gap-1.5">
      <Waves className="w-4 h-4 text-[#65A30D]" strokeWidth={2.5} />
      <span className="text-base font-black text-[#111111]">שיח</span>
    </div>
  )},
  { name: "ישראייר", render: () => <span className="text-lg font-black italic text-[#DC2626]">ישראייר</span> },
  { name: "HOT mobile", render: () => (
    <div className="flex flex-col items-center leading-none gap-0.5">
      <div className="w-9 h-9 rounded-full bg-[#DC2626] flex items-center justify-center">
        <span className="text-white text-[10px] font-black">HOT</span>
      </div>
      <span className="text-[9px] font-semibold text-[#374151]">mobile</span>
    </div>
  )},
  { name: "מיילגם", render: () => (
    <div className="flex items-center gap-1.5">
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#F97316] to-[#DC2626]" />
      <span className="text-base font-black text-[#111111]">מיילגם</span>
    </div>
  )},
  { name: "תעש", render: () => (
    <div className="flex items-center gap-1.5">
      <div className="w-4 h-4 rounded-sm bg-[#166534]" />
      <span className="text-base font-black text-[#166534]">תעש</span>
    </div>
  )},
  { name: "מגן דוד אדום", render: () => (
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />
      <span className="text-[10px] font-bold text-[#111111]">מגן דוד אדום</span>
    </div>
  )},
  { name: "ESTEE LAUDER", render: () => <span className="text-[13px] font-bold tracking-[0.15em] text-[#111111]">ESTÉE LAUDER</span> },
  { name: "ORT", render: () => <span className="text-xl font-black italic text-[#1D4ED8]">ORT</span> },
  { name: "בנק יהב", render: () => (
    <div className="flex items-center gap-1.5">
      <Landmark className="w-4 h-4 text-[#1D4ED8]" strokeWidth={2.5} />
      <span className="text-base font-black text-[#1D4ED8]">בנק יהב</span>
    </div>
  )},
  { name: "אלקטרה אפיקים", render: () => (
    <div className="flex flex-col items-center leading-none gap-0.5">
      <span className="text-base font-black text-[#0EA5A4]">אלקטרה</span>
      <span className="text-[9px] font-medium text-[#6B7280]">אפיקים</span>
    </div>
  )}
];
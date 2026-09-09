"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { IndianRupee, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EarningsCalculatorProps {
  onJoinClick: () => void;
}

export function EarningsCalculator({ onJoinClick }: EarningsCalculatorProps) {
  const [jobsPerDay, setJobsPerDay] = useState<number>(3);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(24);
  const [tradeTier, setTradeTier] = useState<"standard" | "expert">("standard");
  const { t, lang } = useI18n();

  const avgJobEarnings = tradeTier === "standard" ? 550 : 850;
  const estimatedMonthly = jobsPerDay * avgJobEarnings * daysPerMonth;
  const yearlyEstimate = estimatedMonthly * 12;

  return (
    <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-brand-orange/30 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-5">
        <div>
          <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest block">
            {lang === "hi" ? "कमाई कैलकुलेटर" : "Earnings Calculator"}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {t("calc.title")}
          </h3>
        </div>
        <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange">
          <IndianRupee className="w-6 h-6" />
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-5">
        {/* Trade Tier Toggle */}
        <div>
          <label className="text-xs font-bold text-foreground block mb-1.5">
            {lang === "hi" ? "काम का प्रकार" : "Skill Category"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTradeTier("standard")}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                tradeTier === "standard"
                  ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                  : "bg-black/5 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:text-foreground"
              }`}
            >
              {lang === "hi" ? "सामान्य काम (₹550/काम)" : "General Trade (₹550/job)"}
            </button>
            <button
              type="button"
              onClick={() => setTradeTier("expert")}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                tradeTier === "expert"
                  ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                  : "bg-black/5 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:text-foreground"
              }`}
            >
              {lang === "hi" ? "विशेषज्ञ/AC मिस्त्री (₹850/काम)" : "Specialist/AC (₹850/job)"}
            </button>
          </div>
        </div>

        {/* Jobs Per Day Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <span className="text-foreground font-semibold">{t("calc.jobsLabel")}</span>
            <span className="font-mono font-bold text-brand-orange text-sm">{jobsPerDay} {lang === "hi" ? "काम रोज़" : "Jobs"}</span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            value={jobsPerDay}
            onChange={(e) => setJobsPerDay(Number(e.target.value))}
            className="w-full accent-brand-orange h-2 bg-slate-300 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1 (पार्ट-टाइम)</span>
            <span>3-4 (सामान्य)</span>
            <span>7 (पूरा दिन)</span>
          </div>
        </div>

        {/* Working Days Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <span className="text-foreground font-semibold">{t("calc.daysLabel")}</span>
            <span className="font-mono font-bold text-brand-orange text-sm">{daysPerMonth} {lang === "hi" ? "दिन" : "Days"}</span>
          </div>
          <input
            type="range"
            min={12}
            max={28}
            value={daysPerMonth}
            onChange={(e) => setDaysPerMonth(Number(e.target.value))}
            className="w-full accent-brand-orange h-2 bg-slate-300 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>12 दिन</span>
            <span>22 दिन</span>
            <span>28 दिन</span>
          </div>
        </div>
      </div>

      {/* Calculated Monthly Payout Display */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-slate-900 border border-black/10 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
            {t("calc.monthlyTakeHome")}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {lang === "hi" ? "रोज सीधे बैंक खाते में" : "Daily Direct Payout"}
          </span>
        </div>

        <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight text-gradient-orange">
          {formatCurrency(estimatedMonthly)}
          <span className="text-sm font-sans text-slate-500 dark:text-slate-400 font-normal ml-1">/ महीना</span>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
          <span>{lang === "hi" ? "सालाना अनुमान:" : "Annual:"} <strong className="text-foreground font-mono">{formatCurrency(yearlyEstimate)}</strong></span>
          <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            {lang === "hi" ? "+ मुफ्त ₹5 लाख बीमा" : "+ Free ₹5L Cover"}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <Button
          variant="primary"
          size="md"
          glow
          onClick={onJoinClick}
          className="w-full justify-center text-sm font-bold"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {t("calc.joinBtn")}
        </Button>
      </div>
    </div>
  );
}

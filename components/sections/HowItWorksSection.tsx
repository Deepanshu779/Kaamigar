"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const { t, lang } = useI18n();

  const steps = [
    {
      num: "1",
      emoji: "📱",
      title: t("hiw.step1.title"),
      subTitle: lang === "en" ? "Choose your work" : "काम चुनें",
      desc: t("hiw.step1.desc"),
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-300 dark:border-blue-900/60",
    },
    {
      num: "2",
      emoji: "🧑‍🔧",
      title: t("hiw.step2.title"),
      subTitle: lang === "en" ? "Choose a Kaamigar" : "कामगार चुनें",
      desc: t("hiw.step2.desc"),
      color: "from-orange-500/20 to-amber-500/10",
      border: "border-orange-300 dark:border-orange-900/60",
    },
    {
      num: "3",
      emoji: "📅",
      title: t("hiw.step3.title"),
      subTitle: lang === "en" ? "Book" : "बुक करें",
      desc: t("hiw.step3.desc"),
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-300 dark:border-emerald-900/60",
    },
    {
      num: "4",
      emoji: "🤝",
      title: t("hiw.step4.title"),
      subTitle: lang === "en" ? "Get the work done" : "काम करवाएं",
      desc: t("hiw.step4.desc"),
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-300 dark:border-purple-900/60",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 relative bg-slate-50 dark:bg-[#070D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <span>{lang === "en" ? "Simple 4 Steps" : "सिर्फ 4 आसान कदम"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("hiw.heading")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("hiw.subheading")}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-6 rounded-3xl bg-white dark:bg-[#101B33] border-2 ${step.border} shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-inner">
                  {step.emoji}
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center shadow">
                  {step.num}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <div className="text-xs font-bold text-brand-orange uppercase">
                  {step.subTitle}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step check footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "100% Guaranteed" : "पूरी संतुष्टि की गारंटी"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

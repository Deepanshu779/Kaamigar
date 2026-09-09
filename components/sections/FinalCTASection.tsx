"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

interface FinalCTASectionProps {
  onBookClick: () => void;
  onJoinProClick: () => void;
}

export function FinalCTASection({ onBookClick, onJoinProClick }: FinalCTASectionProps) {
  const { t, lang } = useI18n();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white to-orange-50/40 dark:from-[#0B1325] dark:to-[#101B33]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#101B33] border-2 border-orange-200 dark:border-orange-500/20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle glow circle */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 text-brand-orange text-xs font-bold border border-orange-200 dark:border-orange-800 mb-4">
            <span>🤝 {lang === "en" ? "Local • Trusted • Friendly" : "स्थानीय • भरोसेमंद • अपना"}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            “{t("final.title")}”
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
            {t("final.subtitle")}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white text-base font-black shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{t("final.cta")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onJoinProClick}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-100 text-base font-bold transition-colors"
            >
              <span>{t("hero.ctaSecondary")}</span>
            </button>
          </div>

          {/* Bottom assurance tags */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {lang === "en" ? "100% Aadhaar & Police Verified" : "100% आधार व पुलिस जांच"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-orange" />
              {lang === "en" ? "15-Min Average Response" : "15 मिनट में तुरंत रिस्पांस"}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              {lang === "en" ? "Upfront Clear Pricing" : "पहले तय दाम, नो बार्गेनिंग"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

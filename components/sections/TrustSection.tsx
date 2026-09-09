"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import {
  ShieldCheck,
  BadgeCheck,
  MapPin,
  PhoneCall,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function TrustSection() {
  const { t, lang } = useI18n();

  const trustItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />,
      title: t("trust.item1.title"),
      desc: t("trust.item1.desc"),
      badge: lang === "en" ? "Govt ID Verified" : "सरकारी आईडी जांच",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-blue-500" />,
      title: t("trust.item2.title"),
      desc: t("trust.item2.desc"),
      badge: lang === "en" ? "Fixed Pricing" : "तय रेट",
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-500" />,
      title: t("trust.item3.title"),
      desc: t("trust.item3.desc"),
      badge: lang === "en" ? "15-30 Min Reach" : "15-30 मिनट में पहुंच",
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-purple-500" />,
      title: t("trust.item4.title"),
      desc: t("trust.item4.desc"),
      badge: lang === "en" ? "WhatsApp & Call Support" : "कॉल व व्हाट्सएप मदद",
    },
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 relative bg-white dark:bg-[#0B1325]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 text-brand-orange text-xs font-bold border border-orange-200 dark:border-orange-800">
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Trust & Safety" : "सुरक्षा और भरोसा"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            “{t("trust.heading")}”
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
            {t("trust.subheading")}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-[#101B33] border-2 border-slate-200/80 dark:border-slate-800 hover:border-brand-orange dark:hover:border-brand-orange transition-all flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                {item.icon}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Local Community Assurance Box */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-200 dark:border-orange-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
              🤝
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {lang === "en"
                  ? "7-Day Service Guarantee on Every Job"
                  : "हर काम पर 7 दिन की सर्विस संतुष्टि गारंटी"}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {lang === "en"
                  ? "If the issue recurs, our technician will fix it free of charge."
                  : "अगर काम में कोई कमी रही तो कामगार दोबारा आकर मुफ़्त में ठीक करेंगे।"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <span>📞 Helpline: 1800-120-KAAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}

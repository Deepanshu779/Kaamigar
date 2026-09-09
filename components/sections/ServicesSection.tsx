"use client";

import React, { useState } from "react";
import { SERVICES, ServiceCategory } from "@/lib/data/services";
import { useI18n } from "@/lib/i18n";
import { Clock, Star, ArrowRight, ShieldCheck } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceCategory) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { t, lang } = useI18n();

  const filterTabs = [
    { id: "all", label: lang === "en" ? "All Services" : "सभी सेवाएं" },
    { id: "emergency", label: lang === "en" ? "⚡ 15-Min Quick Reach" : "⚡ 15 मिनट में तुरंत" },
    { id: "home", label: lang === "en" ? "🏡 Home Repairs" : "🏡 घर मरम्मत" },
  ];

  const filteredServices =
    activeTab === "all"
      ? SERVICES
      : activeTab === "emergency"
      ? SERVICES.filter((s) => ["plumber", "electrician", "mechanic"].includes(s.id))
      : SERVICES.filter((s) => ["carpenter", "ac-repair", "painter", "cleaning", "home-repair"].includes(s.id));

  return (
    <section id="services" className="py-16 sm:py-20 relative bg-slate-50/50 dark:bg-[#070D1A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-brand-orange text-xs font-bold border border-orange-200 dark:border-orange-800">
            <span>🛡️ {lang === "en" ? "Verified Local Trades" : "वेरिफाइड स्थानीय काम"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("services.heading")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("services.subheading")}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-orange text-white shadow-md shadow-orange-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-orange"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Visual Service Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group relative cursor-pointer p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#101B33] border-2 border-slate-200/90 dark:border-slate-800 hover:border-brand-orange dark:hover:border-brand-orange transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Top Row: Big Emoji + Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-3xl sm:text-4xl shadow-sm group-hover:scale-110 transition-transform">
                    {service.emoji}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {lang === "en" ? service.badge : (service.hindiBadge || service.badge)}
                    </span>
                  )}
                </div>

                {/* Dual Language Names: Hindi + English */}
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
                    {service.hindiName}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {service.name}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1">
                    {lang === "en" ? service.description : service.hindiDescription}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Starting price + 1-Tap Book Button */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {t("services.startsFrom")}
                  </div>
                  <div className="text-base sm:text-lg font-black text-brand-orange">
                    ₹{service.startingPrice}
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all text-xs font-bold flex items-center gap-1">
                  <span>{t("services.bookNow")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

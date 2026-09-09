"use client";

import React, { useState } from "react";
import { PROFESSIONALS, Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import {
  Star,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface NearbyKaamigarSectionProps {
  onSelectPro: (pro: Professional) => void;
  onBookPro: (pro: Professional) => void;
}

export function NearbyKaamigarSection({
  onSelectPro,
  onBookPro,
}: NearbyKaamigarSectionProps) {
  const { t, lang } = useI18n();
  const [selectedTrade, setSelectedTrade] = useState<string>("all");

  const trades = [
    { id: "all", label: lang === "en" ? "All Workers" : "सभी कामगार" },
    { id: "Plumber", label: lang === "en" ? "Plumber" : "प्लंबर" },
    { id: "Electrician", label: lang === "en" ? "Electrician" : "इलेक्ट्रीशियन" },
    { id: "Carpenter", label: lang === "en" ? "Carpenter" : "कारपेंटर" },
    { id: "Cleaning", label: lang === "en" ? "Cleaning" : "सफ़ाई" },
    { id: "AC Repair", label: lang === "en" ? "AC Repair" : "एसी" },
  ];

  const filteredPros =
    selectedTrade === "all"
      ? PROFESSIONALS
      : PROFESSIONALS.filter((p) => p.service.toLowerCase().includes(selectedTrade.toLowerCase()));

  return (
    <section id="nearby-workers" className="py-16 sm:py-20 relative bg-white dark:bg-[#0B1325]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "en" ? "Live in Sector 14" : "सेक्टर 14 में अभी उपलब्ध"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("nearby.heading")}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {t("nearby.subheading")}
            </p>
          </div>

          {/* Trade filter buttons */}
          <div className="flex flex-wrap gap-1.5">
            {trades.map((tItem) => (
              <button
                key={tItem.id}
                onClick={() => setSelectedTrade(tItem.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTrade === tItem.id
                    ? "bg-brand-orange text-white shadow"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPros.map((pro) => (
            <div
              key={pro.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-[#101B33] border-2 border-slate-200/80 dark:border-slate-800 hover:border-brand-orange dark:hover:border-brand-orange transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Header: Name + Trade Emoji + Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-2xl flex-shrink-0">
                      {pro.serviceEmoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                          {lang === "en" ? pro.name : pro.hindiName}
                        </h3>
                        {pro.verified && (
                          <span title="Aadhaar Verified">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-brand-orange">
                        {lang === "en" ? pro.service : pro.hindiService}
                      </div>
                    </div>
                  </div>

                  {/* Available pill */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>{t("nearby.available")}</span>
                  </span>
                </div>

                {/* Subcategory / Specialty */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-1">
                  {lang === "en" ? pro.subCategory : pro.hindiSubCategory}
                </p>

                {/* Meta stats: Rating, Distance, Completed jobs */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center mb-4">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-slate-800 dark:text-slate-100">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{pro.rating}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">रेटिंग / Rating</div>
                  </div>

                  <div className="border-x border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-slate-800 dark:text-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{pro.distanceKm} km</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{t("nearby.distance")}</div>
                  </div>

                  <div>
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      {pro.totalJobs}+
                    </div>
                    <div className="text-[10px] text-slate-400">{lang === "en" ? "Jobs" : "काम किए"}</div>
                  </div>
                </div>

                {/* Verification badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(lang === "en" ? pro.badges : pro.hindiBadges).map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  onClick={() => onSelectPro(pro)}
                  className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-brand-orange text-xs font-bold text-slate-800 dark:text-slate-100 transition-colors text-center"
                >
                  {t("nearby.viewProfile")}
                </button>
                <button
                  onClick={() => onBookPro(pro)}
                  className="py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold shadow transition-colors flex items-center justify-center gap-1"
                >
                  <span>{t("nearby.book")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

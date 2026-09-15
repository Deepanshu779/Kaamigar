"use client";

import React, { useState } from "react";
import { PROFESSIONALS, Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
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
    { id: "all", label: lang === "en" ? "All" : "सभी" },
    { id: "Plumber", label: lang === "en" ? "Plumbers" : "प्लंबर" },
    { id: "Electrician", label: lang === "en" ? "Electricians" : "इलेक्ट्रीशियन" },
    { id: "Carpenter", label: lang === "en" ? "Carpenters" : "कारपेंटर" },
    { id: "Cleaning", label: lang === "en" ? "Cleaning" : "सफ़ाई" },
    { id: "AC Repair", label: lang === "en" ? "AC repair" : "एसी रिपेयर" },
  ];

  const filteredPros =
    selectedTrade === "all"
      ? PROFESSIONALS
      : PROFESSIONALS.filter((p) =>
          p.service.toLowerCase().includes(selectedTrade.toLowerCase())
        );

  return (
    <section
      id="nearby-workers"
      className="relative overflow-hidden bg-slate-50 py-20 dark:bg-[#0B1325] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />
              {lang === "en" ? "Available near you" : "आपके आसपास उपलब्ध"}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {lang === "en" ? "Find the right person for the job." : "काम के लिए सही कामिगार खोजें।"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              {lang === "en"
                ? "Compare local professionals by service, rating and distance before you book."
                : "बुक करने से पहले स्थानीय कामिगारों की सेवा, रेटिंग और दूरी की तुलना करें।"}
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-brand-orange dark:text-slate-300 dark:hover:text-orange-400 sm:inline-flex"
          >
            {lang === "en" ? "View all Kaamigars" : "सभी कामिगार देखें"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trades.map((trade) => (
            <button
              key={trade.id}
              type="button"
              onClick={() => setSelectedTrade(trade.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                selectedTrade === trade.id
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
              }`}
            >
              {trade.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPros.slice(0, 6).map((pro) => (
            <article
              key={pro.id}
              className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl ring-1 ring-orange-100 dark:bg-orange-950/30 dark:ring-orange-900/50">
                  {pro.serviceEmoji}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-black text-slate-950 dark:text-white">
                        {lang === "en" ? pro.name : pro.hindiName}
                      </h3>
                      <p className="mt-0.5 truncate text-xs font-bold text-brand-orange">
                        {lang === "en" ? pro.service : pro.hindiService}
                      </p>
                    </div>
                    {pro.verified && (
                      <span
                        title="Verified profile"
                        className="shrink-0 rounded-full bg-blue-50 p-1.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      >
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                {lang === "en" ? pro.subCategory : pro.hindiSubCategory}
              </p>

              <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50 py-3 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900 dark:text-white">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {pro.rating}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900 dark:text-white">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    {pro.distanceKm} km
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">Distance</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900 dark:text-white">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-500" />
                    {lang === "en" ? "Available" : "उपलब्ध"}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">Status</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{lang === "en" ? "Profile verified" : "प्रोफ़ाइल सत्यापित"}</span>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {pro.totalJobs}+ {lang === "en" ? "jobs" : "काम"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPro(pro)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {lang === "en" ? "View profile" : "प्रोफ़ाइल देखें"}
                </button>
                <button
                  type="button"
                  onClick={() => onBookPro(pro)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-orange px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                  {lang === "en" ? "Book now" : "अभी बुक करें"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 text-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            {lang === "en" ? "View all Kaamigars" : "सभी कामिगार देखें"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

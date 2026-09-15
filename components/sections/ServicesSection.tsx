"use client";

import React, { useState } from "react";
import { SERVICES, ServiceCategory } from "@/lib/data/services";
import { useI18n } from "@/lib/i18n";
import { ArrowUpRight, Clock3, Search, ShieldCheck, Star } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceCategory) => void;
}

const iconByService: Record<string, string> = {
  plumber: "🚰",
  electrician: "⚡",
  "ac-repair": "❄️",
  carpenter: "🪚",
  cleaning: "🧹",
  mechanic: "🔧",
  painter: "🎨",
  "home-repair": "🏠",
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const { t, lang } = useI18n();

  const filterTabs = [
    { id: "all", label: lang === "en" ? "All" : "सभी" },
    { id: "home", label: lang === "en" ? "Home repair" : "घर की मरम्मत" },
    { id: "emergency", label: lang === "en" ? "Quick help" : "तुरंत मदद" },
  ];

  const filteredServices = SERVICES.filter((service) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "emergency" && ["plumber", "electrician", "mechanic"].includes(service.id)) ||
      (activeTab === "home" && ["carpenter", "ac-repair", "painter", "cleaning", "home-repair"].includes(service.id));
    const text = `${service.name} ${service.hindiName} ${service.description} ${service.hindiDescription}`.toLowerCase();
    return matchesTab && text.includes(query.toLowerCase());
  });

  return (
    <section id="services" className="relative border-y border-slate-200/70 bg-white py-16 dark:border-slate-800/70 dark:bg-[#080E1A] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              {lang === "en" ? "Services around you" : "आपके आसपास की सेवाएं"}
            </div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-5xl">
              {lang === "en" ? "Whatever needs fixing, we help." : "घर का जो काम अटका है, उसे करवा दीजिए।"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              {lang === "en" ? "Choose a service, see the details, and book a local Kaamigar." : "काम चुनें, जानकारी देखें और अपने पास के कामिगार को बुक करें।"}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "en" ? "Search a service..." : "सेवा खोजें..."} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-semibold text-slate-900 outline-none focus:border-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>
            <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
              {filterTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-lg px-3 py-2 text-[11px] font-extrabold transition-all ${activeTab === tab.id ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service) => (
            <button key={service.id} onClick={() => onSelectService(service)} className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-[#101827] dark:hover:border-slate-700 dark:hover:bg-[#111D30]">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">{iconByService[service.id] || service.emoji}</div>
                  {service.badge && <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{lang === "en" ? service.badge : service.hindiBadge || service.badge}</span>}
                </div>
                <h3 className="mt-5 text-base font-black text-slate-950 transition-colors group-hover:text-brand-orange dark:text-white">{lang === "en" ? service.name : service.hindiName}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{lang === "en" ? service.description : service.hindiDescription}</p>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{t("services.startsFrom")}</div>
                  <div className="mt-0.5 text-lg font-black text-slate-950 dark:text-white">₹{service.startingPrice}</div>
                  <div className="mt-1 flex items-center gap-2 text-[9px] font-semibold text-slate-400"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{lang === "en" ? "Popular local service" : "लोकप्रिय सेवा"}</div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white transition-all group-hover:bg-brand-orange dark:bg-white dark:text-slate-950 dark:group-hover:bg-brand-orange dark:group-hover:text-white"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-slate-200 pt-5 text-[11px] font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> {lang === "en" ? "Profile details before booking" : "बुकिंग से पहले प्रोफाइल देखें"}</span>
          <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-brand-orange" /> {lang === "en" ? "Choose a convenient time" : "अपना समय चुनें"}</span>
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {lang === "en" ? "Rate after the job" : "काम के बाद रेटिंग दें"}</span>
        </div>
      </div>
    </section>
  );
}

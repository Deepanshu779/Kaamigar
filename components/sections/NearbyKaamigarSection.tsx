"use client";

import React, { useState } from "react";
import { PROFESSIONALS, Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, BadgeCheck, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";

interface NearbyKaamigarSectionProps {
  onSelectPro: (pro: Professional) => void;
  onBookPro: (pro: Professional) => void;
}

const workerImages: Record<string, string> = {
  Plumber: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=500&q=80",
  Electrician: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
  Carpenter: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
  Cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
  "AC Repair": "https://images.unsplash.com/photo-1631545806609-9f2c7e0b7f4a?auto=format&fit=crop&w=500&q=80",
};

export function NearbyKaamigarSection({ onSelectPro, onBookPro }: NearbyKaamigarSectionProps) {
  const { lang } = useI18n();
  const [selectedTrade, setSelectedTrade] = useState<string>("all");

  const trades = [
    { id: "all", label: lang === "en" ? "All" : "सभी" },
    { id: "Plumber", label: lang === "en" ? "Plumbers" : "प्लंबर" },
    { id: "Electrician", label: lang === "en" ? "Electricians" : "इलेक्ट्रीशियन" },
    { id: "Carpenter", label: lang === "en" ? "Carpenters" : "कारपेंटर" },
    { id: "Cleaning", label: lang === "en" ? "Cleaning" : "सफ़ाई" },
    { id: "AC Repair", label: lang === "en" ? "AC repair" : "एसी रिपेयर" },
  ];

  const filteredPros = selectedTrade === "all"
    ? PROFESSIONALS
    : PROFESSIONALS.filter((p) => p.service.toLowerCase().includes(selectedTrade.toLowerCase()));

  return (
    <section id="nearby-workers" className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {lang === "en" ? "Find the right person for the job." : "काम के लिए सही कामिगार खोजें।"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              {lang === "en" ? "Compare local professionals by service, rating and distance before you book." : "बुक करने से पहले स्थानीय कामिगारों की सेवा, रेटिंग और दूरी की तुलना करें।"}
            </p>
          </div>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trades.map((trade) => (
            <button key={trade.id} type="button" onClick={() => setSelectedTrade(trade.id)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all ${selectedTrade === trade.id ? "border-slate-900 bg-slate-900 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-brand-orange"}`}>
              {trade.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPros.slice(0, 6).map((pro) => {
            const workerImage = workerImages[pro.service];
            return (
              <article key={pro.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10">
                {workerImage && (
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img src={workerImage} alt={`${pro.service} professional`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold text-slate-800 shadow-sm">{pro.service}</div>
                    {pro.verified && <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[9px] font-extrabold text-blue-600 shadow-sm"><BadgeCheck className="h-3.5 w-3.5" /> Verified</div>}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl ring-1 ring-orange-100">{pro.serviceEmoji}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-black text-slate-950">{lang === "en" ? pro.name : pro.hindiName}</h3>
                      <p className="mt-0.5 truncate text-xs font-bold text-brand-orange">{lang === "en" ? pro.service : pro.hindiService}</p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-1 text-xs text-slate-500">{lang === "en" ? pro.subCategory : pro.hindiSubCategory}</p>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50 py-3">
                    <div className="text-center"><div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{pro.rating}</div><div className="mt-0.5 text-[10px] text-slate-400">Rating</div></div>
                    <div className="text-center"><div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900"><MapPin className="h-3.5 w-3.5 text-blue-500" />{pro.distanceKm} km</div><div className="mt-0.5 text-[10px] text-slate-400">Distance</div></div>
                    <div className="text-center"><div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900"><Clock3 className="h-3.5 w-3.5 text-emerald-500" />{lang === "en" ? "Available" : "उपलब्ध"}</div><div className="mt-0.5 text-[10px] text-slate-400">Status</div></div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /><span>{lang === "en" ? "Profile verified" : "प्रोफ़ाइल सत्यापित"}</span></div>
                    <span className="text-xs font-bold text-slate-500">{pro.totalJobs}+ {lang === "en" ? "jobs" : "काम"}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-2">
                    <button type="button" onClick={() => onSelectPro(pro)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">{lang === "en" ? "View profile" : "प्रोफ़ाइल देखें"}</button>
                    <button type="button" onClick={() => onBookPro(pro)} className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-orange px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-orange-600">{lang === "en" ? "Book now" : "अभी बुक करें"}<ArrowRight className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

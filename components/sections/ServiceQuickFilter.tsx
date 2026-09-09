"use client";

import React, { useState } from "react";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { useI18n } from "@/lib/i18n";

interface ServiceQuickFilterProps {
  onSearch: (query: string, location: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

const CITIES = [
  "Indiranagar, Bengaluru",
  "HSR Layout, Bengaluru",
  "Koramangala, Bengaluru",
  "Andheri West, Mumbai",
  "Bandra Kurla Complex, Mumbai",
  "Gurugram Cyber City, NCR",
  "Noida Sector 62, NCR",
  "Banjara Hills, Hyderabad",
];

export function ServiceQuickFilter({ onSearch, onSelectCategory }: ServiceQuickFilterProps) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, lang } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCity);
  };

  return (
    <div className="relative z-20 -mt-6 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="glass-panel-elevated p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/15 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
          {/* Location Selector */}
          <div className="w-full md:w-1/3 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900 border border-black/10 dark:border-white/10 text-sm">
            <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
            <div className="flex-1 text-left">
              <label className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {t("filter.areaLabel")}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-foreground font-semibold focus:outline-none cursor-pointer text-xs sm:text-sm"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-background text-foreground">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full md:flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900 border border-black/10 dark:border-white/10 text-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex-1 text-left">
              <label className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {t("filter.searchLabel")}
              </label>
              <input
                type="text"
                placeholder={t("filter.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orangeHover text-white font-bold text-sm shadow-glow-orange hover:shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0"
          >
            <span>{t("filter.searchBtn")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Category Chips */}
        <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t("filter.popular")}
          </span>
          {SERVICES.slice(0, 6).map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectCategory(service.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-brand-orange/15 border border-black/10 dark:border-white/10 hover:border-brand-orange text-foreground transition-colors shrink-0 flex items-center gap-1.5 font-medium"
            >
              <span>{lang === "hi" ? service.hindiName : service.name.split(" ")[0]}</span>
              <span className="text-[10px] text-brand-orange font-mono font-bold">₹{service.startingPrice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

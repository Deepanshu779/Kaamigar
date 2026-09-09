"use client";

import React, { useState } from "react";
import { PROFESSIONALS, Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import {
  MapPin,
  Navigation,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LocationMapSectionProps {
  onBookPro: (pro: Professional) => void;
}

export function LocationMapSection({ onBookPro }: LocationMapSectionProps) {
  const [selectedPro, setSelectedPro] = useState<Professional>(PROFESSIONALS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { t, lang } = useI18n();

  const categories = [
    { id: "All", label: lang === "hi" ? "सभी" : "All" },
    { id: "Electrician", label: lang === "hi" ? "बिजली मिस्त्री" : "Electrician" },
    { id: "Plumbing", label: lang === "hi" ? "प्लंबर" : "Plumbing" },
    { id: "Carpentry", label: lang === "hi" ? "कारपेंटर" : "Carpentry" },
    { id: "AC & Appliances", label: lang === "hi" ? "एसी व फ्रिज" : "AC & Appliances" },
    { id: "Deep Cleaning", label: lang === "hi" ? "सफाई कर्मी" : "Deep Cleaning" },
  ];

  const filteredPros =
    activeCategory === "All"
      ? PROFESSIONALS
      : PROFESSIONALS.filter((p) => p.service.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="location-map" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
            <Navigation className="w-3.5 h-3.5" />
            <span>{t("map.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {t("map.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t("map.subtitle")}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  activeCategory === c.id
                    ? "bg-brand-orange text-white border-brand-orange shadow-glow-orange"
                    : "bg-black/5 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Radar Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Visualizer */}
          <div className="lg:col-span-8">
            <div className="relative h-[460px] sm:h-[500px] rounded-3xl bg-[#090E1D] border border-cyan-500/20 overflow-hidden shadow-2xl p-6 flex items-center justify-center text-white">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute w-[440px] h-[440px] rounded-full border border-cyan-500/15 pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/20 pointer-events-none" />
              <div className="absolute w-[160px] h-[160px] rounded-full border border-brand-orange/30 pointer-events-none animate-ping opacity-60" />

              {/* Rotating radar scanner sweep */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.2) 0deg, transparent 60deg, transparent 360deg)",
                  animation: "spin 8s linear infinite",
                }}
              />

              {/* Center Customer Marker */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-glow-orange border-2 border-white">
                  <MapPin className="w-6 h-6 animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-slate-950/90 border border-brand-orange/40 text-[11px] font-bold text-white shadow-md">
                  {lang === "hi" ? "आप (ग्राहक)" : "You (Customer)"}
                </div>
              </div>

              {/* Interactive Pro Markers Around Radar */}
              {filteredPros.map((pro, index) => {
                const isSelected = selectedPro.id === pro.id;
                const angle = (index * (360 / filteredPros.length) * Math.PI) / 180;
                const radius = 85 + pro.distanceKm * 40;
                const posX = Math.cos(angle) * radius;
                const posY = Math.sin(angle) * radius;

                return (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedPro(pro)}
                    className="absolute z-20 group transition-all duration-300 focus:outline-none"
                    style={{ transform: `translate(${posX}px, ${posY}px)` }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold text-white transition-transform ${
                          isSelected
                            ? "bg-brand-orange scale-125 shadow-glow-orange ring-2 ring-white"
                            : "bg-slate-900/90 border border-cyan-400/50 hover:scale-110"
                        }`}
                      >
                        {pro.initials}
                      </div>
                      <div
                        className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md backdrop-blur-md transition-opacity ${
                          isSelected
                            ? "bg-brand-orange text-white opacity-100"
                            : "bg-slate-950/80 text-slate-300 border border-white/10 opacity-80 group-hover:opacity-100"
                        }`}
                      >
                        {pro.name.split(" ")[0]} • {pro.distanceKm}km
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none z-10">
                <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>
                    {lang === "hi"
                      ? `${filteredPros.length} पास के उपलब्ध कारीगर`
                      : `${filteredPros.length} Nearby Available Pros`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Selected Pro Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel-elevated p-6 rounded-3xl border border-black/10 dark:border-white/15 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${selectedPro.avatarColor} flex items-center justify-center text-white font-extrabold text-base shadow-md`}
                  >
                    {selectedPro.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-foreground">{selectedPro.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    </div>
                    <p className="text-xs text-brand-orange font-semibold">{selectedPro.service}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{selectedPro.subCategory}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedPro.rating}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {selectedPro.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-slate-900 border border-black/5 dark:border-white/5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === "hi" ? "पहुंचने का समय" : "Arrival ETA"}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {lang === "hi" ? "~18 मिनट" : "~18 Mins"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === "hi" ? "दूरी" : "Distance"}
                  </span>
                  <span className="font-bold text-foreground flex items-center gap-1 mt-0.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-500" />
                    {selectedPro.distanceKm} km
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                glow
                onClick={() => onBookPro(selectedPro)}
                className="w-full justify-center text-xs font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {lang === "hi" ? `बुक करें (${selectedPro.name.split(" ")[0]})` : `Book ${selectedPro.name.split(" ")[0]}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { HeroScene3D } from "@/components/3d/HeroScene3D";
import { useI18n } from "@/lib/i18n";
import {
  Search,
  MapPin,
  Mic,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string, location: string) => void;
  onVoiceClick: () => void;
  onBookClick: (category?: string) => void;
  onJoinProClick: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export function HeroSection({
  onSearch,
  onVoiceClick,
  onBookClick,
  onJoinProClick,
  onSelectCategory,
}: HeroSectionProps) {
  const { t, lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const quickChips = [
    { id: "plumber", emoji: "🚰", hi: "प्लंबर", en: "Plumber" },
    { id: "electrician", emoji: "💡", hi: "इलेक्ट्रीशियन", en: "Electrician" },
    { id: "ac-repair", emoji: "❄️", hi: "एसी रिपेयर", en: "AC Repair" },
    { id: "carpenter", emoji: "🪚", hi: "बढ़ई", en: "Carpenter" },
    { id: "cleaning", emoji: "🧹", hi: "सफ़ाई", en: "Cleaning" },
    { id: "mechanic", emoji: "🚗", hi: "मैकेनिक", en: "Mechanic" },
  ];

  const handleUseLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setIsLocating(false);
      setLocation(lang === "en" ? "Location unavailable" : "लोकेशन उपलब्ध नहीं है");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setIsLocating(false);
        setLocation(lang === "en" ? "Near my location" : "मेरे पास का इलाका");
      },
      () => {
        setIsLocating(false);
        setLocation(lang === "en" ? "Enter your area" : "अपना इलाका लिखें");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onVoiceClick();
      return;
    }
    onSearch(searchQuery.trim(), location.trim());
  };

  const handleQuickService = (chip: (typeof quickChips)[number]) => {
    const label = lang === "en" ? chip.en : chip.hi;
    setSearchQuery(label);
    onSelectCategory(chip.id);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-400/10 via-blue-500/10 to-amber-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-orange-500/10 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-slate-100 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>{lang === "en" ? "Local help, just a few taps away" : "आपके पास का कामगार, बस कुछ टैप दूर"}</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
            {lang === "en"
              ? "Ghar ka koi bhi kaam ho — just tell us. Find a nearby worker and get it sorted."
              : "घर में कोई भी काम हो — बस बताइए। पास का कामगार ढूंढिए और काम निपटाइए।"}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onBookClick()}
              className="flex items-center gap-2 rounded-2xl bg-brand-orange px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-600 sm:text-base"
            >
              <Search className="h-4 w-4" />
              <span>{t("hero.ctaPrimary")}</span>
            </button>
            <button
              onClick={onVoiceClick}
              className="flex items-center gap-2 rounded-2xl border-2 border-brand-orange/30 bg-white px-5 py-3.5 text-sm font-black text-slate-900 transition-all hover:border-brand-orange hover:bg-orange-50 dark:bg-slate-900 dark:text-white dark:hover:bg-orange-950/30 sm:text-base"
            >
              <Mic className="h-5 w-5 text-brand-orange" />
              <span>{lang === "en" ? "Tell by voice" : "बोलकर बताएं"}</span>
            </button>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            {lang === "en" ? "Hindi • English • Hinglish • Speak naturally" : "हिंदी • English • Hinglish • जैसे मन करे वैसे बोलें"}
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-[#101B33] sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white sm:text-xl">
                    <Sparkles className="h-5 w-5 text-brand-orange" />
                    <span>{t("search.heading")}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {lang === "en"
                      ? "Type it, tap a service, or simply speak."
                      : "लिखें, काम चुनें या सीधे बोलकर बताएं।"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-brand-orange" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search.placeholder")}
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-4 pl-12 pr-28 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-orange dark:border-slate-700 dark:bg-slate-900/90 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={onVoiceClick}
                    className="absolute right-2 flex items-center gap-1.5 rounded-xl bg-orange-500/10 px-3 py-2 text-xs font-black text-brand-orange transition-all hover:bg-brand-orange hover:text-white dark:bg-orange-500/20"
                    title="बोलकर खोजें / Voice Search"
                  >
                    <Mic className="h-4 w-4" />
                    <span className="hidden sm:inline">{lang === "en" ? "Speak" : "बोलें"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/80">
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-orange-100 px-3 py-2 text-xs font-black text-brand-orange transition-colors hover:bg-orange-200 dark:bg-orange-950/70 dark:hover:bg-orange-900"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{isLocating ? t("search.locationDetecting") : t("search.location")}</span>
                  </button>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={lang === "en" ? "Your area / locality" : "अपना इलाका / मोहल्ला"}
                    className="w-full bg-transparent px-1 text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange py-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 sm:text-base"
                >
                  <Search className="h-4 w-4" />
                  <span>{t("search.submit")}</span>
                </button>
              </form>

              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="mb-2 text-[11px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t("search.popular")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleQuickService(chip)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-100 hover:text-brand-orange dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-orange-950/60"
                    >
                      <span>{chip.emoji}</span>
                      <span>{lang === "en" ? chip.en : chip.hi}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 px-1">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/60">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span className="text-[10px] font-bold leading-tight text-slate-700 dark:text-slate-300">{t("hero.stat1")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/60">
                <Clock className="h-4 w-4 flex-shrink-0 text-brand-orange" />
                <span className="text-[10px] font-bold leading-tight text-slate-700 dark:text-slate-300">{t("hero.stat2")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/60">
                <Star className="h-4 w-4 flex-shrink-0 fill-amber-500 text-amber-500" />
                <span className="text-[10px] font-bold leading-tight text-slate-700 dark:text-slate-300">{t("hero.stat3")}</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <HeroScene3D
              onSelectCategory={(catId) => onSelectCategory(catId)}
              onBookClick={(catId) => onBookClick(catId)}
            />
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>✓ {lang === "en" ? "Nearby workers" : "पास के कामगार"}</span>
          <span>✓ {lang === "en" ? "Clear booking flow" : "आसान बुकिंग"}</span>
          <span>✓ {lang === "en" ? "Talk naturally" : "अपनी भाषा में बोलें"}</span>
        </div>
      </div>
    </section>
  );
}

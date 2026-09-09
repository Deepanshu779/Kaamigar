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
  PhoneCall,
  CheckCircle2,
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
  const [location, setLocation] = useState("Sector 14, Gurgaon");
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setLocation(lang === "en" ? "Near Your Location" : "आपके पास का इलाका");
        },
        () => {
          setIsLocating(false);
          setLocation("Sector 14, Gurgaon");
        }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        setLocation("Sector 14, Gurgaon");
      }, 600);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, location);
  };

  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      {/* Soft warm background gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-400/10 via-blue-500/10 to-amber-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 border border-orange-300/60 dark:border-orange-500/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("hero.badge")}</span>
          </div>
        </div>

        {/* Brand Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            “{t("hero.title")}”
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onBookClick()}
              className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>{t("hero.ctaPrimary")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onJoinProClick}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base transition-colors"
            >
              <span>{t("hero.ctaSecondary")}</span>
            </button>
          </div>
        </div>

        {/* HERO GRID: Left = Search as the Hero, Right = Friendly 3D Indian Home */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* SEARCH BOX AS THE HERO (Column 1 to 6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#101B33] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{t("search.heading")}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === "en"
                    ? "Type, select location or speak directly in your language"
                    : "टाइप करें, बोलकर बताएं या नीचे दिए काम पर दबाएं"}
                </p>
              </div>

              {/* Location Row */}
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80">
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-brand-orange text-xs font-bold hover:bg-orange-200 transition-colors flex-shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isLocating ? t("search.locationDetecting") : t("search.location")}</span>
                </button>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="अपना इलाका लिखें..."
                  className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none px-1"
                />
              </div>

              {/* Main Search Input Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400">
                    <Search className="w-5 h-5 text-brand-orange" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search.placeholder")}
                    className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-orange dark:focus:border-brand-orange text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                  />

                  {/* Voice Button inside search bar */}
                  <button
                    type="button"
                    onClick={onVoiceClick}
                    className="absolute right-2.5 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-brand-orange hover:bg-brand-orange hover:text-white transition-all text-xs font-bold"
                    title="बोलकर खोजें / Voice Search"
                  >
                    <Mic className="w-4 h-4 animate-pulse" />
                    <span className="hidden sm:inline">{lang === "en" ? "Speak" : "बोलें"}</span>
                  </button>
                </div>

                {/* Big Search Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{t("search.submit")}</span>
                </button>
              </form>

              {/* Quick Service Chips */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                  {t("search.popular")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(lang === "en" ? chip.en : chip.hi);
                        onSelectCategory(chip.id);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-orange-950/60 hover:text-brand-orange text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/80 dark:border-slate-700/60"
                    >
                      <span>{chip.emoji}</span>
                      <span>{lang === "en" ? chip.en : chip.hi}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 px-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t("hero.stat1")}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t("hero.stat2")}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {t("hero.stat3")}
                </span>
              </div>
            </div>
          </div>

          {/* 3D FRIENDLY INDIAN HOME (Column 7 to 12) */}
          <div className="lg:col-span-6 relative">
            <HeroScene3D
              onSelectCategory={(catId) => onSelectCategory(catId)}
              onBookClick={(catId) => onBookClick(catId)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

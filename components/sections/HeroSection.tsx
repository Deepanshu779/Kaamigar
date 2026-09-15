"use client";

import React, { useState } from "react";
import { HeroScene3D } from "@/components/3d/HeroScene3D";
import { useI18n } from "@/lib/i18n";
import { Search, MapPin, Mic, ShieldCheck, Clock, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string, location: string) => void;
  onVoiceClick: () => void;
  onBookClick: (category?: string) => void;
  onJoinProClick: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export function HeroSection({ onSearch, onVoiceClick, onBookClick, onSelectCategory }: HeroSectionProps) {
  const { lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [liveLocationActive, setLiveLocationActive] = useState(false);

  const quickChips = [
    { id: "plumber", emoji: "🚰", hi: "प्लंबर", en: "Plumber" },
    { id: "electrician", emoji: "💡", hi: "इलेक्ट्रीशियन", en: "Electrician" },
    { id: "ac-repair", emoji: "❄️", hi: "एसी रिपेयर", en: "AC Repair" },
    { id: "carpenter", emoji: "🪚", hi: "बढ़ई", en: "Carpenter" },
    { id: "cleaning", emoji: "🧹", hi: "सफ़ाई", en: "Cleaning" },
    { id: "mechanic", emoji: "🔧", hi: "मैकेनिक", en: "Mechanic" },
  ];

  const resolvePlaceName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
        headers: { "Accept-Language": lang === "hi" ? "hi,en" : "en,hi" },
      });
      if (!response.ok) return;
      const data = await response.json();
      const address = data?.address || {};
      const place = address.neighbourhood || address.suburb || address.city_district || address.town || address.city || address.village;
      if (place) setLocation(`📍 ${place}`);
    } catch {
      // Keep the current-location label when reverse geocoding is unavailable.
    }
  };

  const handleUseLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setIsLocating(false);
      setLocation(lang === "en" ? "Enter your area" : "अपना इलाका लिखें");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setLiveLocationActive(true);
        setLocation(lang === "en" ? "📍 Current location" : "📍 वर्तमान लोकेशन");
        void resolvePlaceName(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setIsLocating(false);
        setLiveLocationActive(false);
        setLocation(lang === "en" ? "Enter your area" : "अपना इलाका लिखें");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onVoiceClick();
      return;
    }
    onSearch(searchQuery.trim(), location.trim());
  };

  const selectService = (id: string, label: string) => {
    setSearchQuery(label);
    onSelectCategory(id);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50 pt-24 pb-10 dark:bg-[#070D1A] sm:pt-28 sm:pb-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-orange-100/70 via-blue-50/30 to-transparent dark:from-orange-950/20 dark:via-blue-950/10 dark:to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-[#101B33] dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {lang === "en" ? "Local workers for everyday problems" : "हर रोज़ के काम के लिए पास के कामिगार"}
          </div>
          <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            {lang === "en" ? "Need a worker? Find one nearby." : "काम है? पास का कामिगार ढूंढिए।"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {lang === "en" ? "Plumber, electrician, AC repair, carpenter, cleaning & more. Tell us what you need — we help you find the right person." : "प्लंबर, इलेक्ट्रीशियन, AC रिपेयर, बढ़ई, सफ़ाई और बहुत कुछ। बस अपना काम बताइए — सही कामिगार ढूंढिए।"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => onBookClick()} className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:text-base">
              <Search className="h-4 w-4" />
              {lang === "en" ? "Find a Kaamigar" : "कामिगार ढूंढें"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={onVoiceClick} className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-800 transition hover:border-brand-orange hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:text-base">
              <Mic className="h-5 w-5 text-brand-orange" />
              {lang === "en" ? "Tell by voice" : "बोलकर बताएं"}
            </button>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border-2 border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-[#101B33] sm:p-6">
              <div className="mb-4">
                <div className="text-lg font-black text-slate-950 dark:text-white sm:text-xl">
                  {lang === "en" ? "What do you need help with?" : "आपको किस काम के लिए मदद चाहिए?"}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {lang === "en" ? "Search a service or choose one below." : "काम लिखें या नीचे से चुनें।"}
                </div>
              </div>

              <form onSubmit={submitSearch} className="space-y-3">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-brand-orange" />
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={lang === "en" ? "e.g. tap leaking, AC not cooling..." : "जैसे नल खराब है, AC ठंडा नहीं कर रहा..."} className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-4 pl-12 pr-14 text-sm font-semibold text-slate-900 outline-none transition focus:border-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
                  <button type="button" onClick={onVoiceClick} className="absolute right-2 rounded-xl bg-orange-500/10 p-2.5 text-brand-orange hover:bg-brand-orange hover:text-white" aria-label="Voice search"><Mic className="h-4 w-4" /></button>
                </div>

                <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/80">
                  <button type="button" onClick={handleUseLocation} className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-black ${liveLocationActive ? "bg-emerald-500 text-white" : "bg-orange-100 text-brand-orange dark:bg-orange-950/70"}`}>
                    <MapPin className="h-4 w-4" />
                    {isLocating ? "..." : liveLocationActive ? (lang === "en" ? "GPS on" : "GPS चालू") : (lang === "en" ? "Use location" : "लोकेशन")}
                  </button>
                  <input value={location} onChange={(e) => { setLocation(e.target.value); setLiveLocationActive(false); }} placeholder={lang === "en" ? "Your area / locality" : "अपना इलाका / मोहल्ला"} className="min-w-0 w-full bg-transparent px-1 text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200" />
                </div>

                <button type="submit" className="w-full rounded-2xl bg-brand-orange py-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 sm:text-base">
                  {lang === "en" ? "Find Workers Near Me" : "पास के कामिगार ढूंढें"}
                </button>
              </form>

              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="mb-2 text-[11px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">{lang === "en" ? "Popular services" : "लोकप्रिय काम"}</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {quickChips.map((chip) => (
                    <button key={chip.id} type="button" onClick={() => selectService(chip.id, lang === "en" ? chip.en : chip.hi)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-orange-950/40">
                      <span className="text-base">{chip.emoji}</span>
                      <span>{lang === "en" ? chip.en : chip.hi}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-[#101B33]"><ShieldCheck className="mb-1 h-4 w-4 text-emerald-500" /><div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{lang === "en" ? "Verified profiles" : "वेरिफाइड प्रोफाइल"}</div></div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-[#101B33]"><Clock className="mb-1 h-4 w-4 text-brand-orange" /><div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{lang === "en" ? "Quick booking" : "आसान बुकिंग"}</div></div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-[#101B33]"><MapPin className="mb-1 h-4 w-4 text-blue-500" /><div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{lang === "en" ? "Nearby help" : "पास का काम"}</div></div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <HeroScene3D onSelectCategory={onSelectCategory} onBookClick={onBookClick} />
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-3xl text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          {lang === "en" ? "One place for home, appliance, vehicle and everyday repair services." : "घर, उपकरण, वाहन और रोज़मर्रा की मरम्मत सेवाएं — एक ही जगह।"}
        </div>
      </div>
    </section>
  );
}

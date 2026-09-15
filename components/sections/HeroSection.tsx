"use client";

import React, { useEffect, useRef, useState } from "react";
import { HeroScene3D } from "@/components/3d/HeroScene3D";
import { useI18n } from "@/lib/i18n";
import { Search, MapPin, Mic, ArrowRight, ShieldCheck, Clock3, Star, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string, location: string) => void;
  onVoiceClick: () => void;
  onBookClick: (category?: string) => void;
  onJoinProClick: () => void;
  onSelectCategory: (categoryId: string) => void;
}

type LiveCoordinates = { latitude: number; longitude: number; accuracy: number };

export function HeroSection({ onSearch, onVoiceClick, onBookClick, onJoinProClick, onSelectCategory }: HeroSectionProps) {
  const { lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [liveLocationActive, setLiveLocationActive] = useState(false);
  const [coordinates, setCoordinates] = useState<LiveCoordinates | null>(null);
  const watchId = useRef<number | null>(null);

  const quickServices = [
    { id: "plumber", icon: "🚰", en: "Plumber", hi: "प्लंबर" },
    { id: "electrician", icon: "⚡", en: "Electrician", hi: "इलेक्ट्रीशियन" },
    { id: "ac-repair", icon: "❄️", en: "AC repair", hi: "एसी रिपेयर" },
    { id: "carpenter", icon: "🪚", en: "Carpenter", hi: "बढ़ई" },
    { id: "cleaning", icon: "🧹", en: "Cleaning", hi: "सफ़ाई" },
  ];

  const stopLiveLocation = () => {
    if (watchId.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setLiveLocationActive(false);
    setIsLocating(false);
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    stopLiveLocation();
    const message = error.code === error.PERMISSION_DENIED
      ? (lang === "en" ? "Allow location access" : "लोकेशन की अनुमति दें")
      : (lang === "en" ? "Location unavailable" : "लोकेशन उपलब्ध नहीं");
    setLocation(message);
    setCoordinates(null);
  };

  const startLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocation(lang === "en" ? "Location is not supported" : "लोकेशन सपोर्ट नहीं है");
      return;
    }

    setIsLocating(true);
    setLiveLocationActive(true);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const next = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setCoordinates(next);
        setIsLocating(false);
        const accuracy = Math.round(next.accuracy);
        setLocation(lang === "en"
          ? `📍 Live location • ±${accuracy}m`
          : `📍 लाइव लोकेशन • ±${accuracy}m`);
      },
      handleLocationError,
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  };

  const handleUseLocation = () => {
    if (liveLocationActive) {
      stopLiveLocation();
      return;
    }
    startLiveLocation();
  };

  useEffect(() => () => stopLiveLocation(), []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      onBookClick();
      return;
    }
    const liveLocation = coordinates
      ? `Live GPS: ${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)} (±${Math.round(coordinates.accuracy)}m)`
      : location.trim();
    onSearch(searchQuery.trim(), liveLocation);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-24 pb-10 sm:pt-28 sm:pb-14">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">●</span>
            {lang === "en" ? "Local services, built for everyday life" : "रोज़मर्रा के कामों के लिए स्थानीय सेवा"}
          </div>
          <div className="hidden items-center gap-5 text-[11px] font-bold text-slate-500 sm:flex">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> {lang === "en" ? "See worker details" : "कामिगार की जानकारी देखें"}</span>
            <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-brand-orange" /> {lang === "en" ? "Pick your time" : "अपना समय चुनें"}</span>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[11px] font-extrabold text-brand-orange">
                <Sparkles className="h-3.5 w-3.5" />
                {lang === "en" ? "One place for home & local work" : "घर और स्थानीय काम के लिए एक जगह"}
              </div>
              <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[70px]">
                {lang === "hi" ? "काम है?" : "Need a hand?"}
                <span className="mt-1 block text-brand-orange">{lang === "hi" ? "कामिगार है।" : "Kaamigar is here."}</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                {lang === "en" ? "Find a nearby worker for repairs, cleaning, appliances, vehicles and everyday jobs — then book in a few taps." : "मरम्मत, सफ़ाई, अप्लायंस, वाहन और रोज़मर्रा के कामों के लिए पास का कामिगार खोजें और कुछ टैप में बुक करें।"}
              </p>

              <form onSubmit={handleSubmit} className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3">
                  <Search className="h-5 w-5 text-brand-orange" />
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={lang === "en" ? "What do you need help with?" : "किस काम के लिए मदद चाहिए?"} className="h-12 min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" />
                  <button type="button" onClick={onVoiceClick} className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[11px] font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-brand-orange"><Mic className="h-3.5 w-3.5" />{lang === "en" ? "Voice" : "बोलें"}</button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button type="button" onClick={handleUseLocation} className={`flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-[11px] font-extrabold ${liveLocationActive ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"}`}>
                    <MapPin className="h-3.5 w-3.5" />
                    {isLocating ? (lang === "en" ? "Finding..." : "ढूंढ रहे हैं...") : liveLocationActive ? (lang === "en" ? "Live location" : "लाइव लोकेशन") : (lang === "en" ? "Use my location" : "मेरी लोकेशन")}
                  </button>
                  <input value={location} onChange={(e) => { setLocation(e.target.value); if (liveLocationActive) stopLiveLocation(); }} placeholder={lang === "en" ? "Area / locality" : "इलाका / मोहल्ला"} className="min-w-0 flex-1 bg-transparent px-1 text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-400" />
                  <button type="submit" className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-brand-orange px-4 text-xs font-black text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600">
                    {lang === "en" ? "Find" : "खोजें"}<ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {liveLocationActive && coordinates && (
                  <div className="mt-2 flex items-center gap-2 px-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    {lang === "en" ? `GPS active • ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}` : `GPS सक्रिय • ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`}
                  </div>
                )}
              </form>

              <div className="mt-5">
                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">{lang === "en" ? "Popular near you" : "लोकप्रिय सेवाएं"}</div>
                <div className="flex flex-wrap gap-2">
                  {quickServices.map((service) => (
                    <button key={service.id} onClick={() => onSelectCategory(service.id)} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:text-brand-orange"><span>{service.icon}</span>{lang === "en" ? service.en : service.hi}</button>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-4 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{lang === "en" ? "Clear worker profiles" : "स्पष्ट प्रोफाइल"}</span>
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{lang === "en" ? "Ratings & reviews" : "रेटिंग और रिव्यू"}</span>
                <span>{lang === "en" ? "Hindi • English • Hinglish" : "हिंदी • English • Hinglish"}</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="absolute -top-3 left-4 z-20 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-[11px] font-extrabold text-slate-700 shadow-lg backdrop-blur sm:left-8">
              {lang === "en" ? "Explore your home — tap a problem to start" : "घर देखें — समस्या पर टैप करके शुरू करें"}
            </div>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/10">
              <HeroScene3D onSelectCategory={onSelectCategory} onBookClick={onBookClick} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 border-t border-slate-200 pt-5 sm:grid-cols-4">
          {[
            { title: lang === "en" ? "Search" : "खोजें", desc: lang === "en" ? "Tell us the problem" : "काम बताएं" },
            { title: lang === "en" ? "Compare" : "देखें", desc: lang === "en" ? "Check worker details" : "कामिगार देखें" },
            { title: lang === "en" ? "Book" : "बुक करें", desc: lang === "en" ? "Choose time & place" : "समय और जगह चुनें" },
            { title: lang === "en" ? "Done" : "काम पूरा", desc: lang === "en" ? "Get the job sorted" : "काम निपटाएं" },
          ].map((step, index) => (
            <div key={step.title} className="flex items-center gap-3 px-2 py-2 sm:px-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-700">0{index + 1}</span>
              <div><div className="text-xs font-black text-slate-900">{step.title}</div><div className="text-[9px] font-semibold text-slate-400">{step.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

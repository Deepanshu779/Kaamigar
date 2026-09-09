"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Home, Leaf, MapPin, Rotate3D, Sparkles, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface HomeExplorerProps {
  onBookClick: (serviceId?: string) => void;
}

type Area = "outside" | "ground" | "upper";

const areas = {
  outside: {
    en: "Outside",
    hi: "बाहर",
    items: [
      ["garden", "🌳", "Garden", "बगीचा", "gardening"],
      ["tank", "💧", "Water Tank", "पानी की टंकी", "plumber"],
      ["car", "🚗", "Car", "कार", "mechanic"],
      ["bike", "🏍️", "Bike", "बाइक", "mechanic"],
      ["khet", "🌾", "Khet / Farm", "खेत", "farm"],
      ["pump", "🚰", "Water Pump", "पानी का पंप", "plumber"],
      ["solar", "☀️", "Solar Panel", "सोलर पैनल", "electrician"],
    ],
  },
  ground: {
    en: "Ground Floor",
    hi: "ग्राउंड फ्लोर",
    items: [
      ["fan", "🌀", "Fan / Light", "पंखा / लाइट", "electrician"],
      ["kitchen", "🍳", "Kitchen", "किचन", "kitchen"],
      ["tap", "🚰", "Tap / Sink", "नल / सिंक", "plumber"],
      ["toilet", "🚿", "Toilet / Bathroom", "टॉयलेट / बाथरूम", "plumber"],
      ["sofa", "🛋️", "Sofa / Furniture", "सोफा / फर्नीचर", "carpenter"],
      ["door", "🚪", "Door / Lock", "दरवाज़ा / ताला", "carpenter"],
    ],
  },
  upper: {
    en: "Upper Floor",
    hi: "ऊपरी मंज़िल",
    items: [
      ["ac", "❄️", "AC", "एसी", "ac-repair"],
      ["bed", "🛏️", "Bed / Furniture", "बेड / फर्नीचर", "carpenter"],
      ["fan2", "🌀", "Fan / Wiring", "पंखा / वायरिंग", "electrician"],
      ["bath2", "🚿", "Bathroom", "बाथरूम", "plumber"],
      ["window", "🪟", "Window / Grill", "खिड़की / ग्रिल", "carpenter"],
    ],
  },
} as const;

export function HomeExplorer({ onBookClick }: HomeExplorerProps) {
  const { lang } = useI18n();
  const [area, setArea] = useState<Area>("ground");
  const [selected, setSelected] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);

  const current = areas[area];
  const selectedItem = useMemo(() => current.items.find((item) => item[0] === selected), [current.items, selected]);

  const text = {
    title: lang === "en" ? "Explore your home" : "अपने घर में जाकर काम चुनें",
    subtitle:
      lang === "en"
        ? "Enter the home, pick the thing that needs fixing, and we’ll suggest the right Kaamigar."
        : "घर के अंदर जाएँ, जिस चीज़ में दिक्कत है उस पर टैप करें और सही कामिगार पाएँ।",
    enter: lang === "en" ? "Enter Home" : "घर के अंदर जाएँ",
    outside: lang === "en" ? "Outside" : "बाहर",
    ground: lang === "en" ? "Ground Floor" : "ग्राउंड फ्लोर",
    upper: lang === "en" ? "Upper Floor" : "ऊपरी मंज़िल",
    selected: lang === "en" ? "You selected" : "आपने चुना",
    find: lang === "en" ? "Find a Kaamigar" : "कामिगार ढूंढें",
    hint:
      lang === "en"
        ? "Tip: you don't need to know the worker's name — just select the problem."
        : "टिप: आपको कामिगार का नाम जानने की ज़रूरत नहीं — बस समस्या चुनें।",
  };

  return (
    <section id="home-explorer" className="relative border-y border-slate-200/80 bg-white py-14 dark:border-slate-800/80 dark:bg-[#0b1325] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1.5 text-xs font-black text-brand-orange">
            <Rotate3D className="h-4 w-4" />
            {lang === "en" ? "Interactive Home" : "इंटरैक्टिव घर"}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">{text.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{text.subtitle}</p>
        </div>

        <div className="mt-9 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-[#101a31]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/30 sm:p-4">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(areas) as Area[]).map((key) => (
                <button
                  key={key}
                  onClick={() => { setArea(key); setSelected(null); setEntered(key !== "outside"); }}
                  className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${area === key ? "bg-brand-orange text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-orange-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-orange-950/30"}`}
                >
                  {key === "outside" ? text.outside : key === "ground" ? text.ground : text.upper}
                </button>
              ))}
            </div>
            {!entered && (
              <button onClick={() => { setEntered(true); setArea("ground"); }} className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950">
                <Home className="h-4 w-4" />
                {text.enter}
              </button>
            )}
          </div>

          <div className="grid min-h-[360px] grid-cols-1 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-emerald-50 p-5 dark:from-slate-900 dark:via-[#111c32] dark:to-emerald-950/20 sm:p-8">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(100,116,139,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,.18)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative mx-auto flex h-full min-h-[330px] max-w-2xl items-center justify-center">
                <div className={`relative w-full max-w-xl rounded-[2rem] border-4 border-white/80 bg-white/70 p-5 shadow-2xl backdrop-blur-sm transition-all duration-500 dark:border-slate-700 dark:bg-slate-900/70 ${entered ? "scale-[1.02]" : ""}`}>
                  <div className="absolute -top-4 left-6 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black text-white dark:bg-white dark:text-slate-950">
                    {area === "outside" ? "🏡 PROPERTY" : area === "ground" ? "🏠 1F • HOME" : "🏠 2F • HOME"}
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {current.items.map(([id, emoji, en, hi, service]) => {
                      const active = selected === id;
                      return (
                        <button key={id} onClick={() => setSelected(id)} className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${active ? "-translate-y-1 border-brand-orange bg-orange-50 shadow-lg shadow-orange-500/15 dark:bg-orange-950/30" : "border-slate-200 bg-white hover:-translate-y-1 hover:border-orange-200 dark:border-slate-700 dark:bg-slate-900"}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{emoji}</span>
                            {active && <Sparkles className="h-4 w-4 text-brand-orange" />}
                          </div>
                          <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">{lang === "en" ? en : hi}</div>
                          <div className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">{service === "electrician" ? "Electrician" : service === "plumber" ? "Plumber" : service === "carpenter" ? "Carpenter" : service === "mechanic" ? "Mechanic" : service === "ac-repair" ? "AC Repair" : "Service"}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0f172a] lg:border-l lg:border-t-0 sm:p-8">
              <div>
                <div className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                  <MapPin className="h-4 w-4 text-brand-orange" />
                  {area === "outside" ? "Property" : area === "ground" ? text.ground : text.upper}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{text.hint}</p>

                {selectedItem ? (
                  <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
                    <div className="text-3xl">{selectedItem[1]}</div>
                    <div className="mt-3 text-xs font-bold text-brand-orange">{text.selected}</div>
                    <div className="mt-1 text-xl font-black text-slate-950 dark:text-white">{lang === "en" ? selectedItem[2] : selectedItem[3]}</div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      {lang === "en" ? "We’ll route this to the appropriate local service." : "आपकी समस्या सही स्थानीय सेवा तक भेजी जाएगी।"}
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/60">
                    <Wrench className="h-7 w-7 text-brand-orange" />
                    <div className="mt-3 text-sm font-black text-slate-900 dark:text-white">{lang === "en" ? "Tap what needs fixing" : "जिस चीज़ में दिक्कत है, उस पर टैप करें"}</div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{lang === "en" ? "No technical knowledge needed." : "आपको तकनीकी जानकारी की ज़रूरत नहीं है।"}</div>
                  </div>
                )}
              </div>

              {selectedItem && (
                <button onClick={() => onBookClick(selectedItem[4])} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange py-3.5 text-sm font-black text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">
                  {text.find}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><Home className="h-3.5 w-3.5" /> Rooms & appliances</span>
          <span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5" /> Garden & khet</span>
          <span className="flex items-center gap-1.5"><Wrench className="h-3.5 w-3.5" /> Tap-to-service</span>
        </div>
      </div>
    </section>
  );
}

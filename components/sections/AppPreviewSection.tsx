"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import {
  Smartphone,
  Mic,
  MessageCircle,
  Phone,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

interface AppPreviewSectionProps {
  onBookClick: () => void;
}

export function AppPreviewSection({ onBookClick }: AppPreviewSectionProps) {
  const { t, lang } = useI18n();

  return (
    <section id="app-preview" className="py-16 sm:py-20 relative bg-white dark:bg-[#0B1325]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Explanations */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Made for Android Phones" : "सभी मोबाइल पर चलने वाला"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t("app.heading")}
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300">
              {t("app.subheading")}
            </p>

            {/* 3 Friendly features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#101B33] border border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-brand-orange shrink-0 text-xl">
                  🎤
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t("app.feature1")}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {lang === "en"
                      ? "Just say 'Mujhe plumber chahiye' or 'AC kharab hai'. No typing needed."
                      : "टाइप करने की ज़रूरत नहीं — बस बोलिए 'नल ठीक करवाना है' और कामगार मिल जाएगा।"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#101B33] border border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 shrink-0 text-xl">
                  💬
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t("app.feature2")}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {lang === "en"
                      ? "Get clear WhatsApp updates with worker name, photo, and exact price."
                      : "कामगार का नाम, फोन नंबर और तय रेट सीधे आपके व्हाट्सएप पर मिल जाते हैं।"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-[#101B33] border border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 shrink-0 text-xl">
                  📍
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t("app.feature3")}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {lang === "en"
                      ? "Call your Kaamigar directly anytime to coordinate arrival."
                      : "सीधे एक बटन दबाकर कामगार से बात करें और समय तय करें।"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white text-sm font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>{lang === "en" ? "Book on Phone Now" : "फोन पर अभी बुक करें"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful Clean Android Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[320px] sm:w-[350px] rounded-[44px] bg-slate-900 p-3 shadow-2xl border-4 border-slate-700/80 relative">
              {/* Camera punch hole */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border border-slate-700 z-30" />

              {/* Phone Screen Screen */}
              <div className="w-full bg-slate-50 dark:bg-[#0B1325] rounded-[36px] overflow-hidden p-4 pt-8 text-slate-900 dark:text-white space-y-4 border border-slate-200 dark:border-slate-800">
                {/* Phone Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-brand-orange text-white text-xs font-black flex items-center justify-center">
                      क
                    </div>
                    <span className="text-xs font-extrabold tracking-tight">KAAMIGAR</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold">
                    ● गुड़गांव
                  </span>
                </div>

                {/* Voice Search Box */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>🔍</span>
                    <span>“मुझे प्लंबर चाहिए”</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-brand-orange text-white shadow">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Quick 4 Service Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl mb-1">🚰</div>
                    <div className="text-xs font-bold">नल व प्लंबर</div>
                    <div className="text-[10px] text-brand-orange font-bold">₹149 से</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl mb-1">💡</div>
                    <div className="text-xs font-bold">बिजली मिस्त्री</div>
                    <div className="text-[10px] text-brand-orange font-bold">₹149 से</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl mb-1">❄️</div>
                    <div className="text-xs font-bold">एसी रिपेयर</div>
                    <div className="text-[10px] text-brand-orange font-bold">₹399 से</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl mb-1">🪚</div>
                    <div className="text-xs font-bold">बढ़ई (कारपेंटर)</div>
                    <div className="text-[10px] text-brand-orange font-bold">₹199 से</div>
                  </div>
                </div>

                {/* Simulated Live WhatsApp Order Card */}
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp अपडेट
                    </span>
                    <span>12:30 PM</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 text-[11px] text-slate-700 dark:text-slate-200 space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>रमेश कुमार (प्लंबर)</span>
                      <span className="text-emerald-600">पहुंच रहे हैं</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      दूरी: 1.2 किमी • समय: 12 मिनट • तय दर: ₹149
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold text-slate-500">OTP: 4821</span>
                    <button className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <Phone className="w-3 h-3" />
                      <span>कॉल करें</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

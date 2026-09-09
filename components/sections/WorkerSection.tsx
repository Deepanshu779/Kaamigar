"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import {
  MessageCircle,
  PhoneCall,
  MapPin,
  CreditCard,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface WorkerSectionProps {
  onJoinClick: () => void;
}

export function WorkerSection({ onJoinClick }: WorkerSectionProps) {
  const { t, lang } = useI18n();

  const benefits = [
    {
      icon: <MapPin className="w-5 h-5 text-brand-orange" />,
      title: t("worker.benefit1"),
      desc: lang === "en" ? "Work right in your neighborhood within 3-5 km. No long travels." : "घर के पास 3-5 किमी में काम। शहर भर में भटकने की ज़रूरत नहीं।",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      title: t("worker.benefit2"),
      desc: lang === "en" ? "Daily payments directly credited into your Bank or UPI every evening." : "रोज़ की कमाई रोज़ शाम को सीधे बैंक या UPI खाते में।",
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: t("worker.benefit3"),
      desc: lang === "en" ? "Keep 100% of your earnings on your first 10 orders. Zero commission." : "शुरुआती 10 कामों पर शून्य कमीशन। पूरी 100% कमाई आपकी।",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
      title: t("worker.benefit4"),
      desc: lang === "en" ? "Accident cover and security for you and your family." : "आपके और आपके परिवार के लिए सुरक्षा और सहायता।",
    },
  ];

  return (
    <section id="for-workers" className="py-16 sm:py-20 relative bg-slate-50 dark:bg-[#070D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101B33] to-[#0A1022] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold">
                <span>🤝 {lang === "en" ? "Respect & Growth for Workers" : "कामगार भाईयों के लिए"}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {t("worker.heading")}
              </h2>

              <p className="text-base sm:text-lg text-orange-200 font-bold leading-relaxed">
                “{t("worker.subheading")}”
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t("worker.desc")}
              </p>

              {/* 1-Tap Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {/* Main Modal CTA */}
                <button
                  onClick={onJoinClick}
                  className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2"
                >
                  <span>{t("worker.cta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Link */}
                <a
                  href="https://wa.me/919800000000?text=%E0%A4%95%E0%A4%BE%E0%A4%AE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("worker.whatsapp")}</span>
                </a>
              </div>

              {/* Missed Call Notice */}
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <PhoneCall className="w-4 h-4 text-brand-orange" />
                <span>{t("worker.missedCall")}</span>
              </div>
            </div>

            {/* Right Side: 4 Clear Respectful Benefits */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-start gap-3 hover:bg-white/[0.1] transition-colors"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-white/10 flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

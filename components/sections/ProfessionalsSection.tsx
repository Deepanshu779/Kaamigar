"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { EarningsCalculator } from "./EarningsCalculator";
import { useI18n } from "@/lib/i18n";
import {
  Wrench,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  Award,
} from "lucide-react";

interface ProfessionalsSectionProps {
  onJoinClick: () => void;
}

export function ProfessionalsSection({ onJoinClick }: ProfessionalsSectionProps) {
  const { t, lang } = useI18n();

  const benefits = [
    {
      icon: <MapPin className="w-5 h-5 text-brand-orange" />,
      title: t("worker.b1"),
      desc: t("worker.b1.desc"),
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      title: t("worker.b2"),
      desc: t("worker.b2.desc"),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
      title: t("worker.b3"),
      desc: t("worker.b3.desc"),
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: t("worker.b4"),
      desc: t("worker.b4.desc"),
    },
  ];

  return (
    <section id="professionals" className="py-20 relative overflow-hidden bg-black/[0.02] dark:bg-black/40 border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Worker Banner with Real Photo */}
        <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl mb-14 bg-gradient-to-r from-brand-navy via-slate-900 to-[#0A1022] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Copy & 1-Tap Join Actions */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("worker.badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {t("worker.title1")}{" "}
                <span className="text-gradient-orange">{t("worker.title2")}</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t("worker.subtitle")}
              </p>

              {/* 1-Tap Grassroots Actions (WhatsApp + Missed Call) */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t("worker.easyJoin")}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/919876543210?text=Namaste%20Kaamigar,%20mujhe%20kaam%20chahiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>{t("worker.whatsappBtn")}</span>
                  </a>

                  {/* Missed Call Button */}
                  <a
                    href="tel:18001205226"
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-orange" />
                    <span>{t("worker.callBtn")}</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  {lang === "hi"
                    ? "*पढ़े-लिखे होना जरूरी नहीं। हमारी टीम आपको फोन पर पूरी जानकारी देगी।"
                    : "*Zero formal literacy needed. Our support team assists you over call."}
                </p>
              </div>
            </div>

            {/* Right Real Photograph of Smiling Indian Service Team */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative min-h-[320px]">
              <img
                src="/images/worker_team.jpg"
                alt="Kaamigar Skilled Workers Team"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-90 lg:opacity-70" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs max-w-[200px] shadow-xl">
                <div className="font-bold text-brand-orange flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  10,000+ कामगार साथी
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  बिजली, प्लंबर, कारपेंटर और सफाई कर्मी
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Earnings Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: 4 Key Grassroots Benefits */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              {lang === "hi" ? "कामगार से जुड़ने के फायदे" : "Why Skilled Workers Love Kaamigar"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="p-4 rounded-2xl glass-panel space-y-1.5 border border-black/10 dark:border-white/10">
                  <div className="p-2 rounded-xl bg-black/5 dark:bg-slate-800 w-fit">{b.icon}</div>
                  <h4 className="text-sm font-bold text-foreground pt-1">{b.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick direct sign-up trigger */}
            <div className="p-4 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-between gap-4">
              <div className="text-xs">
                <span className="font-bold text-foreground block">
                  {lang === "hi" ? "ऑनलाइन फॉर्म भरना चाहते हैं?" : "Prefer filling an online form?"}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {lang === "hi" ? "सिर्फ नाम और मोबाइल नंबर डालकर शुरू करें" : "Just enter your name and phone number"}
                </span>
              </div>
              <Button size="sm" variant="primary" glow onClick={onJoinClick} className="shrink-0 text-xs">
                {lang === "hi" ? "फॉर्म भरें" : "Open Form"}
              </Button>
            </div>
          </div>

          {/* Right: Interactive Earnings Calculator */}
          <div className="lg:col-span-6">
            <EarningsCalculator onJoinClick={onJoinClick} />
          </div>
        </div>

      </div>
    </section>
  );
}

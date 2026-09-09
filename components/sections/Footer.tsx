"use client";

import React from "react";
import Link from "next/link";
import { useI18n, Language } from "@/lib/i18n";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Sun, Moon, PhoneCall, MessageCircle } from "lucide-react";

interface FooterProps {
  onBookClick: () => void;
  onJoinProClick: () => void;
}

export function Footer({ onBookClick, onJoinProClick }: FooterProps) {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const languages: { code: Language; label: string }[] = [
    { code: "hi", label: "हिन्दी" },
    { code: "en", label: "English" },
    { code: "hinglish", label: "Hinglish" },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#060B17] border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-orange text-white font-black text-lg flex items-center justify-center shadow">
                क
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                KAAMIGAR
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-xs text-slate-600 dark:text-slate-400">
              {t("footer.desc")}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:18001205226"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-brand-orange font-bold text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>1800-120-5226</span>
              </a>
            </div>
          </div>

          {/* Customers Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.customers")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="hover:text-brand-orange transition-colors">
                  {lang === "en" ? "Services (सेवाएं)" : "सेवाएं (Services)"}
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-brand-orange transition-colors">
                  {lang === "en" ? "How It Works (कैसे काम करता है)" : "कैसे काम करता है"}
                </Link>
              </li>
              <li>
                <Link href="#trust" className="hover:text-brand-orange transition-colors">
                  {lang === "en" ? "Trust & Safety (सुरक्षा व भरोसा)" : "सुरक्षा और भरोसा"}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-brand-orange transition-colors">
                  {lang === "en" ? "Help & Support (मदद)" : "मदद और सवाल (Help)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kaamigar Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.workers")}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onJoinProClick}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  {lang === "en" ? "Join as Kaamigar (कामगार बनें)" : "कामगार के रूप में जुड़ें"}
                </button>
              </li>
              <li>
                <button
                  onClick={onBookClick}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  {lang === "en" ? "Kaamigar Login" : "कामगार लॉगिन"}
                </button>
              </li>
              <li>
                <Link href="#for-workers" className="hover:text-brand-orange transition-colors">
                  {lang === "en" ? "Daily Earnings (कमाई)" : "रोज़ाना कमाई व फायदे"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Controls */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-500">{lang === "en" ? "About Kaamigar" : "कामगार के बारे में"}</span>
              </li>
              <li>
                <span className="text-slate-500">{lang === "en" ? "Privacy Policy" : "प्राइवेसी पॉलिसी"}</span>
              </li>
              <li>
                <span className="text-slate-500">{lang === "en" ? "Terms of Service" : "नियम व शर्तें"}</span>
              </li>
            </ul>

            {/* Language & Theme Controls in Footer */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      lang === l.code
                        ? "bg-brand-orange text-white"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-500" />}
                <span>{theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>{t("footer.rights")}</div>
          <div className="text-brand-orange font-bold">
            {lang === "en" ? "“Kaam hai? Kaamigar hai.”" : "“काम है? कामगार है।”"}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useI18n, Language } from "@/lib/i18n";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  User,
  PhoneCall,
  LogIn,
} from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
  onJoinProClick: () => void;
  onLoginClick?: () => void;
}

export function Navbar({ onBookClick, onJoinProClick, onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.howItWorks"), href: "#how-it-works" },
    { name: t("nav.workers"), href: "#for-workers" },
    { name: t("nav.faq"), href: "#faq" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "hi", label: "हिन्दी" },
    { code: "en", label: "English" },
    { code: "hinglish", label: "Hinglish" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0B1325]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md py-2.5"
          : "bg-white/80 dark:bg-[#0B1325]/80 backdrop-blur-sm py-3.5 border-b border-slate-100 dark:border-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shadow-md text-white font-black text-xl group-hover:scale-105 transition-transform">
            क
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              KAAMIGAR
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-brand-orange border border-orange-200 dark:border-orange-800">
                कामगार
              </span>
            </span>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">
              {t("brand.tagline")}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-orange dark:hover:text-brand-orange px-3.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls: Language + Theme + Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector (हिन्दी | English | Hinglish) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === l.code
                    ? "bg-brand-orange text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle (☀️ Light / 🌙 Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-orange transition-colors"
            title={theme === "dark" ? "Light Mode / लाइट मोड" : "Dark Mode / डार्क मोड"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={onLoginClick || onBookClick}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-brand-orange" />
            <span>{t("nav.login")}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1325] border-b border-slate-200 dark:border-slate-800 px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">भाषा / Language:</span>
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      lang === l.code
                        ? "bg-brand-orange text-white"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold shadow text-center"
              >
                {t("nav.findKaamigar")}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onJoinProClick();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold text-center"
              >
                {t("nav.joinKaamigar")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

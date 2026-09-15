"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useI18n, Language } from "@/lib/i18n";
import { Menu, X, Sun, Moon, LogIn, ChevronDown } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.howItWorks"), href: "#how-it-works" },
    { name: t("nav.workers"), href: "#for-workers" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "hi", label: "हिन्दी" },
    { code: "en", label: "English" },
    { code: "hinglish", label: "Hinglish" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#080E1A]/95"
          : "bg-white/90 backdrop-blur-md dark:bg-[#080E1A]/90"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange text-lg font-black text-white shadow-sm shadow-orange-500/20">
            क
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-[19px] font-black tracking-[-0.03em] text-slate-950 dark:text-white">KAAMIGAR</span>
              <span className="hidden rounded-md bg-orange-50 px-1.5 py-1 text-[9px] font-extrabold text-brand-orange sm:inline dark:bg-orange-950/50">कामिगार</span>
            </div>
            <span className="mt-1 block text-[10px] font-semibold text-slate-500 dark:text-slate-400">{lang === "hi" ? "काम है? कामिगार है।" : "Local help. Made simple."}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[13px] font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900 sm:flex">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={`rounded-md px-2 py-1 text-[10px] font-extrabold transition-all ${
                  lang === item.code
                    ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-brand-orange dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:flex"
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={onLoginClick || onBookClick}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-[12px] font-extrabold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 sm:flex"
          >
            <LogIn className="h-3.5 w-3.5" />
            {t("nav.login")}
          </button>

          <button
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white lg:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-xl dark:border-slate-800 dark:bg-[#080E1A] lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {link.name}
                <ChevronDown className="h-4 w-4 -rotate-90 text-slate-400" />
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="rounded-xl bg-brand-orange py-3 text-xs font-black text-white">{t("nav.findKaamigar")}</button>
            <button onClick={() => { setMobileMenuOpen(false); onJoinProClick(); }} className="rounded-xl border border-slate-300 py-3 text-xs font-black text-slate-800 dark:border-slate-700 dark:text-white">{t("nav.joinKaamigar")}</button>
          </div>
        </div>
      )}
    </header>
  );
}

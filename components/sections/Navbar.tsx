"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n, Language } from "@/lib/i18n";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
  onJoinProClick: () => void;
  onLoginClick?: () => void;
}

export function Navbar({ onBookClick, onJoinProClick, onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl" : "bg-white/90 backdrop-blur-md"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Kaamigar home">
          <Image
            src="/kaamigar-logo.png"
            alt="Kaamigar - Trusted People. Local Work. Happier Homes."
            width={190}
            height={64}
            priority
            className="h-auto w-[150px] object-contain sm:w-[175px] lg:w-[190px]"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="rounded-lg px-3.5 py-2 text-[13px] font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950">{link.name}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 sm:flex">
            {languages.map((item) => (
              <button key={item.code} onClick={() => setLang(item.code)} className={`rounded-md px-2 py-1 text-[10px] font-extrabold transition-all ${lang === item.code ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>{item.label}</button>
            ))}
          </div>

          <button onClick={onLoginClick || onBookClick} className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-[12px] font-extrabold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:flex">
            <LogIn className="h-3.5 w-3.5" />
            {t("nav.login")}
          </button>

          <button onClick={() => setMobileMenuOpen((value) => !value)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 lg:hidden" aria-label="Open menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-xl lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100">
                {link.name}
                <ChevronDown className="h-4 w-4 -rotate-90 text-slate-400" />
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
            <button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="rounded-xl bg-brand-orange py-3 text-xs font-black text-white">{t("nav.findKaamigar")}</button>
            <button onClick={() => { setMobileMenuOpen(false); onJoinProClick(); }} className="rounded-xl border border-slate-300 py-3 text-xs font-black text-slate-800">{t("nav.joinKaamigar")}</button>
          </div>
        </div>
      )}
    </header>
  );
}

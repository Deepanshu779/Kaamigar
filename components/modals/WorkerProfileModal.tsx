"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import {
  Star,
  MapPin,
  ShieldCheck,
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";

interface WorkerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  pro: Professional | null;
  onBookNow: (pro: Professional) => void;
}

export function WorkerProfileModal({
  isOpen,
  onClose,
  pro,
  onBookNow,
}: WorkerProfileModalProps) {
  const { lang, t } = useI18n();

  if (!pro) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lang === "en" ? `${pro.name} • Profile` : `${pro.hindiName} • प्रोफाइल`}
      subtitle={lang === "en" ? `Verified ${pro.service} near your area` : `वेरिफाइड ${pro.hindiService} • आपके इलाके के पास`}
      maxWidth="md"
    >
      <div className="space-y-5 py-1">
        {/* Worker Header Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
            {pro.serviceEmoji}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {lang === "en" ? pro.name : pro.hindiName}
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" />
                {t("nearby.verified")}
              </span>
            </div>

            <div className="text-xs font-bold text-brand-orange">
              {lang === "en" ? pro.service : pro.hindiService} • {pro.experienceYears} {lang === "en" ? "Years Experience" : "साल का अनुभव"}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {pro.area}, {pro.city} ({pro.distanceKm} km)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900 dark:text-white">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{pro.rating}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {lang === "en" ? "Rating" : "रेटिंग"}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              {pro.totalJobs}+
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {lang === "en" ? "Jobs Done" : "काम पूरे किए"}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-black text-brand-orange">
              ₹{pro.hourlyRate}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {lang === "en" ? "Standard Rate" : "तय दर"}
            </div>
          </div>
        </div>

        {/* Verification Checks */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {lang === "en" ? "Security & Checks:" : "सुरक्षा और जांच:"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(lang === "en" ? pro.badges : pro.hindiBadges).map((b, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Local Customer Review */}
        {pro.featuredReview && (
          <div className="p-3.5 rounded-2xl bg-orange-50/60 dark:bg-slate-800/80 border border-orange-200 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                {pro.featuredReview.userName}
              </span>
              <div className="flex text-amber-500">
                {"★".repeat(pro.featuredReview.rating)}
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              “{lang === "en" ? pro.featuredReview.text : pro.featuredReview.hindiText}”
            </p>
          </div>
        )}

        {/* Dual Actions: Call & Book */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${pro.phone.replace(/\s+/g, "")}`}
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-brand-orange text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-orange" />
            <span>{lang === "en" ? "Call Directly" : "सीधे फोन करें"}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onBookNow(pro);
            }}
            className="py-3 px-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{lang === "en" ? "Book Now" : "अभी बुक करें"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

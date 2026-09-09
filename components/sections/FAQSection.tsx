"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/data/faq";
import { useI18n } from "@/lib/i18n";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 relative bg-slate-50 dark:bg-[#070D1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 text-brand-orange text-xs font-bold border border-orange-200 dark:border-orange-800">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Questions & Answers" : "संदेह और सवाल"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("faq.heading")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("faq.subheading")}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const question =
              lang === "en"
                ? faq.question
                : lang === "hinglish"
                ? faq.hinglishQuestion
                : faq.hindiQuestion;

            const answer =
              lang === "en"
                ? faq.answer
                : lang === "hinglish"
                ? faq.hinglishAnswer
                : faq.hindiAnswer;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-[#101B33] border-2 border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />
                    {question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-orange-100 dark:bg-orange-950 text-brand-orange" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in-50 duration-200">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support prompt */}
        <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-[#101B33] border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400">
          <span>{lang === "en" ? "Still have questions? Call us on " : "कोई और सवाल है? हमें कॉल करें: "}</span>
          <span className="font-bold text-brand-orange">1800-120-5226</span>
          <span>{lang === "en" ? " or message on WhatsApp" : " या व्हाट्सएप पर पूछें"}</span>
        </div>
      </div>
    </section>
  );
}

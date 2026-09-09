"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, MessageCircle, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";

interface ProRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProRegisterModal({ isOpen, onClose }: ProRegisterModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("प्लंबर (Plumber)");
  const [experience, setExperience] = useState("3-5 साल (Years)");
  const [city, setCity] = useState("गुड़गांव (Gurgaon)");
  const { lang } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        submitted
          ? lang === "en" ? "Application Received!" : "आवेदन प्राप्त हुआ!"
          : lang === "en" ? "Join as a Kaamigar" : "कामगार के रूप में जुड़ें"
      }
      subtitle={
        submitted
          ? lang === "en" ? "Our coordinator will call you in 15 minutes" : "हमारे सहयोगी आपको 15 मिनट में फोन करेंगे"
          : lang === "en" ? "Get daily jobs near your home with zero commission on first 10 orders" : "घर के पास रोज़ का काम पाएं • पहले 10 काम पर 0% कमीशन"
      }
      maxWidth="md"
    >
      {!submitted ? (
        <div className="space-y-4">
          {/* Quick 1-Tap Alternatives */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider">
              {lang === "en" ? "⚡ Fastest 1-Tap Join (No typing needed):" : "⚡ सबसे आसान तरीका (बिना फॉर्म भरे):"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://wa.me/919800000000?text=%E0%A4%95%E0%A4%BE%E0%A4%AE"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "en" ? "Send 'KAAM' on WhatsApp" : "व्हाट्सएप पर 'काम' भेजें"}</span>
              </a>

              <a
                href="tel:18001205226"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-orange" />
                <span>1800-120-5226 {lang === "en" ? "(Missed Call)" : "(मिस्ड कॉल दें)"}</span>
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#101B33] px-3 text-[11px] font-bold text-slate-400 uppercase">
              {lang === "en" ? "Or Fill Quick Form" : "या नीचे जानकारी भरें"}
            </span>
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === "en" ? "Your Full Name" : "आपका पूरा नाम"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === "en" ? "e.g. Ramesh Kumar" : "जैसे: रमेश कुमार"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === "en" ? "Mobile Phone Number" : "मोबाइल फोन नंबर"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === "en" ? "Your Skill / Trade" : "आपका काम (हुनर)"}
                </label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange font-semibold"
                >
                  <option>🚰 नल व प्लंबर (Plumber)</option>
                  <option>💡 बिजली मिस्त्री (Electrician)</option>
                  <option>❄️ एसी टेक्नीशियन (AC Repair)</option>
                  <option>🪚 बढ़ई (Carpenter)</option>
                  <option>🎨 पेंटर (Painter)</option>
                  <option>🧹 सफ़ाई (Cleaning)</option>
                  <option>🚗 गाड़ी व बाइक मैकेनिक (Mechanic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === "en" ? "City / Location" : "शहर / इलाका"}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange font-semibold"
                >
                  <option>गुड़गांव (Gurgaon)</option>
                  <option>दिल्ली-एनसीआर (Delhi NCR)</option>
                  <option>नोएडा (Noida)</option>
                  <option>जयपुर (Jaipur)</option>
                  <option>लखनऊ (Lucknow)</option>
                  <option>बेंगलुरु (Bengaluru)</option>
                  <option>मुंबई (Mumbai)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {lang === "en"
                  ? "Zero paperwork needed. Verification is done directly with Aadhaar OTP."
                  : "कागजी कार्रवाई की जरूरत नहीं। आधार से तुरंत मोबाइल वेरिफिकेशन।"
                }
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{lang === "en" ? "Submit & Start Getting Jobs" : "फॉर्म जमा करें और काम शुरू करें"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Submitted state */
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === "en" ? "Application Submitted!" : "आपका आवेदन जमा हो गया है!"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              {lang === "en"
                ? "Our local onboarding manager will call your phone shortly to verify details and activate your jobs."
                : "हमारे स्थानीय अधिकारी आपको जल्द फोन करेंगे और आपके इलाके में काम मिलना शुरू हो जाएगा।"}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full max-w-xs mx-auto py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow transition-all block"
          >
            {lang === "en" ? "Done" : "ठीक है"}
          </button>
        </div>
      )}
    </Modal>
  );
}

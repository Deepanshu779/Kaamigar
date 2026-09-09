"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { SERVICES, ServiceCategory } from "@/lib/data/services";
import { Professional } from "@/lib/data/professionals";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, MapPin, Calendar, Clock, ArrowRight, MessageCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPro?: Professional | null;
  initialService?: ServiceCategory | null;
}

export function BookingModal({
  isOpen,
  onClose,
  selectedPro,
  initialService,
}: BookingModalProps) {
  const [step, setStep] = useState<"details" | "success">("details");
  const [serviceId, setServiceId] = useState<string>(
    initialService?.id || selectedPro?.service.toLowerCase() || "plumber"
  );
  const [area, setArea] = useState("Sector 14, Gurgaon");
  const [date, setDate] = useState("Today (तुरंत 15-20 mins)");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { lang, t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const handleResetAndClose = () => {
    setStep("details");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={
        step === "details"
          ? lang === "en" ? "Book a Kaamigar" : "कामगार बुक करें"
          : lang === "en" ? "Booking Confirmed!" : "बुकिंग दर्ज हो गई!"
      }
      subtitle={
        step === "details"
          ? selectedPro
            ? lang === "en"
              ? `Direct booking with ${selectedPro.name}`
              : `${selectedPro.hindiName} (${selectedPro.hindiService}) के लिए बुकिंग`
            : lang === "en"
            ? "Clear upfront price • Arrives in 15-25 mins"
            : "तय रेट • 15 से 25 मिनट में आपके घर पहुंच"
          : lang === "en"
          ? "We sent confirmation to your phone"
          : "जानकारी आपके फोन और व्हाट्सएप पर भेज दी गई है"
      }
      maxWidth="md"
    >
      {step === "details" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selected Pro Banner */}
          {selectedPro && (
            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-xl">
                  {selectedPro.serviceEmoji}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {lang === "en" ? selectedPro.name : selectedPro.hindiName}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {lang === "en" ? selectedPro.service : selectedPro.hindiService} • {selectedPro.distanceKm} km away
                  </div>
                </div>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px] bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                {t("nearby.available")}
              </span>
            </div>
          )}

          {/* Service Category Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              {lang === "en" ? "Select Work Needed" : "काम का चयन करें"}
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange font-semibold"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {lang === "en" ? s.name : s.hindiName} (₹{s.startingPrice} से)
                </option>
              ))}
            </select>
          </div>

          {/* User Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === "en" ? "Your Name" : "आपका नाम"}
              </label>
              <input
                type="text"
                required
                placeholder={lang === "en" ? "e.g. Ramesh Chandra" : "जैसे: रमेश चंद्र"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === "en" ? "Phone Number (For OTP/Call)" : "मोबाइल नंबर (कॉल व OTP के लिए)"}
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

          {/* Area & Desired Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === "en" ? "Locality / Address" : "घर का पता / मोहल्ला"}
              </label>
              <input
                type="text"
                required
                placeholder="Sector 14, House / Flat No."
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {lang === "en" ? "When do you need help?" : "काम कब करवाना है?"}
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange font-semibold"
              >
                <option value="Today (ASAP)">{lang === "en" ? "⚡ Emergency (Within 20 mins)" : "⚡ तुरंत (20 मिनट में)"}</option>
                <option value="Today (Evening)">{lang === "en" ? "Today Evening (5 PM - 8 PM)" : "आज शाम (5 PM - 8 PM)"}</option>
                <option value="Tomorrow">{lang === "en" ? "Tomorrow Morning" : "कल सुबह"}</option>
              </select>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              {lang === "en" ? "Describe the issue (Optional)" : "क्या समस्या है? (वैकल्पिक)"}
            </label>
            <textarea
              rows={2}
              placeholder={lang === "en" ? "e.g. Tap is leaking or ceiling fan making noise" : "जैसे: किचन का नल टपक रहा है या पंखा आवाज कर रहा है"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-orange resize-none"
            />
          </div>

          {/* Pricing assurance */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">
              {lang === "en" ? "Pay after work inspection" : "काम देखने के बाद ही भुगतान करें"}
            </span>
            <span className="font-black text-brand-orange">
              {lang === "en" ? "Fixed rates • Zero bargaining" : "तय रेट • नो बार्गेनिंग"}
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{lang === "en" ? "Confirm & Book Kaamigar" : "बुकिंग कन्फर्म करें"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* SUCCESS STEP */
        <div className="py-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === "en" ? "Booking Confirmed!" : "बधाई! आपकी बुकिंग दर्ज हो गई"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              {lang === "en"
                ? "The nearest verified Kaamigar has been assigned. You will receive a WhatsApp message and call within 5 minutes."
                : "आपके सबसे पास के वेरिफाइड कामगार को सूचित कर दिया गया है। 5 मिनट के भीतर आपको फोन और व्हाट्सएप अपडेट मिल जाएगा।"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 max-w-xs mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Assigned Kaamigar:" : "कामगार:"}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {selectedPro ? (lang === "en" ? selectedPro.name : selectedPro.hindiName) : "रमेश कुमार"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Arrival Time:" : "पहुंचने का समय:"}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">15-20 mins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === "en" ? "Security OTP:" : "सुरक्षा OTP:"}</span>
              <span className="font-black text-brand-orange tracking-widest text-sm">5219</span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-full max-w-xs mx-auto py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow transition-all block"
          >
            {lang === "en" ? "Done" : "ठीक है"}
          </button>
        </div>
      )}
    </Modal>
  );
}

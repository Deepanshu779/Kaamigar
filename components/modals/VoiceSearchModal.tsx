"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { useI18n } from "@/lib/i18n";
import { Mic, MicOff, Search, Volume2, Sparkles, ArrowRight } from "lucide-react";

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResult: (query: string) => void;
}

export function VoiceSearchModal({
  isOpen,
  onClose,
  onVoiceResult,
}: VoiceSearchModalProps) {
  const { t, lang } = useI18n();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);

  // Sample prompt queries for 1-tap test
  const sampleVoiceQueries = [
    { text: "मुझे प्लंबर चाहिए", en: "I need a plumber", category: "plumber" },
    { text: "एसी ठंडा नहीं कर रहा है", en: "AC cooling issue", category: "ac-repair" },
    { text: "घर का पंखा नहीं चल रहा", en: "Ceiling fan repair", category: "electrician" },
    { text: "दरवाजे का ताला खराब है", en: "Door lock repair", category: "carpenter" },
    { text: "स्कूटर स्टार्ट नहीं हो रहा", en: "Scooter breakdown", category: "mechanic" },
  ];

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript("");
      return;
    }

    // Try Web Speech API if supported in browser
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);
    let recognition: any;

    try {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === "en" ? "en-IN" : "hi-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch {}
      }
    };
  }, [isOpen, lang]);

  const handleSelectSample = (sample: { text: string; en: string; category: string }) => {
    const q = lang === "en" ? sample.en : sample.text;
    setTranscript(q);
    setTimeout(() => {
      onVoiceResult(q);
      onClose();
    }, 400);
  };

  const handleConfirm = () => {
    if (transcript.trim()) {
      onVoiceResult(transcript);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lang === "en" ? "Voice Search • Speak Now" : "बोलकर बताएं • Voice Search"}
      subtitle={lang === "en" ? "Speak in Hindi, English, or Hinglish" : "अपनी भाषा में बोलिए — हिंदी, इंग्लिश या हिंग्लिश"}
      maxWidth="md"
    >
      <div className="space-y-6 text-center py-3">
        {/* Animated Microphone Pulse */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
              <div className="absolute -inset-3 rounded-full bg-brand-orange/15 animate-pulse" />
            </>
          )}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
              isListening ? "bg-brand-orange scale-110 shadow-orange-500/40" : "bg-slate-700"
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : (
              <MicOff className="w-9 h-9 text-slate-300" />
            )}
          </div>
        </div>

        {/* Listening Status Text */}
        <div className="space-y-1">
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {isListening
              ? lang === "en"
                ? "Listening... Please speak your problem"
                : "सुन रहे हैं... बोलकर बताइए क्या काम है"
              : transcript
              ? lang === "en"
                ? "Did you say:"
                : "क्या आपने कहा:"
              : lang === "en"
              ? "Tap a query or speak"
              : "नीचे दिए गए वाक्य पर दबाएं या बोलें"}
          </div>

          {transcript ? (
            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-lg font-black text-brand-orange">
              “{transcript}”
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === "en"
                ? "Examples: 'Mujhe plumber chahiye', 'AC kharab hai', 'Fan repair'"
                : "जैसे: 'मुझे प्लंबर चाहिए', 'एसी खराब है', 'घर का पंखा रिपेयर'"}
            </p>
          )}
        </div>

        {/* 1-Tap Example queries */}
        <div className="text-left space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-brand-orange" />
            <span>{lang === "en" ? "Or tap to test voice query:" : "या बोलकर देखने के लिए दबाएं:"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleVoiceQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-orange-50 dark:hover:bg-orange-950/60 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-left text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>“{lang === "en" ? sample.en : sample.text}”</span>
                <ArrowRight className="w-3 h-3 text-brand-orange" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {transcript && (
          <div className="pt-2">
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{lang === "en" ? "Search for Kaamigar" : "कामगार ढूंढें"}</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Star, MapPin, CheckCircle2, Shield, Clock, PhoneCall, ChevronRight, Navigation, Search } from "lucide-react";
import { PROFESSIONALS } from "@/lib/data/professionals";

export function PhoneMockup3D() {
  const [activeTab, setActiveTab] = useState<"nearby" | "tracking" | "bill">("nearby");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 14, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative flex items-center justify-center p-4 sm:p-8 perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-80 h-96 rounded-full bg-brand-blue/20 blur-[90px] -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-80 h-96 rounded-full bg-brand-orange/20 blur-[100px] -bottom-10 -right-10 pointer-events-none" />

      {/* 3D Phone Chassis */}
      <div
        className="relative w-[320px] sm:w-[350px] h-[660px] rounded-[50px] p-3 transition-transform duration-300 ease-out shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(37,99,235,0.25)] border-[4px] border-[#334155]/60 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Glass Reflection Stripe */}
        <div className="absolute inset-0 rounded-[46px] pointer-events-none overflow-hidden z-30">
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent transform -rotate-45 translate-x-12 pointer-events-none" />
        </div>

        {/* Volume & Power buttons on frame */}
        <div className="absolute -left-[7px] top-28 w-[4px] h-10 bg-slate-600 rounded-l-md" />
        <div className="absolute -left-[7px] top-42 w-[4px] h-10 bg-slate-600 rounded-l-md" />
        <div className="absolute -right-[7px] top-32 w-[4px] h-14 bg-slate-600 rounded-r-md" />

        {/* Smartphone Screen Inner */}
        <div className="relative w-full h-full rounded-[42px] bg-[#0A0F1D] overflow-hidden border border-white/10 flex flex-col z-20">
          {/* Dynamic Island / Notch */}
          <div className="pt-3 pb-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span>09:41</span>
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <span className="text-[9px] text-slate-300 font-mono">Kaamigar</span>
            </div>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-300 rounded-sm p-[1px]">
                <div className="w-full h-full bg-slate-300 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="p-3 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400">Current Location</div>
                  <div className="text-xs font-bold text-white">Indiranagar, 100ft Rd</div>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-xs">
                A
              </div>
            </div>

            {/* Quick interactive tabs */}
            <div className="grid grid-cols-3 gap-1 mt-2.5 p-1 bg-black/40 rounded-xl border border-white/5 text-[10px] font-medium text-slate-400">
              <button
                onClick={() => setActiveTab("nearby")}
                className={`py-1 rounded-lg transition-all ${
                  activeTab === "nearby" ? "bg-brand-orange text-white font-bold shadow-sm" : "hover:text-white"
                }`}
              >
                Nearby Pros
              </button>
              <button
                onClick={() => setActiveTab("tracking")}
                className={`py-1 rounded-lg transition-all ${
                  activeTab === "tracking" ? "bg-brand-orange text-white font-bold shadow-sm" : "hover:text-white"
                }`}
              >
                Live Route
              </button>
              <button
                onClick={() => setActiveTab("bill")}
                className={`py-1 rounded-lg transition-all ${
                  activeTab === "bill" ? "bg-brand-orange text-white font-bold shadow-sm" : "hover:text-white"
                }`}
              >
                Fair Bill
              </button>
            </div>
          </div>

          {/* Tab 1: Nearby Professionals */}
          {activeTab === "nearby" && (
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-slate-300">14 Verified Pros Nearby</span>
                <span className="text-[10px] text-brand-orange font-medium">Auto-dispatch ready</span>
              </div>

              {PROFESSIONALS.slice(0, 3).map((pro) => (
                <div
                  key={pro.id}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-brand-orange/40 transition-all shadow-md group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pro.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                        {pro.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white">{pro.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <div className="text-[10px] text-slate-400">{pro.service}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pro.rating}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-300 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-cyan-400" />
                      {pro.distanceKm} km away
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available now
                    </span>
                    <span className="text-brand-orange font-bold">₹{pro.hourlyRate}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Live Tracking */}
          {activeTab === "tracking" && (
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-orange animate-spin" />
                    Rahul is on his way!
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    ETA: 7 Mins
                  </span>
                </div>

                {/* Radar Mock Mini Map */}
                <div className="h-32 rounded-xl bg-[#09101d] border border-cyan-500/20 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                  <div className="w-20 h-20 rounded-full border border-cyan-400/30 animate-ping absolute" />
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center relative z-10">
                    <Navigation className="w-4 h-4 text-cyan-400 transform rotate-45" />
                  </div>
                  <div className="absolute bottom-2 left-2 text-[9px] text-slate-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    GPS Masked • Safe Route
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400">Assigned Pro</div>
                    <div className="font-bold text-white">Rahul Sharma (Elec)</div>
                  </div>
                  <button className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 flex items-center gap-1 text-xs">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Masked</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Kaamigar ₹10,000 Damage Cover is automatically active on this job.</span>
              </div>
            </div>
          )}

          {/* Tab 3: Transparent Bill Breakdown */}
          {activeTab === "bill" && (
            <div className="flex-1 p-3 space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2.5">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Job Estimate Breakdown</span>
                  <span className="text-[10px] text-emerald-400 font-mono">FIXED PRICE</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-white/10 pt-2">
                  <div className="flex justify-between">
                    <span>Inspection & Visiting Charge</span>
                    <span className="font-mono">₹149</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MCB Switch Board Repair (1x)</span>
                    <span className="font-mono">₹200</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>First Booking Discount</span>
                    <span className="font-mono">-₹50</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Platform Insurance & Safety Fee</span>
                    <span className="font-mono">₹0 (Free)</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-bold text-white border-t border-white/10 pt-2">
                  <span>Total Payable Amount</span>
                  <span className="text-brand-orange text-sm font-mono font-extrabold">₹299</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-400 text-center">
                Pay only AFTER the professional completes the job and you inspect it.
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="p-3 border-t border-white/10 bg-slate-950/80">
            <button
              onClick={() => setActiveTab(activeTab === "nearby" ? "tracking" : activeTab === "tracking" ? "bill" : "nearby")}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orangeHover text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            >
              <span>Explore App Booking Flow</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

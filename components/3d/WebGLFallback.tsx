import React from "react";
import { ShieldCheck, MapPin, Zap, Wrench, Droplets } from "lucide-react";

export function WebGLFallback() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#0A1022] to-[#080C16] rounded-3xl border border-white/10 p-8 overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute w-72 h-72 rounded-full bg-brand-blue/20 blur-3xl -top-10 -left-10" />
      <div className="absolute w-72 h-72 rounded-full bg-brand-orange/15 blur-3xl -bottom-10 -right-10" />

      {/* Futuristic fallback diagram */}
      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center shadow-glow-orange border border-white/20">
          <MapPin className="w-12 h-12 text-white animate-bounce" />
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-white shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-white tracking-tight">Kaamigar Local Service Radar</h4>
          <p className="text-sm text-slate-400 mt-2">
            Real-time local match active in your sector. 10,000+ verified professionals connected via secure dispatch.
          </p>
        </div>

        {/* Live connected nodes */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-xs font-semibold text-white">Rahul S.</div>
            <div className="text-[10px] text-slate-400">1.8 km • Elec</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-xs font-semibold text-white">Suresh M.</div>
            <div className="text-[10px] text-slate-400">1.4 km • Plumb</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <Wrench className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-semibold text-white">Amit P.</div>
            <div className="text-[10px] text-slate-400">0.9 km • AC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

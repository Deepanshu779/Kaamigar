"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { Star, Quote, CheckCircle2, Sparkles, Building2, UserCheck } from "lucide-react";

export function TestimonialsSection() {
  const [activeTag, setActiveTag] = useState<"all" | "customer" | "partner">("all");

  const filtered =
    activeTag === "all"
      ? TESTIMONIALS
      : activeTag === "customer"
      ? TESTIMONIALS.filter((t) => t.tag === "Customer Story")
      : TESTIMONIALS.filter((t) => t.tag === "Kaamigar Partner Spotlight");

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Stories & Spotlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Loved by Customers. <span className="text-gradient-orange">Empowering Workers.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real stories from homeowners getting precision repairs and skilled workers achieving financial dignity.
          </p>

          <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-400">
            * Early platform user experiences & pilot partner spotlights (Prototype Benchmark)
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTag("all")}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeTag === "all"
                  ? "bg-brand-orange text-white border-brand-orange shadow-glow-orange"
                  : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setActiveTag("customer")}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeTag === "customer"
                  ? "bg-brand-orange text-white border-brand-orange shadow-glow-orange"
                  : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              Customer Reviews
            </button>
            <button
              onClick={() => setActiveTag("partner")}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeTag === "partner"
                  ? "bg-brand-orange text-white border-brand-orange shadow-glow-orange"
                  : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              Kaamigar Partner Spotlights
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group shadow-xl relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      item.tag === "Customer Story"
                        ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                        : "bg-brand-orange/15 text-brand-orange border-brand-orange/30"
                    }`}
                  >
                    {item.tag}
                  </span>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-white/10 mb-3" />

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                  >
                    {item.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-sm">{item.author}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <p className="text-xs text-slate-400">{item.role}</p>
                    <p className="text-[11px] text-slate-500">{item.location}</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-lg border border-brand-orange/20">
                  {item.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

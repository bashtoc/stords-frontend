"use client";
import React from "react";

import { Sparkles } from "lucide-react";
export default function BeforeAfterSlider() {
    return (<section className="bg-[#F7F2EB]/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Text block left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 fill-[#D4AF37]"/>
              Real Botanical Results
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              See the HydraGrow Transformation
            </h2>
            <p className="font-sans text-sm text-[#1D1D1D]/75 leading-relaxed">
              Deeply hydrated, nourished, and defined curls protected with STORDS HydraGrow Hair Oil.
            </p>
            <div className="bg-[#FCFBF8] border border-[#E5DCD3]/50 rounded-2xl p-5 text-xs text-[#1D1D1D]/50 leading-relaxed font-sans">
              <strong>Disclaimer:</strong> Results representation simulates hydration improvement. Individual results will vary depending on hair type, texture, consistency, and overall hair health routine.
            </div>
          </div>

          {/* Results image block right */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-3xl border border-[#E5DCD3] bg-accent shadow-lg">
              <img src="/beforeandafter.png" alt="Hydrated curls after STORDS treatment" className="w-full h-full object-cover" className="object-cover"/>
                <div className="absolute bottom-6 right-6 rounded-lg bg-secondary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm whitespace-nowrap">
                  Hydrated & Strong
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>);
}

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Shield, Flame, Sparkles, Layers, Activity } from "lucide-react";
import { Link } from "react-router-dom";
const CONCERNS = [
    {
        id: "dryness",
        name: "Dry Hair",
        icon: Droplet,
        explanation: "Hair strands lack internal hydration, feeling coarse, stiff, and rough to the touch.",
        howHelps: "Batana and Jojoba oils mimic the scalp's natural sebum, locking moisture deep into the inner cortex of each strand to restore long-lasting softness and pliability.",
        ingredient: "Batana Oil & Jojoba Oil",
    },
    {
        id: "breakage",
        name: "Breakage",
        icon: Shield,
        explanation: "Hair snaps easily during detangling, washing, or styling due to weakened keratin bonds.",
        howHelps: "HydraGrow infuses hair with essential fatty acids that increase tensile strength and strand elasticity, significantly reducing snapping and preserving length.",
        ingredient: "Castor Oil & Sweet Almond Oil",
    },
    {
        id: "frizz",
        name: "Frizz & Flyaways",
        icon: Flame,
        explanation: "Elevated, open cuticles absorb ambient humidity, causing strands to swell and lose definition.",
        howHelps: "Argan and Castor oils smooth and seal the outer cuticle layer, locking in hydration while repelling external moisture to maintain defined, frizz-free texture.",
        ingredient: "Argan Oil & Castor Oil",
    },
    {
        id: "split-ends",
        name: "Split Ends",
        icon: Layers,
        explanation: "The protective outer layer (cuticle) degrades at the tips, causing the inner hair fibers to unravel.",
        howHelps: "Vitamin E and Sweet Almond oil coat the vulnerable tips, strengthening the structure and temporarily sealing split fibers to prevent upward cracking.",
        ingredient: "Vitamin E & Sweet Almond Oil",
    },
    {
        id: "dullness",
        name: "Dull Hair",
        icon: Sparkles,
        explanation: "Strands fail to reflect light due to product buildup, rough cuticles, or nutrient deficiency.",
        howHelps: "Our cold-pressed oil blend adds a light, reflective botanical layer over the hair shaft, restoring a vibrant, healthy-looking shine without heavy residue.",
        ingredient: "Argan Oil & Rosemary Extract",
    },
    {
        id: "weakness",
        name: "Weak Hair",
        icon: Activity,
        explanation: "Thin, fragile strands that lack structural integrity and structural density.",
        howHelps: "Deep scalp penetration supplies crucial antioxidants to the hair follicles, reinforcing the root and fostering a healthier scalp environment for stronger growth.",
        ingredient: "Rosemary Extract & Vitamin E",
    },
];
export default function HairProblems() {
    const [activeConcern, setActiveConcern] = useState(CONCERNS[0]);
    return (<section className="bg-[#FCFBF8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Targeted Solutions for Your Crown
          </h2>
          <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60 leading-relaxed">
            Select a common hair challenge below to see how our premium botanical blend addresses it at the root.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Left: Tab selectors */}
          <div className="lg:col-span-5 space-y-3">
            {CONCERNS.map((concern) => {
            const Icon = concern.icon;
            const isActive = activeConcern.id === concern.id;
            return (<button key={concern.id} onClick={() => setActiveConcern(concern)} className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${isActive
                    ? "bg-primary text-white shadow-md scale-[1.02]"
                    : "bg-[#F7F2EB]/50 hover:bg-[#F7F2EB] text-[#1D1D1D]"}`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                    <Icon className="h-5 w-5 stroke-[1.5]"/>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold">{concern.name}</h3>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? "text-white/70" : "text-[#1D1D1D]/50"}`}>
                      {concern.explanation}
                    </p>
                  </div>
                </button>);
        })}
          </div>

          {/* Right: Detailed active panel */}
          <div className="lg:col-span-7 bg-[#F7F2EB] rounded-3xl p-8 md:p-12 border border-[#E5DCD3]/30 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={activeConcern.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    Active Solution
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-1">
                    How HydraGrow resolves {activeConcern.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D1D]/40 uppercase tracking-wide">
                      The Problem
                    </h4>
                    <p className="mt-1 text-sm text-[#1D1D1D]/80 leading-relaxed font-sans">
                      {activeConcern.explanation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D1D]/40 uppercase tracking-wide">
                      The botanical approach
                    </h4>
                    <p className="mt-1 text-sm text-primary font-medium leading-relaxed font-sans">
                      {activeConcern.howHelps}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5DCD3]/60">
                  <div>
                    <h5 className="text-[10px] font-bold text-[#1D1D1D]/40 uppercase tracking-wider">
                      Key Active Botanical
                    </h5>
                    <p className="text-xs font-bold text-primary mt-0.5">
                      {activeConcern.ingredient}
                    </p>
                  </div>

                  <Link to="/shop" className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-xs font-bold text-white hover:bg-primary-light transition-all shadow-sm">
                    Try HydraGrow Oil
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>);
}

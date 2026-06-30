"use client";
import React from "react";

import { Check, ShieldCheck, Heart, Leaf, PackageOpen } from "lucide-react";
export default function AboutBatana() {
    const batanaBenefits = [
        { title: "Intensely Hydrates", desc: "Locks in deep moisture to combat chronic dryness." },
        { title: "Strengthens Strands", desc: "Builds resilience to minimize daily breakage." },
        { title: "Restores Shine", desc: "Polishes the cuticle for a healthy, natural gloss." },
        { title: "Locks in Softness", desc: "Softens texture for effortless combability." },
        { title: "Scalp Wellness", desc: "Rich in antioxidants that nourish the scalp base." },
        { title: "Traditional Sourcing", desc: "Honors centuries-old Honduran forest harvesting." },
    ];
    const whyChooseUs = [
        { title: "100% Natural Botanicals", desc: "Formulated exclusively with premium plant-based oils and extracts.", icon: Leaf },
        { title: "Cruelty-Free Certified", desc: "Never tested on animals, ethically formulated from source to shelf.", icon: Heart },
        { title: "Clean Formulations", desc: "Zero sulfates, parabens, silicones, phthalates, or mineral oil.", icon: ShieldCheck },
        { title: "Sourced & Crafted in Africa", desc: "Proudly honoring African-inspired beauty traditions and local sourcing.", icon: PackageOpen },
    ];
    return (<section className="bg-[#F7F2EB]/50 py-20 lg:py-28" id="about-batana">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-24">
        
        {/* PART 1: Why Batana Oil */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          {/* Visual left */}
          <div className="relative h-[350px] w-full overflow-hidden rounded-3xl lg:col-span-5 bg-accent">
            <img src="/ingredients_hero.png" alt="Raw Batana Oil Harvesting and Ingredients" className="w-full h-full object-cover" className="object-cover hover:scale-105 transition-transform duration-700"/>
            {/* Absolute badge */}
            <div className="absolute bottom-6 left-6 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-md">
              Flagship Ingredient
            </div>
          </div>

          {/* Text details right */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Ancient Botanical Wisdom
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Why Batana Oil?
              </h2>
              <p className="font-sans text-sm text-[#1D1D1D]/75 leading-relaxed">
                Extracted from the nuts of the American palm (Ojon) native to Central America and widely celebrated across African traditions, Batana Oil is an ultra-nourishing elixir. It has been used for generations as a secret to longer, stronger, and more lustrous hair.
              </p>
            </div>

            {/* Grid of quick benefits */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {batanaBenefits.map((benefit, i) => (<div key={i} className="flex gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-primary">
                    <Check className="h-3 w-3 stroke-[2.5]"/>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-primary">{benefit.title}</h4>
                    <p className="text-xs text-[#1D1D1D]/60 mt-0.5">{benefit.desc}</p>
                  </div>
                </div>))}
            </div>
          </div>
        </div>

        {/* PART 2: Why Choose STORDS */}
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              The STORDS Standard
            </h2>
            <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60 leading-relaxed">
              We combine scientific validation with premium, raw ingredients to deliver hair nutrition you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (<div key={idx} className="rounded-2xl border border-[#E5DCD3]/30 bg-[#FCFBF8] p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="h-6 w-6 stroke-[1.5]"/>
                    </div>
                    <h3 className="font-serif text-base font-bold text-primary mt-6">{item.title}</h3>
                    <p className="mt-2 font-sans text-xs text-[#1D1D1D]/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>);
        })}
          </div>
        </div>

      </div>
    </section>);
}

"use client";
import React from "react";

import { Link } from "react-router-dom";
import { Leaf, Award, Heart, ShieldCheck, ArrowRight } from "lucide-react";
export default function AboutPage() {
    const values = [
        {
            title: "Ethical Sourcing",
            desc: "We partner directly with wild-harvesting forest communities in Honduras, ensuring sustainable wages and ecological respect for the palm forests.",
            icon: Leaf,
        },
        {
            title: "Clean Chemistry",
            desc: "Our products contain zero sulfates, parabens, silicones, or mineral oils. We formulate exclusively with premium cold-pressed plant extracts.",
            icon: ShieldCheck,
        },
        {
            title: "Heritage Inspired",
            desc: "We honor centuries-old African and Central American haircare traditions, blending time-tested wisdom with modern scientific verification.",
            icon: Award,
        },
        {
            title: "Texture Focused",
            desc: "We formulate specifically to restore hydration, shine, and structural strength to textured curls, coils, and wavy patterns.",
            icon: Heart,
        },
    ];
    return (<div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
          Our Heritage & Values
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Premium Botanical Haircare for Every Texture
        </h1>
        <p className="mt-4 font-sans text-sm md:text-base text-[#1D1D1D]/70 leading-relaxed">
          At STORDS, we believe healthy hair starts at the root. We combine wild-harvested Batana Oil with nutrient-rich botanicals to nourish, hydrate, and strengthen your crown.
        </p>
      </div>

      {/* Sourcing Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center mb-24">
        {/* visual left */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-3xl lg:col-span-6 bg-accent border border-[#E5DCD3]/30">
          <img src="/ingredients_hero.png" alt="Hand harvesting raw ingredients" className="w-full h-full object-cover" className="object-cover"/>
        </div>

        {/* Content right */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Sourced from Honduras, Crafted with Care
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#1D1D1D]/75 leading-relaxed">
            Our journey began with a search for ingredients that actually penetrate the hair shaft, rather than masking dryness with synthetic silicones. This path led us to the American palm trees native to Central America, where local communities have wild-harvested raw Batana Oil for generations.
          </p>
          <p className="font-sans text-xs md:text-sm text-[#1D1D1D]/75 leading-relaxed">
            We partner directly with local families, bringing raw, cold-pressed Batana Oil to our labs where it is refined for easy application and blended with rosemary, jojoba, and sweet almond oils to support strand elasticity and scalp micro-circulation.
          </p>
        </div>
      </div>

      {/* Core values block */}
      <div className="space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            The STORDS Guarantee
          </h2>
          <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60 leading-relaxed">
            Every bottle we craft adheres to strict standards of purity, efficacy, and ethical production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (<div key={idx} className="rounded-2xl border border-[#E5DCD3]/30 bg-white p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-6 w-6 stroke-[1.5]"/>
                  </div>
                  <h3 className="font-serif text-base font-bold text-primary mt-6">{v.title}</h3>
                  <p className="mt-2 font-sans text-xs text-[#1D1D1D]/60 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>);
        })}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-24 rounded-3xl bg-[#F7F2EB] p-8 md:p-12 border border-[#E5DCD3]/30 text-center max-w-4xl mx-auto space-y-6">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary">Ready to Transform Your Curls?</h3>
        <p className="text-xs md:text-sm text-[#1D1D1D]/70 max-w-lg mx-auto">
          Start your healthy hair journey with the flag ship STORDS HydraGrow Hair Oil today.
        </p>
        <Link to="/shop" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-xs md:text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-md">
          Explore Collection
          <ArrowRight className="h-4 w-4"/>
        </Link>
      </div>

    </div>);
}

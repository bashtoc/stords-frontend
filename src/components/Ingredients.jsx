"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Info } from "lucide-react";
const INGREDIENTS = [
    {
        name: "Batana Oil",
        scientific: "Elaeis Oleifera Kernel Oil",
        source: "Wild-harvested, Honduras",
        desc: "A rare fatty-acid-rich oil harvested from the American palm, traditionally used to nourish the scalp and strengthen dry hair shafts.",
        benefit: "Locks in deep moisture, improves hair elasticity, and supports length retention.",
    },
    {
        name: "Argan Oil",
        scientific: "Argania Spinosa Kernel Oil",
        source: "Cold-pressed, Morocco",
        desc: "Known as 'liquid gold,' argan oil is packed with antioxidants, essential fatty acids, and Vitamin E to coat the outer cuticle layer.",
        benefit: "Imparts natural shine, tames frizz, and smooths dry cuticles.",
    },
    {
        name: "Jojoba Oil",
        scientific: "Simmondsia Chinensis Seed Oil",
        source: "Organic seeds, East Africa",
        desc: "A natural wax ester that closely resembles human sebum, making it highly compatible with scalp biology.",
        benefit: "Balances sebum levels, moisturizes follicles, and leaves no greasy residue.",
    },
    {
        name: "Rosemary Extract",
        scientific: "Rosmarinus Officinalis Leaf Oil",
        source: "Steam-distilled, North Africa",
        desc: "A potent botanical extract widely studied for its ability to stimulate scalp circulation and awaken follicles.",
        benefit: "Soothes scalp irritation, strengthens hair roots, and maintains scalp health.",
    },
    {
        name: "Vitamin E",
        scientific: "Tocopherol",
        source: "Plant-derived",
        desc: "A powerful antioxidant that shields hair lipids and proteins from oxidative stress, UV damage, and pollution.",
        benefit: "Protects hair structure from environmental stress and preserves color.",
    },
    {
        name: "Castor Oil",
        scientific: "Ricinus Communis Seed Oil",
        source: "Traditional cold-press, East Africa",
        desc: "A dense humectant oil rich in ricinoleic acid that creates a thick moisture barrier on vulnerable ends.",
        benefit: "Protects split ends from fraying further and seals hydration into thick textures.",
    },
    {
        name: "Sweet Almond Oil",
        scientific: "Prunus Amygdalus Dulcis Oil",
        source: "Pressed kernels",
        desc: "A lightweight, nourishing oil containing proteins and vitamins that fill structural gaps in rough hair shafts.",
        benefit: "Enhances hair softness, improves shine, and makes detangling effortless.",
    },
];
export default function Ingredients() {
    const [selected, setSelected] = useState(null);
    return (<section className="bg-[#FCFBF8] py-20 lg:py-28" id="ingredients">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <Leaf className="h-3 w-3"/>
              100% Active Botanical Ingredients
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
              What Goes Inside
            </h2>
            <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60 leading-relaxed">
              We list every single ingredient. No hidden silicones, no synthetic className="w-full h-full object-cover"ers. Just pure, nutrient-dense oils formulated to nourish.
            </p>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INGREDIENTS.map((ing, index) => {
            const isExpanded = selected === index;
            return (<motion.div key={ing.name} layout onClick={() => setSelected(isExpanded ? null : index)} className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${isExpanded
                    ? "border-primary bg-primary text-white shadow-lg lg:col-span-2"
                    : "border-[#E5DCD3]/50 bg-[#F7F2EB]/30 hover:bg-[#F7F2EB]/70 text-primary"}`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isExpanded ? "text-secondary" : "text-[#1D1D1D]/40"}`}>
                      {ing.source}
                    </span>
                    <Info className={`h-4 w-4 ${isExpanded ? "text-white/60" : "text-primary/40"}`}/>
                  </div>
                  <h3 className={`font-serif text-xl font-bold mt-4 ${isExpanded ? "text-white" : "text-primary"}`}>
                    {ing.name}
                  </h3>
                  <p className={`font-sans text-xs italic mt-0.5 ${isExpanded ? "text-white/70" : "text-[#1D1D1D]/50"}`}>
                    {ing.scientific}
                  </p>
                </div>

                <div className="mt-6">
                  {isExpanded ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-sm font-sans">
                      <p className="leading-relaxed text-white/90">{ing.desc}</p>
                      <p className="text-secondary font-semibold">Benefit: {ing.benefit}</p>
                    </motion.div>) : (<p className="text-xs font-semibold text-secondary line-clamp-1">
                      {ing.benefit}
                    </p>)}
                </div>
              </motion.div>);
        })}
        </div>

      </div>
    </section>);
}

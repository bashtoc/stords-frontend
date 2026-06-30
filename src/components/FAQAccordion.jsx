"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
const FAQS = [
    {
        q: "Is it suitable for all hair types?",
        a: "Yes! STORDS HydraGrow is formulated to hydrate all textures, from fine wavy hair to dense coily crowns. Since it is a rich, natural oil concentrate, you can adapt the quantity: just a few drops for fine, low-porosity hair, or a full dropper for thick, high-porosity Type 4 coils.",
    },
    {
        q: "Can I use it daily?",
        a: "For most hair routines, applying it 2-3 times per week on damp or dry hair is ideal to seal in moisture. However, if you have very dry ends or a dry scalp, you can use a small amount daily as a spot-treatment.",
    },
    {
        q: "Does it contain real Batana Oil?",
        a: "Yes, authentic raw Batana Oil is our flagship active ingredient. It is ethically sourced and blended with complementary botanicals (Argan, Jojoba, Rosemary, Vitamin E, Castor, and Sweet Almond) to create an optimized formula that is easy to apply and washes out cleanly.",
    },
    {
        q: "Is it safe for color-treated hair?",
        a: "Absolutely. HydraGrow contains zero sulfates, parabens, synthetic chemicals, or silicones. It is 100% natural and gentle, which means it will not strip color-treated or chemically processed hair.",
    },
    {
        q: "Can men use it?",
        a: "Yes. Many of our customers use it for hair nourishment, dry scalp relief, and as a natural beard oil to soften facial hair and soothe the skin underneath.",
    },
    {
        q: "How long before I notice results?",
        a: "Most users notice increased hair softness and scalp relief in Week 1. A significant reduction in breakage is typically achieved around Week 4, with healthier length retention visible after 8 weeks of consistent use.",
    },
];
export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };
    return (<section className="bg-[#FCFBF8] py-20 lg:py-28" id="faq">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center justify-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5"/>
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (<div key={index} className="rounded-2xl border border-[#E5DCD3]/50 bg-[#F7F2EB]/20 overflow-hidden transition-all duration-350">
                <button onClick={() => toggle(index)} className="flex w-full items-center justify-between p-6 text-left">
                  <span className="font-serif text-sm md:text-base font-bold text-primary">
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-primary/60 transition-transform duration-350 ${isOpen ? "rotate-180" : ""}`}/>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
                      <div className="border-t border-[#E5DCD3]/30 px-6 pb-6 pt-4">
                        <p className="font-sans text-xs md:text-sm text-[#1D1D1D]/70 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>)}
                </AnimatePresence>

              </div>);
        })}
        </div>

      </div>
    </section>);
}

"use client";
import React from "react";
import { Star, Check } from "lucide-react";
const REVIEWS = [
    {
        stars: 5,
        title: "Unbelievable Softness",
        quote: "My curls have never felt this soft. I usually struggle with dry hair mid-week, but applying this after my leave-in has kept my hydration locked in for days.",
        author: "Sarah A.",
        hairType: "Type 4C Coils",
        date: "2 days ago",
    },
    {
        stars: 5,
        title: "Snapping has stopped!",
        quote: "I noticed far less breakage after a few weeks of using this on my ends. The wide teeth neem comb plus a few drops of HydraGrow is my new staple.",
        author: "Grace M.",
        hairType: "Type 4A Curls",
        date: "1 week ago",
    },
    {
        stars: 5,
        title: "Brilliant Natural Shine",
        quote: "The shine is incredible. It looks healthy and reflecting, not greasy or weighed down like mineral oils. Smells absolutely beautiful and natural too.",
        author: "Ada O.",
        hairType: "Type 3C Curls",
        date: "3 weeks ago",
    },
    {
        stars: 5,
        title: "Scalp relief at last",
        quote: "My scalp dryness has completely cleared up. The itchiness I used to get on day 3 is gone. It feels balanced, clean, and highly nourished.",
        author: "Mariam K.",
        hairType: "Type 4B Coils",
        date: "1 month ago",
    },
];
export default function Testimonials() {
    return (<section className="bg-[#F7F2EB]/50 py-20 lg:py-28" id="reviews">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
            Customer Testimonials
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
            Loved by Our Community
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-[#D4AF37] stroke-none"/>))}
            <span className="ml-2 text-sm font-bold text-primary">4.9 out of 5</span>
            <span className="ml-1 text-xs text-[#1D1D1D]/50">(142 verified reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((rev, idx) => (<div key={idx} className="rounded-2xl border border-[#E5DCD3]/30 bg-[#FCFBF8] p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(rev.stars)].map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] stroke-none"/>))}
                </div>

                <h3 className="font-serif text-sm font-bold text-primary">
                  &quot;{rev.title}&quot;
                </h3>

                <p className="font-sans text-xs text-[#1D1D1D]/70 leading-relaxed italic">
                  &quot;{rev.quote}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DCD3]/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1">
                    {rev.author}
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Check className="h-2 w-2 stroke-[3]"/>
                    </span>
                  </h4>
                  <p className="text-[10px] text-[#1D1D1D]/45 mt-0.5">{rev.hairType}</p>
                </div>
                <span className="text-[9px] text-[#1D1D1D]/40 font-medium">{rev.date}</span>
              </div>

            </div>))}
        </div>

      </div>
    </section>);
}

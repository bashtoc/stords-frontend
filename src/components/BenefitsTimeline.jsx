"use client";
import React from "react";
import { Clock, CheckCircle } from "lucide-react";
export default function BenefitsTimeline() {
    const steps = [
        {
            week: "Week 1",
            title: "Immediate Softness",
            description: "Hair feels softer to the touch as the botanical lipids absorb into the outer cuticle layers, reducing daily friction and improving immediate styling flexibility.",
        },
        {
            week: "Week 2",
            title: "Moisture Retention",
            description: "Cuticle scales smooth down. Moisture is locked inside the hair cortex, ensuring your curls stay hydrated for days rather than hours.",
        },
        {
            week: "Week 4",
            title: "Reduced Breakage",
            description: "Strand elasticity and tensile strength improve. You'll notice far less shedding and broken hair fibers during comb-outs and detangling.",
        },
        {
            week: "Week 8",
            title: "Healthy Length Retention",
            description: "Scalp irritation is calmed, and hair roots are deeply nourished. Consistent moisture prevents splits, supporting full length retention and thicker-looking volume.",
        },
    ];
    return (<section className="bg-[#FCFBF8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center justify-center gap-1.5">
            <Clock className="h-3.5 w-3.5"/>
            Progression Timeline
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
            The Journey to Stronger Hair
          </h2>
          <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60 leading-relaxed">
            What to expect when integrating STORDS HydraGrow into your weekly wash-day and styling routine.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical connecting line (mobile) / Horizontal (desktop) */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-[#E5DCD3] md:left-0 md:right-0 md:top-1/2 md:h-0.5 md:w-full md:-translate-y-1/2"/>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4 relative">
            {steps.map((step, idx) => (<div key={idx} className="relative pl-12 md:pl-0 md:text-center space-y-4">
                
                {/* Node Dot indicator */}
                <div className="absolute left-1.5 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-accent border-2 border-primary text-primary md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <CheckCircle className="h-3.5 w-3.5 fill-current text-primary-light stroke-white"/>
                </div>

                {/* Content Card */}
                <div className="bg-[#F7F2EB]/30 border border-[#E5DCD3]/30 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 md:mt-8">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                    {step.week}
                  </span>
                  <h3 className="font-serif text-base font-bold text-primary mt-2">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs text-[#1D1D1D]/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>))}
          </div>

          <div className="mt-12 text-center text-[10px] text-[#1D1D1D]/45 font-sans">
            *Routine requires consistent use 2-3 times per week. Individual timelines may vary based on hair health.
          </div>
        </div>

      </div>
    </section>);
}

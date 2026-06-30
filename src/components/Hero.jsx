"use client";
import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export default function Hero() {
    return (<section className="relative w-full overflow-hidden bg-[#4A2C1A] py-20 lg:py-32">
      {/* Decorative background shadow/glow */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white/4 blur-3xl"/>
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/15 blur-2xl"/>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Text Content Block */}
          <div className="space-y-8 lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white backdrop-blur">
              <span>With Batana Oil</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              Hydration.
              <br />
              Strength.
              <br />
              <span className="text-secondary-light">Longer Beautiful Hair.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-lg font-sans text-base sm:text-lg leading-relaxed text-white/75">
              A premium blend of Batana Oil and nutrient-rich botanical oils formulated to deeply hydrate dry hair, reduce breakage, improve softness, enhance shine, and support healthier-looking, stronger hair.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-col gap-4 sm:flex-row">
              <Link to="/shop" className="flex h-14 items-center justify-center gap-2 rounded-[14px] bg-secondary px-8 text-sm font-semibold text-primary hover:bg-secondary-light transition-all shadow-md hover:shadow-lg">
                Shop Now
                <ArrowRight className="h-4 w-4"/>
              </Link>
              <Link to="/#ingredients" className="flex h-14 items-center justify-center rounded-[14px] border border-white/20 bg-white/10 px-8 text-sm font-semibold text-white hover:bg-white/15 transition-all">
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Luxury Product Dropper Bottle Block */}
          <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="relative h-[450px] w-full max-w-[450px] md:h-[550px] md:max-w-[550px]">
              {/* Golden circular shadow base */}
              <div className="absolute inset-0 m-auto h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-white/10 blur-xl animate-pulse"/>
              
              <div className="relative h-full w-full animate-float overflow-hidden rounded-3xl">
                <img src="/heroimage.png" alt="STORDS Batana Hair Oil bottle with botanical ingredients" className="w-full h-full object-cover" className="scale-110 object-cover"/>
              </div>

              {/* Float specs details */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="absolute top-1/4 right-0 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm border border-white/50 hidden sm:block">
                <p className="font-serif text-sm font-bold text-primary">STORDS Batana oil</p>
                <p className="text-[11px] text-[#1D1D1D]/50 mt-0.5">50ml Dropper Bottle</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-secondary">
                  <span>★ 4.9</span>
                  <span className="text-[#1D1D1D]/40">(140+ Reviews)</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-1/4 left-0 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm border border-white/50 hidden sm:block">
                <p className="text-xs font-semibold text-primary">✓ Intense Moisture</p>
                <p className="text-xs font-semibold text-primary mt-1">✓ Reduces Breakage</p>
                <p className="text-xs font-semibold text-primary mt-1">✓ Scalp Nourishment</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>);
}

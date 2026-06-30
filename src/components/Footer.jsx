"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle, } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/api";
export default function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email.trim())
            return;
        setIsSubmitting(true);
        setMessage(null);
        try {
            const res = await subscribeToNewsletter(email);
            setMessage({ success: res.success, text: res.message });
            setEmail("");
            setTimeout(() => setMessage(null), 5000);
        }
        catch (error) {
            setMessage({
                success: false,
                text: error instanceof Error ? error.message : "Unable to subscribe right now.",
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const currentYear = new Date().getFullYear();
    return (<footer className="w-full bg-accent/30 border-t border-[#E5DCD3]/50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Tagline */}
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="font-serif text-2xl font-bold tracking-[0.2em] text-primary">
              STORDS
            </Link>
            <p className="max-w-sm text-sm text-[#1D1D1D]/70 leading-relaxed font-sans">
              Healthy Hair Starts Here. We formulate luxury African-inspired botanical products to restore hydration, shine, and structural strength to your crown.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-primary">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="hover:text-primary-light transition-colors">
                <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="hover:text-primary-light transition-colors">
                <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" aria-label="YouTube" className="hover:text-primary-light transition-colors">
                <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
              {/* Custom SVG for TikTok */}
              <a href="#" aria-label="TikTok" className="hover:text-primary-light transition-colors">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31c2.18,0,4.32,0,6.5.2v88c-2.13-.13-4.27-.2-6.5-.2a74.55,74.55,0,1,0,74.55,74.55v-261h88a122,122,0,0,0,100.4,99.91Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-primary">Shop</h4>
            <ul className="space-y-2.5 text-sm text-[#1D1D1D]/70 font-medium font-sans">
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  HydraGrow Hair Oil
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-primary transition-colors">
                  Neem Comb
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-primary transition-colors">
                  Mulberry Satin Bonnet
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Mists" className="hover:text-primary transition-colors">
                  Rose & Aloe Mist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-primary">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#1D1D1D]/70 font-medium font-sans">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/#ingredients" className="hover:text-primary transition-colors">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Haircare Blog
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-primary">Join Us</h4>
            <p className="text-xs text-[#1D1D1D]/60 leading-relaxed font-sans">
              Get exclusive haircare tips, product updates, and special offers.
            </p>
            {message ? (<div className={`flex items-center gap-2 text-xs font-semibold ${message.success ? "text-green-600" : "text-red-500"}`}>
                <CheckCircle className="h-4 w-4"/>
                <span>{message.text}</span>
              </div>) : (<form onSubmit={handleSubscribe} className="relative flex items-center">
                <input type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border-b border-[#E5DCD3] bg-transparent pb-2.5 pr-8 text-xs font-medium placeholder-[#1D1D1D]/40 focus:border-primary focus:outline-none"/>
                <button type="submit" aria-label="Subscribe" disabled={isSubmitting} className="absolute right-0 bottom-2.5 text-primary hover:text-primary-light transition-colors">
                  <Send className="h-4 w-4 stroke-[1.5]"/>
                </button>
              </form>)}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[#E5DCD3]/50 pt-8 sm:flex-row sm:items-center sm:justify-between text-xs text-[#1D1D1D]/50 font-medium">
          <div>
            &copy; {currentYear} STORDS. All rights reserved. Made with love in Africa.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>);
}

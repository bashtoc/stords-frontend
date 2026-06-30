"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, User, Search, X, Plus, Minus, Trash2, ArrowRight, } from "lucide-react";
import { validateCoupon } from "@/lib/api";
import { toCartProduct } from "@/lib/productMapper";
import { useProducts } from "@/lib/queries";
import { useCartStore } from "@/store/useCartStore";
export default function Header() {
    const location = useLocation();
    const pathname = location.pathname;
    const { items, wishlist, discountCode, discountPercentage, removeFromCart, updateQuantity, toggleWishlist, addToCart, setDiscount, removeDiscount, } = useCartStore();
    const { data: apiProducts } = useProducts();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    // Cart calculation
    const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    const total = subtotal - discountAmount;
    // Search filter
    const searchableProducts = apiProducts?.map(toCartProduct) || [];
    const searchResults = searchQuery.trim()
        ? searchableProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];
    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        if (!couponInput.trim())
            return;
        setIsApplyingCoupon(true);
        try {
            const res = await validateCoupon(couponInput);
            if (res.valid) {
                setDiscount(res.code, res.discountPercentage);
            }
            setCouponMessage({ success: res.valid, text: res.message });
            if (res.valid) {
                setCouponInput("");
            }
        }
        catch (error) {
            setCouponMessage({
                success: false,
                text: error instanceof Error ? error.message : "Unable to validate coupon.",
            });
        }
        finally {
            setIsApplyingCoupon(false);
        }
    };
    const navLinks = [
        { name: "Shop All", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
    ];
    return (<>
      <header className="sticky top-0 z-40 w-full border-b border-[#E5DCD3]/40 bg-[#FCFBF8]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Mobile menu (Left block placeholder/trigger) */}
          <div className="flex lg:hidden">
            {/* Mobile navigation can toggle sidebar or we can display key links directly */}
          </div>

          {/* Left: Navigation links (lg screen) */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (<Link key={link.name} to={link.href} className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary ${isActive ? "text-primary" : "text-[#1D1D1D]/70"}`}>
                  {link.name}
                  {isActive && (<motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }}/>)}
                </Link>);
        })}
          </nav>

          {/* Center: Brand Logo */}
          <div className="flex-1 text-center lg:flex-none">
            <Link to="/" className="font-serif text-2xl font-bold tracking-[0.2em] text-primary">
              STORDS
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="text-[#1D1D1D] hover:text-primary transition-colors" aria-label="Search">
              <Search className="h-[21px] w-[21px] stroke-[1.5]"/>
            </button>

            <Link to="/account" className="text-[#1D1D1D] hover:text-primary transition-colors" aria-label="Account">
              <User className="h-[21px] w-[21px] stroke-[1.5]"/>
            </Link>

            <button onClick={() => setIsWishlistOpen(true)} className="relative text-[#1D1D1D] hover:text-primary transition-colors" aria-label="Wishlist">
              <Heart className="h-[21px] w-[21px] stroke-[1.5]"/>
              {wishlist.length > 0 && (<span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-primary">
                  {wishlist.length}
                </span>)}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative text-[#1D1D1D] hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingBag className="h-[21px] w-[21px] stroke-[1.5]"/>
              {cartItemsCount > 0 && (<span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                  {cartItemsCount}
                </span>)}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (<>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 z-50 bg-black"/>
            {/* Content Drawer */}
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }} className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col bg-warm-bg shadow-2xl sm:max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E5DCD3] px-6 py-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary"/>
                  <h2 className="font-serif text-xl font-bold text-primary">Your Cart</h2>
                  <span className="text-sm font-medium text-[#1D1D1D]/60">({cartItemsCount})</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="rounded-full p-1 hover:bg-[#E5DCD3]/30">
                  <X className="h-6 w-6 text-[#1D1D1D]/80"/>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (<div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="font-sans text-[#1D1D1D]/50 mb-6">Your shopping bag is empty.</p>
                    <Link to="/shop" onClick={() => setIsCartOpen(false)} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white hover:bg-primary-light transition-all">
                      Start Shopping
                    </Link>
                  </div>) : (<div className="space-y-6">
                    {items.map((item) => (<div key={item.product.id} className="flex gap-4 border-b border-[#E5DCD3]/30 pb-6">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-accent">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" className="object-cover"/>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="font-serif text-sm font-bold text-primary line-clamp-1">
                              {item.product.name}
                            </h3>
                            <span className="text-sm font-semibold">${item.product.price.toFixed(2)}</span>
                          </div>
                          {item.product.size && (<span className="text-xs text-[#1D1D1D]/50 mt-0.5">{item.product.size}</span>)}
                          <div className="mt-auto flex items-center justify-between">
                            {/* Quantity selector */}
                            <div className="flex items-center border border-[#E5DCD3] rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-0.5 hover:text-primary">
                                <Minus className="h-3 w-3"/>
                              </button>
                              <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-0.5 hover:text-primary">
                                <Plus className="h-3 w-3"/>
                              </button>
                            </div>
                            {/* Delete button */}
                            <button onClick={() => removeFromCart(item.product.id)} className="text-[#1D1D1D]/40 hover:text-red-500 transition-colors">
                              <Trash2 className="h-4 w-4"/>
                            </button>
                          </div>
                        </div>
                      </div>))}
                  </div>)}
              </div>

              {/* Summary / Footer */}
              {items.length > 0 && (<div className="border-t border-[#E5DCD3] bg-accent/30 p-6 space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input type="text" placeholder="Promo Code (WELCOME10, GOLDEN)" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 rounded-full border border-[#E5DCD3] bg-white px-4 py-2 text-xs font-medium focus:border-primary focus:outline-none"/>
                    <button type="submit" disabled={isApplyingCoupon} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-light">
                      {isApplyingCoupon ? "..." : "Apply"}
                    </button>
                  </form>

                  {/* Coupon feedback */}
                  {couponMessage && (<p className={`text-xs font-semibold ${couponMessage.success ? "text-green-600" : "text-red-500"}`}>
                      {couponMessage.text}
                    </p>)}

                  {discountCode && (<div className="flex items-center justify-between text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg">
                      <span>Promo applied: {discountCode} ({discountPercentage}%)</span>
                      <button onClick={removeDiscount} className="text-[#1D1D1D]/60 hover:text-red-500">
                        Remove
                      </button>
                    </div>)}

                  {/* Invoice details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#1D1D1D]/70">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (<div className="flex justify-between text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>)}
                    <div className="flex justify-between border-t border-[#E5DCD3]/50 pt-2 font-serif text-base font-bold text-primary">
                      <span>Estimated Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-primary text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-md hover:shadow-lg">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4"/>
                  </Link>
                  <p className="text-center text-[10px] text-[#1D1D1D]/40">
                    Shipping & taxes calculated at checkout.
                  </p>
                </div>)}
            </motion.div>
          </>)}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (<>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setIsWishlistOpen(false)} className="fixed inset-0 z-50 bg-black"/>
            {/* Content Drawer */}
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }} className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col bg-warm-bg shadow-2xl sm:max-w-md">
              <div className="flex items-center justify-between border-b border-[#E5DCD3] px-6 py-5">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary fill-primary"/>
                  <h2 className="font-serif text-xl font-bold text-primary">Wishlist</h2>
                  <span className="text-sm font-medium text-[#1D1D1D]/60">({wishlist.length})</span>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="rounded-full p-1 hover:bg-[#E5DCD3]/30">
                  <X className="h-6 w-6 text-[#1D1D1D]/80"/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {wishlist.length === 0 ? (<div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="font-sans text-[#1D1D1D]/50 mb-4">No items saved yet.</p>
                  </div>) : (<div className="space-y-6">
                    {wishlist.map((product) => (<div key={product.id} className="flex gap-4 border-b border-[#E5DCD3]/30 pb-6">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-accent">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" className="object-cover"/>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-sm font-bold text-primary line-clamp-1">
                              {product.name}
                            </h3>
                            <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <button onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                    }} className="text-xs font-semibold bg-primary text-white rounded-full px-3 py-1.5 hover:bg-primary-light transition-all">
                              Add to Bag
                            </button>
                            <button onClick={() => toggleWishlist(product)} className="text-xs font-medium text-[#1D1D1D]/50 hover:text-red-500 transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>))}
                  </div>)}
              </div>
            </motion.div>
          </>)}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-[#FCFBF8]/98 p-6 sm:p-12">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex justify-end mb-8">
                <button onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
            }} className="rounded-full p-2 hover:bg-[#E5DCD3]/30">
                  <X className="h-8 w-8 text-primary"/>
                </button>
              </div>

              {/* Search Bar Input */}
              <div className="relative border-b border-primary/30 pb-4">
                <input type="text" placeholder="Search products, ingredients, solutions..." autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent font-serif text-2xl md:text-3xl text-primary placeholder-[#1D1D1D]/30 focus:outline-none"/>
                <Search className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 text-primary/40"/>
              </div>

              {/* Search Results list */}
              <div className="mt-8 overflow-y-auto max-h-[60vh] space-y-6">
                {searchResults.length > 0 ? (searchResults.map((product) => (<Link key={product.id} to={`/product/${product.id}`} onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#E5DCD3]/20 transition-all">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-accent">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" className="object-cover"/>
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-primary">{product.name}</h4>
                        <p className="text-xs text-[#1D1D1D]/60">{product.tagline}</p>
                        <span className="text-xs font-semibold text-primary mt-1 block">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>))) : searchQuery.trim() ? (<p className="text-center font-sans text-[#1D1D1D]/50 py-12">
                    No results found for &quot;{searchQuery}&quot;
                  </p>) : (<div>
                    <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1D1D1D]/40 mb-4">
                      Trending Searches
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {["Batana Oil", "HydraGrow", "Sleep Bonnet", "Comb"].map((term) => (<button key={term} onClick={() => setSearchQuery(term)} className="rounded-full border border-[#E5DCD3] px-4 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-all">
                          {term}
                        </button>))}
                    </div>
                  </div>)}
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>
    </>);
}

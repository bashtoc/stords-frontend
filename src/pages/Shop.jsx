"use client";
import React, { useState, Suspense } from "react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Heart, ShoppingBag, Star, SlidersHorizontal } from "lucide-react";
import { useCartStore, PRODUCTS } from "@/store/useCartStore";
import { useProducts } from "@/lib/queries";
import { toCartProduct } from "@/lib/productMapper";
function ShopContent() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";
    const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeSort, setActiveSort] = useState("default");
    // Fetch from backend, fall back to static PRODUCTS from store if unavailable
    const { data: apiProducts, isLoading } = useProducts();
    const allProducts = apiProducts?.length
        ? apiProducts.map(toCartProduct)
        : PRODUCTS;
    // Derive categories dynamically from the products list
    const categories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];
    const filteredProducts = allProducts.filter((product) => {
        if (activeCategory === "All")
            return true;
        return product.category === activeCategory;
    });
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (activeSort === "price-asc")
            return a.price - b.price;
        if (activeSort === "price-desc")
            return b.price - a.price;
        if (activeSort === "rating")
            return b.rating - a.rating;
        return 0;
    });
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
      {/* Title */}
      <div className="border-b border-[#E5DCD3]/50 pb-8 text-center sm:text-left">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Shop the Botanical Collection
        </h1>
        <p className="mt-2 text-sm text-[#1D1D1D]/60 max-w-xl">
          Nourishing, premium-grade haircare formulated with pure cold-pressed oils. Free from sulfates, parabens, and silicones.
        </p>
      </div>

      {/* Filter and Sort bar */}
      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5DCD3]/30 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${activeCategory === cat
                ? "bg-primary text-white"
                : "bg-[#F7F2EB]/50 hover:bg-[#F7F2EB] text-primary"}`}>
              {cat}
            </button>))}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <SlidersHorizontal className="h-4 w-4 text-[#1D1D1D]/50"/>
          <select value={activeSort} onChange={(e) => setActiveSort(e.target.value)} className="rounded-full border border-[#E5DCD3] bg-transparent px-4 py-2 text-xs font-semibold text-[#1D1D1D] focus:border-primary focus:outline-none cursor-pointer">
            <option value="default">Featured Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && (<div className="mt-10 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (<div key={i} className="animate-pulse flex flex-col gap-4">
              <div className="aspect-square w-full rounded-2xl bg-[#E5DCD3]/50"/>
              <div className="h-4 w-2/3 rounded bg-[#E5DCD3]/60"/>
              <div className="h-3 w-full rounded bg-[#E5DCD3]/40"/>
            </div>))}
        </div>)}

      {/* Product Grid */}
      {!isLoading && (<div className="mt-10 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => {
                const isLiked = isInWishlist(product.id);
                return (<div key={product.id} className="group relative flex flex-col justify-between">
                {/* Image box with badges & actions */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-accent border border-[#E5DCD3]/30">
                  <Link to={`/product/${product.id}`} className="absolute inset-0">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  </Link>
                  {/* Wishlist button */}
                  <button onClick={() => toggleWishlist(product)} className="absolute right-4 top-4 rounded-full bg-[#FCFBF8]/90 p-2 text-primary shadow-sm hover:scale-105 hover:bg-white transition-all" aria-label="Toggle Wishlist">
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-primary text-primary" : "text-[#1D1D1D]"}`}/>
                  </button>
                  {/* Size Badge */}
                  {product.size && (<span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-white backdrop-blur-sm">
                      {product.size}
                    </span>)}
                </div>

                {/* Product Info */}
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#1D1D1D]/55 font-medium">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-0.5 text-[#D4AF37]">
                        <Star className="h-3 w-3 fill-[#D4AF37] stroke-none"/>
                        <span className="font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="mt-1 font-serif text-base font-bold text-primary hover:text-primary-light transition-colors">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="mt-1 font-sans text-xs text-[#1D1D1D]/60 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(product, 1)} className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-xs font-bold text-white hover:bg-primary-light transition-all shadow-sm">
                      <ShoppingBag className="h-3.5 w-3.5"/>
                      Add
                    </button>
                  </div>
                </div>
              </div>);
            })}
        </div>)}
    </div>);
}
export default function ShopPage() {
    return (<Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8">
          <p className="text-sm text-[#1D1D1D]/55">Loading our botanical collection...</p>
        </div>}>
      <ShopContent />
    </Suspense>);
}

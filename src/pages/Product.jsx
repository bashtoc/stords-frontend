"use client";
import React, { useState, use } from "react";

import { Link } from "react-router-dom";
import { Star, Heart, Share2, Plus, Minus, ShoppingBag, MessageSquare } from "lucide-react";
import { useCartStore, PRODUCTS } from "@/store/useCartStore";
import { createProductReview } from "@/lib/api";
import { toCartProduct } from "@/lib/productMapper";
import { useProduct, useProductReviews } from "@/lib/queries";
export default function ProductDetailPage({ params }) {
    const { id } = use(params);
    const { data: backendProduct, isLoading } = useProduct(id);
    const { data: backendReviews, refetch: refetchReviews } = useProductReviews(id);
    const fallbackProduct = PRODUCTS.find((p) => p.id === id);
    const product = backendProduct ? toCartProduct(backendProduct) : fallbackProduct;
    const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [shareCopied, setShareCopied] = useState(false);
    const [reviewStatus, setReviewStatus] = useState(null);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    // Review Form state
    const fallbackReviews = [
        { author: "Sarah A.", rating: 5, comment: "My coils feel incredibly soft and hydrated. Best oil I have ever used.", date: "2 weeks ago" },
        { author: "Grace M.", rating: 5, comment: "Noticeable reduction in hair shedding and breakage when detangling.", date: "3 weeks ago" },
        { author: "Marcus K.", rating: 4, comment: "Excellent moisture locking, a little goes a very long way on my beard.", date: "1 month ago" }
    ];
    const reviews = backendReviews?.length ? backendReviews : fallbackReviews;
    const [reviewName, setReviewName] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    if (isLoading && !product) {
        return (<div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8">
        <p className="text-sm text-[#1D1D1D]/55">Loading product details...</p>
      </div>);
    }
    if (!product) {
        return (<div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8">
        <h1 className="font-serif text-2xl font-bold text-primary">Product Not Found</h1>
        <p className="mt-2 text-sm text-[#1D1D1D]/60">The requested product could not be found.</p>
        <Link to="/shop" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white">
          Back to Shop
        </Link>
      </div>);
    }
    const isProductLiked = isInWishlist(product.id);
    const handleAddToCart = () => {
        addToCart(product, quantity);
    };
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
    };
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewName.trim() || !reviewText.trim())
            return;
        setIsSubmittingReview(true);
        setReviewStatus(null);
        try {
            await createProductReview(id, {
                author: reviewName.trim(),
                rating: reviewRating,
                comment: reviewText.trim(),
            });
            await refetchReviews();
            setReviewName("");
            setReviewRating(5);
            setReviewText("");
            setReviewStatus({ success: true, text: "Thanks. Your review has been submitted." });
        }
        catch (error) {
            setReviewStatus({
                success: false,
                text: error instanceof Error ? error.message : "Unable to submit review.",
            });
        }
        finally {
            setIsSubmittingReview(false);
        }
    };
    const tabs = [
        { id: "description", name: "Description" },
        { id: "how-to-use", name: "How to Use" },
        { id: "ingredients", name: "Ingredients" },
        { id: "shipping", name: "Shipping & Returns" }
    ];
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      {/* Product top detail block */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Image viewer */}
        <div className="relative lg:col-span-6 flex flex-col items-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#E5DCD3]/40 bg-accent max-w-[500px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" className="object-cover"/>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              {product.category}
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm italic text-[#1D1D1D]/60">{product.tagline}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-[#D4AF37] stroke-none"/>))}
            <span className="ml-2 text-xs font-bold text-primary">{product.rating}</span>
            <span className="ml-1 text-xs text-[#1D1D1D]/50">({reviews.length} Customer reviews)</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</div>

          {/* Summary description */}
          <p className="text-sm text-[#1D1D1D]/70 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Quantity and Cart CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Quantity */}
            <div className="flex items-center justify-between border border-[#E5DCD3] rounded-full p-2 w-32 shrink-0 bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-primary">
                <Minus className="h-4 w-4"/>
              </button>
              <span className="font-semibold text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-primary">
                <Plus className="h-4 w-4"/>
              </button>
            </div>

            {/* Add to Bag Button */}
            <button onClick={handleAddToCart} className="flex-1 flex h-14 items-center justify-center gap-2 rounded-[14px] bg-primary text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-md hover:shadow-lg">
              <ShoppingBag className="h-4 w-4"/>
              Add to Shopping Bag
            </button>

            {/* Wishlist Button */}
            <button onClick={() => toggleWishlist(product)} className="flex h-14 w-14 items-center justify-center rounded-[14px] border border-[#E5DCD3] hover:bg-[#F7F2EB]/50 transition-all shrink-0 text-primary" aria-label="Wishlist">
              <Heart className={`h-5 w-5 ${isProductLiked ? "fill-primary text-primary" : "text-primary"}`}/>
            </button>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#E5DCD3]/50">
            <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-semibold text-[#1D1D1D]/60 hover:text-primary transition-colors">
              <Share2 className="h-4 w-4 stroke-[1.5]"/>
              {shareCopied ? "Link Copied!" : "Share Product"}
            </button>
          </div>

          {/* Tabs Accordion */}
          <div className="border-t border-[#E5DCD3]/60 pt-6">
            <div className="flex border-b border-[#E5DCD3]/30">
              {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`border-b-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-[#1D1D1D]/50 hover:text-primary"}`}>
                  {tab.name}
                </button>))}
            </div>

            <div className="py-6 min-h-[120px]">
              {activeTab === "description" && (<div className="text-xs md:text-sm text-[#1D1D1D]/75 leading-relaxed space-y-4">
                  <p>{product.description}</p>
                  {product.benefits && (<ul className="list-disc pl-5 space-y-2 mt-4 text-[#1D1D1D]/80">
                      {product.benefits.map((b, idx) => (<li key={idx}>{b}</li>))}
                    </ul>)}
                </div>)}

              {activeTab === "how-to-use" && (<p className="text-xs md:text-sm text-[#1D1D1D]/75 leading-relaxed">
                  {product.howToUse}
                </p>)}

              {activeTab === "ingredients" && (<div className="space-y-2 text-xs md:text-sm text-[#1D1D1D]/75">
                  <p className="font-bold text-primary mb-2">Ingredients Formulation:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.ingredients.map((ing, idx) => (<li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary"/>
                        {ing}
                      </li>))}
                  </ul>
                </div>)}

              {activeTab === "shipping" && (<p className="text-xs md:text-sm text-[#1D1D1D]/75 leading-relaxed">
                  We ship globally from Africa. Standard shipping takes 3-7 business days depending on location. Free shipping is applied to all orders above $75. If you are not completely satisfied, return items within 30 days for a full refund or exchange.
                </p>)}
            </div>
          </div>

        </div>
      </div>

      {/* Review Section */}
      <div className="mt-20 border-t border-[#E5DCD3]/60 pt-16">
        <h2 className="font-serif text-2xl font-bold text-primary mb-8 flex items-center gap-2">
          <MessageSquare className="h-5 w-5"/>
          Customer Feedback
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Reviews list */}
          <div className="lg:col-span-7 space-y-6">
            {reviews.map((rev, idx) => (<div key={idx} className="border-b border-[#E5DCD3]/30 pb-6 last:border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-primary">{rev.author}</h4>
                    <span className="text-[10px] text-[#1D1D1D]/40">{rev.date}</span>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] stroke-none"/>))}
                  </div>
                </div>
                <p className="mt-3 text-xs md:text-sm text-[#1D1D1D]/70 leading-relaxed font-sans">
                  {rev.comment}
                </p>
              </div>))}
          </div>

          {/* Form to submit review */}
          <div className="lg:col-span-5 bg-[#F7F2EB]/50 rounded-2xl p-6 border border-[#E5DCD3]/40 self-start">
            <h3 className="font-serif text-base font-bold text-primary mb-4">Write a Customer Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/60 block mb-1">
                  Your Name
                </label>
                <input type="text" required placeholder="Sarah Johnson" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="w-full rounded-lg border border-[#E5DCD3] bg-white px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"/>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/60 block mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setReviewRating(star)} className="p-0.5 hover:scale-105">
                      <Star className={`h-6 w-6 stroke-none ${star <= reviewRating ? "fill-[#D4AF37]" : "fill-gray-200"}`}/>
                    </button>))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/60 block mb-1">
                  Review Text
                </label>
                <textarea required rows={4} placeholder="Describe your curls and scaler health after using this oil..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full rounded-lg border border-[#E5DCD3] bg-white px-3 py-2 text-xs font-semibold focus:border-primary focus:outline-none"/>
              </div>

              <button type="submit" disabled={isSubmittingReview} className="w-full h-11 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-light shadow-sm">
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </button>
              {reviewStatus && (<p className={`text-xs font-semibold ${reviewStatus.success ? "text-green-600" : "text-red-500"}`}>
                  {reviewStatus.text}
                </p>)}
            </form>
          </div>
        </div>
      </div>
    </div>);
}

"use client";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { useCartStore, PRODUCTS } from "@/store/useCartStore";
import { validateCoupon } from "@/lib/api";
export default function CartPage() {
    const { items, discountCode, discountPercentage, updateQuantity, removeFromCart, setDiscount, removeDiscount, addToCart, } = useCartStore();
    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    // Cart calculations
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    // Shipping: free above $75
    const shippingThreshold = 75;
    const shippingCost = subtotal === 0 || subtotal >= shippingThreshold ? 0 : 4.99;
    const grandTotal = subtotal - discountAmount + shippingCost;
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
    // Upsell recommendations (filter out what's already in the cart)
    const cartProductIds = items.map((item) => item.product.id);
    const upsellProducts = PRODUCTS.filter((product) => !cartProductIds.includes(product.id)).slice(0, 3);
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-primary mb-10">Shopping Cart</h1>

      {items.length === 0 ? (<div className="flex flex-col items-center justify-center text-center py-20 bg-accent/10 rounded-3xl border border-[#E5DCD3]/30">
          <ShoppingBag className="h-16 w-16 text-[#1D1D1D]/30 mb-6"/>
          <h2 className="font-serif text-xl font-bold text-primary">Your Shopping Bag is Empty</h2>
          <p className="mt-2 text-sm text-[#1D1D1D]/60 max-w-sm">
            Restore moisture and lock in definition by choosing from our cold-pressed botanical collection.
          </p>
          <Link to="/shop" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-sm">
            Start Shopping
          </Link>
        </div>) : (<div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* Cart items list - left */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-6">
              {items.map((item) => (<div key={item.product.id} className="flex flex-col sm:flex-row gap-6 border-b border-[#E5DCD3]/30 pb-6 last:border-0 last:pb-0">
                  {/* Image */}
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-accent shrink-0 border border-[#E5DCD3]/20">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" className="object-cover"/>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-base font-bold text-primary hover:text-primary-light">
                          <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                        </h3>
                        <span className="text-sm font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-[#1D1D1D]/55 mt-0.5">{item.product.tagline}</p>
                      {item.product.size && (<span className="inline-block bg-[#F7F2EB] rounded-md px-2 py-0.5 text-[10px] text-primary font-semibold mt-2">
                          {item.product.size}
                        </span>)}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-[#E5DCD3] rounded-full p-1 bg-white">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-primary">
                          <Minus className="h-3 w-3"/>
                        </button>
                        <span className="w-10 text-center text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-primary">
                          <Plus className="h-3 w-3"/>
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.product.id)} className="flex items-center gap-1 text-xs text-[#1D1D1D]/45 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4"/>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>))}
            </div>

            {/* Upsell suggestion */}
            {upsellProducts.length > 0 && (<div className="rounded-3xl border border-[#E5DCD3]/40 bg-accent/20 p-6 space-y-6">
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                  Complete Your Routine
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upsellProducts.map((prod) => (<div key={prod.id} className="rounded-2xl border border-[#E5DCD3]/20 bg-white p-4 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-accent">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" className="object-cover"/>
                        </div>
                        <h4 className="font-serif text-xs font-bold text-primary mt-3 line-clamp-1">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-bold text-primary block mt-1">
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>
                      <button onClick={() => addToCart(prod, 1)} className="w-full h-8 bg-primary text-white rounded-full text-[10px] font-bold mt-4 hover:bg-primary-light">
                        Quick Add
                      </button>
                    </div>))}
                </div>
              </div>)}
          </div>

          {/* Cart summary - right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-6 self-start shadow-sm">
              <h2 className="font-serif text-lg font-bold text-primary border-b border-[#E5DCD3]/30 pb-4">
                Order Summary
              </h2>

              {/* Promo code application */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input type="text" placeholder="WELCOME10, GOLDEN" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="w-full rounded-full border border-[#E5DCD3] bg-white pl-9 pr-4 py-2.5 text-xs font-medium focus:border-primary focus:outline-none"/>
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1D1D1D]/30"/>
                  </div>
                  <button type="submit" disabled={isApplyingCoupon} className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-light">
                    {isApplyingCoupon ? "..." : "Apply"}
                  </button>
                </div>
                {couponMessage && (<p className={`text-xs font-semibold ${couponMessage.success ? "text-green-600" : "text-red-500"}`}>
                    {couponMessage.text}
                  </p>)}
              </form>

              {discountCode && (<div className="flex items-center justify-between text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                  <span>Code Applied: {discountCode} ({discountPercentage}%)</span>
                  <button onClick={removeDiscount} className="text-[#1D1D1D]/60 hover:text-red-500">
                    Remove
                  </button>
                </div>)}

              {/* Invoice list */}
              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex justify-between text-[#1D1D1D]/75">
                  <span>Cart Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (<div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>)}

                <div className="flex justify-between text-[#1D1D1D]/75">
                  <span>Shipping Cost</span>
                  <span>{shippingCost === 0 ? "Free Shipping" : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                {shippingCost > 0 && (<div className="bg-[#F7F2EB] rounded-xl p-3 text-[10px] text-primary">
                    Add <strong>${(shippingThreshold - subtotal).toFixed(2)}</strong> more to unlock Free Shipping!
                  </div>)}

                <div className="flex justify-between border-t border-[#E5DCD3] pt-4 font-serif text-base font-bold text-primary">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout link */}
              <Link to="/checkout" className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-primary text-xs md:text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-md hover:shadow-lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
          </div>

        </div>)}
    </div>);
}

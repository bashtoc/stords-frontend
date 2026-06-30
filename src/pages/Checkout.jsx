"use client";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, ArrowRight, ShieldCheck, ShoppingBag, ArrowLeft } from "lucide-react";
import { createOrder } from "@/lib/api";
import { toOrderItems } from "@/lib/productMapper";
import { useCartStore } from "@/store/useCartStore";
export default function CheckoutPage() {
    const { items, discountCode, discountPercentage, clearCart } = useCartStore();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [order, setOrder] = useState(null);
    const [checkoutError, setCheckoutError] = useState(null);
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
    // Shipping Form State
    const [shippingForm, setShippingForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "United States",
        postalCode: "",
        phone: "",
    });
    // Payment Form State
    const [paymentForm, setPaymentForm] = useState({
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
    });
    const [cardFocusedField, setCardFocusedField] = useState("");
    // Invoice calculations
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    const shippingCost = subtotal >= 75 || subtotal === 0 ? 0 : 4.99;
    const grandTotal = subtotal - discountAmount + shippingCost;
    const handleShippingChange = (e) => {
        setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    };
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        // Format card number with spaces
        if (name === "cardNumber") {
            const formatted = value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim().substring(0, 19);
            setPaymentForm({ ...paymentForm, cardNumber: formatted });
            return;
        }
        // Format expiry with slash
        if (name === "cardExpiry") {
            const formatted = value.replace(/\//g, "").replace(/(\d{2})/g, "$1/").trim().substring(0, 5);
            if (formatted.endsWith("/")) {
                setPaymentForm({ ...paymentForm, cardExpiry: formatted.substring(0, formatted.length - 1) });
            }
            else {
                setPaymentForm({ ...paymentForm, cardExpiry: formatted });
            }
            return;
        }
        // Limit CVV
        if (name === "cardCvv") {
            const formatted = value.replace(/\D/g, "").substring(0, 4);
            setPaymentForm({ ...paymentForm, cardCvv: formatted });
            return;
        }
        setPaymentForm({ ...paymentForm, [name]: value });
    };
    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setCheckoutError(null);
        setIsSubmittingOrder(true);
        try {
            const createdOrder = await createOrder({
                customer: {
                    email: shippingForm.email,
                    firstName: shippingForm.firstName,
                    lastName: shippingForm.lastName,
                    phone: shippingForm.phone,
                },
                shippingAddress: {
                    address: shippingForm.address,
                    city: shippingForm.city,
                    country: shippingForm.country,
                    postalCode: shippingForm.postalCode,
                },
                items: toOrderItems(items),
                couponCode: discountCode || undefined,
                currency: "USD",
                paymentProvider: "mock",
            });
            setOrder(createdOrder);
            setStep(3);
        }
        catch (error) {
            setCheckoutError(error instanceof Error ? error.message : "Unable to create order.");
        }
        finally {
            setIsSubmittingOrder(false);
        }
    };
    const handleCompleteOrder = () => {
        clearCart();
    };
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      {/* Step Indicator Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#E5DCD3] -translate-y-1/2 z-0"/>
          
          {[1, 2, 3].map((num) => (<div key={num} className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-serif text-sm font-bold shadow-md transition-all duration-300 ${step >= num ? "bg-primary text-white scale-110" : "bg-[#FCFBF8] border border-[#E5DCD3] text-[#1D1D1D]/55"}`}>
              {num === 3 && step === 3 ? "✓" : num}
            </div>))}
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 mt-4 px-2">
          <span>Shipping Details</span>
          <span>Payment Details</span>
          <span>Order Confirmation</span>
        </div>
      </div>

      {step < 3 && items.length === 0 ? (<div className="text-center py-20 bg-accent/15 rounded-3xl border border-[#E5DCD3]/35 max-w-2xl mx-auto">
          <ShoppingBag className="h-12 w-12 text-primary/30 mx-auto mb-4"/>
          <h2 className="font-serif text-lg font-bold text-primary">Your Shopping Bag is empty</h2>
          <p className="text-xs text-[#1D1D1D]/50 mt-1">Please add items to your cart before checking out.</p>
          <Link to="/shop" className="mt-6 inline-flex h-11 items-center justify-center bg-primary text-white rounded-full px-6 text-xs font-semibold">
            Return to Shop
          </Link>
        </div>) : (<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 max-w-6xl mx-auto">
          
          {/* Form Side - Left */}
          {step === 1 && (<div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold text-primary mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                      Email Address
                    </label>
                    <input type="email" required name="email" value={shippingForm.email} onChange={handleShippingChange} placeholder="jane.doe@example.com" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        First Name
                      </label>
                      <input type="text" required name="firstName" value={shippingForm.firstName} onChange={handleShippingChange} placeholder="Jane" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Last Name
                      </label>
                      <input type="text" required name="lastName" value={shippingForm.lastName} onChange={handleShippingChange} placeholder="Doe" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                      Street Address
                    </label>
                    <input type="text" required name="address" value={shippingForm.address} onChange={handleShippingChange} placeholder="123 Luxury Lane" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        City
                      </label>
                      <input type="text" required name="city" value={shippingForm.city} onChange={handleShippingChange} placeholder="New York" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Postal Code
                      </label>
                      <input type="text" required name="postalCode" value={shippingForm.postalCode} onChange={handleShippingChange} placeholder="10001" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Country
                      </label>
                      <select name="country" value={shippingForm.country} onChange={handleShippingChange} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none cursor-pointer">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>South Africa</option>
                        <option>Nigeria</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Phone Number
                      </label>
                      <input type="text" required name="phone" value={shippingForm.phone} onChange={handleShippingChange} placeholder="+1 (555) 019-2834" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary-light transition-all shadow-sm">
                    Proceed to Payment Details
                    <ArrowRight className="h-4 w-4"/>
                  </button>
                </form>
              </div>
            </div>)}

          {step === 2 && (<div className="lg:col-span-7 space-y-8">
              {/* Virtual Credit Card container */}
              <div className="relative mx-auto h-48 w-80 perspective-1000">
                <div className={`relative h-full w-full rounded-2xl p-6 shadow-xl transition-transform duration-700 transform-style-3d bg-gradient-to-tr from-primary to-primary-light text-white ${cardFocusedField === "cardCvv" ? "rotate-y-180" : ""}`}>
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="h-8 w-12 rounded bg-yellow-400/25 border border-yellow-400/40 relative"/>
                      <span className="font-serif tracking-widest text-sm font-bold">STORDS</span>
                    </div>
                    <div className="font-sans tracking-[0.15em] text-lg text-white font-bold my-4">
                      {paymentForm.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end text-[10px]">
                      <div>
                        <span className="opacity-60 block uppercase">Cardholder</span>
                        <span className="font-semibold uppercase truncate max-w-[150px] inline-block mt-0.5">
                          {paymentForm.cardName || "Jane Doe"}
                        </span>
                      </div>
                      <div>
                        <span className="opacity-60 block uppercase">Expires</span>
                        <span className="font-semibold inline-block mt-0.5">
                          {paymentForm.cardExpiry || "MM/YY"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 backface-hidden p-6 rotate-y-180 flex flex-col justify-between bg-gradient-to-tr from-primary-light to-primary">
                    <div className="w-full h-8 bg-black/60 -mx-6 mt-2"/>
                    <div className="text-right">
                      <span className="text-[8px] opacity-60 uppercase block mb-1">CVV Code</span>
                      <div className="bg-white text-primary font-bold px-3 py-1 text-sm rounded tracking-widest inline-block text-right min-w-[50px]">
                        {paymentForm.cardCvv || "•••"}
                      </div>
                    </div>
                    <div className="text-[8px] opacity-40 text-center">
                      Secure payment encrypted by STORDS Pay.
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment details form */}
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-bold text-primary">Payment Details</h2>
                  <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs font-semibold text-primary/60 hover:text-primary">
                    <ArrowLeft className="h-3 w-3"/>
                    Back
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                      Cardholder Name
                    </label>
                    <input type="text" required name="cardName" value={paymentForm.cardName} onChange={handlePaymentChange} onFocus={() => setCardFocusedField("cardName")} onBlur={() => setCardFocusedField("")} placeholder="Jane Doe" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input type="text" required name="cardNumber" value={paymentForm.cardNumber} onChange={handlePaymentChange} onFocus={() => setCardFocusedField("cardNumber")} onBlur={() => setCardFocusedField("")} placeholder="4111 2222 3333 4444" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1D1D1D]/30"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Expiration Date
                      </label>
                      <input type="text" required name="cardExpiry" value={paymentForm.cardExpiry} onChange={handlePaymentChange} onFocus={() => setCardFocusedField("cardExpiry")} onBlur={() => setCardFocusedField("")} placeholder="MM/YY" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        CVV / CVC
                      </label>
                      <input type="password" required name="cardCvv" value={paymentForm.cardCvv} onChange={handlePaymentChange} onFocus={() => setCardFocusedField("cardCvv")} onBlur={() => setCardFocusedField("")} placeholder="•••" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmittingOrder} className="w-full mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary-light transition-all shadow-sm">
                    {isSubmittingOrder ? "Authorizing..." : `Confirm & Authorize Payment ($${grandTotal.toFixed(2)})`}
                  </button>
                  {checkoutError && (<p className="text-center text-xs font-semibold text-red-500">{checkoutError}</p>)}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#1D1D1D]/45 mt-4">
                    <ShieldCheck className="h-4 w-4 text-green-600"/>
                    <span>Secure 256-bit SSL encrypted transaction</span>
                  </div>
                </form>
              </div>
            </div>)}

          {step === 3 && (<div className="lg:col-span-12 text-center py-16 px-6 bg-white rounded-3xl border border-[#E5DCD3]/40 max-w-2xl mx-auto space-y-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto stroke-[1.5]"/>
              
              <div className="space-y-2">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Thank You for Sourcing STORDS</h1>
                <p className="text-sm text-[#1D1D1D]/60 font-medium">Your order has been received and is being processed.</p>
                <p className="text-xs text-primary font-bold">Order ID: #{order?.id || "Pending"}</p>
              </div>

              {/* Delivery Receipt box */}
              <div className="border border-[#E5DCD3]/50 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4 text-xs bg-[#FCFBF8]">
                <div className="font-bold text-primary border-b border-[#E5DCD3]/30 pb-2">Delivery Summary</div>
                <div>
                  <span className="opacity-60 block">Shipped To:</span>
                  <span className="font-semibold block mt-0.5">{shippingForm.firstName} {shippingForm.lastName}</span>
                  <span className="font-semibold block text-[#1D1D1D]/80">{shippingForm.address}, {shippingForm.city}, {shippingForm.postalCode}</span>
                </div>
                <div>
                  <span className="opacity-60 block">Confirmation Sent To:</span>
                  <span className="font-semibold block mt-0.5">{shippingForm.email}</span>
                </div>
                <div className="border-t border-[#E5DCD3]/30 pt-3 flex justify-between font-serif text-sm font-bold text-primary">
                  <span>Authorized Charge</span>
                  <span>${(order?.total ?? grandTotal).toFixed(2)}</span>
                </div>
              </div>

              <Link to="/shop" onClick={handleCompleteOrder} className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white hover:bg-primary-light transition-all shadow-sm">
                Continue Sourcing
              </Link>
            </div>)}

          {/* Cart Preview column - Right (Only shown in Step 1 and 2) */}
          {step < 3 && (<div className="lg:col-span-5 self-start space-y-6">
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-[#FCFBF8] p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-sm font-bold text-primary border-b border-[#E5DCD3]/30 pb-2">
                  Order Breakdown
                </h3>
                
                {/* Items */}
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (<div key={item.product.id} className="flex gap-3">
                      <div className="relative h-12 w-12 rounded-lg bg-accent border border-[#E5DCD3]/20 overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" className="object-cover"/>
                      </div>
                      <div className="flex-1 text-xs">
                        <span className="font-serif font-bold text-primary block line-clamp-1">{item.product.name}</span>
                        <span className="text-[#1D1D1D]/55">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>))}
                </div>

                {/* Subtotals */}
                <div className="border-t border-[#E5DCD3]/30 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#1D1D1D]/75">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (<div className="flex justify-between text-green-600 font-medium">
                      <span>Promo Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>)}
                  <div className="flex justify-between text-[#1D1D1D]/75">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E5DCD3]/50 pt-2 font-serif text-sm font-bold text-primary">
                    <span>Total Amount</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>)}

        </div>)}
    </div>);
}

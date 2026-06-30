"use client";
import React, { useEffect, useState } from "react";

import { Eye, EyeOff, User, LogOut, Package, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchCurrentCustomer, fetchMyOrders, loginCustomer, logoutCustomer, registerCustomer, updateCustomerProfile, verifyOtpCustomer, } from "@/lib/api";
import { useCartStore } from "@/store/useCartStore";
function normalizeAddress(address) {
    if (!address)
        return null;
    if (typeof address === "string") {
        try {
            return JSON.parse(address);
        }
        catch {
            return null;
        }
    }
    return address;
}
export default function AccountPage() {
    const { wishlist } = useCartStore();
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState("login"); // "login" | "register"
    const [formData, setFormData] = useState({
        name: "Jane Doe",
        email: "",
        password: "",
    });
    const [authError, setAuthError] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [otpChallenge, setOtpChallenge] = useState(null);
    const [otpCode, setOtpCode] = useState("");
    const [addressForm, setAddressForm] = useState({
        address: "",
        city: "",
        country: "United States",
        postalCode: "",
    });
    const [addressMessage, setAddressMessage] = useState(null);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [orders, setOrders] = useState([]);
    const mockOrders = [
        { id: "STD-8392-10", date: "June 14, 2026", total: 48.00, status: "Delivered", items: "STORDS HydraGrow Hair Oil x1" },
        { id: "STD-7483-05", date: "April 29, 2026", total: 66.00, status: "Delivered", items: "Hydration Mist x1, Neem Comb x1" },
    ];
    const savedAddress = normalizeAddress(user?.defaultAddress);
    useEffect(() => {
        fetchCurrentCustomer()
            .then((res) => {
            const defaultAddress = normalizeAddress(res.user.defaultAddress);
            setUser(res.user);
            setAddressForm({
                address: defaultAddress?.address || "",
                city: defaultAddress?.city || "",
                country: defaultAddress?.country || "United States",
                postalCode: defaultAddress?.postalCode || "",
            });
            setIsEditingAddress(!defaultAddress);
            return fetchMyOrders();
        })
            .then(setOrders)
            .catch(() => {
            setUser(null);
            setOrders([]);
        });
    }, []);
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);
        setIsAuthenticating(true);
        try {
            const [firstName, ...lastNameParts] = formData.name.trim().split(" ");
            const res = authMode === "login"
                ? await loginCustomer({ email: formData.email, password: formData.password })
                : await registerCustomer({
                    email: formData.email,
                    password: formData.password,
                    firstName: firstName || "STORDS",
                    lastName: lastNameParts.join(" ") || "Customer",
                });
            if (res.requiresOtp) {
                setOtpChallenge(res);
                setOtpCode("");
                return;
            }
            await completeAuthenticatedSession(res.user);
        }
        catch (error) {
            setAuthError(error instanceof Error ? error.message : "Unable to authenticate.");
        }
        finally {
            setIsAuthenticating(false);
        }
    };
    const completeAuthenticatedSession = async (nextUser) => {
        setUser(nextUser);
        const defaultAddress = normalizeAddress(nextUser.defaultAddress);
        setAddressForm({
            address: defaultAddress?.address || "",
            city: defaultAddress?.city || "",
            country: defaultAddress?.country || "United States",
            postalCode: defaultAddress?.postalCode || "",
        });
        setIsEditingAddress(!defaultAddress);
        setOrders(await fetchMyOrders());
    };
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otpChallenge)
            return;
        setAuthError(null);
        setIsAuthenticating(true);
        try {
            const res = await verifyOtpCustomer({
                verificationToken: otpChallenge.verificationToken,
                code: otpCode.trim(),
            });
            setOtpChallenge(null);
            setOtpCode("");
            await completeAuthenticatedSession(res.user);
        }
        catch (error) {
            setAuthError(error instanceof Error ? error.message : "Unable to verify code.");
        }
        finally {
            setIsAuthenticating(false);
        }
    };
    const resetOtpStep = () => {
        setOtpChallenge(null);
        setOtpCode("");
        setAuthError(null);
    };
    const handleLogout = async () => {
        await logoutCustomer().catch(() => null);
        setUser(null);
        setOrders([]);
        setFormData({ name: "Jane Doe", email: "", password: "" });
        resetOtpStep();
        setAddressForm({ address: "", city: "", country: "United States", postalCode: "" });
        setIsEditingAddress(false);
    };
    const handleAddressChange = (e) => {
        setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
    };
    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if (!user)
            return;
        setAddressMessage(null);
        setIsSavingAddress(true);
        const nextAddress = {
            address: addressForm.address.trim(),
            city: addressForm.city.trim(),
            country: addressForm.country.trim(),
            postalCode: addressForm.postalCode.trim(),
        };
        try {
            const res = await updateCustomerProfile({
                defaultAddress: nextAddress,
            });
            const defaultAddress = normalizeAddress(res.user.defaultAddress) || nextAddress;
            setUser({ ...res.user, defaultAddress });
            setAddressForm({
                address: defaultAddress.address,
                city: defaultAddress.city,
                country: defaultAddress.country,
                postalCode: defaultAddress.postalCode,
            });
            setIsEditingAddress(false);
            setAddressMessage({ success: true, text: "Default address updated." });
        }
        catch (error) {
            setAddressMessage({
                success: false,
                text: error instanceof Error ? error.message : "Unable to update default address.",
            });
        }
        finally {
            setIsSavingAddress(false);
        }
    };
    const displayOrders = orders.length
        ? orders.map((order) => ({
            id: order.id,
            date: new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            total: order.total,
            status: order.status,
            items: order.items?.map((item) => `${item.name} x${item.quantity}`).join(", ") || "STORDS order",
        }))
        : mockOrders;
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      {!user ? (
        // Auth Portal Panel
        <div className="max-w-md mx-auto rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-primary">
              {authMode === "login" ? "Welcome Back to STORDS" : "Join the STORDS Circle"}
            </h1>
            <p className="text-xs text-[#1D1D1D]/55 mt-2">
              {authMode === "login" ? "Access your order history and profile settings." : "Create an account to track shipments and save wishlist details."}
            </p>
          </div>

          {otpChallenge ? (<form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="rounded-2xl border border-[#E5DCD3]/60 bg-[#FCFBF8] p-4 text-center">
              <p className="text-xs font-semibold text-primary">Enter the 6-digit code sent to</p>
              <p className="mt-1 text-xs text-[#1D1D1D]/60">{otpChallenge.email}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                Verification Code
              </label>
              <input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="000000" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-3 text-center text-lg font-bold tracking-[0.35em] text-primary focus:border-primary focus:outline-none"/>
            </div>
            <button type="submit" disabled={isAuthenticating || otpCode.length !== 6} className="w-full h-11 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-light transition-all shadow-sm disabled:opacity-60">
              {isAuthenticating ? "Verifying..." : "Verify Code"}
            </button>
            {authError && <p className="text-xs font-semibold text-red-500">{authError}</p>}
            <button type="button" onClick={resetOtpStep} className="w-full text-xs font-bold text-primary hover:text-primary-light transition-colors">
              Use a different email
            </button>
          </form>) : (<form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === "register" && (<div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                  Full Name
                </label>
                <input type="text" required placeholder="Jane Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
              </div>)}

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                Email Address
              </label>
              <input type="email" required placeholder="jane.doe@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                Password
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] py-2.5 pl-4 pr-11 text-xs font-semibold focus:border-primary focus:outline-none"/>
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D1D1D]/45 hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isAuthenticating} className="w-full h-11 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-light transition-all shadow-sm">
              {isAuthenticating ? "Please wait..." : authMode === "login" ? "Sign In" : "Register Account"}
            </button>
            {authError && <p className="text-xs font-semibold text-red-500">{authError}</p>}
          </form>)}

          {/* Toggle auth mode link */}
          {!otpChallenge && (<div className="text-center mt-6">
            <button onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setAuthError(null);
            }} className="text-xs font-bold text-primary hover:text-primary-light transition-colors">
              {authMode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>)}
        </div>) : (
        // Customer Profile Dashboard
        <div className="space-y-10">
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E5DCD3]/50 pb-6 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                Customer Portal
              </span>
              <h1 className="font-serif text-3xl font-bold text-primary mt-1">
                Welcome, {user.firstName || "STORDS Customer"}
              </h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-full self-start">
              <LogOut className="h-4 w-4"/>
              Sign Out
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            
            {/* Info and Address card - Left */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile card */}
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                  <User className="h-4.5 w-4.5"/>
                  Account Profile
                </h3>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="opacity-50 block">Registered Name</span>
                    <span className="font-semibold block mt-0.5 text-primary">{user.firstName} {user.lastName}</span>
                  </div>
                  <div>
                    <span className="opacity-50 block">Contact Email</span>
                    <span className="font-semibold block mt-0.5 text-primary">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Address card */}
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5"/>
                  Default Address
                </h3>
                {savedAddress ? (<div className="text-xs space-y-2 rounded-2xl bg-[#FCFBF8] p-4 border border-[#E5DCD3]/30">
                    <span className="font-semibold block text-primary">{savedAddress.address}</span>
                    <span className="font-semibold block text-[#1D1D1D]/70">
                      {savedAddress.city}, {savedAddress.postalCode}
                    </span>
                    <span className="font-semibold block text-[#1D1D1D]/75">{savedAddress.country}</span>
                  </div>) : (<p className="text-xs text-[#1D1D1D]/50">No default address saved yet.</p>)}

                {!isEditingAddress && (<button type="button" onClick={() => {
                    setAddressMessage(null);
                    setIsEditingAddress(true);
                }} className="w-full h-10 rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] text-xs font-bold text-primary hover:border-primary/40 transition-all">
                    Edit Address
                  </button>)}

                {isEditingAddress && (<form onSubmit={handleAddressSubmit} className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Street Address
                      </label>
                      <input type="text" required name="address" value={addressForm.address} onChange={handleAddressChange} placeholder="123 Luxury Lane" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                          City
                        </label>
                        <input type="text" required name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="New York" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                          Postal Code
                        </label>
                        <input type="text" required name="postalCode" value={addressForm.postalCode} onChange={handleAddressChange} placeholder="10001" className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none"/>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1D]/50 block mb-1">
                        Country
                      </label>
                      <select required name="country" value={addressForm.country} onChange={handleAddressChange} className="w-full rounded-lg border border-[#E5DCD3] bg-[#FCFBF8] px-4 py-2.5 text-xs font-semibold focus:border-primary focus:outline-none">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>South Africa</option>
                        <option>Nigeria</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={isSavingAddress} className="flex-1 h-10 rounded-lg bg-primary text-xs font-bold text-white hover:bg-primary-light transition-all">
                        {isSavingAddress ? "Saving..." : "Update Default Address"}
                      </button>
                      {savedAddress && (<button type="button" onClick={() => {
                        setAddressMessage(null);
                        setAddressForm({
                            address: savedAddress.address,
                            city: savedAddress.city,
                            country: savedAddress.country,
                            postalCode: savedAddress.postalCode,
                        });
                        setIsEditingAddress(false);
                    }} className="h-10 rounded-lg border border-[#E5DCD3] px-4 text-xs font-bold text-primary hover:border-primary/40">
                          Cancel
                        </button>)}
                    </div>
                  </form>)}

                  {addressMessage && (<p className={`text-xs font-semibold ${addressMessage.success ? "text-green-600" : "text-red-500"}`}>
                      {addressMessage.text}
                    </p>)}
              </div>

            </div>

            {/* Orders list & Saved Wishlist - Right */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Orders */}
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-6">
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                  <Package className="h-4.5 w-4.5"/>
                  Order History
                </h3>
                
                {displayOrders.length === 0 ? (<p className="text-xs text-[#1D1D1D]/50 py-4">You have not placed any orders yet.</p>) : (<div className="space-y-4">
                    {displayOrders.map((order) => (<div key={order.id} className="rounded-2xl border border-[#E5DCD3]/20 bg-[#FCFBF8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="font-bold text-primary">{order.id}</span>
                          <p className="text-[#1D1D1D]/60">{order.items}</p>
                          <span className="text-[10px] text-[#1D1D1D]/40 block">{order.date}</span>
                        </div>
                        <div className="flex sm:flex-col sm:items-end justify-between items-center shrink-0">
                          <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                          <span className="mt-1 px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold text-[10px] uppercase tracking-wider block">
                            {order.status}
                          </span>
                        </div>
                      </div>))}
                  </div>)}
              </div>

              {/* Saved Wishlist summary */}
              <div className="rounded-3xl border border-[#E5DCD3]/40 bg-white p-6 space-y-4">
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
                  <Heart className="h-4.5 w-4.5"/>
                  Wishlist Favorites
                </h3>
                
                {wishlist.length === 0 ? (<p className="text-xs text-[#1D1D1D]/50 py-4">No items saved in wishlist yet.</p>) : (<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {wishlist.map((prod) => (<Link key={prod.id} to={`/product/${prod.id}`} className="rounded-2xl border border-[#E5DCD3]/20 bg-[#FCFBF8] p-3 flex items-center gap-3 hover:border-primary/40 transition-all">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-accent shrink-0">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" className="object-cover"/>
                        </div>
                        <div className="text-[10px] overflow-hidden">
                          <span className="font-bold text-primary block truncate">{prod.name}</span>
                          <span className="text-[#1D1D1D]/50">${prod.price.toFixed(2)}</span>
                        </div>
                      </Link>))}
                  </div>)}
              </div>

            </div>

          </div>

        </div>)}
    </div>);
}

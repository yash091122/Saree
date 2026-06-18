"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Check, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Billing", "Review"];

export default function CheckoutPage() {
  const { items, count, closeCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Fetch user if logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setFirstName(session.user.user_metadata?.first_name || "");
        setLastName(session.user.user_metadata?.last_name || "");
        setEmail(session.user.email || "");
      }
    });
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Place Order
      setIsPlacingOrder(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const currentOrders = session.user.user_metadata?.orders || [];
          
          const newOrder = {
            id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toISOString(),
            total,
            status: 'Processing',
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              img: item.img,
              category: item.category
            }))
          };

          await supabase.auth.updateUser({
            data: {
              orders: [newOrder, ...currentOrders]
            }
          });
        } else {
          // Simulate API call for guest payment processing
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (err) {
        console.error("Failed to save order", err);
      }
      
      setIsPlacingOrder(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#f4f0ec] text-[#1a1a1a] flex items-center justify-center p-6 selection:bg-[#1a1a1a] selection:text-[#f4f0ec]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
          </div>
          <h2 className="font-serif text-3xl mb-4">Order Confirmed!</h2>
          <p className="text-[#1a1a1a]/60 mb-8">
            Thank you, {firstName || "Guest"}! Your gorgeous saree is on its way. We've sent a confirmation to {email || "your email"}.
          </p>
          <div className="w-8 h-8 border-2 border-[#1a1a1a]/20 border-t-[#1a1a1a] rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mt-4">Redirecting to your account...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f0ec] text-[#1a1a1a] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#1a1a1a] selection:text-[#f4f0ec]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* ── Left Column: Checkout Wizard ── */}
        <div className="w-full lg:w-[55%] flex flex-col">
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={1.5} /> Return to Store
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-10">
            Secure <span className="italic font-light text-[#1a1a1a]/60">Checkout</span>
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-16 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#1a1a1a]/10 -z-10" />
            {steps.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div key={step} className="flex flex-col items-center gap-3 bg-[#f4f0ec] px-4 relative">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      isActive ? "bg-[#1a1a1a] text-[#f4f0ec] scale-110" : 
                      isPast ? "bg-emerald-600 text-[#f4f0ec]" : "bg-white border border-[#1a1a1a]/20 text-[#1a1a1a]/40"
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" strokeWidth={2.5} /> : (idx + 1)}
                  </div>
                  <span className={`text-[9px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                    isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Forms Area */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">First Name</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" 
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Shipping Address</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" 
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-2xl font-mono text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-mono text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">CVC</label>
                      <input type="password" placeholder="***" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-mono text-[#1a1a1a] placeholder:text-[#1a1a1a]/20 outline-none focus:border-[#1a1a1a] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <div className="p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-serif text-xl mb-1">Shipping Details</h3>
                      <p className="text-[#1a1a1a]/60 text-sm">
                        {firstName} {lastName}<br/>
                        {address || "No address provided"}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#1a1a1a]/10" />
                    <div>
                      <h3 className="font-serif text-xl mb-1">Payment Method</h3>
                      <p className="text-[#1a1a1a]/60 text-sm">Visa ending in 4242</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mt-12 pt-10 border-t border-[#1a1a1a]/10">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="py-5 px-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] border border-[#1a1a1a]/20 hover:border-[#1a1a1a] transition-colors"
              >
                Back
              </button>
            )}
            
            <button 
              onClick={handleNext}
              disabled={isPlacingOrder}
              className="flex-1 py-5 rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1a1a1a] text-[#f4f0ec] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isPlacingOrder ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : currentStep === 2 ? (
                <>
                  <Lock className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                  Place Order
                </>
              ) : (
                <>
                  Continue to {steps[currentStep + 1]}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Right Column: Order Summary ── */}
        <div className="w-full lg:w-[45%]">
          <div 
            className="sticky top-10 p-8 md:p-12 rounded-[2.5rem] flex flex-col"
            style={{
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.08), inset 2px 2px 4px rgba(255,255,255,0.9)",
            }}
          >
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>

            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#e8e4e0]">
                    <Image src={item.img} alt={item.name} fill className="object-cover object-top" />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <p className="font-serif text-lg leading-tight mb-1">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-sm text-[#1a1a1a]/50 font-medium">Your cart is empty.</p>
              )}
            </div>

            <div className="w-full h-[1px] bg-[#1a1a1a]/10 mb-8" />

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#1a1a1a]/60 font-medium">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#1a1a1a]/60 font-medium">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-auto pt-8 border-t border-[#1a1a1a]/20">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/50">Total</span>
              <span className="font-serif text-4xl font-medium">₹{total.toLocaleString("en-IN")}</span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

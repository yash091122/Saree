"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag, Heart, ArrowLeft, Plus, Minus, Star,
  Truck, RotateCcw, Shield, Sparkles, ChevronDown, Check,
  Maximize2, X
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import PremiumLoader from "@/components/PremiumLoader";

const DETAILS = [
  {
    title: "The Craftsmanship",
    content: "Woven over 120 hours by master artisans. The intricate zari work uses real silver threads dipped in gold, creating a heritage piece that lasts generations.",
  },
  {
    title: "Fabric & Care",
    content: "100% Pure Handloom Silk. Dry clean only. Store in a breathable cotton muslin cloth. Air out occasionally in mild sunlight.",
  },
  {
    title: "Sizing & Fit",
    content: "Standard Saree Length: 5.5 meters. Comes with an unstitched blouse piece of 0.8 meters. Width: 45 inches.",
  },
];

const HIGHLIGHTS = [
  { icon: Sparkles, title: "Pure Silk", desc: "Certified Silk Mark" },
  { icon: Shield, title: "Heritage", desc: "Heirloom Quality" },
  { icon: Truck, title: "Global", desc: "Express Delivery" },
  { icon: RotateCcw, title: "Returns", desc: "14-Day Easy Return" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string, 10);
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === productId);

  const { addToCart, items, wishlist, toggleWishlist, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);
  
  const { scrollY } = useScroll();
  // Fade out hero text quickly when scrolling down
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  if (!product && !loading) {
    return notFound();
  }

  const cartItem = items.find((i) => i.id === product?.id);
  const isWishlisted = wishlist.some((i) => i.id === product?.id);

  const neuroOut = "shadow-[6px_6px_16px_rgba(0,0,0,0.06),-6px_-6px_16px_rgba(255,255,255,0.8)]";
  const neuroIn = "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]";

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
          <PremiumLoader />
        </motion.div>
      ) : (
        <motion.main 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative min-h-screen bg-[#f4f0ec] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#f4f0ec]"
        >
      
      {/* ── Cinematic Hero Image (Static, Full Screen) ── */}
      <div className="fixed top-0 left-0 w-full h-[100vh] z-0 overflow-hidden bg-[#111]">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={product!.img}
            alt={product!.name}
            fill
            className="object-cover object-top"
            priority
            quality={100}
          />
          {/* Gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </motion.div>

        {/* Floating Hero Text overlay */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-32 left-0 w-full px-8 md:px-20 z-20 flex flex-col items-center md:items-start text-center md:text-left pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 pointer-events-auto"
          >
            <Link href="/collections" className="group flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
              Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-white/90">
              {product!.category}
            </span>
            <span className="w-12 h-[1px] bg-white/50" />
            <div className="flex gap-1">
              {Array(5).fill(null).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product!.rating) ? "fill-white text-white" : "fill-white/30 text-white/30"}`} strokeWidth={0} />
              ))}
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[7rem] font-serif text-white leading-[1] tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
          >
            {product!.name}
          </motion.h1>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={() => setIsLightboxOpen(true)}
            className="pointer-events-auto mt-12 group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-[#1a1a1a]">
              <Maximize2 className="w-4 h-4 transition-colors duration-500" strokeWidth={1} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/90 group-hover:tracking-[0.5em] transition-all duration-500">
                Enlarge View
              </span>
              <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-1" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* ── Scrollable Content Area ── */}
      <div className="relative z-10 pt-[85vh] pointer-events-none">
        {/* Full-width Glassmorphic Panel */}
        <div 
          className="relative w-full rounded-t-[3rem] pt-12 md:pt-20 pb-40 overflow-hidden pointer-events-auto"
          style={{
            background: "rgba(244, 240, 236, 0.85)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            borderTop: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.8)",
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            {/* Top Row: Description & Highlights */}
            <div className="flex flex-col lg:flex-row gap-16 mb-20">
              <div className="lg:w-3/5">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/40 mb-6">The Story</h2>
                <p className="text-xl md:text-2xl text-[#1a1a1a]/80 leading-relaxed font-light font-serif">
                  {product!.longDescription || product!.description}
                </p>
              </div>

              <div className="lg:w-2/5 grid grid-cols-2 gap-6">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-[#f4f0ec] ${neuroOut} text-center`}
                  >
                    <h.icon className="w-6 h-6 text-[#1a1a1a]/60 mb-3" strokeWidth={1.5} />
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/80">{h.title}</p>
                    <p className="text-[9px] text-[#1a1a1a]/50 mt-1">{h.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1a1a1a]/10 to-transparent mb-20" />

            {/* Bottom Row: Specifications Grid & Accordion */}
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Specs Grid */}
              <div className="lg:w-1/2">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/40 mb-8">Specifications</h2>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Origin", value: product!.details?.origin || "India" },
                    { label: "Fabric", value: product!.details?.fabric || "Silk" },
                    { label: "Weave", value: product!.details?.weave || "Handloom" },
                    { label: "Zari", value: product!.details?.zari || "Gold" },
                  ].map((spec, i) => (
                    <div key={i} className={`p-6 rounded-3xl bg-[#f4f0ec] ${neuroIn}`}>
                      <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/40 mb-2">{spec.label}</p>
                      <p className="text-sm font-medium text-[#1a1a1a]/80">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion */}
              <div className="lg:w-1/2 flex flex-col gap-4">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/40 mb-4">Details</h2>
                {DETAILS.map((detail, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-3xl transition-all duration-500 overflow-hidden ${
                      activeTab === idx 
                        ? `bg-[#f4f0ec] ${neuroIn}` 
                        : `bg-[#f4f0ec] ${neuroOut}`
                    }`}
                  >
                    <button
                      onClick={() => setActiveTab(activeTab === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/80">
                        {detail.title}
                      </span>
                      <motion.div animate={{ rotate: activeTab === idx ? 180 : 0 }}>
                        <ChevronDown className="w-4 h-4 text-[#1a1a1a]/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeTab === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 pt-0 text-sm text-[#1a1a1a]/60 leading-relaxed font-light">
                            {detail.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed Bottom Action Bar (Ultra Glassmorphism) ── */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-fit z-50 rounded-[2.5rem] p-3 flex items-center justify-between md:justify-center md:gap-16"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.9)",
        }}
      >
        
        {/* Left: Price & Wishlist */}
        <div className="flex items-center gap-3 md:gap-6 pl-4 md:pl-6">
          <div className="flex flex-col">
            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/50">Investment</p>
            <p className="text-xl md:text-2xl font-serif font-bold text-[#1a1a1a]">₹{product!.price.toLocaleString("en-IN")}</p>
          </div>
          <div className="w-[1px] h-8 bg-[#1a1a1a]/10 hidden md:block" />
          <button 
            onClick={() => toggleWishlist(product!)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'bg-rose-50 border border-rose-200' : 'bg-white/50 border border-white/60 hover:bg-white'}`}
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-[#1a1a1a]/60"}`} strokeWidth={isWishlisted ? 0 : 1.5} />
          </button>
        </div>

        {/* Right: Cart Controls */}
        <div className="flex items-center gap-2 md:gap-3 pr-2 md:pr-4">
          {cartItem ? (
            <>
              {/* Neuromorphic Quantity */}
              <div className={`flex items-center gap-1 md:gap-2 px-1 md:px-2 py-1 rounded-full bg-[#f4f0ec] ${neuroIn}`}>
                <button 
                  onClick={() => updateQuantity(product!.id, cartItem.quantity - 1)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#f4f0ec] ${neuroOut} text-[#1a1a1a]/70 hover:text-[#1a1a1a]`}
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <span className="w-6 md:w-8 text-center font-serif text-lg md:text-xl">{cartItem.quantity}</span>
                <button 
                  onClick={() => updateQuantity(product!.id, cartItem.quantity + 1)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#f4f0ec] ${neuroOut} text-[#1a1a1a]/70 hover:text-[#1a1a1a]`}
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
              <Link href="/checkout">
                <button className="px-4 md:px-8 py-3 md:py-4 rounded-full bg-[#1a1a1a] text-white text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 md:gap-2 hover:bg-[#2a2a2a] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" /> <span className="hidden sm:inline">Checkout</span><span className="sm:hidden">Buy</span>
                </button>
              </Link>
            </>
          ) : (
            <button 
              onClick={(e) => addToCart(product!, e)}
              className="px-6 md:px-10 py-3 md:py-5 rounded-full bg-[#1a1a1a] text-white text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 md:gap-3 hover:bg-[#2a2a2a] hover:scale-105 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
            >
              <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
              Add <span className="hidden sm:inline">to Cart</span>
            </button>
          )}
        </div>

      </motion.div>

      {/* ── Editorial Lightbox Modal ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f4f0ec] overflow-hidden"
          >
            {/* Floating Top Left Brand/Product Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute top-12 left-12 z-50 flex flex-col pointer-events-none"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#1a1a1a]/40 mb-2">{product!.category}</span>
              <span className="text-3xl font-serif text-[#1a1a1a]">{product!.name}</span>
            </motion.div>

            {/* Premium Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-12 right-12 z-50 w-16 h-16 flex items-center justify-center rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f0ec] transition-colors duration-500 group"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
            </motion.button>

            {/* Floating Image Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[90vh] max-w-[1200px]"
            >
              <Image
                src={product!.img}
                alt={product!.name}
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </motion.div>

            {/* Vertical Branding Hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none"
            >
              <span className="text-[9px] uppercase tracking-[0.8em] text-[#1a1a1a]/30 font-bold whitespace-nowrap">
                Roopkala Collection
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.main>
      )}
    </AnimatePresence>
  );
}

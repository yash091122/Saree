"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, X, Star, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import PremiumLoader from "@/components/PremiumLoader";

const categories = ["All", "Silk", "Cotton", "Occasion"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"];

function CollectionsContent() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Featured");
  const { items, addToCart, wishlist, toggleWishlist } = useCart();
  const { products, loading } = useProducts();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredByCategory = products.filter(p => activeCategory === "All" || p.category === activeCategory);

  let filtered = filteredByCategory;
  if (search) {
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
    const getSearchableText = (p: Product) => [p.name, p.category, p.description, p.longDescription, p.details?.origin, p.details?.weave, p.details?.fabric].filter(Boolean).join(" ").toLowerCase();

    // Try strict match first (ALL terms must match)
    let exactMatches = filteredByCategory.filter(p => {
      const text = getSearchableText(p);
      return terms.every(term => text.includes(term));
    });

    if (exactMatches.length === 0) {
      // Fallback to partial match (ANY term can match)
      filtered = filteredByCategory.filter(p => {
        const text = getSearchableText(p);
        return terms.some(term => text.includes(term));
      });
    } else {
      filtered = exactMatches;
    }
  }

  filtered = filtered.sort((a, b) => {
      if (activeSort === "Price: Low to High") return a.price - b.price;
      if (activeSort === "Price: High to Low") return b.price - a.price;
      if (activeSort === "Top Rated") return b.rating - a.rating;
      return 0;
    });

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
          className="relative min-h-screen bg-[#f0ece8] bg-dotted text-[#1a1a1a]"
        >

      {/* ── Page Header ── */}
      <div className="pt-10 pb-12 px-8 md:px-20 border-b border-[#1a1a1a]/8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40 mb-3">
              <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
              <span className="mx-2">·</span>Collections
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
              All <span className="italic font-light text-[#1a1a1a]/40">Collections</span>
            </h1>
            <p className="text-sm text-[#1a1a1a]/40 mt-3">{filtered.length} pieces</p>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-all"
              style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              Sort: {activeSort}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 z-20 min-w-[200px] p-2 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
                >
                  {sortOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setActiveSort(opt); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors ${activeSort === opt ? "bg-[#1a1a1a] text-white" : "hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/70"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div className="px-8 md:px-20 py-8">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // If there's an active search in the URL, clear it when navigating categories
                if (search) {
                  router.push("/collections");
                }
              }}
              whileTap={{ scale: 0.96 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1a1a1a] text-[#f4f0ec] shadow-lg"
                  : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
              }`}
              style={activeCategory !== cat ? {
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
              } : {}}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
        {filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 md:py-32 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-4">No pieces found</h2>
            <p className="text-[#1a1a1a]/50 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              We couldn't find anything matching your current search or filters. Try exploring our entire collection.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                router.push("/collections");
              }}
              className="px-8 py-4 bg-[#1a1a1a] text-[#f4f0ec] rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#2a2a2a] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => router.push(`/product/${product.id}`)}
                className="group relative cursor-pointer flex flex-col transform-gpu"
              >
                {/* --- DOT GLOW EFFECT --- */}
                <div 
                  className="absolute -inset-[60px] -z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-dotted-glow"
                  style={{
                    maskImage: "radial-gradient(farthest-side at center, black 60%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(farthest-side at center, black 60%, transparent 100%)"
                  }}
                />

                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#e8e4df] rounded-2xl">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                  
                  {/* Elegant Minimal Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 text-[#1a1a1a] text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 bg-white/80 backdrop-blur-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        img: product.img,
                        category: product.category
                      });
                    }}
                    className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-all duration-500 z-10 bg-white/0 hover:bg-white/20 rounded-full ${
                      wishlist.some(i => i.id === product.id) ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-300 ${
                        wishlist.some(i => i.id === product.id) ? "fill-[#1a1a1a] text-[#1a1a1a]" : "text-[#1a1a1a] hover:fill-[#1a1a1a]"
                      }`}
                      strokeWidth={1.2}
                    />
                  </button>

                  {/* Quick Add overlay button at bottom of image */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, e);
                      }}
                      className="w-full bg-white/95 backdrop-blur-md text-[#1a1a1a] py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-white transition-colors"
                    >
                      {items.some(i => i.id === product.id) ? "Added to Bag" : "Quick Add"}
                    </button>
                  </div>
                </div>

                {/* Content Area - Minimalist */}
                <div className="pt-5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#1a1a1a] font-serif text-lg tracking-wide group-hover:text-black transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-[#1a1a1a] text-sm font-light">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">
                    {product.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>

      {/* ── Quick View Modal ── */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setQuickView(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 40px 100px rgba(0,0,0,0.25)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full md:w-5/12 aspect-[3/4] md:aspect-auto">
                <Image src={quickView.img} alt={quickView.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
              </div>

              {/* Details */}
              <div className="w-full md:w-7/12 p-8 flex flex-col justify-between bg-white/70">
                <div>
                  <button onClick={() => setQuickView(null)} className="mb-5 w-9 h-9 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center hover:bg-[#1a1a1a]/10 transition-colors">
                    <X className="w-4 h-4 text-[#1a1a1a]/50" strokeWidth={2} />
                  </button>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">{quickView.category} Collection</p>
                  <h2 className="font-serif text-3xl text-[#1a1a1a] mb-3">{quickView.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    {Array(5).fill(null).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(quickView.rating) ? "fill-yellow-400 text-yellow-400" : "text-[#1a1a1a]/15"}`} />
                    ))}
                    <span className="text-xs text-[#1a1a1a]/40 ml-1">{quickView.rating} · {quickView.reviews} reviews</span>
                  </div>
                  <p className="text-sm text-[#1a1a1a]/60 leading-loose mb-6">{quickView.description}</p>
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-serif text-3xl text-[#1a1a1a]">₹{quickView.price.toLocaleString("en-IN")}</span>
                    {quickView.originalPrice && (
                      <span className="text-sm text-[#1a1a1a]/30 line-through">₹{quickView.originalPrice.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => { addToCart(quickView, e); setQuickView(null); }}
                    className="w-full bg-[#1a1a1a] text-[#f4f0ec] py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-[#2a2a2a] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                    Add to Cart
                  </motion.button>
                  <button
                    onClick={() => toggleWishlist(quickView)}
                    className="w-full border border-[#1a1a1a]/10 py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/60 hover:border-[#1a1a1a]/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.some(i => i.id === quickView.id) ? "fill-red-500 text-red-500" : ""}`} strokeWidth={1.5} />
                    {wishlist.some(i => i.id === quickView.id) ? "Wishlisted" : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.main>
      )}
    </AnimatePresence>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<PremiumLoader />}>
      <CollectionsContent />
    </Suspense>
  );
}

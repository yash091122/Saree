"use client";

import { Search, ShoppingBag, Heart, X, Trash2, Plus, Minus, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSplash } from "@/context/SplashContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    items, addToCart, removeFromCart, updateQuantity, isOpen, openCart, closeCart, count,
    wishlist, toggleWishlist, isWishlistOpen, openWishlist, closeWishlist,
    isSearchOpen, openSearch, closeSearch 
  } = useCart();
  const { splashDone } = useSplash();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const hideNavbar = pathname.startsWith("/product") || pathname === "/login" || pathname === "/register";

  return (
    <>
      {/* ── Floating Glassmorphic Navbar Pill ── */}
      {!hideNavbar && (
        <nav
          className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-0.5 md:gap-1 px-3 md:px-4 py-2.5 rounded-full w-max max-w-[98vw] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.30)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.85)",
          }}
        >
          {/* Brand */}
          <Link
            id="navbar-logo-target"
            href="/"
            className="w-[48px] h-[40px] md:w-[56px] md:h-[44px] rounded-full mr-0.5 md:mr-1 flex-shrink-0 flex items-center justify-center transition-all hover:opacity-80 bg-white/70 overflow-hidden"
            style={{
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.95), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <AnimatePresence>
              {splashDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image src="/logo.png" alt="RK Logo" width={28} height={28} className="object-contain mix-blend-multiply" style={{ width: 'auto', height: 'auto' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <AnimatePresence>
            {splashDone && (
              <motion.div
                initial={{ width: 0, opacity: 0, overflow: "hidden" }}
                animate={{ 
                  width: "auto", 
                  opacity: 1,
                  transitionEnd: { overflow: "visible" }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex items-center gap-0.5 md:gap-1"
              >
                {/* Divider */}
                <span className="hidden md:block w-[1px] h-4 bg-[#1a1a1a]/10 mx-1" />

                {/* Nav Links */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-1.5 md:px-4 py-1 md:py-1.5 text-[9px] md:text-sm whitespace-nowrap font-medium tracking-tight md:tracking-wide rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-[#1a1a1a]/10 text-[#1a1a1a]"
                          : "text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Divider */}
                <span className="hidden md:block w-[1px] h-4 bg-[#1a1a1a]/10 mx-1" />

                {/* Wishlist */}
                <button
                  aria-label="Wishlist"
                  onClick={openWishlist}
                  className="relative p-1 md:p-2 flex-shrink-0 text-[#1a1a1a]/50 hover:text-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/5 transition-all"
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                  <AnimatePresence>
                    {wishlist.length > 0 && (
                      <motion.span
                        key="wishbadge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 bg-rose-400 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                      >
                        {wishlist.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Search */}
                <button
                  aria-label="Search"
                  onClick={openSearch}
                  className="p-1 md:p-2 flex-shrink-0 text-[#1a1a1a]/50 hover:text-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/5 transition-all"
                >
                  <Search className="w-4 h-4" strokeWidth={1.5} />
                </button>

                {/* Cart Button */}
                <button
                  id="navbar-cart-button"
                  aria-label="Cart"
                  onClick={openCart}
                  className="relative p-1 md:p-2 flex-shrink-0 text-[#1a1a1a]/60 hover:text-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/5 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <AnimatePresence>
                    {count > 0 && (
                      <motion.span
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* User Profile / Login */}
                <Link
                  href={user ? "/profile" : "/login"}
                  aria-label="User Profile"
                  className="p-1 md:p-2 flex-shrink-0 text-[#1a1a1a]/60 hover:text-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/5 transition-all"
                >
                  <User className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            />

            {/* Cart Popup Modal */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.8, y: 40, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, y: 40, x: "-50%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-28 left-1/2 w-[90vw] max-w-[440px] max-h-[75vh] z-[70] flex flex-col rounded-[2.5rem] overflow-hidden"
              style={{
                background: "rgba(250,248,246,0.85)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(0,0,0,0.02)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-8 pt-10 pb-6">
                <div>
                  <h2 className="font-serif text-3xl text-[#1a1a1a]">Your Cart</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mt-1">{count} {count === 1 ? "piece" : "pieces"}</p>
                </div>
                <button
                  onClick={closeCart}
                  className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/80 transition-all border border-white/60 shadow-sm"
                >
                  <X className="w-4 h-4 text-[#1a1a1a]/60" strokeWidth={2} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-8 py-2">
                <AnimatePresence mode="wait">
                  {items.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center"
                    >
                      <div className="mt-8">
                        <p className="font-serif text-2xl text-[#1a1a1a]/40">Your cart is empty</p>
                        <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 mt-2">Add something beautiful</p>
                      </div>
                      <button
                        onClick={closeCart}
                        className="mt-4 px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#f4f0ec] bg-[#1a1a1a] rounded-2xl hover:bg-[#2a2a2a] transition-all shadow-xl"
                      >
                        Browse Collections
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="items"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: {
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="flex flex-col gap-5 pb-8"
                    >
                      <AnimatePresence>
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            variants={{
                              hidden: { opacity: 0, y: 30, scale: 0.95 },
                              show: { opacity: 1, y: 0, scale: 1 }
                            }}
                            exit={{ opacity: 0, x: -50, scale: 0.9 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group relative flex gap-4 p-4 rounded-[2rem] overflow-hidden"
                            style={{
                              background: "rgba(255,255,255,0.7)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255,255,255,0.9)",
                              boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                            }}
                          >
                            {/* Product image */}
                            <div className="w-24 h-32 rounded-[1.25rem] overflow-hidden flex-shrink-0 bg-[#e8e4e0] relative shadow-inner">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out" />
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-1">{item.category}</p>
                                <p className="font-serif text-lg text-[#1a1a1a] truncate leading-tight pr-8">{item.name}</p>
                                <p className="font-bold text-sm text-[#1a1a1a] mt-2">₹{item.price.toLocaleString("en-IN")}</p>
                              </div>
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-3 bg-white/50 rounded-xl px-2 py-1 border border-white/60">
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-6 h-6 rounded-md bg-white/60 flex items-center justify-center hover:bg-white text-[#1a1a1a] transition-all"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-serif text-sm w-4 text-center">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-6 h-6 rounded-md bg-white/60 flex items-center justify-center hover:bg-white text-[#1a1a1a] transition-all"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                                  </button>
                                </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Drawer Footer */}
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="px-8 pb-12 pt-6 border-t border-white/40"
                    style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)" }}
                  >
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50">Total Amount</span>
                      <span className="font-serif text-3xl text-[#1a1a1a]">
                        ₹{items.reduce((s, i) => s + i.price, 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => {
                        closeCart();
                        router.push("/checkout");
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: "#2a2a2a" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative overflow-hidden bg-[#1a1a1a] text-[#f4f0ec] py-5 rounded-[1.5rem] text-[11px] uppercase tracking-[0.25em] font-bold shadow-xl transition-colors"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Proceed to Checkout
                        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Wishlist Popup Modal ── */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="wishlist-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeWishlist}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
            />

            <motion.div
              key="wishlist-popup"
              initial={{ opacity: 0, scale: 0.8, y: 40, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, y: 40, x: "-50%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-28 left-1/2 w-[90vw] max-w-[440px] max-h-[75vh] z-[70] flex flex-col rounded-[2.5rem] overflow-hidden"
              style={{
                background: "rgba(250,248,246,0.85)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.9)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-10 pb-6">
                <div>
                  <h2 className="font-serif text-3xl text-[#1a1a1a]">Wishlist</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mt-1">{wishlist.length} saved</p>
                </div>
                <button onClick={closeWishlist} className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/80 transition-all border border-white/60 shadow-sm">
                  <X className="w-4 h-4 text-[#1a1a1a]/60" strokeWidth={2} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-8 py-2 pb-8">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                    <Heart className="w-12 h-12 text-[#1a1a1a]/15" strokeWidth={1} />
                    <p className="font-serif text-xl text-[#1a1a1a]/40 mt-2">No favorites yet</p>
                    <button onClick={closeWishlist} className="mt-4 px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#f4f0ec] bg-[#1a1a1a] rounded-2xl shadow-xl">
                      Explore Sarees
                    </button>
                  </div>
                ) : (
                  <motion.div
                    key="wishlist-items"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="flex flex-col gap-5 pb-8"
                  >
                    <AnimatePresence>
                      {wishlist.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1 }
                          }}
                          exit={{ opacity: 0, x: -50, scale: 0.9 }}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          className="group relative flex gap-4 p-4 rounded-[2rem] overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.9)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                          }}
                        >
                          {/* Product image */}
                          <div className="w-24 h-32 rounded-[1.25rem] overflow-hidden flex-shrink-0 bg-[#e8e4e0] relative shadow-inner">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out" />
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-1">{item.category}</p>
                              <p className="font-serif text-lg text-[#1a1a1a] truncate leading-tight pr-8">{item.name}</p>
                              <p className="font-bold text-sm text-[#1a1a1a] mt-2">₹{item.price.toLocaleString("en-IN")}</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={(e) => { addToCart(item, e); toggleWishlist(item); }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-[#f4f0ec] hover:bg-[#2a2a2a] transition-all text-[10px] font-medium"
                              >
                                <ShoppingBag className="w-3 h-3" strokeWidth={2} />
                                Move to Cart
                              </button>
                              <button
                                onClick={() => toggleWishlist(item)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 className="w-3 h-3" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Search Spotlight Modal ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Dark heavy blur backdrop */}
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="fixed inset-0 z-[100]"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}
            />
            
            {/* Spotlight Modal */}
            <motion.div
              key="search-modal"
              initial={{ opacity: 0, scale: 0.85, y: "-40%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.85, y: "-40%", x: "-50%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 w-[90vw] max-w-2xl z-[110] rounded-[2rem] overflow-hidden"
              style={{
                background: "rgba(244,240,236,0.85)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(0,0,0,0.02)",
              }}
            >
              {/* Input Area */}
              <div className="relative flex items-center px-8 py-6 border-b border-[#1a1a1a]/10" style={{ background: "rgba(255,255,255,0.4)" }}>
                <Search className="w-7 h-7 text-[#1a1a1a]/40 flex-shrink-0" strokeWidth={2} />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search pure silk, handloom..." 
                  className="w-full bg-transparent border-none outline-none pl-6 pr-12 text-3xl font-serif text-[#1a1a1a] placeholder:text-[#1a1a1a]/25"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value;
                      if (val.trim()) {
                        closeSearch();
                        router.push(`/collections?search=${encodeURIComponent(val.trim())}`);
                      }
                    }
                  }}
                />
                <button 
                  onClick={closeSearch} 
                  className="absolute right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/40 border border-white/60 hover:bg-white/80 transition-all shadow-sm"
                >
                  <X className="w-5 h-5 text-[#1a1a1a]/60" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="p-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-6 font-bold">Popular Collections</p>
                <motion.div 
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } }
                  }}
                  className="flex flex-wrap gap-3"
                >
                  {["Banarasi Silk", "Bridal Wear", "Kanjivaram Classics", "Cotton Handloom", "Pastel Editions"].map((tag) => (
                    <motion.button 
                      key={tag}
                      onClick={() => {
                        closeSearch();
                        router.push(`/collections?search=${encodeURIComponent(tag)}`);
                      }}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-all"
                      style={{
                        background: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.9)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.06), inset 0 2px 2px rgba(255,255,255,0.9)",
                      }}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

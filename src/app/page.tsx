"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShoppingBag, ChevronLeft, ChevronRight, ArrowDown, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    <path d="M12 11.5c-1.5 0-2.5 1-2.5 2.5 0 1.2.8 2 1.5 2.3.2.1.3.1.3.3 0 .2-.1.8-.2 1 0 .2-.2.3-.4.2-1.3-.5-2.1-2.1-2.1-3.8 0-3.1 2.7-5.5 6-5.5 3.3 0 5.8 2.5 5.8 5.5 0 3.2-1.8 5.8-4.4 5.8-.8 0-1.6-.4-1.9-1l-.5 2.5c-.2.8-.7 1.8-1.1 2.4" />
    <path d="M13.5 10c.8 0 1.5.7 1.5 1.5" />
  </svg>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { items, addToCart, wishlist, toggleWishlist } = useCart();
  const { products } = useProducts();
  const router = useRouter();
  
  // Parallax effects for the Hero section
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const leftModelY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const rightModelY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Parallax for Section 3 Grid
  const gridLeftY = useTransform(scrollYProgress, [0.3, 1], ["10%", "-20%"]);
  const gridMidY = useTransform(scrollYProgress, [0.3, 1], ["30%", "0%"]);
  const gridRightY = useTransform(scrollYProgress, [0.3, 1], ["20%", "-10%"]);


  return (
    <main className="relative w-full bg-[#f4f0ec] bg-dotted text-[#1a1a1a] overflow-hidden">



      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center">
        
        {/* Parallax Container for Hero */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-full pointer-events-none">
          
          {/* Top Text Layer (Under Left Model) */}
          <motion.div style={{ opacity: textOpacity }} className="absolute top-[8%] md:top-[5%] left-[5vw] z-0">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[14vw] font-serif leading-none tracking-tighter text-[#1a1a1a]"
            >
              Modern
            </motion.h1>
          </motion.div>

          {/* Center '&' Symbol */}
          <motion.div style={{ opacity: textOpacity }} className="absolute top-[20%] md:top-[22%] left-[35%] md:left-[32%] z-0">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="text-[10vw] font-serif italic font-light text-[#1a1a1a]"
            >
              &amp;
            </motion.h1>
          </motion.div>

          {/* Bottom Text Layer */}
          <motion.div style={{ opacity: textOpacity }} className="absolute top-[32%] md:top-[35%] right-[5vw] z-0 text-right">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="text-[14vw] font-serif leading-none tracking-tighter text-[#1a1a1a]"
            >
              Heritage
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Models Layer with Individual Parallax */}
        <div className="absolute inset-0 px-[10vw] pointer-events-none z-10">
          {/* Left Model (Smaller, Parallax Up) */}
          <motion.div 
            style={{ y: leftModelY }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute w-[32vw] md:w-[22vw] max-w-[300px] h-[28vh] md:h-[55vh] top-[14%] md:top-[10%] left-[-2vw] md:left-[10vw]"
          >
            <Image 
              src="/saree-left.png" 
              alt="Model in modern saree" 
              fill
              sizes="(max-width: 768px) 35vw, 25vw"
              className="object-contain object-top md:object-bottom mix-blend-multiply drop-shadow-xl"
              priority
            />
          </motion.div>
          
          {/* Right Model (Bigger, Parallax Down) */}
          <motion.div 
            style={{ y: rightModelY }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="absolute w-[80vw] md:w-[45vw] max-w-[650px] h-[60vh] md:h-[85vh] top-[22%] md:top-auto bottom-auto md:bottom-0 right-[-5vw] md:right-[5vw]"
          >
            <Image 
              src="/saree-right.png" 
              alt="Model in heritage silk saree" 
              fill
              sizes="(max-width: 768px) 85vw, 50vw"
              className="object-contain object-top md:object-bottom mix-blend-multiply drop-shadow-xl"
              priority
            />
          </motion.div>
        </div>

        {/* Subtext & CTA (Fades out quickly on scroll) */}
        <motion.div 
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="absolute z-40 flex flex-col items-start text-left w-[85vw] max-w-[320px] md:w-auto md:max-w-[280px] bottom-[14vh] md:bottom-[8vh] left-[7.5vw] md:left-[35%]"
        >
          <p className="text-[10px] md:text-[11px] leading-loose uppercase tracking-[0.25em] text-[#1a1a1a]/70 mb-8 font-medium">
            Showcasing handcrafted weaves, intricate drapes, and modern simplicity for the contemporary woman.
          </p>
          <Link href="/collections">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1a1a1a] text-[#f4f0ec] text-xs font-semibold uppercase tracking-[0.25em] py-4 px-10 border border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-colors duration-300 shadow-lg pointer-events-auto"
            >
              Explore Collections
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/50 mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-[#1a1a1a]/50" strokeWidth={1} />
          </motion.div>
        </motion.div>

      </section>

      {/* --- SECTION 2: DISCOVER CONTINUITY --- */}
      <section className="relative w-full min-h-screen pt-12 pb-24 md:py-32 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between z-20">
        
        {/* Left Side: Elegant Text block appearing on scroll */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-16 z-20 mt-4 md:mt-0">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[8vw] md:text-[5vw] font-serif leading-none text-[#1a1a1a] mb-8"
          >
            The Art of <br />
            <span className="italic font-light">Handloom</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-16 h-[1px] bg-[#1a1a1a] mb-8"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-sm leading-loose text-[#1a1a1a]/70 max-w-md font-medium"
          >
            Each drape tells a story of generations of weavers. We bring you the finest silks, intricate zari details, and a profound respect for the heritage of Indian textiles. Blending time-honored techniques with a modern design sensibility to create timeless heirlooms.
          </motion.p>
        </div>

        {/* Right Side: Parallax Image */}
        <div className="w-full md:w-1/2 h-[70vh] relative mt-16 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full relative overflow-hidden group"
          >
            {/* The image itself scales slightly on hover for extra cool animation */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              <Image 
                src="/texture.png" 
                alt="Zari texture detail" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Decorative outline box overlapping the image */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-6 -left-6 w-full h-full border border-[#1a1a1a]/20 pointer-events-none -z-10 hidden md:block"
          />
        </div>

      </section>

      {/* --- SECTION 3: CURATED ELEGANCE (STAGGERED GRID) --- */}
      <section className="relative w-full min-h-[150vh] py-16 md:py-32 px-8 md:px-20 z-20 bg-[#f4f0ec] bg-dotted">
        
        {/* Section Header */}
        <div className="w-full text-center mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[6vw] md:text-[4vw] font-serif text-[#1a1a1a]"
          >
            Curated <span className="italic font-light">Elegance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-xs uppercase tracking-[0.3em] text-[#1a1a1a]/50"
          >
            The New Season
          </motion.p>
        </div>

        {/* Staggered Parallax Grid */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          
          {/* Column 1 */}
          <motion.div style={{ y: gridLeftY }} className="flex flex-col space-y-8 mt-0">
            <div className="w-full aspect-[3/4] relative overflow-hidden bg-[#e8e4e0]">
              <Image src="/saree-left.png" alt="Saree Look 1" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-top mix-blend-multiply transition-transform duration-1000 hover:scale-105" />
            </div>
            <div className="text-center">
              <h4 className="font-serif text-lg text-[#1a1a1a]">Midnight Silk</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 mt-2">View Details</p>
            </div>
          </motion.div>

          {/* Column 2 (Pushed down) */}
          <motion.div style={{ y: gridMidY }} className="flex flex-col space-y-8 mt-20 md:mt-40">
            <div className="w-full aspect-square md:aspect-[3/4] relative overflow-hidden bg-[#e8e4e0]">
              <Image src="/texture.png" alt="Saree Texture" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
            </div>
            <div className="text-center">
              <h4 className="font-serif text-lg text-[#1a1a1a]">Zari Details</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 mt-2">Explore Craft</p>
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: gridRightY }} className="flex flex-col space-y-8 mt-10 md:mt-20">
            <div className="w-full aspect-[3/4] relative overflow-hidden bg-[#e8e4e0]">
              <Image src="/saree-right.png" alt="Saree Look 2" fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-top mix-blend-multiply transition-transform duration-1000 hover:scale-105" />
            </div>
            <div className="text-center">
              <h4 className="font-serif text-lg text-[#1a1a1a]">Emerald Heritage</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 mt-2">View Details</p>
            </div>
          </motion.div>

        </div>

      </section>

      {/* --- SECTION 4: THE CRAFTSMANSHIP STORY (DARK EDITORIAL) --- */}
      <section className="relative w-full bg-[#111111] bg-dotted-light text-[#f4f0ec] z-20 overflow-hidden">
        
        {/* Marquee Strip */}
        <div className="w-full overflow-hidden border-y border-[#f4f0ec]/10 py-5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 w-max"
          >
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="text-[11px] uppercase tracking-[0.35em] text-[#f4f0ec]/40 font-medium">
                Handcrafted Silk&nbsp;&nbsp;&bull;&nbsp;&nbsp;Pure Zari&nbsp;&nbsp;&bull;&nbsp;&nbsp;Heritage Weaves&nbsp;&nbsp;&bull;&nbsp;&nbsp;Modern Drapes
              </span>
            ))}
          </motion.div>
        </div>

        {/* Main Dark Section Content */}
        <div className="w-full max-w-7xl mx-auto px-8 md:px-20 py-16 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left: Giant Quote */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[#f4f0ec]/20 font-serif text-8xl leading-none mb-8"
            >
              &quot;
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="text-3xl md:text-4xl font-serif leading-snug text-[#f4f0ec]"
            >
              A drape is not just a garment. It is an{" "}
              <span className="italic text-[#f4f0ec]/50 font-light">identity</span>, a{" "}
              <span className="italic text-[#f4f0ec]/50 font-light">language</span>, a piece of{" "}
              <span className="italic text-[#f4f0ec]/50 font-light">art</span>.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="w-10 h-[1px] bg-[#f4f0ec]/30"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#f4f0ec]/40">The Roop Kala Ethos</span>
            </motion.div>
          </div>

          {/* Right: Stats + Image */}
          <div className="flex flex-col gap-12">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { num: "200+", label: "Master Weavers" },
                { num: "50+", label: "Years of Craft" },
                { num: "12", label: "Silk Varieties" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="flex flex-col items-start border-t border-[#f4f0ec]/10 pt-6"
                >
                  <span className="text-4xl font-serif text-[#f4f0ec]">{stat.num}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#f4f0ec]/40 mt-2">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="w-full h-[45vh] relative overflow-hidden group"
            >
              <Image
                src="/texture.png"
                alt="Zari weaving detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent pointer-events-none"></div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{ letterSpacing: "0.35em" }}
              className="text-[10px] uppercase tracking-[0.25em] border-b border-[#f4f0ec]/30 pb-2 self-start text-[#f4f0ec]/70 hover:text-[#f4f0ec] transition-colors"
            >
              Discover the process
            </motion.button>
          </div>
        </div>

        {/* Bottom Marquee Strip */}
        <div className="w-full overflow-hidden border-t border-[#f4f0ec]/10 py-5">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 w-max"
          >
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="text-[11px] uppercase tracking-[0.35em] text-[#f4f0ec]/20 font-medium">
                Timeless Elegance&nbsp;&nbsp;&bull;&nbsp;&nbsp;Indian Artistry&nbsp;&nbsp;&bull;&nbsp;&nbsp;Contemporary Woman&nbsp;&nbsp;&bull;&nbsp;&nbsp;Roop Kala
              </span>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ─── SECTION 5: FEATURED COLLECTIONS ─── */}
      <section className="relative w-full bg-[#f4f0ec] bg-dotted z-20 py-16 md:py-32 px-8 md:px-20 overflow-hidden">

        {/* Faint label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40 mb-6 text-center"
        >
          Season 2025
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[6vw] md:text-[4vw] font-serif text-[#1a1a1a] text-center mb-10 md:mb-20"
        >
          Featured <span className="italic font-light">Collections</span>
        </motion.h2>

        {/* Reference-style glassmorphic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => router.push(`/product/${item.id}`)}
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
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#e8e4df] rounded-[2.5rem]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                
                {/* Elegant Minimal Badge */}
                {item.badge && (
                  <span className="absolute top-5 left-5 text-[#1a1a1a] text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className={`absolute top-5 right-5 w-9 h-9 flex items-center justify-center transition-all duration-500 z-10 bg-white/0 hover:bg-white/20 rounded-full ${
                    wishlist.some(i => i.id === item.id) ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      wishlist.some(i => i.id === item.id) ? "fill-[#1a1a1a] text-[#1a1a1a]" : "text-[#1a1a1a] hover:fill-[#1a1a1a]"
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
                      addToCart(item, e);
                    }}
                    className="w-full bg-white/95 backdrop-blur-md text-[#1a1a1a] py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-white transition-colors"
                  >
                    {items.some(i => i.id === item.id) ? "Added to Bag" : "Quick Add"}
                  </button>
                </div>
              </div>

              {/* Content Area - Minimalist */}
              <div className="pt-5 flex flex-col gap-1.5 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#1a1a1a] font-serif text-lg tracking-wide group-hover:text-black transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#1a1a1a] text-sm font-semibold">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center mt-20"
        >
          <Link href="/collections" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors border-b border-[#1a1a1a]/20 pb-2 hover:border-[#1a1a1a]">
            View All Collections
            <span className="inline-block w-6 h-[1px] bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </motion.div>
      </section>

      {/* ─── SECTION 6: PROCESS / PHILOSOPHY STRIP ─── */}
      <section className="relative w-full bg-[#1d1b1a] bg-dotted-light z-20 py-16 md:py-28 px-8 md:px-20 overflow-hidden">

        {/* Big faint word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-serif text-[#f4f0ec]/[0.03] leading-none whitespace-nowrap">PROCESS</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-[#f4f0ec] font-serif text-3xl md:text-4xl mb-10 md:mb-20 relative z-10"
        >
          How Every Drape Is <span className="italic font-light text-[#f4f0ec]/50">Born</span>
        </motion.h2>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { step: "01", title: "Sourcing", desc: "Directly from master weavers across Varanasi, Kanjivaram & Pochampally." },
            { step: "02", title: "Handloomed", desc: "Each saree is handwoven over 3–15 days using traditional pit loom techniques." },
            { step: "03", title: "Quality Check", desc: "Rigorous 12-point inspection for weave integrity, colour fastness & finish." },
            { step: "04", title: "Yours", desc: "Carefully packed and delivered to your door with a certificate of authenticity." },
          ].map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="flex flex-col"
            >
              <span className="text-[#f4f0ec]/20 font-serif text-5xl leading-none mb-6">{p.step}</span>
              <div className="w-8 h-[1px] bg-[#f4f0ec]/20 mb-5" />
              <h4 className="text-[#f4f0ec] font-serif text-xl mb-3">{p.title}</h4>
              <p className="text-[#f4f0ec]/50 text-sm leading-loose">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* ─── SECTION 8: NEWSLETTER (REDESIGNED) ─── */}
      <section className="relative w-full bg-[#f4f0ec] bg-dotted z-20 overflow-hidden">

        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#d4c9be]/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c9bfb4]/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: Editorial Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40 mb-8 border-b border-[#1a1a1a]/10 pb-3"
            >
              Inner Circle
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="text-[8vw] md:text-[4.5vw] font-serif leading-[1.1] text-[#1a1a1a] mb-8"
            >
              First to know.<br />
              <span className="italic font-light text-[#1a1a1a]/40">Always in style.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-sm text-[#1a1a1a]/60 leading-loose max-w-sm mb-12"
            >
              Join our inner circle for new arrivals, exclusive drops, weaving stories and early sale access. No clutter, only craft.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4"
            >
              {["Early access to new collections", "Exclusive member-only offers", "Stories from master weavers"].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#1a1a1a]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-white/60 backdrop-blur-xl border border-black/8 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
              <div className="mb-8">
                <p className="font-serif text-2xl text-[#1a1a1a] mb-1">Subscribe</p>
                <p className="text-xs text-[#1a1a1a]/40 tracking-wide">Join 12,000+ members</p>
              </div>

              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Your Name</label>
                <input type="text" placeholder="e.g. Priya Sharma" className="w-full bg-[#f4f0ec]/70 border border-[#1a1a1a]/10 text-[#1a1a1a] text-sm px-5 py-3.5 rounded-xl outline-none placeholder:text-[#1a1a1a]/25 focus:border-[#1a1a1a]/25 focus:bg-white/80 transition-all" />
              </div>

              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full bg-[#f4f0ec]/70 border border-[#1a1a1a]/10 text-[#1a1a1a] text-sm px-5 py-3.5 rounded-xl outline-none placeholder:text-[#1a1a1a]/25 focus:border-[#1a1a1a]/25 focus:bg-white/80 transition-all" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#1a1a1a] text-[#f4f0ec] text-[11px] uppercase tracking-[0.3em] font-semibold py-4 rounded-xl hover:bg-[#2a2a2a] transition-colors"
              >
                Join the Circle
              </motion.button>

              <p className="text-center text-[10px] text-[#1a1a1a]/25 mt-5 tracking-wide">No spam, ever. Unsubscribe anytime.</p>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border border-[#1a1a1a]/6 -z-10 pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="relative w-full min-h-[80vh] flex flex-col items-center justify-end overflow-hidden z-20 pb-16 md:pb-32 pt-10 md:pt-20">
        
        {/* Huge Faded Text Background */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h1 className="text-[18vw] font-serif leading-none tracking-tighter text-[#1a1a1a]/[0.04] whitespace-nowrap">
            ROOP KALA
          </h1>
        </motion.div>

        {/* Footer Content */}
        <div className="relative z-10 w-full px-8 md:px-20 flex flex-col items-center justify-between space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <h3 className="font-serif text-3xl tracking-wide text-[#1a1a1a]">Roop Kala</h3>
            <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/50">Timeless Drapes & Modern Elegance</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center w-full justify-between border-t border-[#1a1a1a]/10 pt-8"
          >
            <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 font-medium">
              <Link href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#1a1a1a] transition-colors">Terms of Service</Link>
            </div>
            
            <div className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mt-8 md:mt-0 font-medium">
              © {new Date().getFullYear()} Roop Kala. All Rights Reserved.
            </div>
          </motion.div>
        </div>
      </footer>

    </main>
  );
}


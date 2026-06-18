"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 md:p-8 lg:p-12 font-serif overflow-hidden bg-black">
      
      {/* Immersive Full-Screen Background Image with Slow Pan Animation */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], x: [0, -15, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/boutique-interior.png" 
          alt="Boutique"
          fill
          className="object-cover"
          quality={100}
        />
      </motion.div>
      
      {/* Dark elegant vignette/overlay to make the glass pop */}
      <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[4px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />

      {/* Massive Central Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1200px] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]"
      >
        
        {/* Left Info Section */}
        <div className="w-full lg:w-5/12 p-10 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
          
          {/* Subtle glow behind text */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] drop-shadow-lg"
            >
              Get in <br />
              <span className="italic font-light text-white/80">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/70 font-sans font-light tracking-wide text-sm max-w-sm leading-relaxed"
            >
              Step into a world of elegance. Reach out for bespoke styling, private viewing appointments, or exquisite custom requests.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col gap-8 mt-16 relative z-10"
          >
            {/* Contact Items */}
            <div className="group flex items-start gap-5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                <MapPin className="w-5 h-5 text-white/90" />
              </div>
              <div className="pt-1">
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/50 mb-1">The Boutique</h3>
                <p className="text-white font-serif text-lg group-hover:text-white/80 transition-colors">123 Elegance Blvd, Mumbai</p>
              </div>
            </div>

            <div className="group flex items-start gap-5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                <Mail className="w-5 h-5 text-white/90" />
              </div>
              <div className="pt-1">
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Email</h3>
                <p className="text-white font-serif text-lg group-hover:text-white/80 transition-colors">concierge@sareeboutique.com</p>
              </div>
            </div>

            <div className="group flex items-start gap-5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                <Phone className="w-5 h-5 text-white/90" />
              </div>
              <div className="pt-1">
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Phone</h3>
                <p className="text-white font-serif text-lg group-hover:text-white/80 transition-colors">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-7/12 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-l from-white/5 to-transparent">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-lg mx-auto"
          >
            <h2 className="text-3xl text-white font-serif mb-2 drop-shadow-md">Send a Message</h2>
            <p className="text-white/50 font-sans text-sm mb-12">We usually respond within 24 hours.</p>

            <form className="flex flex-col gap-10">
              
              {/* Minimalist Input with Floating Label */}
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/20 py-3 text-white font-sans outline-none focus:border-white transition-colors"
                />
                <label 
                  htmlFor="name"
                  className="absolute left-0 top-3 text-white/50 font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-white/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] peer-valid:text-white/80"
                >
                  Your Name
                </label>
              </div>

              {/* Minimalist Input with Floating Label */}
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/20 py-3 text-white font-sans outline-none focus:border-white transition-colors"
                />
                <label 
                  htmlFor="email"
                  className="absolute left-0 top-3 text-white/50 font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-white/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] peer-valid:text-white/80"
                >
                  Email Address
                </label>
              </div>

              {/* Minimalist Textarea with Floating Label */}
              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/20 py-3 text-white font-sans outline-none focus:border-white transition-colors resize-none"
                />
                <label 
                  htmlFor="message"
                  className="absolute left-0 top-3 text-white/50 font-sans text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-white/80 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-[0.2em] peer-valid:text-white/80"
                >
                  Your Message
                </label>
              </div>

              {/* Premium Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="mt-6 w-full border border-white/30 bg-white/10 backdrop-blur-md rounded-full py-5 flex items-center justify-center gap-3 text-white font-sans text-[11px] uppercase tracking-[0.3em] font-bold transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
              >
                Send Message <Send className="w-4 h-4" />
              </motion.button>

            </form>
          </motion.div>
        </div>

      </motion.div>
    </main>
  );
}

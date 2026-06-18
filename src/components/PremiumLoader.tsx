"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PremiumLoader() {
  return (
    <div className="min-h-screen bg-[#f4f0ec] flex flex-col items-center justify-center">
      
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        
        {/* Faded Base Logo */}
        <Image 
          src="/logo.png" 
          alt="Loading Background" 
          fill 
          className="object-contain opacity-10 mix-blend-multiply" 
          priority
        />

        {/* Filling Logo */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: [0.65, 0, 0.35, 1], // Very sleek easing curve
          }}
        >
          {/* Inner div maintains fixed size so image doesn't distort while outer div clips it */}
          <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20">
            <Image 
              src="/logo.png" 
              alt="Loading Foreground" 
              fill 
              className="object-contain mix-blend-multiply" 
              priority
            />
          </div>
        </motion.div>

      </div>

    </div>
  );
}

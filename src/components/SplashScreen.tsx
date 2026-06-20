"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplash } from "@/context/SplashContext";

const BRAND = "ROOPKALA";

export default function SplashScreen() {
  const { setSplashDone } = useSplash();
  const [phase, setPhase] = useState<
    "letters" | "compress" | "vanish" | "logo-grow" | "fly" | "done"
  >("letters");
  const [navTarget, setNavTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("compress"), 1800),
      setTimeout(() => setPhase("vanish"), 2900),
      setTimeout(() => setPhase("logo-grow"), 3500),
      setTimeout(() => {
        const el = document.getElementById("navbar-logo-target");
        if (el) {
          const r = el.getBoundingClientRect();
          setNavTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }
        setPhase("fly");
      }, 4800),
      setTimeout(() => {
        setPhase("done");
        setSplashDone(true);
      }, 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [setSplashDone]);

  const visible = phase !== "done";
  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            pointerEvents: phase === "fly" ? "none" : "auto",
          }}
          initial={{ backgroundColor: "rgba(244, 240, 236, 1)" }}
          animate={{ backgroundColor: phase === "fly" ? "rgba(244, 240, 236, 0)" : "rgba(244, 240, 236, 1)" }}
        >
          {/* Background effects that fade out when flying */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "fly" ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* ── Cinematic grain overlay ── */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

          {/* ── Ambient light spots ── */}
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(210,185,150,0.15) 0%, transparent 60%)" }}
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(180,160,130,0.12) 0%, transparent 60%)" }}
          />
          </motion.div>

          {/* ── Phase 1 & 2: Giant letters appear → compress → vanish ── */}
          <AnimatePresence mode="wait">
            {(phase === "letters" || phase === "compress") && (
              <motion.div
                key="text-block"
                className="relative flex flex-col items-center justify-center"
                exit={{
                  opacity: 0,
                  scale: 0.15,
                  filter: "blur(30px)",
                  y: 20,
                }}
                transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
              >
                {/* The letters */}
                <motion.div
                  className="flex items-baseline justify-center relative"
                  animate={{
                    letterSpacing: phase === "compress" ? "-0.05em" : "0.25em",
                    scale: phase === "compress" ? 0.4 : 1,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {BRAND.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 120,
                        scaleY: 0.3,
                        filter: "blur(16px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="font-serif text-[#1a1a1a] inline-block select-none leading-none"
                      style={{
                        fontSize: "clamp(5rem, 15vw, 12rem)",
                        transformOrigin: "bottom center",
                        textShadow: "0 6px 40px rgba(0,0,0,0.04)",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Elegant golden line underneath */}
                <motion.div
                  className="mt-4 h-[1.5px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(190,160,110,0.6) 30%, rgba(190,160,110,0.6) 70%, transparent 100%)",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: phase === "compress" ? 0 : "min(280px, 40vw)",
                    opacity: phase === "compress" ? 0 : 1,
                  }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                />

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: phase === "compress" ? 0 : 1,
                    y: phase === "compress" ? -10 : 0,
                  }}
                  transition={{ duration: 0.8, delay: phase === "letters" ? 1.2 : 0 }}
                  className="mt-5 text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[#1a1a1a]/30 font-medium"
                >
                  Heritage & Elegance
                </motion.p>
              </motion.div>
            )}

            {/* ── Phase 3: Logo grows small → big with ring pulse ── */}
            {phase === "logo-grow" && (
              <motion.div
                key="logo-block"
                className="flex flex-col items-center justify-center gap-8"
              >
                {/* Outer ripple rings */}
                {[0, 0.3, 0.6].map((delay, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute rounded-full border border-[#1a1a1a]/5"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{
                      width: [0, 250 + idx * 60],
                      height: [0, 250 + idx * 60],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Logo circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -20 }}
                  animate={{
                    scale: [0, 0.05, 1.12, 1],
                    opacity: [0, 1, 1, 1],
                    rotate: [-20, -10, 3, 0],
                  }}
                  transition={{
                    duration: 1,
                    times: [0, 0.2, 0.75, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid rgba(255,255,255,0.85)",
                      boxShadow:
                        "0 40px 80px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.4)",
                    }}
                  >
                    <motion.img
                      src="/logo.png"
                      alt="RK"
                      className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>

                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-[-8px] rounded-full pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(190,160,110,0)",
                        "0 0 0 12px rgba(190,160,110,0.08)",
                        "0 0 0 0px rgba(190,160,110,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* Tagline under logo */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#1a1a1a]/30 font-medium"
                >
                  Roop Kala
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 4: Logo drops to navbar ── */}
          {phase === "fly" && navTarget && (
            <motion.div
              initial={{
                position: "fixed",
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
              }}
              animate={{
                left: navTarget.x,
                top: navTarget.y,
                x: "-50%",
                y: "-50%",
                scale: 0.18,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="z-[10000] pointer-events-none"
            >
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.95)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="RK"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply"
                />
              </div>
            </motion.div>
          )}

          {/* ── Bottom progress line ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-[1px] rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{
              width: phase === "fly" ? "0px" : phase === "logo-grow" ? "50vw" : "30vw",
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full w-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(26,26,26,0.12), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

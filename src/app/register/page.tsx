"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // Successfully registered
      router.push("/profile");
    } catch (err: unknown) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f0ec] flex items-center justify-center p-6 selection:bg-[#1a1a1a] selection:text-[#f4f0ec] relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-emerald-900/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-stone-500/5 blur-[120px] pointer-events-none" />

      <Link 
        href="/"
        className="absolute top-10 left-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors z-20"
      >
        <ArrowLeft className="w-3 h-3" strokeWidth={1.5} /> Return to Store
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-10 md:p-14 rounded-[2.5rem] relative z-10"
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.08), inset 2px 2px 4px rgba(255,255,255,0.9)",
        }}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center mb-6">
            <UserPlus className="w-6 h-6 text-[#1a1a1a]" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2 text-center">Create Account</h1>
          <p className="text-sm text-[#1a1a1a]/50 text-center">Join us for a personalized premium experience.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium text-center">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">First Name</label>
              <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-white/40 border border-white/60 rounded-2xl py-3 px-4 text-sm font-medium text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none focus:border-[#1a1a1a]/40 focus:bg-white/60 transition-all shadow-inner" 
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Last Name</label>
              <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-white/40 border border-white/60 rounded-2xl py-3 px-4 text-sm font-medium text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none focus:border-[#1a1a1a]/40 focus:bg-white/60 transition-all shadow-inner" 
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/40 border border-white/60 rounded-2xl py-3 px-4 text-sm font-medium text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none focus:border-[#1a1a1a]/40 focus:bg-white/60 transition-all shadow-inner" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/40 border border-white/60 rounded-2xl py-3 px-4 text-sm font-medium text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none focus:border-[#1a1a1a]/40 focus:bg-white/60 transition-all shadow-inner" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1a1a1a] text-[#f4f0ec] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#1a1a1a]/10 flex flex-col items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/60">
            Already have an account?
          </p>
          <Link href="/login" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-opacity border-b border-[#1a1a1a]">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

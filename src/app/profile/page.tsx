/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Package, Settings, Heart, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const TABS = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "profile", label: "Profile Settings", icon: Settings },
];

const mockOrders: unknown[] = [];

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const orders = user?.user_metadata?.orders || [];
  const addresses = user?.user_metadata?.addresses || [];

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    
    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const phone = formData.get("phone") as string;

    const { data, error } = await supabase.auth.updateUser({
      data: { first_name, last_name, phone }
    });

    if (error) {
      setSaveMessage("Failed to update profile.");
    } else {
      setSaveMessage("Profile updated successfully!");
      if (data.user) setUser(data.user);
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get("name") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
    };
    
    const updatedAddresses = [...addresses, newAddress];
    const { data, error } = await supabase.auth.updateUser({
      data: { addresses: updatedAddresses }
    });
    
    if (!error && data.user) {
      setUser(data.user);
      setIsAddingAddress(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f4f0ec] text-[#1a1a1a] pt-32 pb-24 px-6 md:px-12 lg:px-20 selection:bg-[#1a1a1a] selection:text-[#f4f0ec]">
      <div className="max-w-7xl mx-auto">
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} /> Return to Store
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-12">
          My <span className="italic font-light text-[#1a1a1a]/60">Account</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* ── Sidebar Navigation ── */}
          <div className="w-full lg:w-1/4">
            <div className="flex flex-col gap-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 w-full text-left px-6 py-4 rounded-[1.5rem] transition-all duration-300 ${
                      isActive 
                        ? "bg-white/60 shadow-sm border border-white/80 text-[#1a1a1a]" 
                        : "text-[#1a1a1a]/60 hover:bg-white/30 hover:text-[#1a1a1a]"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
              
              <div className="w-full h-[1px] bg-[#1a1a1a]/10 my-4" />
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-4 w-full text-left px-6 py-4 rounded-[1.5rem] text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* ── Main Content Area ── */}
          <div className="w-full lg:w-3/4">
            <AnimatePresence mode="wait">
              
              {/* Order History Tab */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {orders.length === 0 ? (
                    <div className="p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col items-center text-center">
                      <Package className="w-12 h-12 text-[#1a1a1a]/20 mb-4" strokeWidth={1} />
                      <h3 className="font-serif text-2xl mb-2">No orders yet</h3>
                      <p className="text-sm text-[#1a1a1a]/50 mb-8">When you place an order, it will appear here.</p>
                      <Link href="/collections" className="px-8 py-4 bg-[#1a1a1a] text-[#f4f0ec] rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#2a2a2a] transition-colors shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {orders.map((order: any) => (
                        <div key={order.id} className="p-6 md:p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/50 mb-1">Order {order.id}</p>
                              <p className="text-sm font-semibold">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-2xl font-semibold">₹{order.total.toLocaleString("en-IN")}</p>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mt-1">{order.status}</p>
                            </div>
                          </div>
                          <div className="w-full h-[1px] bg-[#1a1a1a]/10" />
                          <div className="flex flex-wrap gap-6">
                            {order.items.map((item: any, i: number) => (
                              <div key={i} className="flex gap-4 items-center pr-6">
                                <div className="w-16 h-20 rounded-[1.25rem] bg-[#e8e4e0] overflow-hidden relative border border-[#1a1a1a]/5">
                                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-1">{item.category}</p>
                                  <p className="font-serif text-lg leading-tight mb-1">{item.name}</p>
                                  <p className="text-[10px] uppercase tracking-widest font-semibold text-[#1a1a1a]/60">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {wishlist.length === 0 ? (
                    <div className="p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col items-center text-center">
                      <Heart className="w-12 h-12 text-[#1a1a1a]/20 mb-4" strokeWidth={1} />
                      <h3 className="font-serif text-2xl mb-2">Your wishlist is empty</h3>
                      <p className="text-sm text-[#1a1a1a]/50 mb-8">Save your favorite pieces here to easily find them later.</p>
                      <Link href="/collections" className="px-8 py-4 bg-[#1a1a1a] text-[#f4f0ec] rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#2a2a2a] transition-colors">
                        Browse Collections
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {wishlist.map(item => (
                        <div key={item.id} className="p-4 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex gap-4 items-center">
                          <div className="w-20 h-28 rounded-[1.25rem] overflow-hidden bg-[#e8e4e0] relative flex-shrink-0">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-1">{item.category}</p>
                            <h4 className="font-serif text-lg mb-1 leading-tight">{item.name}</h4>
                            <p className="text-sm font-semibold mb-4">₹{item.price.toLocaleString("en-IN")}</p>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => { addToCart(item, e); toggleWishlist(item); }}
                                className="flex-1 py-2 text-[10px] uppercase tracking-widest font-semibold bg-[#1a1a1a] text-[#f4f0ec] rounded-xl hover:bg-[#2a2a2a] transition-all"
                              >
                                Move to Cart
                              </button>
                              <button 
                                onClick={() => toggleWishlist(item)}
                                className="w-10 h-10 rounded-xl border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-all text-[#1a1a1a]/40"
                              >
                                <Heart className="w-4 h-4 fill-current text-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  {isAddingAddress ? (
                    <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm">
                      <h3 className="font-serif text-2xl mb-6">Add New Address</h3>
                      <form onSubmit={handleAddAddress} className="flex flex-col gap-6 max-w-lg">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Full Name</label>
                          <input required name="name" type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Street Address</label>
                          <input required name="street" type="text" placeholder="123 Main St, Apt 4B" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">City</label>
                            <input required name="city" type="text" placeholder="Mumbai" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">PIN Code</label>
                            <input required name="zip" type="text" placeholder="400001" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button type="submit" className="flex-1 py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#1a1a1a] text-[#f4f0ec] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300">
                            Save Address
                          </button>
                          <button type="button" onClick={() => setIsAddingAddress(false)} className="py-4 px-8 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#1a1a1a]/20 hover:border-[#1a1a1a] transition-all duration-300">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {addresses.length === 0 ? (
                        <div className="p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col items-center text-center">
                          <MapPin className="w-12 h-12 text-[#1a1a1a]/20 mb-4" strokeWidth={1} />
                          <h3 className="font-serif text-2xl mb-2">No Saved Addresses</h3>
                          <p className="text-sm text-[#1a1a1a]/50 mb-8">Add an address for faster checkout.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {addresses.map((addr: any) => (
                            <div key={addr.id} className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-2 relative group">
                              <h4 className="font-serif text-xl">{addr.name}</h4>
                              <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">
                                {addr.street}<br/>
                                {addr.city}, {addr.zip}
                              </p>
                              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 transition-colors" onClick={async () => {
                                  const updated = addresses.filter((a: any) => a.id !== addr.id);
                                  const { data } = await supabase.auth.updateUser({ data: { addresses: updated } });
                                  if (data.user) setUser(data.user);
                                }}>Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button onClick={() => setIsAddingAddress(true)} className="w-full p-8 rounded-[2.5rem] border-2 border-dashed border-[#1a1a1a]/20 hover:border-[#1a1a1a]/40 hover:bg-white/20 transition-all flex flex-col items-center justify-center gap-3 text-[#1a1a1a]/50 hover:text-[#1a1a1a]">
                        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold">Add New Address</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm">
                    <form key={user?.id || 'loading'} onSubmit={handleSaveProfile} className="flex flex-col gap-8 max-w-lg">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">First Name</label>
                          <input name="first_name" type="text" defaultValue={user?.user_metadata?.first_name || ""} className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Last Name</label>
                          <input name="last_name" type="text" defaultValue={user?.user_metadata?.last_name || ""} className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Email Address</label>
                        <input type="email" readOnly disabled defaultValue={user?.email || ""} className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a]/50 outline-none cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 font-bold mb-2 block">Phone Number</label>
                        <input name="phone" type="tel" defaultValue={user?.user_metadata?.phone || ""} placeholder="Add your phone number" className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-lg font-serif text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors" />
                      </div>
                      
                      <div className="flex items-center gap-6 mt-4">
                        <button disabled={isSaving} type="submit" className="py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#1a1a1a] text-[#f4f0ec] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0">
                          {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                        {saveMessage && (
                          <span className={`text-xs font-semibold ${saveMessage.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}>
                            {saveMessage}
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}

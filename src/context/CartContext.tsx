"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
  quantity: number;
};

type FlyingItem = {
  id: string;
  img: string;
  startX: number;
  startY: number;
  isReverse?: boolean;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, event?: React.MouseEvent) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  count: number;
  
  wishlist: CartItem[];
  toggleWishlist: (item: Omit<CartItem, "quantity">) => void;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

function FlyingImage({ item }: { item: FlyingItem }) {
  const [cartPos, setCartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cartBtn = document.getElementById("navbar-cart-button");
    if (cartBtn) {
      const rect = cartBtn.getBoundingClientRect();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    } else {
      setCartPos({ x: window.innerWidth / 2, y: window.innerHeight - 50 });
    }
  }, []);

  if (!cartPos.x) return null;

  if (item.isReverse) {
    return (
      <motion.img
        src={item.img}
        initial={{ x: cartPos.x - 50, y: cartPos.y - 50, scale: 0.1, opacity: 0.5, rotate: 45 }}
        animate={{
          x: item.startX - 50,
          y: [cartPos.y - 50, item.startY - 250, item.startY - 50],
          scale: [0.1, 0.8, 1],
          opacity: [0.5, 1, 0],
          rotate: [45, 15, 0],
        }}
        transition={{
          duration: 0.8,
          times: [0, 0.4, 1],
          ease: "easeInOut",
        }}
        className="fixed z-[9999] w-[100px] h-[100px] object-cover rounded-2xl shadow-2xl pointer-events-none border-2 border-white"
      />
    );
  }

  return (
    <motion.img
      src={item.img}
      initial={{ x: item.startX - 50, y: item.startY - 50, scale: 1, opacity: 1, rotate: 0 }}
      animate={{
        x: cartPos.x - 50,
        y: [item.startY - 50, item.startY - 250, cartPos.y - 50],
        scale: [1, 0.8, 0.1],
        opacity: [1, 1, 0.5],
        rotate: [0, 15, 45],
      }}
      transition={{
        duration: 0.8,
        times: [0, 0.4, 1], // peak height at 40%
        ease: "easeInOut",
      }}
      className="fixed z-[9999] w-[100px] h-[100px] object-cover rounded-2xl shadow-2xl pointer-events-none border-2 border-white"
    />
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("saree_cart");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setItems(JSON.parse(savedCart));
      
      const savedWishlist = localStorage.getItem("saree_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to load state from localStorage");
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("saree_cart", JSON.stringify(items));
      localStorage.setItem("saree_wishlist", JSON.stringify(wishlist));
    }
  }, [items, wishlist, isHydrated]);

  const toggleWishlist = (item: Omit<CartItem, "quantity">) => {
    setWishlist(prev => prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, { ...item, quantity: 1 }]);
  };

  const addToCart = (item: Omit<CartItem, "quantity">, event?: React.MouseEvent) => {
    const isAlreadyInCart = items.find(i => i.id === item.id);
    
    if (isAlreadyInCart) {
      // Remove from cart and trigger reverse animation
      removeFromCart(item.id);
      
      if (event) {
        const target = event.currentTarget as HTMLElement;
        const container = target.closest('.group') || target.closest('.relative');
        
        let startX = event.clientX;
        let startY = event.clientY;

        if (container) {
          const imgEl = container.querySelector('img');
          if (imgEl) {
            const rect = imgEl.getBoundingClientRect();
            startX = rect.left + rect.width / 2;
            startY = rect.top + rect.height / 2;
          }
        }

        // eslint-disable-next-line react-hooks/purity
        const id = Date.now().toString() + Math.random();
        setFlyingItems(prev => [...prev, { id, img: item.img, startX, startY, isReverse: true }]);

        setTimeout(() => {
          setFlyingItems(prev => prev.filter(i => i.id !== id));
        }, 850);
      }
      return;
    }

    // Add to cart and trigger normal animation
    setItems(prev => [...prev, { ...item, quantity: 1 }]);

    if (event) {
      const target = event.currentTarget as HTMLElement;
      const container = target.closest('.group') || target.closest('.relative');
      
      let startX = event.clientX;
      let startY = event.clientY;

      if (container) {
        const imgEl = container.querySelector('img');
        if (imgEl) {
          const rect = imgEl.getBoundingClientRect();
          startX = rect.left + rect.width / 2;
          startY = rect.top + rect.height / 2;
        }
      }

      // eslint-disable-next-line react-hooks/purity
        const id = Date.now().toString() + Math.random();
      setFlyingItems(prev => [...prev, { id, img: item.img, startX, startY, isReverse: false }]);

      setTimeout(() => {
        setFlyingItems(prev => prev.filter(i => i.id !== id));
      }, 850);
    }
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) return <CartContext.Provider value={{
    items: [], addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {},
    isOpen: false, openCart: () => {}, closeCart: () => {}, count: 0,
    wishlist: [], toggleWishlist: () => {}, isWishlistOpen: false, openWishlist: () => {}, closeWishlist: () => {},
    isSearchOpen: false, openSearch: () => {}, closeSearch: () => {}
  }}>{children}</CartContext.Provider>;

  return (
    <CartContext.Provider value={{ 
      items, addToCart, removeFromCart, updateQuantity, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), count,
      wishlist, toggleWishlist, isWishlistOpen, openWishlist: () => setIsWishlistOpen(true), closeWishlist: () => setIsWishlistOpen(false),
      isSearchOpen, openSearch: () => setIsSearchOpen(true), closeSearch: () => setIsSearchOpen(false)
    }}>
      {children}
      <AnimatePresence>
        {flyingItems.map(item => (
          <FlyingImage key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

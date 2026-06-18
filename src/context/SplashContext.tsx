"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SplashContextType = {
  splashDone: boolean;
  setSplashDone: (v: boolean) => void;
};

const SplashContext = createContext<SplashContextType>({ splashDone: false, setSplashDone: () => {} });

export function SplashProvider({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <SplashContext.Provider value={{ splashDone, setSplashDone }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  return useContext(SplashContext);
}

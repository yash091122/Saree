import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { SplashProvider } from "@/context/SplashContext";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Roop Kala — Modern & Heritage",
  description: "Showcasing handcrafted weaves, intricate drapes, and modern simplicity for the contemporary woman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#f4f0ec] text-[#1a1a1a]">
        <CartProvider>
          <SplashProvider>
            <SplashScreen />
            <Navbar />
            {children}
          </SplashProvider>
        </CartProvider>
      </body>
    </html>
  );
}

# Saree - Premium Ethnic Wear E-Commerce

A modern, high-end e-commerce platform designed for traditional Indian ethnic wear. Built with a focus on premium aesthetics, seamless animations, and real-time data syncing.

## ✨ Features

- **Editorial-Style UI**: A luxurious, minimalist design system inspired by high-fashion editorial magazines.
- **Fluid Animations**: Heavy utilization of Framer Motion for parallax scrolling, page transitions, and micro-interactions.
- **Real-Time Data**: Integrated with Supabase Realtime to instantly reflect product availability, new collections, and price updates without requiring a page refresh.
- **Responsive Design**: Carefully crafted layouts that look stunning on both wide desktop monitors and narrow mobile screens.
- **Glassmorphic Navigation**: A unique, floating pill-shaped navigation bar that provides quick access to core features without obstructing the viewing experience.
- **Wishlist & Cart**: Functional cart and wishlist management seamlessly integrated into the UI.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL & Realtime)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yash091122/Saree.git
   cd Saree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root of the project and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Database Setup

To enable real-time features, ensure you have a `products` table in your Supabase database with the following schema:
- `id` (int8)
- `name` (text)
- `category` (text)
- `price` (numeric)
- `originalPrice` (numeric, nullable)
- `img` (text)
- `rating` (numeric)
- `reviews` (int8)
- `description` (text)
- `longDescription` (text)
- `badge` (text, nullable)
- `details` (jsonb)

*Don't forget to enable Realtime Broadcast for the `products` table in your Supabase dashboard.*

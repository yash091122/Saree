import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key) acc[key.trim()] = value.join('=').trim().replace(/"/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const newProducts = [
  {
    name: "Handloom Sage",
    category: "Cotton",
    price: 6500,
    originalPrice: 7500,
    img: "/cotton-saree.png",
    rating: 4.6,
    reviews: 32,
    description: "Breathable sage green pure cotton saree for everyday elegance.",
    longDescription: "A soft, everyday drape that does not compromise on elegance. Woven by artisans using hand-spun cotton, this sage green saree features a minimalist aesthetic with a subtle thread border. Perfect for warm climates, it softens beautifully over time. Paired with silver jewelry, it creates a serene and grounded look.",
    badge: "EVERYDAY LUXURY",
    details: {
      zari: "None",
      weave: "Handloom Plain Weave",
      fabric: "100% Organic Cotton",
      origin: "Bengal, India"
    }
  },
  {
    name: "Midnight Drape",
    category: "Silk",
    price: 14500,
    originalPrice: null,
    img: "/collection-flat.png",
    rating: 4.9,
    reviews: 78,
    description: "Luxurious deep indigo silk with a minimalist contemporary edge.",
    longDescription: "A modern take on traditional silk. The Midnight Drape offers a rich indigo hue that commands attention in any room. Designed for the contemporary woman, it avoids heavy brocade in favor of a sleek, fluid drape and a sharp geometric border. The pure silk fabric provides an exceptional sheen that catches the light beautifully.",
    badge: "TRENDING",
    details: {
      zari: "Tested Silver Zari",
      weave: "Satin Silk Weave",
      fabric: "Pure Mulberry Silk",
      origin: "Mysore, Karnataka"
    }
  },
  {
    name: "Crimson Heirloom",
    category: "Occasion",
    price: 28000,
    originalPrice: 35000,
    img: "/banarasi.png",
    rating: 5.0,
    reviews: 150,
    description: "The quintessential red bridal banarasi with heavy gold work.",
    longDescription: "An absolute classic. The Crimson Heirloom is the dream drape for every Indian bride. Featuring a dense 'Jaal' pattern woven intricately with pure gold zari, this saree is a heavy, luxurious masterpiece. The deep crimson red is symbolic of prosperity and joy. Passed down through generations, this is more than a garment; it is a piece of art.",
    badge: "BRIDAL EXCLUSIVE",
    details: {
      zari: "Pure Gold Zari",
      weave: "Kadhwa Jaal Brocade",
      fabric: "Pure Banarasi Silk",
      origin: "Varanasi, Uttar Pradesh"
    }
  },
  {
    name: "Golden Temple",
    category: "Silk",
    price: 22000,
    originalPrice: null,
    img: "/kanjivaram.png",
    rating: 4.8,
    reviews: 94,
    description: "Rich mustard yellow with traditional temple borders.",
    longDescription: "Radiating warmth and festivity, the Golden Temple saree is woven in a vibrant mustard yellow. The hallmark of this drape is its stunning contrast border featuring intricate temple architecture motifs woven in pure silver and gold. The heavy drape guarantees a regal silhouette, perfect for weddings and auspicious ceremonies.",
    badge: null,
    details: {
      zari: "Gold & Silver Blend",
      weave: "Korvai",
      fabric: "Kanchipuram Silk",
      origin: "Kanchipuram, Tamil Nadu"
    }
  }
];

async function seed() {
  const { data, error } = await supabase.from('products').insert(newProducts);
  if (error) console.error("Error inserting products:", error);
  else console.log("Successfully added new collections!");
}

seed();

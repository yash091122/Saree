export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  img: string;
  rating: number;
  reviews: number;
  description: string;
  longDescription: string;
  badge: string | null;
  details: {
    origin: string;
    weave: string;
    fabric: string;
    zari: string;
  };
};

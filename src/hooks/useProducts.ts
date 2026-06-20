import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (isMounted && data) {
          // Normalize the data as details comes back as JSON
          const normalized = data.map((item) => ({
            ...item,
            originalPrice: item.originalPrice ? Number(item.originalPrice) : null,
            price: Number(item.price),
            rating: Number(item.rating),
            reviews: Number(item.reviews)
          })) as Product[];
          
          setProducts(normalized);
        }
      } catch (err: unknown) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    // Subscribe to realtime changes on the 'products' table
    const subscription = supabase
      .channel('products_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        // When any change happens, re-fetch the entire list to ensure consistency
        fetchProducts();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, []);

  return { products, loading, error };
}

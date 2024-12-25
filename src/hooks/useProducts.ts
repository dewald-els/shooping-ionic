import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { selectAllProducts } from "../services/products";
import { SupabaseResponse } from "../models/supabase-response";
import useAppStore from "../store/store";

const useProducts = (): {
  products: Product[];
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const products = useAppStore((state) => state.products);
  const setProducts = useAppStore((state) => state.setProducts);

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    selectAllProducts()
      .then(({ data = [], error }: SupabaseResponse<Product[]>) => {
        setProducts(data);
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the products");
        }
      });
  }, []);

  return {
    products,
    error,
  };
};

export default useProducts;

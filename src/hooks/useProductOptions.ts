import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { selectAllProductOptionsByProduct } from "../services/product-options";
import { SupabaseResponse } from "../models/supabase-response";
import { ProductOption } from "../models/product-option";
import useAppStore from "../store/store";

type UseProductOption = {
  productOptions: ProductOption[];
  error: string | null;
};

const useProductOptions = (product: Product | null): UseProductOption => {
  const productOptions = useAppStore((state) => state.productOptions);
  const setProductOptions = useAppStore((state) => state.setProductOptions);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;

    selectAllProductOptionsByProduct(product)
      .then(({ data = [], error }: SupabaseResponse<ProductOption[]>) => {
        const options = data.sort((a, b) => a.display_order - b.display_order);
        setProductOptions(options);
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the product options");
        }
      });
  }, [product, setProductOptions]);

  return {
    productOptions,
    error,
  };
};

export default useProductOptions;

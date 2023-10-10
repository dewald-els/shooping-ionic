import { SupabaseTable } from "../consts/supabase-table";
import { CartProductOption } from "../models/cart";
import { Product } from "../models/product";
import { ProductOption } from "../models/product-option";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectAllProductOptionsByProduct = async (
  product: Product
): Promise<SupabaseResponse<ProductOption[]>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.productOptions)
    .select("*")
    .eq("product", product.name);
  return {
    data: data as ProductOption[],
    error: error?.hint ?? null,
  };
};

export const selectProductOptionStock = async (productOptionIds: number[]) => {
  const { data, error } = await supabase
    .from(SupabaseTable.productOptions)
    .select("id, stock")
    .in("id", productOptionIds);

  return {
    data: data as { id: number; stock: number }[],
    error,
  };
};

export const updateProductOptionStock = async (
  productOptions: CartProductOption[]
) => {
  const updates = productOptions.map((option) => {
    return updateProductOptionById({
      id: option.id,
      stock: option.stock,
    });
  });

  const results = await Promise.allSettled(updates);

  return results;
};

export const updateProductOptionById = async (
  productOption: Partial<ProductOption>
): Promise<SupabaseResponse<ProductOption>> => {
  const { id, ...option } = productOption;

  const { error, data } = await supabase
    .from(SupabaseTable.productOptions)
    .update({
      ...option,
    })
    .eq("id", id);

  return {
    data: data,
    error: error ? error.message : null,
  };
};

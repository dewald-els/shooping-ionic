import { SupabaseTable } from "../consts/supabase-table";
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

export const selectProductOptionQuantity = async (productOptionId: number) => {
  const { data, error } = await supabase
    .from(SupabaseTable.productOptions)
    .select("stock")
    .eq("id", productOptionId);

  return {
    data,
    error,
  };
};

export const updateProductOptionById = async (
  productOption: ProductOption
): Promise<SupabaseResponse<ProductOption>> => {
  const { id, ...option } = productOption;

  const { error, data } = await supabase
    .from(SupabaseTable.productOptions)
    .update({
      ...option,
    })
    .eq("id", id)
    .select()
    .single();

  return {
    data: data as ProductOption,
    error: error ? error.message : null,
  };
};

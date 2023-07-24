import { SupabaseTable } from "../consts/supabase-table";
import { Product } from "../models/product";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectAllProducts = async (): Promise<
  SupabaseResponse<Product[]>
> => {
  const { data, error } = await supabase.from(SupabaseTable.products).select(`
      id,
      name,
      description,
      created_at,
      image,
      show,
      category,
      categories (
        id,
        name,
        description,
        show,
        display_order,
        created_at,
        color,
        icon
      )
    `);
  return {
    data: data as unknown as Product[],
    error: error?.hint ?? null,
  };
};

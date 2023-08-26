import { SupabaseTable } from "../consts/supabase-table";
import { StoreInfo } from "../models/store-info";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectStoreInfo = async (): Promise<
  SupabaseResponse<StoreInfo[] | null>
> => {
  const { data, error } = await supabase
    .from(SupabaseTable.storeInfo)
    .select("*")
    .eq("active", true);

  return {
    data: data as StoreInfo[],
    error: error?.hint ?? null,
  };
};

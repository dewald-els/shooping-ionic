import { SupabaseTable } from "../consts/supabase-table";
import { OpeningHours } from "../models/opening-hours";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectAllOpeningHours = async (): Promise<
  SupabaseResponse<OpeningHours[]>
> => {
  const { data, error } = await supabase
    .from(SupabaseTable.openingHours)
    .select("*");
  return {
    data: data as OpeningHours[],
    error: error?.hint ?? null,
  };
};

import { SupabaseTable } from "../consts/supabase-table";
import { Profile } from "../models/profile";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectProfileById = async (
  userId: string
): Promise<SupabaseResponse<Profile | null>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.profiles)
    .select("*")
    .eq("id", userId)
    .single();

  return {
    data: data as Profile,
    error: error?.hint ?? null,
  };
};

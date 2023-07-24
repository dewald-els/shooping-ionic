import { SupabaseTable } from "../consts/supabase-table";
import { OrderSession } from "../models/order-session";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const createOrderSession = async (
  profileId: string
): Promise<SupabaseResponse<OrderSession>> => {
  const { error, data } = await supabase
    .from(SupabaseTable.orderSession)
    .insert({
      profile_id: profileId,
      expires_at: new Date().toString(),
    })
    .select()
    .single();

  return {
    data: data as unknown as OrderSession,
    error: error ? error?.message : null,
  };
};

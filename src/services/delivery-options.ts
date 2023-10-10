import { SupabaseTable } from "../consts/supabase-table";
import { DeliveryOption } from "../models/delivery-option";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectDeliveryOptions = async (): Promise<
  SupabaseResponse<DeliveryOption[]>
> => {
  const { data, error } = await supabase
    .from(SupabaseTable.deliveryOptions)
    .select("*");
  return {
    data: data as DeliveryOption[],
    error: error?.hint ?? null,
  };
};

export const selectDeliveryOptionById = async (
  deliveryOptionId: number
): Promise<SupabaseResponse<DeliveryOption>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.deliveryOptions)
    .select("*")
    .eq("id", deliveryOptionId)
    .single();
  return {
    data: data as DeliveryOption,
    error: error?.hint ?? null,
  };
};

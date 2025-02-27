import { SupabaseTable } from "../consts/supabase-table";
import { Order, OrderStatus } from "../models/order";
import { SupabaseResponse } from "../models/supabase-response";
import { supabase } from "./supabase";

export const selectAllOrdersByProfileId = async (
  profileId: string
): Promise<SupabaseResponse<Order[]>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.orders)
    .select()
    .eq("profile_id", profileId);
  return {
    data: data as unknown as Order[],
    error: error?.hint ?? null,
  };
};

export const selectOrderById = async (orderId: number) => {
  const { data, error } = await supabase
    .from(SupabaseTable.orders)
    .select()
    .eq("id", orderId)
    .single();
  return {
    data: data as unknown as Order,
    error: error?.hint ?? null,
  };
};

export const insertOrder = async (
  order: Order
): Promise<SupabaseResponse<Order>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.orders)
    .insert(order)
    .select();
  return {
    data: data?.[0] as unknown as Order,
    error: error?.hint ?? null,
  };
};

export const updateOrderStatus = async (
  orderId: number,
  status: OrderStatus
): Promise<SupabaseResponse<Order>> => {
  const { data, error } = await supabase
    .from(SupabaseTable.orders)
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);
  return {
    data: data?.[0] as unknown as Order,
    error: error?.hint ?? null,
  };
};

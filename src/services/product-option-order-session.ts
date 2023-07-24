import { SupabaseTable } from "../consts/supabase-table";
import { OrderSessionItem } from "../models/order-session-item";
import { supabase } from "./supabase";

export const addProductOptionToOrderSession = async (
  orderSessionItem: OrderSessionItem
) => {
  const { id, ...item } = orderSessionItem;
  const { error, data } = await supabase
    .from(SupabaseTable.productOptionOrderSession)
    .insert({
      ...item,
    })
    .eq("id", id)
    .select();

  return {
    data,
    error,
  };
};

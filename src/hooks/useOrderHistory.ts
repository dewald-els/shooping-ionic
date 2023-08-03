import { useEffect, useState } from "react";
import useAppStore from "../store/store";
import { Order } from "../models/order";
import { SupabaseResponse } from "../models/supabase-response";
import { selectAllOrdersByProfileId } from "../services/orders";

const useOrderHistory = (
  profileId?: string
): {
  orders: Order[];
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const orders = useAppStore((state) => state.orderHistory);
  const setOrderHistory = useAppStore((state) => state.setOrderHistory);

  useEffect(() => {
    if (orders.length > 0) {
      return;
    }

    if (!profileId) return;

    selectAllOrdersByProfileId(profileId)
      .then(({ data, error }: SupabaseResponse<Order[]>) => {
        console.log("orders", data);
        setOrderHistory(data.sort((a, b) => b.id! - a.id!));
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the order history for n");
        }
      });
  }, [profileId]);

  return {
    orders,
    error,
  };
};

export default useOrderHistory;

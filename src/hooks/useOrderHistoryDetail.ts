import { useEffect, useState } from "react";
import { Order } from "../models/order";
import { SupabaseResponse } from "../models/supabase-response";
import { selectOrderById } from "../services/orders";

const useOrderHistoryDetail = (
  orderId?: number
): {
  order: Order | null;
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    selectOrderById(orderId)
      .then(({ data, error }: SupabaseResponse<Order>) => {
        setOrder(data);
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the order history for n");
        }
      });
  }, [orderId]);

  return {
    order,
    error,
  };
};

export default useOrderHistoryDetail;

import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { selectAllProducts } from "../services/products";
import { SupabaseResponse } from "../models/supabase-response";
import useAppStore from "../store/store";
import { selectAllOrders } from "../services/orders";
import { Order } from "../models/order";

const useOrders = (): {
  orders: Order[];
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const orders = useAppStore((state) => state.orders);
  const setOrders = useAppStore((state) => state.setOrders);

  useEffect(() => {
    if (orders.length > 0) {
      return;
    }

    selectAllOrders()
      .then(({ data, error }: SupabaseResponse<Order[]>) => {
        setOrders(data);
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the products");
        }
      });
  }, []);

  return {
    orders,
    error,
  };
};

export default useOrders;

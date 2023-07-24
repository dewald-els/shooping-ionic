import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { SupabaseTable } from "../consts/supabase-table";
import useAppStore from "../store/store";
import { Product } from "../models/product";

const useProductSubscription = () => {
  const updateProduct = useAppStore((state) => state.updateProduct);

  useEffect(() => {
    const productOptionsChannel = supabase
      .channel("product-options-db-changed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: SupabaseTable.products,
        },
        (payload) => {
          console.log("Payload", payload);
          updateProduct(payload.new as Product);
        }
      )
      .subscribe();

    return () => {
      productOptionsChannel
        .unsubscribe()
        .then(() => {
          console.log("unsubscribed from products");
        })
        .catch(() => console.log("could not unsubscribe from products"));
    };
  }, []);
};

export default useProductSubscription;

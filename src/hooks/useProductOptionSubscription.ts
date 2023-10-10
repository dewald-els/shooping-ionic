import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { SupabaseTable } from "../consts/supabase-table";
import useAppStore from "../store/store";
import { ProductOption } from "../models/product-option";

const useProductOptionSubscription = () => {
  const updateProductOptions = useAppStore(
    (state) => state.updateProductOptions
  );

  useEffect(() => {
    const productOptionsChannel = supabase
      .channel("products-db-changed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: SupabaseTable.productOptions,
        },
        (payload) => {
          console.log("Payload", payload);
          updateProductOptions(payload.new as ProductOption);
        }
      )
      .subscribe();

    return () => {
      productOptionsChannel
        .unsubscribe()
        .then(() => {
          console.log("unsubscribed from product_options");
        })
        .catch(() => console.log("could not unsubscribe from product_options"));
    };
  }, []);
};

export default useProductOptionSubscription;

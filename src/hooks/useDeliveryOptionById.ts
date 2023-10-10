import { useEffect, useState } from "react";
import { SupabaseResponse } from "../models/supabase-response";
import { DeliveryOption } from "../models/delivery-option";
import { selectDeliveryOptionById } from "../services/delivery-options";

const useDeliveryOptionById = (
  deliveryOptionId: number | undefined
): {
  deliveryOption: DeliveryOption | null;
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | null>(
    null
  );

  useEffect(() => {
    if (!deliveryOptionId) return;
    selectDeliveryOptionById(deliveryOptionId)
      .then(({ data, error }: SupabaseResponse<DeliveryOption | null>) => {
        if (data) {
          setDeliveryOption(data);
        }
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the DeliveryOption");
        }
      });
  }, [deliveryOptionId]);

  return {
    deliveryOption,
    error,
  };
};

export default useDeliveryOptionById;

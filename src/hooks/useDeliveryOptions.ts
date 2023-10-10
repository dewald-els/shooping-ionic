import { useEffect, useState } from "react";
import useAppStore from "../store/store";
import { selectDeliveryOptions } from "../services/delivery-options";

const useDeliveryOptions = () => {
  const [error, setError] = useState<string | null>(null);
  const deliveryOptions = useAppStore((state) => state.deliveryOptions);
  const setDeliveryOptions = useAppStore((state) => state.setDeliveryOptions);

  useEffect(() => {
    if (deliveryOptions.length > 0) return;

    selectDeliveryOptions().then(({ data, error }) => {
      if (error) {
        setError(error);
        return;
      }

      if (data) {
        setDeliveryOptions(data);
      }
    });
  }, []);

  return {
    deliveryOptions,
    error,
  };
};
export default useDeliveryOptions;

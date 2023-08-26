import { useEffect, useState } from "react";
import useAppStore from "../store/store";
import { selectStoreInfo } from "../services/store-info";

const useStoreInfo = () => {
  const [error, setError] = useState<string | null>(null);
  const storeInfo = useAppStore((state) => state.storeInfo);
  const setStoreInfo = useAppStore((state) => state.setStoreInfo);

  useEffect(() => {
    if (storeInfo.length > 0) return;

    selectStoreInfo().then(({ data, error }) => {
      if (error) {
        setError(error);
        return;
      }

      if (data) {
        setStoreInfo(data);
      }
    });
  }, []);

  return {
    storeInfo,
    error,
  };
};
export default useStoreInfo;

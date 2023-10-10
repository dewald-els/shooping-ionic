import { useEffect, useState } from "react";
import { SupabaseResponse } from "../models/supabase-response";
import useAppStore from "../store/store";
import { OpeningHours } from "../models/opening-hours";
import { selectAllOpeningHours } from "../services/opening-hours";

const useOpeningHours = (): {
  openingHours: OpeningHours[];
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const openingHours = useAppStore((state) => state.openingHours);
  const setOpeningHours = useAppStore((state) => state.setOpeningHours);

  useEffect(() => {
    if (openingHours?.length > 0) {
      return;
    }

    selectAllOpeningHours()
      .then(({ data, error }: SupabaseResponse<OpeningHours[]>) => {
        setOpeningHours(data);
        setError(error);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Could not get the opening hours");
        }
      });
  }, [openingHours?.length, setOpeningHours]);

  return {
    openingHours,
    error,
  };
};

export default useOpeningHours;

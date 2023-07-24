import { useEffect, useState } from "react";
import useAppStore from "../store/store";
import { selectProfileById } from "../services/profile";
import { SupabaseResponse } from "../models/supabase-response";
import { Profile } from "../models/profile";

const useProfile = (
  userId: string | undefined
): {
  profile: Profile | null;
  error: string | null;
} => {
  const [error, setError] = useState<string | null>(null);
  const profile = useAppStore((state) => state.profile);
  const setProfile = useAppStore((state) => state.setProfile);

  useEffect(() => {
    if (!userId) return;
    selectProfileById(userId)
      .then(({ data, error }: SupabaseResponse<Profile | null>) => {
        if (data) {
          setProfile(data);
        }
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
    profile,
    error,
  };
};

export default useProfile;

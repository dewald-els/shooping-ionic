import { Session } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  full_name: string;
  phone_number: string;
  city: string;
  street: string;
  postCode: string;
  blocked: boolean;
  created_at?: string;
  updated_at: string | null;
  avatar_url: string | null;
  username: string | null;
}

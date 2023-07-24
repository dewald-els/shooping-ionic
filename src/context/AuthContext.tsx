import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContext = {
  session: Session | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch(() => {
        console.log("Not signed in");
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Logged in or out");

      console.log(_event, session);

      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

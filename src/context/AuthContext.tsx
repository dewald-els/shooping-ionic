import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContext = {
  session: Session | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
});

/**
 * Hook that provides the authenticated session from Supabase.
 * @returns {AuthContext} The authenticated session from Supabase.
 */
export const useAuth = (): AuthContext => {
  return useContext(AuthContext);
};

/**
 * Provide the authenticated session from Supabase to the entire app.
 * @param props { children: React.ReactNode}
 * @returns
 */
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
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

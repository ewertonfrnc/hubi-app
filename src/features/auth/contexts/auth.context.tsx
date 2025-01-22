import {
  createContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import type { User } from "../types/user.types";
import supabase from "../../../utils/config/supabase.config";
import { Session } from "@supabase/supabase-js";
import { fetchCurrentUser } from "../data";

type InitialState = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<InitialState>({
  currentUser: null,
  setCurrentUser: () => null,
});

type Props = { children: ReactNode };

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);

  async function getCurrentUser(userEmail: string) {
    const currentUser = await fetchCurrentUser(userEmail);
    setCurrentUser(currentUser);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseSession(session);

      if (session?.user.email) {
        getCurrentUser(session.user.email);
      }
      console.log("getSession", session?.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(session);

      if (session?.user.email) {
        getCurrentUser(session.user.email);
      }
      console.log("auth state changed for session", session?.user.id);
    });
  }, []);

  const value = { currentUser, setCurrentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

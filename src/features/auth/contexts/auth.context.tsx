import {
  createContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import type { User } from "../types/user.types";

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

  const value = { currentUser, setCurrentUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

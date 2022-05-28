import { createContext } from "react";

export interface User {
  avatar?: string;
  name: string
}

interface GlobalContextData {
  user?: User;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setUser: (value: User) => void;
}

export const GlobalContext = createContext<GlobalContextData>({
  user: {} as User,
  loading: false,
  setLoading: () => {},
  setUser: () => {},
});

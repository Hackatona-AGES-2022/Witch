import { createContext } from "react";

interface User {
  avatar?: string;
}

interface GlobalContextData {
  user?: User;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setUser: (value: User) => void;
}

export const GlobalContext = createContext<GlobalContextData>({
  user: {},
  loading: false,
  setLoading: () => {},
  setUser: () => {},
});

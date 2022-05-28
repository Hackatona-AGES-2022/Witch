import { createContext } from "react";

interface GlobalContextData {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextData>({
  loading: false,
  setLoading: () => {},
});

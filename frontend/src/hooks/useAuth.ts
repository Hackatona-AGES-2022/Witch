import { useLocalStorage } from "./useLocalStorage";
export const AUTH_TOKEN_NAME = "TOKEN";

export function useAuth() {
  return Boolean(useLocalStorage().getItem(AUTH_TOKEN_NAME));
}

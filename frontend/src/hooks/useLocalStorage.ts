const prefix = "HACKATHONA_";

const getItem = (
  name: string
): number | string | null | Record<string, any> | any[] => {
  const item = localStorage.getItem(prefix + name);
  if (Number(item)) return Number(item);
  if (item?.includes("{") || item?.includes("[")) return JSON.parse(item);
  return item;
};

const setItem = (name: string, item: any) =>
  localStorage.setItem(
    prefix + name,
    typeof item === "string" ? item : JSON.stringify(item)
  );

const removeItem = (name: string) => localStorage.removeItem(prefix + name);

export function useLocalStorage() {
  return { getItem, setItem, removeItem };
}

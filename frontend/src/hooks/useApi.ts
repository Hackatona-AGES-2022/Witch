import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";
import { AUTH_TOKEN_NAME } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";

const { REACT_APP_BACKEND_URL } = process.env;

const showError = (error: AxiosError<any, any>) => {
  toast(
    error?.response?.data?.message ||
      "Oops, algo deu errado. Tente novamente mais tarde"
  );
};

export function useApi(controllerURL: string = "") {
  const { setLoading } = useContext(GlobalContext);

  axios.interceptors.request.use((request) => {
    setLoading(true);
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      showError(error);
    }
  );

  const { getItem } = useLocalStorage();
  const token = getItem(AUTH_TOKEN_NAME);
  const headers = { Authorization: `Bearer ${token}` };

  const get = (url: string) =>
    axios.get(`${REACT_APP_BACKEND_URL}/${controllerURL}${url}`, { headers });

  const post = (url: string, data: any) =>
    axios.post(`${REACT_APP_BACKEND_URL}/${controllerURL}${url}`, data, {
      headers,
    });

  const put = (url: string, data: any) =>
    axios.put(`${REACT_APP_BACKEND_URL}/${controllerURL}${url}`, data, {
      headers,
    });

  const deleteFn = (url: string) =>
    axios.delete(`${REACT_APP_BACKEND_URL}/${controllerURL}${url}`, {
      headers,
    });

  return { get, post, put, delete: deleteFn };
}

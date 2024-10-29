import Axios from "axios";
import { useMemo } from "react";
import { config } from "./config";

export const useAxios = () => {
  return useMemo(() => {
    const axios = Axios.create({
      baseURL: config.baseUrl,
      withCredentials: true,
    });
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response) {
          return Promise.reject(String(err.response.data));
        } else {
          return Promise.reject(String(err));
        }
      }
    );
    return axios;
  }, []);
};

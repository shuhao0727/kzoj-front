import Axios from "axios";
import { useMemo } from "react";
import { config } from "./config";

export const useAxios = () =>
  useMemo(
    () =>
      Axios.create({
        baseURL: config.baseUrl,
        withCredentials: true,
      }),
    [config.baseUrl]
  );

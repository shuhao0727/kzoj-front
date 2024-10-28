import Dayjs from "dayjs";
import { axios } from "./axios";

export type User = {
  uuid?: string;
  username: string;
  realName: string;
  email: string;
  authority: "USER" | "ADMIN";
  utcCreated: Dayjs.Dayjs;
  utcUpdated: Dayjs.Dayjs;
};

const setUserTimestamps = (data: User): User => {
  return {
    ...data,
    utcCreated: Dayjs(data.utcCreated),
    utcUpdated: Dayjs(data.utcUpdated),
  };
};

export const login = (username: string, password: string): Promise<User> => {
  const form = new FormData();
  form.set("username", username);
  form.set("password", password);
  return axios
    .post<User>(`/user/login`, form)
    .then((res) => setUserTimestamps(res.data))
    .catch((err) => {
      if (err.response) {
        throw err.response.data;
      } else {
        throw "无法连接到服务器";
      }
    });
};

export const logout = (): Promise<void> => {
  return axios.post<void>(`/user/logout`).then();
};

export const register = (
  user: Pick<User, "username" | "realName" | "email">,
  password: string
): Promise<User> => {
  return axios
    .post<User>(`/user/signup`, {
      ...user,
      plainPassword: password,
      gender: "UNISEX",
      school: "江苏省昆山中学",
      grade: 10,
      githubHomepage: "",
      authority: "USER",
    })
    .then((res) => setUserTimestamps(res.data));
};

export const getSelf = (): Promise<User> => {
  return axios
    .get<User>(`/user/self`)
    .then((res) => setUserTimestamps(res.data));
};

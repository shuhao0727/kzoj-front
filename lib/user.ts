import { Axios } from "axios";
import Dayjs from "dayjs";
import { mutate } from "swr";

export type User = {
  uuid?: string;
  username: string;
  realName: string;
  email: string;
  authority: "USER" | "ADMIN";
  utcCreated: Dayjs.Dayjs;
  utcUpdated: Dayjs.Dayjs;
};

class UserService {
  private axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  static mapTimestamps = (data: User): User => {
    return {
      ...data,
      utcCreated: Dayjs(data.utcCreated),
      utcUpdated: Dayjs(data.utcUpdated),
    };
  };

  login = (username: string, password: string): Promise<User> => {
    const form = new FormData();
    form.set("username", username);
    form.set("password", password);
    return this.axios
      .post<User>(`/user/login`, form)
      .then((res) => {
        mutate((_) => true, undefined, { revalidate: false });
        return UserService.mapTimestamps(res.data);
      })
      .catch((err) => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err;
        }
      });
  };

  logout = (): Promise<void> => {
    return this.axios
      .post<void>(`/user/logout`)
      .then(() => {
        mutate((_) => true, undefined, { revalidate: false });
      })
      .catch((err) => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err;
        }
      });
  };

  register = (
    user: Pick<User, "username" | "realName" | "email">,
    password: string
  ): Promise<User> => {
    return this.axios
      .post<User>(`/user/signup`, {
        ...user,
        plainPassword: password,
        gender: "UNISEX",
        school: "江苏省昆山中学",
        grade: 10,
        githubHomepage: "",
        authority: "USER",
      })
      .then((res) => {
        mutate((_) => true, undefined, { revalidate: false });
        return UserService.mapTimestamps(res.data);
      })
      .catch((err) => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err;
        }
      });
  };

  getSelf = (): Promise<User> => {
    return this.axios
      .get<User>(`/user/self`)
      .then((res) => UserService.mapTimestamps(res.data))
      .catch((err) => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err;
        }
      });
  };
}

export const useUserService = (axios: Axios) => new UserService(axios);

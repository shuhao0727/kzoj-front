"use client";

import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import { Notification } from "@douyinfe/semi-ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { UserContext } from "./context";
import { Footer } from "./footer";
import { Header } from "./header";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();
  const pathname = usePathname();

  const { data: user, error } = useSWR("/user/self", () =>
    userService.getSelf()
  );

  useEffect(() => {
    if (!!error) {
      Notification.error({
        title: "获取用户信息失败",
        content: `无法获取用户信息（${error}），请重新登录。`,
      });
      router.push(`/auth/login?redirect=${pathname}`);
    }
  }, [error, router, pathname]);

  return (
    <UserContext.Provider value={user ?? null}>
      <Header />
      <main className="pb-12 flex-grow bg-gray-50">{children}</main>
      <Footer />
    </UserContext.Provider>
  );
};

export default MainLayout;

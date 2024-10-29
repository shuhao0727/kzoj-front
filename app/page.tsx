"use client";

import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import { Notification, Skeleton } from "@douyinfe/semi-ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const IndexPage: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();

  const { error, isLoading } = useSWR("/user/self", () =>
    userService.getSelf()
  );

  useEffect(() => {
    if (!isLoading && error) {
      Notification.error({
        title: "获取用户信息失败",
        content: `无法获取用户信息（${error}），请重新登录。`,
      });
      router.push("/auth/login");
    } else {
      router.push("/main/index");
    }
  }, [isLoading, error, router]);

  return <Skeleton />;
};

export default IndexPage;

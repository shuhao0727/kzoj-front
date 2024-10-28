"use client";

import { getSelf } from "@/lib/user";
import { Skeleton, Toast } from "@douyinfe/semi-ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const IndexPage: React.FC = () => {
  const { error, isLoading } = useSWR("/user/getSelf", () => getSelf());
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      Toast.info("请先登录");
      router.push("/auth/login");
    } else {
      router.push("/main/index");
    }
  }, [isLoading, error, router]);

  return <Skeleton />;
};

export default IndexPage;

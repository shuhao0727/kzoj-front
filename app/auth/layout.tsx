"use client";

import { Title } from "@/components/title";
import { config } from "@/lib/config";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!!user) {
      router.push(`/main/index`);
    }
  }, [user, router]);

  return (
    <div className="flex flex-col bg-gray-100 items-center min-h-[100vh]">
      <div className="mt-[5rem] mx-4 md:w-[30rem]">
        <div className="text-center">
          <Title as="h1" size="3xl" bold="medium">
            江苏省昆山中学代码评测系统
          </Title>
        </div>
        <div className="my-8">
          {searchParams.has("error") && (
            <div className="bg-blue-100 mb-4 p-4 border-l-4 border-blue-500">
              {searchParams.get("error") === "unauthenticated"
                ? "请登录后查看。"
                : searchParams.get("error") === "logout"
                ? "已退出登录。"
                : searchParams.get("error")}
            </div>
          )}
          {children}
        </div>
        <div className="text-center text-gray-500">
          {config.product} {config.version}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

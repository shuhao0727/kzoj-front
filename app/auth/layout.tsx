"use client";

import { Alert } from "@/components/alert";
import { Title } from "@/components/title";
import { config } from "@/lib/config";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/states/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = useMemo(
    () => searchParams.get("redirect") ?? "/",
    [searchParams]
  );

  useEffect(() => {
    if (!!user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

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
            <Alert type="info">
              {searchParams.get("error") === "unauthenticated"
                ? "请登录后查看。"
                : searchParams.get("error") === "logout"
                ? "已退出登录。"
                : searchParams.get("error")}
            </Alert>
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

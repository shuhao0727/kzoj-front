"use client";

import React from "react";

import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.css";
import "./global.css";

import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import useSWR from "swr";
import { UserContext } from "./context";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const axios = useAxios();
  const userService = useUserService(axios);

  const { data: user, isLoading } = useSWR(
    "/user/self",
    () => userService.getSelf(),
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  return (
    <html lang="zh_CN" className="h-full">
      <body className="flex flex-col min-h-screen h-full">
        {isLoading ? (
          <div className="text-center mt-8">正在加载...</div>
        ) : (
          <UserContext.Provider value={isLoading ? null : user ?? null}>
            {children}
          </UserContext.Provider>
        )}
      </body>
    </html>
  );
};

export default RootLayout;

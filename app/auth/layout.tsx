"use client";

import { config } from "@/lib/config";
import { Typography } from "@douyinfe/semi-ui";
import React from "react";

const AuthLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-100 items-center min-h-[100vh]">
      <div className="mt-[5rem] mx-4 md:w-[30rem]">
        <div className="mb-4 text-center">
          <Typography.Title heading={2}>
            江苏省昆山中学代码评测系统
          </Typography.Title>
        </div>
        <div>{children}</div>
        <div className="mt-4 text-center text-gray-500">
          {config.product} {config.version}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

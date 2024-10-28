"use client";

import React from "react";

const AuthLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-100 items-center min-h-[100vh]">
      <div className="mt-[5rem] mx-4 md:w-[30rem]">{children}</div>
    </div>
  );
};

export default AuthLayout;

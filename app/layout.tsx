import type { Metadata } from "next";
import React from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "KZOJ",
  description: "江苏省昆山中学OJ系统",
};

const RootLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="zh_CN" className="h-full">
      <body className="flex flex-col min-h-screen h-full">{children}</body>
    </html>
  );
};

export default RootLayout;

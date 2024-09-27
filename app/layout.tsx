import type { Metadata } from "next";
import React from "react";
import { Footer } from "./footer";
import "./globals.css";
import { Header } from "./header";

export const metadata: Metadata = {
  title: "KZOJ",
  description: "江苏省昆山中学OJ系统",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="zh_CN">
      <body className="flex flex-col min-h-screen">
        {/* 头部 */}
        <Header />

        {/* 主内容部分使用 flex-grow 以填充剩余空间 */}
        <main className="flex-grow">{children}</main>

        {/* 底部始终固定在页面底部 */}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
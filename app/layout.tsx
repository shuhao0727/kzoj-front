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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

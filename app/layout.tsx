import type { Metadata } from "next";
import { Footer } from "./footer";
import "./globals.css";
import { Header } from "./header";

export const metadata: Metadata = {
  title: "KZOJ",
  description: "江苏省昆山中学OJ系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh_CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

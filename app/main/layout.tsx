"use client";

import { Footer } from "./footer";
import { Header } from "./header";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pb-12 flex-grow bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

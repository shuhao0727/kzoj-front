import React from "react";

import type { Metadata } from "next";
import "../globals.css";
import { Navigator } from "./navigator";

export const metadata: Metadata = {
  title: "KZOJ",
  description: "江苏省昆山中学OJ系统",
};

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navigator />
      <div className="flex-1 overflow-y-auto p-10 ml-64">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

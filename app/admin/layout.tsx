"use client";

import React from "react";
import { AdminNavigation } from "./navigation";

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminNavigation />
      <div className="flex-1 overflow-y-auto p-10 ml-64">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

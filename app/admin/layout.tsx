"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/states/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AdminNavigation } from "./navigation";

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=${pathname}&error=unauthenticated`);
    }
    // TODO: redirect if user is not admin
  }, [user, router, pathname]);

  return (
    <>
      {!user ? (
        <div className="flex-grow bg-gray-50" />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <AdminNavigation />
          <div className="flex-1 overflow-y-auto p-10 ml-48">
            <main>{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;

"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const Footer = () => {
  const pathname = usePathname();

  // 判断是否处于后台管理界面，隐藏底部导航
  const isAdminPanel = useMemo(() => pathname.startsWith("/admin"), [pathname]);

  return (
    !isAdminPanel && (
      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <div className="flex justify-center space-x-4 items-center">
          <p>&copy; 2024 KZOJ. All rights reserved.</p>
         
        </div>
      </footer>
    )
  );
};
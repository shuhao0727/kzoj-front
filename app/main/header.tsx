"use client";

import { useAxios } from "@/lib/axios";
import { config } from "@/lib/config";
import { useUserService } from "@/lib/user";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useContext } from "react";
import { UserContext } from "../context";

type NavigationItem = { name: string; href: string; target?: string };

const appNavigationItems: NavigationItem[] = [
  { name: "首页", href: "/main/index" },
  { name: "题目", href: "/main/problems" },
  // { name: "训练", href: "/training" },
  // { name: "比赛", href: "/contest" },
  // { name: "测评", href: "/judge" },
  // { name: "排名", href: "/ranking" },
  // { name: "讨论", href: "/discuss" },
];

// const userNavigationItems: NavigationItem[] = [
//   // { name: "我的主页", href: "/user/profile", target: "_blank" }, // 在新标签页打开
//   // { name: "我的设置", href: "/user/settings", target: "_blank" }, // 在新标签页打开
//   // { name: "后台管理", href: "/admin", target: "_blank" }, // 在新标签页打开
// ];

export const Header: React.FC = () => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const user = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    userService.logout().then(() => router.push("/auth/login?error=logout"));
  }, [userService, router]);

  return (
    <nav className="w-full bg-gray-800">
      <div className="max-w-6xl h-16 mx-auto flex items-center justify-between">
        <div className="inline-flex items-center">
          <div className="px-4 py-2 text-gray-300">{config.product}</div>
          <div className="ml-4 flex items-baseline space-x-4">
            {appNavigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  "rounded-md px-4 py-2",
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="inline-flex">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex items-center rounded-md px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                <UserIcon className="h-4 w-4" />
                <span className="ml-2">
                  {!!user ? `${user.username} ${user.realName}` : "未登录"}
                </span>
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    onClick={() => logout()}
                  >
                    退出登录
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

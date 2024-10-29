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

type Item = { name: string; href: string; target?: string };

const items: Item[] = [
  { name: "首页", href: "/main/index" },
  { name: "题目", href: "/main/problems" },
  // { name: "训练", href: "/training" },
  // { name: "比赛", href: "/contest" },
  // { name: "测评", href: "/judge" },
  // { name: "排名", href: "/ranking" },
  // { name: "讨论", href: "/discuss" },
];

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
            {items.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={classNames(
                  "rounded-md px-4 py-2",
                  pathname === href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {name}
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
                  <Link
                    href="/admin"
                    target="_blank"
                    className="block w-full px-4 py-2 text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    系统管理
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
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

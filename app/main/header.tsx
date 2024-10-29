"use client";

import { config } from "@/lib/config";
import { IconUser } from "@douyinfe/semi-icons";
import { Typography } from "@douyinfe/semi-ui";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useContext } from "react";
import { UserContext } from "./context";

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

const userNavigationItems: NavigationItem[] = [
  { name: "我的主页", href: "/user/profile", target: "_blank" }, // 在新标签页打开
  // { name: "我的设置", href: "/user/settings", target: "_blank" }, // 在新标签页打开
  // { name: "后台管理", href: "/admin", target: "_blank" }, // 在新标签页打开
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const user = useContext(UserContext);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="text-gray-300">{config.product}</div>
            <div className="ml-10 flex items-baseline space-x-4">
              {appNavigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="rounded-md px-3 py-2 hover:bg-gray-700">
                    <Typography.Text icon={<IconUser />} color={undefined}>
                      {user.realName}
                    </Typography.Text>
                  </MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-2 z-10 mt-2 min-w-max origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigationItems.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            target={item.target}
                            rel={
                              item.target === "_blank"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

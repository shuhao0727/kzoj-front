"use client";
// 导航栏框架
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useCallback, useState } from "react";

const navigation = [
  {
    name: "常用设置",
    children: [
      { name: "用户管理", href: "/admin/settings/usermanagement" },
      { name: "公告管理", href: "/admin/settings/announcement" },
      { name: "通知管理", href: "/admin/settings/notification" },
    ],
  },
  {
    name: "题目管理",
    children: [
      { name: "题目列表", href: "/admin/problem" },
      { name: "增加题目", href: "/admin/problem/add" },
      { name: "标签管理", href: "/admin/problem/tag" },
    ],
  },
  {
    name: "训练管理",
    children: [
      { name: "训练列表", href: "/admin/training" },
      { name: "分类管理", href: "/admin/training/category" },
    ],
  },
  {
    name: "比赛管理",
    children: [
      { name: "比赛列表", href: "/admin/contest" },
      { name: "创建比赛", href: "/admin/contest/add" },
    ],
  },
  {
    name: "讨论管理",
    children: [{ name: "讨论列表", href: "/admin/discussion" }],
  },
];

export const Navigator = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({}); // 控制一级导航的展开/收起

  // 切换一级导航的展开/收起
  const toggleSection = useCallback(
    (section: string) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    [setOpenSections]
  );

  return (
    <React.Fragment>
      {/* 侧边栏 */}
      <Transition show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900">
                <div className="flex h-16 items-center justify-between px-4">
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    onClick={() => setSidebarOpen(false)}
                  />
                </div>
                <nav className="flex flex-1 flex-col px-2">
                  <ul className="flex flex-col gap-y-7">
                    {navigation.map((section, index) => (
                      <li key={index}>
                        <button
                          className="flex justify-between w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                          onClick={() => toggleSection(section.name)}
                        >
                          <span>{section.name}</span>
                          {openSections[section.name] ? (
                            <ChevronUpIcon className="h-5 w-5" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5" />
                          )}
                        </button>
                        {openSections[section.name] && section.children && (
                          <ul className="mt-2 space-y-1 pl-6">
                            {section.children.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="block text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-md"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* 用户信息 */}
                <div className="flex-shrink-0 border-t border-gray-700 p-4">
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-x-4">
                      <img
                        className="h-8 w-8 rounded-full bg-gray-800"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="text-sm font-medium leading-6 text-gray-300">
                        Tom Cook
                      </span>
                    </MenuButton>

                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute bottom-full mb-2 right-0 w-32 origin-bottom-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => window.close()} // 关闭页面
                              className={`${
                                active ? "bg-gray-100" : ""
                              } w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                              退出
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-gray-900 fixed top-0 left-0 h-screen">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 py-6">
          <nav className="flex flex-1 flex-col px-2">
            <ul className="flex flex-col gap-y-7">
              {navigation.map((section, index) => (
                <li key={index}>
                  <button
                    className="flex justify-between w-full text-left items-center text-sm font-semibold text-gray-200 hover:bg-gray-800 p-2 rounded-md"
                    onClick={() => toggleSection(section.name)}
                  >
                    <span>{section.name}</span>
                    {openSections[section.name] ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  {openSections[section.name] && section.children && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {section.children.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-md"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* 用户信息 */}
          <div className="flex-shrink-0 border-t border-gray-700 p-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-x-4">
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="text-sm font-medium leading-6 text-gray-300">
                  Tom Cook
                </span>
              </MenuButton>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute bottom-full mb-2 right-0 w-32 origin-bottom-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => window.close()} // 关闭页面
                        className={`${
                          active ? "bg-gray-100" : ""
                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        退出
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

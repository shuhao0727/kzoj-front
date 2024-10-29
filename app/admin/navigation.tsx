"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation: { name: string; href: string }[] = [
  {
    name: "题目管理",
    href: "/admin/problems",
  },
];

export const AdminNavigation = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex lg:w-64 lg:flex-col bg-gray-900 fixed top-0 left-0 h-screen">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 py-6">
        <div className="flex flex-1 flex-col px-2">
          <ul className="flex flex-col gap-y-7">
            {navigation.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={classNames(
                    "block px-4 py-2 rounded-md text-gray-400",
                    pathname.startsWith(href)
                      ? "text-white bg-gray-800"
                      : "hover:text-white hover:bg-gray-800"
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

"use client";

import Link from "next/link";
import React from "react";

const links = [
  { name: "Google", href: "https://www.google.com" },
  { name: "GitHub", href: "https://github.com" },
  { name: "LeetCode", href: "https://leetcode.com" },
];

const LinksSection = () => {
  return (
    <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 transition-shadow duration-300">
      <h2 className="text-xl font-bold text-blue-600 mb-4">友情链接</h2>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index} className="mb-1">
            <Link
              href={link.href}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksSection;
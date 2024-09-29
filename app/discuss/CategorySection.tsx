"use client";

import React from "react";

const CategorySection = ({ categoryFilter, setCategoryFilter }) => {
  // 固定的分类列表
  const categories = ["全部", "笔记", "闲聊", "求助", "建议", "寄语"];

  return (
    <div className="space-y-4 max-w-[18rem] mx-auto">
      {/* 发布按钮，点击时在新标签页中打开讨论页面 */}
      <button
        className="w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-blue-600 transition duration-300"
        onClick={() => window.open("/discuss/new-discussion", "_blank")}
      >
        ✏️ 发布一个讨论
      </button>

      {/* 我的讨论按钮 */}
      <button className="w-full bg-red-500 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-red-600 transition duration-300">
        🔍 我的讨论
      </button>

      {/* 分类选择 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-md font-semibold mb-4">分类</h4>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => setCategoryFilter(category)}
                className={`block text-left w-full px-3 py-1 text-sm rounded-lg transition ${
                  categoryFilter === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySection;
"use client";

import React from "react";

const DiscussionCategorySection = ({ category, setCategory }) => {
  // 固定的讨论分类列表
  const categories = ["笔记", "闲聊", "求助", "建议", "寄语"];

  return (
    <div className="space-y-2 max-w-sm">
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index}>
            <button
              onClick={() => setCategory(cat)}
              className={`block text-left w-full px-3 py-1 text-sm rounded-lg transition ${
                category === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionCategorySection;
"use client";

import React from "react";

const SearchSection = ({
  searchId,
  setSearchId,
  searchTitle,
  setSearchTitle,
  onlyMine,
  setOnlyMine,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* 左侧：搜索框和筛选按钮 */}
      <div className="flex items-center space-x-4">
        {/* 搜索框 */}
        <input
          type="text"
          placeholder="输入题目ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <input
          type="text"
          placeholder="输入作者"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />

        {/* 选择按钮 */}
        <div className="flex space-x-2">
          <button
            onClick={() => setOnlyMine(false)}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              !onlyMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setOnlyMine(true)}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              onlyMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            我的
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
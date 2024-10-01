"use client";
import React from "react";

const SearchSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">搜索训练</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // 更新搜索词
          placeholder="输入训练关键字..."
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default SearchSection;
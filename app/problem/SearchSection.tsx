"use client";

import React, { useState } from "react";

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // 触发搜索过滤
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">搜索题目</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="输入题号、题目名称或难度..."
          className="border border-gray-300 rounded px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default SearchSection;
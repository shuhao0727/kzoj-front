"use client";
import React, { useState } from "react";

const ColumnFilter = ({ onFilterChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);  // 通知父组件更新搜索结果
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* 栏目导航 */}
      <div className="flex space-x-4">
        {["全部", "个人记录", "题解", "科技·工程", "生活·游记"].map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}  // 点击筛选分类
            className="text-gray-600 hover:text-black"
          >
            {category}
          </button>
        ))}
      </div>
      {/* 搜索框 */}
      <div>
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="搜索文章"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default ColumnFilter;
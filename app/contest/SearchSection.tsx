"use client";

import React from "react";

const SearchSection = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <div>
          <label className="mr-2 text-gray-700">赛制</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="全部">全部</option>
            <option value="公开赛">公开赛</option>
            <option value="私有赛">私有赛</option>
          </select>
        </div>

        <div>
          <label className="mr-2 text-gray-700">状态</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="全部">全部</option>
            <option value="进行中">进行中</option>
            <option value="已结束">已结束</option>
            <option value="赛后提交">赛后提交</option> {/* 新增状态 */}
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="输入关键词"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchSection;
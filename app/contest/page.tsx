"use client";

import React, { useState } from "react";
import SearchSection from "./SearchSection";
import DisplaySection from "./DisplaySection";

const ContestPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词
  const [selectedType, setSelectedType] = useState("全部"); // 比赛类型
  const [selectedStatus, setSelectedStatus] = useState("全部"); // 比赛状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(30); // 每页显示条数

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-gray-50 rounded-lg shadow-md">
      {/* 搜索和筛选部分 */}
      <SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {/* 比赛展示部分 */}
      <DisplaySection
        searchTerm={searchTerm}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default ContestPage;
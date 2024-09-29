"use client";
import React, { useState } from "react";
import SearchSection from "./SearchSection";
import FormThemeSection from "./FormThemeSection";
import DisplaySection from "./DisplaySection";

const TrainingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");  // 搜索关键词
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedPrivilege, setSelectedPrivilege] = useState("全部");
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [pageSize, setPageSize] = useState(30);  // 每页显示条数

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-gray-50 rounded-lg shadow-md">
      {/* 搜索部分 */}
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 分类和权限选择 */}
      <FormThemeSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrivilege={selectedPrivilege}
        setSelectedPrivilege={setSelectedPrivilege}
      />

      {/* 训练展示部分 */}
      <DisplaySection
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default TrainingPage;
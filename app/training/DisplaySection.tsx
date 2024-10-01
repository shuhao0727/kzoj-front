"use client";

import React, { useMemo } from "react";
import Link from "next/link"; // 导入 Link 组件
import { Pagination } from "@douyinfe/semi-ui";

// 模拟训练数据
const trainingData = Array.from({ length: 50 }, (_, i) => ({
  id: 1000 + i,
  title: `训练标题 ${i + 1}`,
  category: i % 2 === 0 ? "C++基础" : "高级数据结构",
  privilege: i % 2 === 0 ? "公开训练" : "私有训练",
  problemCount: Math.floor(Math.random() * 30) + 1,
  progress: Math.floor(Math.random() * 100),
}));

const DisplaySection = ({
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  searchTerm,
  selectedCategory,
  selectedPrivilege,
}) => {
  const filteredData = useMemo(() => {
    let filtered = trainingData;

    // 根据搜索词进行筛选
    if (searchTerm) {
      filtered = filtered.filter((train) =>
        train.title.includes(searchTerm)
      );
    }

    // 根据选择的分类进行筛选
    if (selectedCategory && selectedCategory !== "全部") {
      filtered = filtered.filter((train) => train.category === selectedCategory);
    }

    // 根据选择的权限进行筛选
    if (selectedPrivilege && selectedPrivilege !== "全部") {
      filtered = filtered.filter((train) => train.privilege === selectedPrivilege);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedPrivilege]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="p-2 text-left">编号</th>
            <th className="p-2 text-left">标题</th>
            <th className="p-2 text-left">分类</th>
            <th className="p-2 text-center">权限</th>
            <th className="p-2 text-center">题目数</th>
            <th className="p-2 text-center">进度</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((train) => (
            <tr key={train.id} className="border-b hover:bg-gray-100 transition-colors duration-200">
              <td className="p-2 text-left">{train.id}</td>
              {/* 使用 Link 包裹标题，点击后在新标签页中打开训练详情页面 */}
              <td className="p-2 text-left text-blue-500 hover:underline">
                <Link href={`/training/${train.id}`} target="_blank" rel="noopener noreferrer">
                  {train.title}
                </Link>
              </td>
              <td className="p-2 text-left">{train.category}</td>
              <td className="p-2 text-center">
                <span className={`px-2 py-1 rounded-lg ${train.privilege === "公开训练" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {train.privilege}
                </span>
              </td>
              <td className="p-2 text-center">{train.problemCount}</td>
              <td className="p-2 text-center">
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${train.progress}%` }}
                  >
                    {train.progress}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <Pagination
          total={filteredData.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => setPageSize(size)}
        />
      </div>
    </div>
  );
};

export default DisplaySection;
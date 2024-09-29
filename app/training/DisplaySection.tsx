"use client";
import React, { useMemo } from "react";
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

const DisplaySection = ({ currentPage, pageSize, setCurrentPage, setPageSize }) => {
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return trainingData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b text-gray-700">  {/* 去掉背景色 */}
            <th className="p-2 text-center">编号</th>
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
              <td className="p-2 text-center">{train.id}</td>
              <td className="p-2 text-left text-blue-500 hover:underline">{train.title}</td>
              <td className="p-2 text-left">{train.category}</td>
              <td className="p-2 text-center">
                <span className={`px-2 py-1 rounded-lg ${train.privilege === "公开训练" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {train.privilege}
                </span>
              </td>
              <td className="p-2 text-center">{train.problemCount}</td>
              <td className="p-2 text-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${train.progress}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页控件 */}
      <div className="flex justify-end mt-4">
        <Pagination
          total={trainingData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOpts={[30, 50, 100]}  // 每页条数选项
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default DisplaySection;
"use client";

import React, { useMemo, useState } from "react";
import { Pagination } from "@douyinfe/semi-ui";

// 模拟数据
const judges = Array.from({ length: 50 }, (_, i) => ({
  id: 12393 + i,
  title: `P100${i} 题目标题 ${i + 1}`,
  status: i % 2 === 0 ? "Accepted" : "Wrong Answer",
  score: i % 2 === 0 ? 100 : 0,
  time: `2024-09-28 0${i % 9}:00:00`,
  codeLength: `${100 + i * 10}B`,
  language: i % 2 === 0 ? "C++" : "Python",
  author: i % 2 === 0 ? "2024222" : "2024333",
  submitted: `${i + 1}小时前`,
  action: "重新评测",
}));

const DisplaySection = ({ searchId, searchTitle, onlyMine }) => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(30); // 每页显示条数

  // 根据页码进行分页
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return judges.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize]);

  // 重新评测功能
  const handleRejudge = (id) => {
    console.log(`Rejudging submission with ID: ${id}`);
    // 在这里可以添加重新评测的逻辑
  };

  return (
    <div className="w-full">
      {/* 表格部分 */}
      <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-left text-sm font-semibold">
            <th className="px-4 py-3">Run ID</th>
            <th className="px-4 py-3">题目</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">分数</th>
            <th className="px-4 py-3">提交时间</th>
            <th className="px-4 py-3">代码长度</th>
            <th className="px-4 py-3">语言</th>
            <th className="px-4 py-3">作者</th>
            <th className="px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((review, index) => (
            <tr
              key={review.id}
              className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? "bg-gray-100" : ""
              }`} // 使用斑马条纹效果
            >
              <td className="px-4 py-3">{review.id}</td>
              <td className="px-4 py-3 text-blue-500">{review.title}</td>
              <td className={`px-4 py-3 ${review.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                {review.status}
              </td>
              <td className="px-4 py-3">{review.score}</td>
              <td className="px-4 py-3">{review.time}</td>
              <td className="px-4 py-3">{review.codeLength}</td>
              <td className="px-4 py-3 text-blue-500">{review.language}</td>
              <td className="px-4 py-3 text-blue-500">{review.author}</td>
              <td className="px-4 py-3">
                {/* 将按钮替换为文本形式，但保持按钮功能 */}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleRejudge(review.id)}
                >
                  {review.action}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页控件 */}
      <div className="flex justify-end mt-4">
        <Pagination
          total={judges.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOpts={[30, 50, 100]} // 每页条数选项
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default DisplaySection;
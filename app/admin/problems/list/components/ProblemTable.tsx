"use client";
import React, { useState } from "react";
import Pagination from "./Pagination";

// 示例数据
const exampleProblems = [
  { id: 3724, displayId: "SFJS 1002", title: "八数码", author: "root", createdAt: "2024-09-09", updatedAt: "2024-09-09" },
  { id: 3723, displayId: "SFJS 1001", title: "猪和短路", author: "root", createdAt: "2024-09-09", updatedAt: "2024-09-09" },
  { id: 3722, displayId: "COCI 1197", title: "[COCI2016-2017#7] KLAVIR", author: "root", createdAt: "2024-09-07", updatedAt: "2024-09-07" },
  // 更多数据...
];

const ProblemTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 每页显示的项目数
  const totalItems = exampleProblems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 当前页显示的数据
  const currentProblems = exampleProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50 text-left text-sm">
          <tr>
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">展示ID</th>
            <th className="px-6 py-3 font-semibold">标题</th>
            <th className="px-6 py-3 font-semibold">作者</th>
            <th className="px-6 py-3 font-semibold">创建时间</th>
            <th className="px-6 py-3 font-semibold">最后修改</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {currentProblems.map((problem) => (
            <tr key={problem.id} className="border-t">
              <td className="px-6 py-3">{problem.id}</td>
              <td className="px-6 py-3">{problem.displayId}</td>
              <td className="px-6 py-3">{problem.title}</td>
              <td className="px-6 py-3">{problem.author}</td>
              <td className="px-6 py-3">{problem.createdAt}</td>
              <td className="px-6 py-3">{problem.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页组件 */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProblemTable;
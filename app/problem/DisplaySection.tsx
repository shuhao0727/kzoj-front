"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Pagination } from '@douyinfe/semi-ui'; // 使用 Semi UI 的分页组件

// 添加更多模拟题目数据
const initialProblems = Array.from({ length: 150 }, (_, i) => ({
  id: `P${1000 + i}`,
  title: `题目标题 ${i + 1}`,
  difficulty: i % 3 === 0 ? "入门" : i % 3 === 1 ? "普及-" : "提高",
  source: i % 2 === 0 ? "NOIP" : "比赛",
  algorithm: i % 2 === 0 ? ["动态规划", "dp"] : ["模拟", "枚举"],
  status: i % 2 === 0 ? "done" : "pending",
  passRate: Math.random(),
}));

const DisplaySection = () => {
  const [filteredProblems, setFilteredProblems] = useState(initialProblems);
  const [isSourceVisible, setIsSourceVisible] = useState(true); // 控制显示来源还是算法
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [pageSize, setPageSize] = useState(30);  // 每页显示条数

  // 切换显示来源或算法
  const toggleSourceAlgorithm = () => {
    setIsSourceVisible(!isSourceVisible);
  };

  // 根据当前页码和每页条数计算分页后的数据
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProblems.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredProblems]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      {/* 题目列表表格 */}
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-2 w-12 text-left">状态</th>
            <th className="p-2 text-left">题号</th>
            <th className="p-2 text-left">题目名称</th>
            <th
              className={`p-2 text-right cursor-pointer ${isSourceVisible ? "text-blue-500" : "text-gray-700"}`}
              onClick={toggleSourceAlgorithm}
            >
              来源/算法
            </th>
            <th className="p-2 text-right">难度</th>
            <th className="p-2 text-right">通过率</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProblems.map((problem) => (
            <tr key={problem.id} className="border-b">
              <td className="p-2 text-sm text-gray-500 w-12">
                {problem.status === "done" ? <span className="text-green-500">✔️</span> : <span className="text-gray-400">—</span>}
              </td>
              <td className="p-2 text-left">{problem.id}</td>
              <td className="p-2 text-left">
                <Link href={`/problem/problemDetails/${problem.id}`} legacyBehavior>
                  <a target="_blank" className="text-blue-500 hover:underline">
                    {problem.title}
                  </a>
                </Link>
              </td>
              <td className="p-2 text-right">
                {isSourceVisible ? (
                  <span className="text-sm text-gray-600">{problem.source}</span>
                ) : (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {problem.algorithm.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="p-2 text-right">
                <span className={`px-2 py-1 rounded text-white text-xs ${
                  problem.difficulty === "入门" ? "bg-red-400" : problem.difficulty === "普及-" ? "bg-orange-400" : "bg-green-400"
                }`}>
                  {problem.difficulty}
                </span>
              </td>
              <td className="p-2 text-right">
                <div className="relative w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${problem.passRate * 100}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* 右下角的分页控件 */}
      <div className="flex justify-end mt-4">
        <Pagination
          total={filteredProblems.length}  // 总条目数
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOpts={[30, 50, 100]}  // 可选每页条数
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default DisplaySection;
"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";

// 模拟训练题目数据
const initialProblems = Array.from({ length: 150 }, (_, i) => ({
  id: `P${1000 + i}`,
  title: `训练题目 ${i + 1}`,
  difficulty: i % 3 === 0 ? "入门" : i % 3 === 1 ? "普及-" : "提高",
  source: i % 2 === 0 ? "NOIP" : "比赛",
  algorithm: i % 2 === 0 ? ["动态规划", "dp"] : ["模拟", "枚举"],
  status: i % 2 === 0 ? "已解决" : "未解决",
  passRate: Math.random(),
}));

const TrainingProblemList = () => {
  const [filteredProblems, setFilteredProblems] = useState(initialProblems);
  const [isSourceVisible, setIsSourceVisible] = useState(true); // 控制显示来源还是算法
  const [sortOrder, setSortOrder] = useState("asc");  // 设置排序方式，默认为升序

  // 切换显示来源或算法
  const toggleSourceAlgorithm = () => {
    setIsSourceVisible(!isSourceVisible);
  };

  // 对难度列进行排序
  const sortProblems = (order) => {
    const sortedProblems = [...filteredProblems].sort((a, b) => {
      const difficultyOrder = { "入门": 1, "普及-": 2, "提高": 3 };  // 定义难度排序顺序
      return order === "asc"
        ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
    });
    setFilteredProblems(sortedProblems);
    setSortOrder(order === "asc" ? "desc" : "asc");  // 切换排序顺序
  };

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
              来源/算法 {/* 显示当前是来源还是算法 */}
            </th>
            <th className="p-2 text-right cursor-pointer" onClick={() => sortProblems(sortOrder)}>
              难度 {sortOrder === "asc" ? "▲" : "▼"}  {/* 添加排序箭头 */}
            </th>
            <th className="p-2 text-right">通过率</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((problem) => (
            <tr key={problem.id} className="border-b">
              <td className="p-2 text-sm text-gray-500 w-12">
                {problem.status === "已解决" ? <span className="text-green-500">✔️</span> : <span className="text-gray-400">—</span>}
              </td>
              <td className="p-2 text-left">{problem.id}</td>
              <td className="p-2 text-left">
                <Link href={`/training/problem/${problem.id}`} legacyBehavior>
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
    </div>
  );
};

export default TrainingProblemList;
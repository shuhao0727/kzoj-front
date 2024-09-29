"use client";

import Link from "next/link";
import React, { useState } from "react";

// 模拟题目数据
const initialProblems = [
  { id: "P1000", title: "超级玛丽游戏", difficulty: "入门", source: "NOIP", algorithm: ["字符串"], status: "done", passRate: 0.75 },
  { id: "P1001", title: "A+B Problem", difficulty: "入门", source: "NOIP", algorithm: ["模拟"], status: "done", passRate: 0.80 },
  { id: "P1002", title: "[NOIP2002 普及组] 过河卒", difficulty: "普及-", source: "NOIP", algorithm: ["动态规划", "dp"], status: "pending", passRate: 0.60 },
  { id: "P1003", title: "[NOIP2011 提高组] 辅地瓷", difficulty: "普及-", source: "NOIP", algorithm: ["模拟", "枚举"], status: "pending", passRate: 0.55 },
];

const DisplaySection = () => {
  const [filteredProblems, setFilteredProblems] = useState(initialProblems);
  const [isSourceVisible, setIsSourceVisible] = useState(true); // 控制显示来源还是算法

  // 切换显示来源或算法
  const toggleSourceAlgorithm = () => {
    setIsSourceVisible(!isSourceVisible);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">题目列表</h2>
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
          {filteredProblems.map((problem) => (
            <tr key={problem.id} className="border-b">
              <td className="p-2 text-sm text-gray-500 w-12">
                {problem.status === "done" ? (
                  <span className="text-green-500">✔️</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-2 text-left">{problem.id}</td>
              <td className="p-2 text-left">
                {/* 点击链接后，打开新标签页 */}
                <Link href={`/problemDetails/${problem.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {problem.title}
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
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    problem.difficulty === "入门"
                      ? "bg-red-400"
                      : problem.difficulty === "普及-"
                      ? "bg-orange-400"
                      : "bg-gray-400"
                  }`}
                >
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

export default DisplaySection;
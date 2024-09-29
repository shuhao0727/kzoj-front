"use client";

import React, { useState } from "react";

const rankingData = [
  { id: 1, username: "fishk", score: 4135, passed: 184, total: 451, rate: 40.8, nickname: "校队", bio: "喜欢算法竞赛，参与过多次国际竞赛，擅长动态规划与图论" },
  { id: 2, username: "zansy", score: 4107, passed: 223, total: 494, rate: 45.14, nickname: "校队", bio: "热爱编程，希望能够提升自己的能力，喜欢挑战难题" },
  { id: 3, username: "libc", score: 2464, passed: 104, total: 377, rate: 27.59, nickname: "校队", bio: "对数学和算法有浓厚兴趣，致力于提升竞赛水平" },
  { id: 4, username: "henpolorAC", score: 2344, passed: 86, total: 308, rate: 27.6, nickname: "运维", bio: "在服务器维护和系统管理方面有丰富经验，享受算法挑战" },
  { id: 5, username: "azwosile", score: 2139, passed: 223, total: 553, rate: 40.33, nickname: "校队", bio: "擅长数据结构和算法优化，目标是成为一名顶尖的工程师" },
  { id: 6, username: "袁守宏", score: 2104, passed: 291, total: 674, rate: 43.18, nickname: "校队", bio: "喜欢探索新技术，尤其是编译器和高性能计算" },
  { id: 7, username: "some_y", score: 1388, passed: 129, total: 461, rate: 27.98, nickname: "校队", bio: "致力于编程竞赛，在团队协作和算法设计方面表现出色" },
  { id: 8, username: "龙飞(龙再生)", score: 1294, passed: 154, total: 564, rate: 27.3, nickname: "校队", bio: "注重细节，拥有扎实的编程基础，擅长动态规划问题" },
  { id: 9, username: "shikexin210", score: 1049, passed: 89, total: 354, rate: 25.14, nickname: "", bio: "不断追求编程技术的提高，对算法竞赛抱有极大热情" },
  { id: 10, username: "guchenhang", score: 895, passed: 78, total: 289, rate: 26.99, nickname: "", bio: "对AI和机器学习感兴趣，目前在深入学习相关技术" },
];

const RankingTable = ({ searchTerm }: { searchTerm: string }) => {
  const [sortKey, setSortKey] = useState<string>(""); // 当前排序的字段
  const [isAsc, setIsAsc] = useState<boolean>(true);  // 是否升序

  // 排序函数
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setIsAsc(!isAsc);  // 同一个字段时切换升降序
    } else {
      setSortKey(key);
      setIsAsc(true); // 切换新字段时默认升序
    }
  };

  const sortedData = rankingData
    .filter(
      (user) =>
        user.username.includes(searchTerm) || user.nickname.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortKey === "rate") {
        return isAsc ? a.rate - b.rate : b.rate - a.rate;
      } else if (sortKey === "passed") {
        return isAsc ? a.passed - b.passed : b.passed - a.passed;
      }
      return 0;
    });

  return (
    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
      <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
        <tr>
          <th className="px-4 py-3 text-left">#</th>
          <th className="px-4 py-3 text-left">用户</th>
          <th className="px-4 py-3 text-left">昵称</th>
          <th className="px-4 py-3 text-left">分数</th>
          <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("passed")}>
            通过/总数 {sortKey === "passed" && (isAsc ? "↑" : "↓")}
          </th>
          <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("rate")}>
            通过率 {sortKey === "rate" && (isAsc ? "↑" : "↓")}
          </th>
          <th className="px-4 py-3 text-left w-1/3">个性简介</th> {/* 将宽度设置为1/3 */}
        </tr>
      </thead>
      <tbody className="text-sm text-gray-700">
        {sortedData.map((user, index) => (
          <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
            <td className="px-4 py-3">{index + 1}</td>
            <td className="px-4 py-3 text-blue-500">{user.username}</td>
            <td className="px-4 py-3">{user.nickname}</td>
            <td className="px-4 py-3">{user.score}</td>
            <td className="px-4 py-3">{`${user.passed}/${user.total}`}</td>
            <td className="px-4 py-3">{user.rate.toFixed(2)}%</td>
            <td className="px-4 py-3 w-1/3">{user.bio}</td> {/* 使用 w-1/3 缩小个性简介的列宽 */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;
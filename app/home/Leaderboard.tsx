"use client";
import React from "react";

// 模拟排行榜数据
const leaderboardData = [
  { user: "Alice", submissions: 30 },
  { user: "Bob", submissions: 25 },
  { user: "Charlie", submissions: 20 },
  { user: "David", submissions: 18 },
  { user: "Eve", submissions: 15 },
  { user: "Frank", submissions: 12 },
  { user: "Grace", submissions: 10 },
  { user: "Heidi", submissions: 8 },
  { user: "Ivan", submissions: 5 },
  { user: "Judy", submissions: 3 },
];

const Leaderboard = () => {
  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">最近一周通过题目榜</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-medium">排名</th>
            <th className="px-4 py-2 text-left font-medium">用户名</th>
            <th className="px-4 py-2 text-left font-medium">通过数</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.user}</td>
              <td className="px-4 py-2">{user.submissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
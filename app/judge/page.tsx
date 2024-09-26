"use client";

import { useState } from "react";

// 测评数据
const judges: {
  id: number;
  title: string;
  status: string;
  score: number;
  time: string;
  memory: string;
  codeLength: string;
  language: string;
  author: string;
  submitted: string;
  action: string;
}[] = [
  {
    id: 12393,
    title: "P1002 输出第二个整数",
    status: "Wrong Answer",
    score: 0,
    time: "2ms",
    memory: "496 KB",
    codeLength: "133B",
    language: "C++",
    author: "2024222",
    submitted: "1小时前",
    action: "重新评测",
  },
  {
    id: 12392,
    title: "P1005 计算(a+b)xc的值",
    status: "Wrong Answer",
    score: 0,
    time: "1ms",
    memory: "504 KB",
    codeLength: "167B",
    language: "C++",
    author: "2024222",
    submitted: "1小时前",
    action: "重新评测",
  },
  {
    id: 12391,
    title: "XJ24-W1T1 [2024街赛期] 20...",
    status: "Accepted",
    score: 100,
    time: "1ms",
    memory: "384 KB",
    codeLength: "129B",
    language: "C++ 17 With O2",
    author: "2024222",
    submitted: "1小时前",
    action: "重新评测",
  },
  {
    id: 12390,
    title: "P1005 计算(a+b)xc的值",
    status: "Wrong Answer",
    score: 0,
    time: "2ms",
    memory: "504 KB",
    codeLength: "167B",
    language: "C++",
    author: "2024222",
    submitted: "1小时前",
    action: "重新评测",
  },
  {
    id: 12389,
    title: "USACO 1778 [USACO24JAN...]",
    status: "Partial Accepted",
    score: 6,
    time: "2000ms",
    memory: "141.9 MB",
    codeLength: "1096B",
    language: "C++",
    author: "曾海涛",
    submitted: "2小时前",
    action: "重新评测",
  },
];

const Judge = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [onlyMine, setOnlyMine] = useState<boolean>(false);

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">状态</h1>

      {/* 筛选器 */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <button className="mr-4 text-blue-500 hover:underline">全部</button>
          <button
            onClick={() => setOnlyMine(!onlyMine)}
            className={`mr-4 px-3 py-2 rounded-lg transition duration-300 ease-in-out ${
              onlyMine
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            我的
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="输入题目ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="输入作者"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          刷新
        </button>
      </div>

      {/* 测评列表 */}
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3">Run ID</th>
            <th className="px-4 py-3">题目</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">分数</th>
            <th className="px-4 py-3">运行时间</th>
            <th className="px-4 py-3">运行内存</th>
            <th className="px-4 py-3">代码长度</th>
            <th className="px-4 py-3">语言</th>
            <th className="px-4 py-3">作者</th>
            <th className="px-4 py-3">提交时间</th>
            <th className="px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          {judges
            .filter(
              (review) =>
                (searchId === "" || review.id.toString().includes(searchId)) &&
                (searchTitle === "" || review.title.includes(searchTitle)) &&
                (!onlyMine || review.author === "你的用户名") // 这里替换成用户的名字
            )
            .map((review) => (
              <tr
                key={review.id}
                className="border-b hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-4 py-3">{review.id}</td>
                <td className="px-4 py-3 text-blue-500 underline">
                  {review.title}
                </td>
                <td
                  className={`px-4 py-3 ${
                    review.status === "Accepted"
                      ? "text-green-500"
                      : review.status === "Wrong Answer"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {review.status}
                </td>
                <td className="px-4 py-3">{review.score}</td>
                <td className="px-4 py-3">{review.time}</td>
                <td className="px-4 py-3">{review.memory}</td>
                <td className="px-4 py-3">{review.codeLength}</td>
                <td className="px-4 py-3 text-blue-500">{review.language}</td>
                <td className="px-4 py-3 text-blue-500">{review.author}</td>
                <td className="px-4 py-3">{review.submitted}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    {review.action}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Judge;

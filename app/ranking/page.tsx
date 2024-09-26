"use client";

import { ChartOptions } from "chart.js";
import "chart.js/auto";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

const rankingData: {
  id: number;
  username: string;
  score: number;
  passed: number;
  total: number;
  rate: number;
  nickname: string;
}[] = [
  {
    id: 1,
    username: "fishk",
    score: 4135,
    passed: 184,
    total: 451,
    rate: 40.8,
    nickname: "校队",
  },
  {
    id: 2,
    username: "zansy",
    score: 4107,
    passed: 223,
    total: 494,
    rate: 45.14,
    nickname: "校队",
  },
  {
    id: 3,
    username: "libc",
    score: 2464,
    passed: 104,
    total: 377,
    rate: 27.59,
    nickname: "校队",
  },
  {
    id: 4,
    username: "henpolorAC",
    score: 2344,
    passed: 86,
    total: 308,
    rate: 27.6,
    nickname: "运维",
  },
  {
    id: 5,
    username: "azwosile",
    score: 2139,
    passed: 223,
    total: 553,
    rate: 40.33,
    nickname: "校队",
  },
  {
    id: 6,
    username: "袁守宏",
    score: 2104,
    passed: 291,
    total: 674,
    rate: 43.18,
    nickname: "校队",
  },
  {
    id: 7,
    username: "some_y",
    score: 1388,
    passed: 129,
    total: 461,
    rate: 27.98,
    nickname: "校队",
  },
  {
    id: 8,
    username: "龙飞(龙再生)",
    score: 1294,
    passed: 154,
    total: 564,
    rate: 27.3,
    nickname: "校队",
  },
  {
    id: 9,
    username: "shikexin210",
    score: 1049,
    passed: 89,
    total: 354,
    rate: 25.14,
    nickname: "",
  },
  {
    id: 10,
    username: "guchenhang",
    score: 895,
    passed: 78,
    total: 289,
    rate: 26.99,
    nickname: "",
  },
];

const topTenRankingData = rankingData.slice(0, 10); // 仅显示前10名

const chartData = {
  labels: topTenRankingData.map((user) => user.username),
  datasets: [
    {
      label: "得分",
      data: topTenRankingData.map((user) => user.score),
      backgroundColor: "#FF6F61", // 设置较柔和的大红色
      borderColor: "#FF6F61",
      borderWidth: 2,
      borderRadius: 8, // 柱子增加圆角，使其更美观
      barThickness: 60, // 稍微加宽柱子的宽度
    },
  ],
};

const chartOptions: ChartOptions<"bar"> = {
  maintainAspectRatio: false, // 允许图表适应容器的宽高
  responsive: true, // 图表自适应
  scales: {
    y: {
      beginAtZero: true, // Y轴从0开始
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // 控制横线颜色
      },
    },
    x: {
      grid: {
        display: false, // 禁用X轴的竖线
      },
    },
  },
  plugins: {
    legend: {
      display: false, // 移除图表图例
    },
  },
};

const Ranking = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* 设置背景和阴影 */}
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        OI 排行榜
      </h1>
      {/* 柱状图 */}
      <div className="mb-6 w-full">
        <div className="relative" style={{ height: "400px" }}>
          {/* 高度为400px，宽度根据页面变化 */}
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      {/* 搜索框 */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="请输入用户名、昵称或真实姓名"
          className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" // 添加阴影和圆角
        />
        <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
          搜索
        </button>
      </div>
      {/* 排行榜表格 */}
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        {/* 表格宽度设置为全宽，添加阴影和圆角 */}
        <thead className="bg-gray-200 text-center">
          {/* 表头居中 */}
          <tr>
            <th className="px-4 py-3 text-gray-600">#</th>
            <th className="px-4 py-3 text-gray-600">用户</th>
            <th className="px-4 py-3 text-gray-600">昵称</th>
            <th className="px-4 py-3 text-gray-600">分数</th>
            <th className="px-4 py-3 text-gray-600">通过/总数</th>
            <th className="px-4 py-3 text-gray-600">通过率</th>
            <th className="px-4 py-3 text-gray-600">个性简介</th>
          </tr>
        </thead>
        <tbody className="text-center text-gray-700">
          {/* 表内容居中 */}
          {topTenRankingData
            .filter(
              (user) =>
                user.username.includes(searchTerm) ||
                user.nickname.includes(searchTerm)
            )
            .map((user, index) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 text-blue-500">{user.username}</td>
                <td className="px-4 py-3">{user.nickname}</td>
                <td className="px-4 py-3">{user.score}</td>
                <td className="px-4 py-3">{`${user.passed}/${user.total}`}</td>
                <td className="px-4 py-3">{user.rate.toFixed(2)}%</td>
                <td className="px-4 py-3">
                  {user.nickname ? user.nickname : "无"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;

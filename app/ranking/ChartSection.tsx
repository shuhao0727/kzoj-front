"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 手动注册所需的组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const rankingData = [
  { username: "fishk", score: 4135 },
  { username: "zansy", score: 4107 },
  { username: "libc", score: 2464 },
  { username: "henpolorAC", score: 2344 },
  { username: "azwosile", score: 2139 },
  { username: "袁守宏", score: 2104 },
  { username: "some_y", score: 1388 },
  { username: "龙飞(龙再生)", score: 1294 },
  { username: "shikexin210", score: 1049 },
  { username: "guchenhang", score: 895 },
];

const chartData = {
  labels: rankingData.map((user) => user.username),
  datasets: [
    {
      label: "得分",
      data: rankingData.map((user) => user.score),
      backgroundColor: "#FF6F61",
      borderColor: "#FF6F61",
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 60,
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.1)" } },
    x: { grid: { display: false } },
  },
  plugins: { legend: { display: false } },
};

const ChartSection = () => (
  <div className="relative" style={{ height: "400px" }}>
    <Bar data={chartData} options={chartOptions} />
  </div>
);

export default ChartSection;
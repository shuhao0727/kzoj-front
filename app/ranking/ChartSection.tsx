"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

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
      backgroundColor: "#C62828", // 设置为较深的红色
      borderColor: "#B71C1C", // 边框颜色
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 40, // 调整柱子的宽度
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)", // 网格线颜色
      },
    },
    x: {
      grid: { display: false }, // 隐藏 x 轴的网格线
    },
  },
  plugins: {
    legend: {
      display: false, // 隐藏图例
    },
    tooltip: {
      backgroundColor: "#FFF", // 背景颜色
      titleColor: "#C62828", // 标题颜色
      bodyColor: "#333", // 内容颜色
      borderColor: "#C62828",
      borderWidth: 1,
    },
  },
};

// 自定义插件来添加背景样式
const backgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 1)"; // 设置为白色背景
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const ChartSection = () => (
  <div className="relative" style={{ height: "400px" }}>
    <Bar
      data={chartData}
      options={chartOptions}
      plugins={[backgroundPlugin]} // 使用自定义插件
    />
  </div>
);

export default ChartSection;
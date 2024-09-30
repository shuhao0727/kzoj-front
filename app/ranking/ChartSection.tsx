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
      backgroundColor: "#FF6F61", // 条形图颜色
      borderColor: "#FF6F61",
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
      titleColor: "#FF6F61", // 标题颜色
      bodyColor: "#333", // 内容颜色
      borderColor: "#FF6F61",
      borderWidth: 1,
    },
  },
  // 添加背景样式的自定义插件
  background: {
    color: "rgba(180, 180, 180, 0.2)", // 背景颜色
  },
};

// 自定义插件来添加背景样式
const backgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: any) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = chart.options.background.color || "rgba(180, 180, 180, 0.2)";
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
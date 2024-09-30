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

// 注册必要的组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// 模拟排名数据（前10名）
const rankingData = [
  { username: "user1", score: 400 },
  { username: "user2", score: 380 },
  { username: "user3", score: 370 },
  { username: "user4", score: 360 },
  { username: "user5", score: 350 },
  { username: "user6", score: 340 },
  { username: "user7", score: 330 },
  { username: "user8", score: 320 },
  { username: "user9", score: 310 },
  { username: "user10", score: 300 },
];

const chartData = {
  labels: rankingData.map((user) => user.username),
  datasets: [
    {
      label: "总分",
      data: rankingData.map((user) => user.score),
      backgroundColor: "#b71c1c", // 较深的红色
      borderColor: "#b71c1c",
      borderWidth: 2,
      barThickness: 50, // 调整柱子的宽度
      maxBarThickness: 60, // 最大柱子宽度
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 500,
      ticks: {
        color: "#333", // 设置Y轴文字颜色
        font: {
          size: 14, // 设置字体大小
        },
      },
      grid: {
        color: "rgba(200, 200, 200, 0.2)", // 更加柔和的网格线
      },
    },
    x: {
      ticks: {
        color: "#333", // 设置X轴文字颜色
        font: {
          size: 14, // 设置字体大小
        },
      },
      grid: {
        display: false, // 隐藏X轴网格线
      },
    },
  },
  plugins: {
    legend: {
      display: false, // 不显示图例
    },
    tooltip: {
      backgroundColor: "rgba(183, 28, 28, 0.8)", // 工具提示框的背景颜色
      titleColor: "#fff", // 工具提示框标题文字颜色
      bodyColor: "#fff", // 工具提示框内容文字颜色
      bodyFont: {
        size: 14, // 工具提示框字体大小
      },
    },
  },
};

const RankingChart = () => {
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">比赛分数分布（前十名）</h2>
      <div style={{ height: "400px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RankingChart;
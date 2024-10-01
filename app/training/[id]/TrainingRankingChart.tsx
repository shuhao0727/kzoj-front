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

// 模拟训练排名数据（前10名）
const trainingRankingData = [
  { username: "trainee1", score: 400 },
  { username: "trainee2", score: 380 },
  { username: "trainee3", score: 370 },
  { username: "trainee4", score: 360 },
  { username: "trainee5", score: 350 },
  { username: "trainee6", score: 340 },
  { username: "trainee7", score: 330 },
  { username: "trainee8", score: 320 },
  { username: "trainee9", score: 310 },
  { username: "trainee10", score: 300 },
];

const trainingChartData = {
  labels: trainingRankingData.map((user) => user.username),
  datasets: [
    {
      label: "总分",
      data: trainingRankingData.map((user) => user.score),
      backgroundColor: "#b71c1c", // 使用较深的红色，保持与原来的代码一致
      borderColor: "#b71c1c",
      borderWidth: 2,
      barThickness: 50, // 调整柱子的宽度
      maxBarThickness: 60, // 最大柱子宽度
    },
  ],
};

const trainingChartOptions = {
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

const TrainingRankingChart = () => {
  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">训练分数分布（前十名）</h2>
      <div style={{ height: "400px" }}>
        <Bar data={trainingChartData} options={trainingChartOptions} />
      </div>
    </div>
  );
};

export default TrainingRankingChart;
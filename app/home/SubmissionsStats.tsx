"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// 注册所需的 Chart.js 组件
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }
  return dates;
};

// 美化后的数据和样式
const submissions = {
  labels: getLast7Days(),
  datasets: [
    {
      label: "通过数",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
      borderWidth: 3,
    },
    {
      label: "提交总数",
      data: [20, 25, 10, 12, 8, 10, 15],
      borderColor: "rgba(255, 159, 64, 1)",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "rgba(255, 159, 64, 1)",
      borderWidth: 3,
    },
  ],
};

const SubmissionsStats = () => {
  return (
    <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">最近一周提交统计</h2>
      <div className="h-64">
        <Line
          data={submissions}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(200, 200, 200, 0.2)", // 网格线颜色
                },
                ticks: {
                  color: "#4A5568", // y轴刻度颜色
                  font: {
                    size: 14, // 字体大小
                    family: "Helvetica", // 字体样式
                  },
                },
              },
              x: {
                grid: {
                  display: false, // 不显示x轴的网格线
                },
                ticks: {
                  autoSkip: false,
                  color: "#4A5568", // x轴刻度颜色
                  font: {
                    size: 14, // 字体大小
                    family: "Helvetica", // 字体样式
                  },
                },
              },
            },
            plugins: {
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)", // 提示框背景颜色
                titleFont: {
                  size: 16,
                  family: "Arial", // 提示框字体
                  weight: "bold",
                },
                bodyFont: {
                  size: 14,
                  family: "Arial",
                },
                cornerRadius: 6, // 提示框圆角
              },
              legend: {
                position: "top",
                labels: {
                  color: "#4A5568", // 图例颜色
                  font: {
                    size: 14,
                    family: "Helvetica", // 图例字体
                  },
                  usePointStyle: true, // 启用点样式
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SubmissionsStats;
"use client";

import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";

// 比赛折线图组件
const ContestChart = () => {
  const [timeRange, setTimeRange] = useState("7天");

  // X轴时间数据映射
  const timeRangeMapping = {
    "7天": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    "15天": [
      "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", 
      "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15"
    ],
    "1个月": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "3个月": ["Month 1", "Month 2", "Month 3"],
    "半年": ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
    "1年": [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
  };

  // 配置折线图数据
  const getOption = () => ({
    title: {
      text: "比赛统计折线图",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["总分", "战力", "金奖", "银奖", "铜奖", "平均排名"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: timeRangeMapping[timeRange], // 使用映射的时间范围
    },
    yAxis: {
      type: "value",
      scale: true, // 启用缩放，使得Y轴更适合数据
      axisLine: {
        show: true,
      },
      axisLabel: {
        formatter: (value) => {
          if (value > 500 && value < 1000) return "..."; // 隐藏中间较大数值的部分
          return value;
        },
      },
    },
    series: [
      {
        name: "总分",
        type: "line",
        stack: "Total",
        data: [900, 920, 950, 970, 990, 1000, 1020],
      },
      {
        name: "战力",
        type: "line",
        stack: "Total",
        data: [120, 125, 130, 140, 150, 160, 170],
      },
      {
        name: "金奖",
        type: "line",
        stack: "Total",
        data: [2, 2, 3, 3, 4, 4, 4],
      },
      {
        name: "银奖",
        type: "line",
        stack: "Total",
        data: [1, 2, 2, 2, 3, 3, 3],
      },
      {
        name: "铜奖",
        type: "line",
        stack: "Total",
        data: [1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: "平均排名",
        type: "line",
        stack: "Total",
        data: [5, 4, 4, 3, 3, 3, 2],
      },
    ],
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* 时间范围切换按钮 */}
      <div className="flex justify-end space-x-4 mb-4">
        {Object.keys(timeRangeMapping).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded ${
              timeRange === range
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      {/* 折线图 */}
      <ReactEcharts option={getOption()} style={{ height: 400 }} />
    </div>
  );
};

export default ContestChart;
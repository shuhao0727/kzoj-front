"use client";

import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";

// 折线图组件
const LineChart = () => {
  const [timeRange, setTimeRange] = useState("7天");

  // X轴数据映射，分类更细化
  const timeRangeMapping = {
    "7天": Array.from({ length: 7 }, (_, i) => `第${i + 1}天`), // 每天显示
    "15天": Array.from({ length: 15 }, (_, i) => `第${i + 1}天`), // 每天显示
    "1个月": Array.from({ length: 30 }, (_, i) => `第${i + 1}天`), // 每天显示
    "3个月": Array.from({ length: 12 }, (_, i) => `第${i + 1}周`), // 每周显示
    "半年": Array.from({ length: 6 }, (_, i) => `第${i + 1}个月`), // 每月显示
    "1年": Array.from({ length: 12 }, (_, i) => `第${i + 1}个月`), // 每月显示
    "2年": Array.from({ length: 24 }, (_, i) => `第${i + 1}个月`), // 每月显示
    "3年": Array.from({ length: 36 }, (_, i) => `第${i + 1}个月`), // 每月显示
  };

  // 配置折线图数据
  const getOption = () => ({
    title: {
      text: "练习趋势折线图",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["入门", "普及-", "普及+", "提高-", "提高+", "省选", "NOI"],
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
      data: timeRangeMapping[timeRange], // 使用时间范围映射
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "入门",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "普及-",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "普及+",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "提高-",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "提高+",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* 时间范围切换 */}
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

export default LineChart;
"use client";

import React from "react";
import LineChart from "./LineChart"; // 引入折线图组件
import LeftPanel from "./LeftPanel"; // 左侧统计信息
import RightPanel from "./RightPanel"; // 右侧难度统计

const TrainingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 折线图 */}
      <LineChart />

      <div className="grid grid-cols-3 gap-4 mt-8">
        {/* 左侧统计面板 */}
        <div className="col-span-2">
          <LeftPanel />
        </div>

        {/* 右侧难度统计 */}
        <div className="col-span-1">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
"use client";

import React from "react";
import ContestChart from "./ContestChart"; // 引入比赛折线图组件
import StatsPanel from "./StatsPanel"; // 统计信息（比赛和分类）

const ContestPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* 中间的折线图 */}
      <div className="bg-white p-4 rounded shadow">
        <ContestChart />
      </div>

      {/* 合并后的统计信息 */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <StatsPanel />
      </div>
    </div>
  );
};

export default ContestPage;
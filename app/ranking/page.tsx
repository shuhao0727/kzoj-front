"use client";

import React, { useState } from "react";
import SearchSection from "./SearchSection";
import ChartSection from "./ChartSection";
import RankingTable from "./RankingTable";

const RankingPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-gray-50 rounded-lg shadow-md">
      {/* 柱状图部分 */}
      <ChartSection />

      {/* 搜索框部分，移动到图表下面 */}
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 排行榜表格部分 */}
      <RankingTable searchTerm={searchTerm} />
    </div>
  );
};

export default RankingPage;
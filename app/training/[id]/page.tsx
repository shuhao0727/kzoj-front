"use client";

import React, { useState } from "react";
import TrainingDescription from "./TrainingDescription";
import TrainingNavigation from "./TrainingNavigation";
import TrainingProblemList from "./TrainingProblemList";
import TrainingRankingList from "./TrainingRankingList"; // 排名列表
import TrainingRankingChart from "./TrainingRankingChart"; // 分数分布图表

const TrainingPage = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* 顶部标题 */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">2024 算法训练营</h1>

      {/* 水平导航栏 */}
      <TrainingNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {/* 右侧的动态内容 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {activeTab === "description" && <TrainingDescription />}
          {activeTab === "problems" && <TrainingProblemList />}
          {activeTab === "rankings" && (
            <div>
              <TrainingRankingChart /> {/* 分数分布图表 */}
              <TrainingRankingList />   {/* 排名列表 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
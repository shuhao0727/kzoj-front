"use client";

import React, { useState } from "react";
import ContestNavigation from "./ContestNavigation";
import ContestInfo from "./ContestInfo";
import UserContestInfo from "./UserContestInfo";
import ContestDescription from "./ContestDescription";
import ProblemList from "./ProblemList";
import RankingList from "./RankingList";
import RankingChart from "./RankingChart";

const ContestDetailPage = () => {
  const [activeTab, setActiveTab] = useState("description"); // 控制导航栏显示的内容

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-gray-50 rounded-lg shadow-md">
      {/* 比赛标题 */}
      <h1 className="text-3xl font-bold border-b pb-4">2024 编程比赛</h1>

      <div className="flex mt-6 space-x-6">
        {/* 左侧部分 */}
        <div className={`${
          activeTab === "ranking" ? "w-full" : "w-3/4"
        } space-y-4`}>
          {/* 比赛说明、题目列表、比赛排行的导航栏 */}
          <ContestNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 导航栏对应内容 */}
          <div className="mt-4">
            {activeTab === "description" && <ContestDescription />}
            {activeTab === "problems" && <ProblemList />}
            {activeTab === "ranking" && (
              <div>
                <RankingChart /> {/* 显示图表 */}
                <RankingList /> {/* 显示表格 */}
              </div>
            )}
          </div>
        </div>

        {/* 右侧部分，仅在非“比赛排行”时显示 */}
        {activeTab !== "ranking" && (
          <div className="w-1/4 space-y-4">
            {/* 比赛信息 */}
            <ContestInfo />
            {/* 用户本场得分、排名等信息 */}
            <UserContestInfo />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetailPage;
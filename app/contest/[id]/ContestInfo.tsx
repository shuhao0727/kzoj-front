"use client";

import React from "react";

const ContestInfo = () => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">比赛信息</h3>
      <div className="flex justify-between">
        <div className="space-y-2">
          <p>举办者</p>
          <p>题目数量</p>
          <p>开始时间</p>
          <p>结束时间</p>
          <p>时长</p>
        </div>
        <div className="space-y-2 text-right">
          <p>竞赛委员会</p>
          <p>4 道题目</p>
          <p>2024-10-01 10:00</p>
          <p>2024-10-01 13:00</p>
          <p>3 小时</p>
        </div>
      </div>
    </div>
  );
};

export default ContestInfo;
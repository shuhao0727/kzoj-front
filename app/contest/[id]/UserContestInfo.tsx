"use client";

import React from "react";

const UserContestInfo = () => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">我的比赛成绩</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* 左对齐的标签 */}
        <div className="text-gray-600">
          <p>当前得分：</p>
          <p>当前排名：</p>
          <p>通过题数：</p>
        </div>
        {/* 右对齐的内容，防止换行 */}
        <div className="text-right">
          <p className="whitespace-nowrap">150 分</p>
          <p className="whitespace-nowrap">第 12 名</p>
          <p className="whitespace-nowrap">3 题</p>
        </div>
      </div>
    </div>
  );
};

export default UserContestInfo;
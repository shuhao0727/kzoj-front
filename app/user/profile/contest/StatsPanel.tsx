"use client";

import React from "react";

const StatsPanel = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* 比赛统计 */}
      <div>
        <h3 className="font-bold mb-2">比赛统计</h3>
        <ul className="space-y-2">
          <li>总分: 960</li>
          <li>战力: 170</li>
          <li>金奖: 4</li>
          <li>银奖: 3</li>
          <li>铜奖: 1</li>
          <li>平均排名: 3</li>
        </ul>
      </div>

      {/* 分类统计 */}
      <div>
        <h3 className="font-bold mb-2">分类统计</h3>
        <ul className="space-y-2">
          <li>总比赛次数: 20</li>
          <li>管理员举办: 10</li>
          <li>用户举办: 10</li>
        </ul>
      </div>
    </div>
  );
};

export default StatsPanel;
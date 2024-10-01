"use client";

import React from "react";

const ProviderInfo = () => {
  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      {/* 提供者 */}
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">题目提供者</h3>
        <p className="text-right">CCF_NOI</p>
      </div>

      {/* 难度 */}
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">难度</h3>
        <p className="text-right">普及组</p>
      </div>

      {/* 历史最佳 */}
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">历史最佳</h3>
        <p className="text-right">无</p>
      </div>
    </div>
  );
};

export default ProviderInfo;
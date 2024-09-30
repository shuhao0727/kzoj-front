"use client";

import React from "react";

const LeftPanel = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">尝试过的题目</h2>
      <div className="text-blue-500">
        B2007 P7123 P1223 P1233 P2615 P4873 P5731
      </div>
      <p className="text-gray-500 mt-4">统计数据非实时更新。</p>

      <h2 className="text-xl font-bold mt-8 mb-4">已通过的题目</h2>
      <div className="text-blue-500">
        B2002 B2005 B2025 B2029 P1001 P1047 P1421 P1425 P3954 P1000 P5703
      </div>
      <p className="text-gray-500 mt-4">统计数据非实时更新。</p>
    </div>
  );
};

export default LeftPanel;
"use client";

import React from "react";

const ProblemDescription = () => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-2">题目描述</h2>
      <p>棋盘上 A 点有一个卒，需要走到目标 B 点...</p>
      {/* 可添加更多描述内容 */}
    </div>
  );
};

export default ProblemDescription;
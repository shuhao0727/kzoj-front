"use client";

import React from "react";

const Header = ({ isEditing, onToggleEditor }) => {
  // 打开题解页面的新标签页
  const handleOpenSolution = () => {
    window.open("/solutions/12345", "_blank"); // 假设题解的路径是 /solutions/12345
  };

  return (
    <div className="flex justify-between items-center border-b pb-4">
      <h1 className="text-3xl font-bold">P1002 [NOIP2002 普及组] 过河卒</h1>
      <div className="flex space-x-2">
        <button
          onClick={onToggleEditor}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {isEditing ? "返回题目" : "提交答案"} {/* 动态切换按钮文本 */}
        </button>
        <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
          提交记录
        </button>
        <button
          onClick={handleOpenSolution}  // 点击后打开新页面
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          题解
        </button>
      </div>
    </div>
  );
};

export default Header;
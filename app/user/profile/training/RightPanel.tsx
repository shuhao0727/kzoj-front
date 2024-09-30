"use client";

import React from "react";

const RightPanel = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">难度统计</h2>
      <ul className="space-y-2">
        <li className="flex justify-between items-center">
          <span className="text-red-500">入门</span>
          <span>16题</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-orange-500">普及-</span>
          <span>4题</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-yellow-500">普及+</span>
          <span>10题</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-green-500">提高-</span>
          <span>7题</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-blue-500">提高+</span>
          <span>10题</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-purple-500">省选</span>
          <span>2题</span>
        </li>
      </ul>
    </div>
  );
};

export default RightPanel;
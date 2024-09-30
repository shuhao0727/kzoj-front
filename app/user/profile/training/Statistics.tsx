import React from "react";

const Statistics = () => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">难度统计</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-sm text-xs">暂无难度</span>
          <span className="text-sm">0题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-red-200 text-white px-2 py-1 rounded-sm text-xs">入门</span>
          <span className="text-sm">16题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-yellow-200 text-white px-2 py-1 rounded-sm text-xs">普及/提高-</span>
          <span className="text-sm">4题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-green-200 text-white px-2 py-1 rounded-sm text-xs">普及/提高+</span>
          <span className="text-sm">10题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-blue-200 text-white px-2 py-1 rounded-sm text-xs">提高+/省选-</span>
          <span className="text-sm">7题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-purple-200 text-white px-2 py-1 rounded-sm text-xs">省选/NOI-</span>
          <span className="text-sm">0题</span>
        </li>
        <li className="flex justify-between">
          <span className="bg-black text-white px-2 py-1 rounded-sm text-xs">NOI/NOI+/CTSC</span>
          <span className="text-sm">0题</span>
        </li>
      </ul>
      <p className="text-gray-500 mt-4 text-sm">统计数据非实时更新。</p>
    </div>
  );
};

export default Statistics;
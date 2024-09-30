"use client";

import React from "react";

const ProblemDetails = ({ problemDetails, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 展示ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">题目展示ID</label>
          <input
            type="text"
            value={problemDetails.displayId}
            onChange={(e) => handleChange(e, 'displayId')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="请输入题目展示ID"
          />
        </div>

        {/* 题目名称 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">题目名称</label>
          <input
            type="text"
            value={problemDetails.title}
            onChange={(e) => handleChange(e, 'title')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="请输入题目名称"
          />
        </div>

        {/* 时间限制 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">时间限制 (ms)</label>
          <input
            type="number"
            value={problemDetails.timeLimit || 1000}
            onChange={(e) => handleChange(e, 'timeLimit')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="1000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 内存限制 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">内存限制 (MB)</label>
          <input
            type="number"
            value={problemDetails.memoryLimit || 512}
            onChange={(e) => handleChange(e, 'memoryLimit')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="512"
          />
        </div>

        {/* 难度 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">难度</label>
          <select
            value={problemDetails.difficulty}
            onChange={(e) => handleChange(e, 'difficulty')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          >
            <option value="未知">未知</option>
            <option value="入门">入门</option>
            <option value="普及-">普及-</option>
            <option value="普及/提高-">普及/提高-</option>
            <option value="普及+/提高">普及+/提高</option>
            <option value="提高+/省选-">提高+/省选-</option>
            <option value="省选/NOI-">省选/NOI-</option>
            <option value="NOI/NOI+/CTSC">NOI/NOI+/CTSC</option>
          </select>
        </div>

        {/* 标签 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">标签</label>
          <input
            type="text"
            value={problemDetails.tags}
            onChange={(e) => handleChange(e, 'tags')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="请输入标签，多个标签用逗号分隔"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 题目类型 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">题目类型</label>
          <select
            value={problemDetails.type}
            onChange={(e) => handleChange(e, 'type')}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          >
            <option value="public">公开题目</option>
            <option value="private">隐藏题目</option>
            <option value="team">团队题目</option>
            <option value="competition">比赛题目</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
"use client";

import React from "react";

const TrainingDescription = () => {
  return (
    <div className="bg-white p-8 shadow-md rounded-lg">
      

      {/* 段落 1 */}
      <p className="text-gray-600 leading-loose mb-4">
        这是一个训练模块，参赛者需要在指定时间内完成相关题目。可以根据训练要求选择题目完成，确保训练的质量。
      </p>

      {/* 段落 2，使用加粗强调部分内容 */}
      <p className="text-gray-600 leading-loose mb-4">
        <strong className="text-gray-800">训练的详细规则和注意事项</strong> 请在开始训练前阅读，确保你了解训练的要求和评分规则。
      </p>

      {/* 提醒部分 */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-lg">
        <p className="leading-relaxed">
          请务必遵循训练的规则，以确保公平竞争并取得良好的训练成果。
        </p>
      </div>
    </div>
  );
};

export default TrainingDescription;
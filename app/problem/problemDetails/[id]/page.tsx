"use client";

import { useParams } from "next/navigation";
import TitleSection from "../TitleSection";
import DescriptionSection from "../DescriptionSection";
import RightInfoSection from "../RightInfoSection";
import SubmissionSection from "../SubmissionSection";
import React from "react";

// 模拟题目详情数据
const problemData = {
  P1000: {
    title: "超级玛丽游戏",
    description: "帮助玛丽到达终点。",
  },
  P1001: {
    title: "A+B Problem",
    description: "计算两个整数的和。",
  },
  P1002: {
    title: "[NOIP2002 普及组] 过河卒",
    description: "帮助卒子安全过河。",
  },
  P1003: {
    title: "[NOIP2011 提高组] 辅地瓷",
    description: "解决复杂的瓷砖问题。",
  },
};

const ProblemDetailPage = () => {
  const { id } = useParams(); // 获取动态路由参数

  if (!id || !problemData[id]) {
    return <div>题目未找到</div>;
  }

  const problem = problemData[id];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <TitleSection title={problem.title} />

      <div className="flex space-x-8 mt-8">
        <div className="w-3/4">
          <DescriptionSection description={problem.description} />
          <SubmissionSection />
        </div>
        <div className="w-1/4">
          <RightInfoSection />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
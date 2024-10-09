"use client";

import { useState } from "react";
import Discussion from "./Discussion";
import { CodeEditor } from "./editor";
import Header from "./Header";
import ProblemDescription from "./ProblemDescription";
import ProblemInfo from "./ProblemInfo";
import ProviderInfo from "./ProviderInfo";
import Recommendations from "./Recommendations";
import Tags from "./Tags";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false); // 用于控制左下部分是显示编辑器还是题目

  // 切换编辑器与题目视图
  const toggleEditor = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-gray-50 rounded-lg shadow-md">
      {/* 头部部分 */}
      <Header isEditing={isEditing} onToggleEditor={toggleEditor} />

      {/* 主体部分 */}
      <div className="flex mt-6 space-x-6">
        {/* 左侧部分 */}
        <div className="flex-grow">
          {/* 保持题目信息栏固定 */}
          <ProblemInfo />
          {/* 根据状态显示题目描述或编辑器 */}
          {isEditing ? (
            <CodeEditor /> // 显示代码编辑器
          ) : (
            <ProblemDescription /> // 显示题目详细描述
          )}
        </div>

        {/* 右侧部分 */}
        <div className="w-1/3 space-y-4">
          {/* 题目提供者、难度、历史最高分 */}
          <ProviderInfo />
          {/* 标签 */}
          <Tags />
          {/* 相关讨论 */}
          <Discussion />
          {/* 推荐题目 */}
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default Page;

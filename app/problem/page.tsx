"use client";

import React from "react";
import SearchSection from "./SearchSection";
import DisplaySection from "./DisplaySection";
import FormThemeSection from "./FormThemeSection";
import TagsSection from "./TagsSection";

const ProblemPage = () => {
  // 函数用于处理按钮点击事件
  const handleButtonClick = () => {
    window.open("https://www.example.com", "_blank"); // 替换为你想打开的URL
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex space-x-6">
        {/* 左侧部分：包括搜索框、题库和展示部分 */}
        <div className="w-3/4 space-y-8">
          <SearchSection />
          <FormThemeSection />
          <DisplaySection />
          

        </div>

        {/* 右侧标签部分 */}
        <div className="w-1/4">
          <TagsSection />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
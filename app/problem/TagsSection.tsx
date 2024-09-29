"use client";

import React from "react";
import { Collapse } from '@douyinfe/semi-ui';

// 模拟标签数据
const tagsData = [
  { category: "算法", tags: ["动态规划", "贪心", "回溯", "二分查找"] },
  { category: "数据结构", tags: ["堆", "栈", "队列", "链表"] },
  { category: "专题", tags: ["图论", "数学", "排序算法", "树"] },
];

const TagsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">题目标签</h2>
      <Collapse accordion>
        {tagsData.map((category, index) => (
          <Collapse.Panel header={category.category} itemKey={String(index)} key={index}>
            <div className="flex flex-wrap gap-2 mt-2">
              {category.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default TagsSection;
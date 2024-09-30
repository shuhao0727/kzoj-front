"use client";

import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

// 示例讨论数据
const discussions = [
  {
    id: 1,
    title: "退役杂记",
    author: "henpolorAC",
    role: "ADM",
    comments: 10,
    likes: 1,
    views: 79,
    category: "寄语",
    date: "1个月前",
    isTop: true,
    description: "这是关于退役后的感想和总结。",
  },
  {
    id: 2,
    title: "关于“什么是一篇好的题解”",
    author: "henpolorAC",
    role: "ADM",
    comments: 4,
    likes: 0,
    views: 89,
    category: "闲聊",
    date: "6个月前",
    isTop: false,
    description: "讨论什么是一篇好的题解，分享个人经验和思考。",
  },
];

const DiscussionList = ({ categoryFilter }) => {
  // 根据选择的分类过滤讨论数据
  const filteredDiscussions =
    categoryFilter === "全部"
      ? discussions
      : discussions.filter((discussion) => discussion.category === categoryFilter);

  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="space-y-6">
      {filteredDiscussions.map((discussion) => (
        <Accordion
          key={discussion.id}
          expanded={expanded === `panel${discussion.id}`}
          onChange={handleChange(`panel${discussion.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${discussion.id}bh-content`}
            id={`panel${discussion.id}bh-header`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                {discussion.isTop && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    TOP
                  </span>
                )}
                {/* 使用 legacyBehavior 来确保 Link 正常工作并在新标签页中打开 */}
                <Link href={`/discuss/new-discussion/${discussion.id}`} legacyBehavior>
                  <a target="_blank" className="text-md font-semibold text-blue-500 hover:underline cursor-pointer">
                    {discussion.title}
                  </a>
                </Link>
              </div>
              <div className="flex space-x-4 text-gray-500 text-sm">
                <span>👤 {discussion.author}</span>
                <span>{discussion.role}</span>
                <span>🗣️ {discussion.comments} 评论</span>
                <span>👍 {discussion.likes} 点赞</span>
                <span>👁️ {discussion.views} 浏览</span>
                <span>📂 {discussion.category}</span>
                <span>{discussion.date}</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" className="text-gray-700">
              {discussion.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DiscussionList;
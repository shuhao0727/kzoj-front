"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Box, Typography, Button, Divider } from "@mui/material";
import Comments from "./Comments";

// 示例讨论数据
const discussions = [
  {
    id: 1,
    title: "退役杂记",
    author: "henpolorAC",
    description: "这是关于退役后的感想和总结。",
    content: "退役之后，我开始了全新的生活......",
  },
  {
    id: 2,
    title: "关于“什么是一篇好的题解”",
    author: "henpolorAC",
    description: "讨论什么是一篇好的题解，分享个人经验和思考。",
    content: "我认为一篇好的题解应该包含清晰的步骤......",
  },
];

const DiscussionDetailPage = ({ params }) => {
  const { id } = params;

  const discussion = discussions.find(
    (discussion) => discussion.id.toString() === id
  );

  if (!discussion) {
    return <div>404 - 讨论未找到</div>;
  }

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      display="flex"
      sx={{
        height: "100vh",
        paddingLeft: "10vw", // 保留页面两侧的全局留白
        paddingRight: "10vw",
      }}
    >
      {/* 左侧浮动目录 */}
      <Box
        sx={{
          width: isCollapsed ? "40px" : "150px", // 目录宽度
          backgroundColor: "lightgray",
          padding: "10px 10px 20px", // 减少左右间距
          position: "relative",
          zIndex: 10,
          textAlign: "left", // 目录内容左对齐
          height: "auto", // 根据内容动态调整高度
          overflowY: "auto", // 超出时出现滚动条
          transition: "width 0.3s ease", // 增加过渡动画
          marginRight: "10px", // 减少与正文的距离
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" mb={4} sx={{ fontSize: isCollapsed ? "12px" : "16px" }}>
            {isCollapsed ? "" : "目录"}
          </Typography>

          {/* 更明显的折叠按钮 */}
          <Button
            onClick={toggleSidebar}
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "4px",
              minWidth: "auto",
              width: "30px",
              height: "30px",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              '&:hover': {
                backgroundColor: "gray",
                color: "white",
              },
            }}
          >
            {isCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
          </Button>
        </Box>

        {!isCollapsed && (
          <Box sx={{ textAlign: "left" }}>
            <Button fullWidth href="#section1" sx={{ justifyContent: "flex-start", fontSize: "14px" }}>
              标题和简介
            </Button>
            <Button fullWidth href="#section2" sx={{ justifyContent: "flex-start", fontSize: "14px" }}>
              正文
            </Button>
          </Box>
        )}
      </Box>

      {/* 右侧内容 */}
      <Box
        flex={1}
        sx={{
          padding: "40px 20px 40px", // 减少上下padding
          overflowY: "auto", // 内容多时添加滚动条
        }}
      >
        <Box id="section1" mb={4}>
          <Typography variant="h4">{discussion.title}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
            {discussion.description}
          </Typography>
        </Box>

        <Divider />

        <Box id="section2" mt={4}>
          <Typography variant="h5">正文内容</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px", lineHeight: 1.6 }}>
            {discussion.content}
          </Typography>
        </Box>

        <Comments />
      </Box>
    </Box>
  );
};

export default DiscussionDetailPage;
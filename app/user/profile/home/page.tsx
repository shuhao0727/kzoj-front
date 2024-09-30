"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import dynamic from "next/dynamic";

// 动态加载 ReactQuill 以防止 SSR 相关问题
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // 引入样式

// 假设有个变量来判断当前用户是否为本人
const isCurrentUser = true; // 可以从身份验证逻辑中获取该值

const HomePage = () => {
  const [isEditing, setIsEditing] = useState(false); // 是否在编辑状态
  const [bio, setBio] = useState("这是用户的简介，您可以在这里展示一些关于您的基本信息，如兴趣爱好、职业或个人成就。"); // 个人简介内容
  const [editContent, setEditContent] = useState(bio); // 编辑时的内容

  // 开始编辑
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 保存简介
  const handleSave = () => {
    setBio(editContent);
    setIsEditing(false);
  };

  // 取消编辑
  const handleCancel = () => {
    setEditContent(bio); // 恢复之前的内容
    setIsEditing(false);
  };

  return (
    <Box className="p-4">
      <Typography variant="h5" className="font-bold mb-4">
        个人简介
      </Typography>

      {isEditing ? (
        <Box>
          {/* Markdown 编辑器 */}
          <ReactQuill value={editContent} onChange={setEditContent} />

          {/* 保存和取消按钮 */}
          <Box className="mt-4">
            <Button onClick={handleSave} variant="contained" color="primary" className="mr-2">
              保存
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              取消
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          {/* 显示简介，调整字体大小 */}
          <Typography variant="body2" className="text-sm mb-4">
            {bio}
          </Typography>

          {/* 如果当前用户是本人，则显示编辑按钮 */}
          {isCurrentUser && (
            <Button onClick={handleEdit} variant="contained" color="primary" size="small">
              编辑
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
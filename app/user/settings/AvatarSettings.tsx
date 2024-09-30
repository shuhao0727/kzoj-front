"use client";

import React, { useState } from "react";
import { Button, Box, Typography, Avatar, IconButton } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const AvatarSettings = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 处理文件选择事件
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setAvatar(selectedFile);

      // 创建预览 URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  // 处理拖放事件
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      setAvatar(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  // 上传头像
  const handleUpload = () => {
    if (avatar) {
      console.log("上传头像: ", avatar.name);
      setAvatar(null);
      setPreviewUrl(null); // 清空预览
    }
  };

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.5rem", mb: 2 }}>
        头像设置
      </Typography>

      {/* 头像预览 */}
      {previewUrl && (
        <Box mb={2} display="flex" justifyContent="center">
          <Avatar
            src={previewUrl}
            alt="头像预览"
            sx={{ width: 120, height: 120, mb: 2 }} // 头像大小
          />
        </Box>
      )}

      {/* 拖拽上传区域 */}
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          mb: 2,
          cursor: "pointer",
          position: "relative", // 使 input 相对 box 定位
        }}
      >
        <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="body1" color="textSecondary">
          将头像拖放到此处，或单击此处
        </Typography>
        {/* 文件选择输入框，设置成仅覆盖区域而不是整个页面 */}
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: "pointer",
            width: "100%", // 确保 input 只覆盖拖放区域
            height: "100%", // 高度仅限制在 box 内部
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2, fontSize: "0.9rem", padding: "8px 24px" }}
      >
        上传头像
      </Button>
    </Box>
  );
};

export default AvatarSettings;
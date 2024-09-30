"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // 引入 Quill 样式

// 动态加载 ReactQuill 以支持 Markdown 编辑器
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProfileSettings = () => {
  const [grade, setGrade] = useState("");
  const [bio, setBio] = useState(""); // 个人简介

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
  };

  const handleBioChange = (content: string) => {
    setBio(content); // 个人简介编辑
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: "bold" }}>
        资料设置
      </Typography>

      {/* 姓名和昵称 */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="姓名"
          value="已填写的姓名" // 示例默认值，用户不可修改
          InputProps={{
            readOnly: true, // 禁用姓名修改
          }}
          sx={{ mb: 2 }}
        />
        <TextField fullWidth label="昵称" sx={{ mb: 2 }} />
      </Box>

      {/* 学校和年级 */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField fullWidth label="学校" sx={{ mb: 2 }} />
        <TextField
          fullWidth
          select
          label="年级"
          value={grade}
          onChange={handleGradeChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="初一">初一</MenuItem>
          <MenuItem value="初二">初二</MenuItem>
          <MenuItem value="初三">初三</MenuItem>
          <MenuItem value="高一">高一</MenuItem>
          <MenuItem value="高二">高二</MenuItem>
          <MenuItem value="高三">高三</MenuItem>
        </TextField>
      </Box>

      {/* Codeforces 用户名和博客 */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField fullWidth label="Codeforces 用户名" sx={{ mb: 2 }} />
        <TextField fullWidth label="博客" sx={{ mb: 2 }} />
      </Box>

      {/* Github */}
      <TextField fullWidth label="Github" sx={{ mb: 2 }} />

      {/* 个人简介 (Markdown 编辑器) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          个人简介
        </Typography>
        <ReactQuill value={bio} onChange={handleBioChange} />
      </Box>

      <Button variant="contained" color="primary" size="small">
        保存
      </Button>
    </Box>
  );
};

export default ProfileSettings;
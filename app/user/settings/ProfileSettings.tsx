"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

// 动态加载 Markdown 编辑器
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ProfileSettings = () => {
  const [bio, setBio] = useState("");

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.5rem", mb: 2 }}>
        资料设置
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="姓名"
          disabled
          InputProps={{ readOnly: true }}
          sx={{ mb: 2, fontSize: "0.9rem" }}
        />
        <TextField fullWidth label="昵称" sx={{ mb: 2, fontSize: "0.9rem" }} />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField fullWidth label="学校" sx={{ mb: 2, fontSize: "0.9rem" }} />
        <TextField
          fullWidth
          label="年级"
          select
          sx={{ mb: 2, fontSize: "0.9rem" }}
          SelectProps={{ native: true }}
        >
          <option value="">请选择年级</option>
          <option value="初一">初一</option>
          <option value="初二">初二</option>
          <option value="初三">初三</option>
          <option value="高一">高一</option>
          <option value="高二">高二</option>
          <option value="高三">高三</option>
        </TextField>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField fullWidth label="Codeforces 用户名" sx={{ mb: 2, fontSize: "0.9rem" }} />
        <TextField fullWidth label="博客" sx={{ mb: 2, fontSize: "0.9rem" }} />
      </Box>
      <TextField fullWidth label="Github" sx={{ mb: 2, fontSize: "0.9rem" }} />

      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2, fontSize: "1.2rem" }}>
        个人简介
      </Typography>
      <ReactQuill value={bio} onChange={setBio} style={{ height: "200px", marginBottom: "20px" }} />

      <Button variant="contained" color="primary" size="small" sx={{ fontSize: "0.9rem", height: 36 }}>
        保存
      </Button>
    </Box>
  );
};

export default ProfileSettings;
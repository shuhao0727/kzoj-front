"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const ChangePassword = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontSize: "1.2rem", fontWeight: "bold" }}>
        修改密码
      </Typography>
      <TextField fullWidth label="当前密码" type="password" sx={{ mb: 2 }} />
      <TextField fullWidth label="新密码" type="password" sx={{ mb: 2 }} />
      <TextField fullWidth label="确认新密码" type="password" sx={{ mb: 3 }} />
      <Button variant="contained" color="primary" size="small">
        更新密码
      </Button>
    </Box>
  );
};

export default ChangePassword;
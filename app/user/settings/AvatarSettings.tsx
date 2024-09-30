"use client";

import React, { useState } from "react";
import { Button, Box, Typography, Avatar, Alert } from "@mui/material";

const AvatarSettings = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
        setSuccess(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom className="font-bold">
        头像设置
      </Typography>

      <Box mb={4} display="flex" flexDirection="column" alignItems="center">
        <Avatar src={avatarUrl} alt="avatar" sx={{ width: 100, height: 100, mb: 2 }} />
        <Button variant="contained" component="label">
          上传头像
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Box>

      {success && (
        <Alert severity="success" className="mb-4">
          头像更新成功！
        </Alert>
      )}
    </Box>
  );
};

export default AvatarSettings;
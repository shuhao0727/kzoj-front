"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("新密码和确认密码不一致");
      return;
    }

    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.5rem", mb: 2 }}>
        更改密码
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="当前密码"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            sx={{ fontSize: "0.9rem" }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="新密码"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{ fontSize: "0.9rem" }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="确认新密码"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ fontSize: "0.9rem" }}
          />
        </Box>

        {error && (
          <Alert severity="error" className="mb-4" sx={{ fontSize: "0.9rem" }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4" sx={{ fontSize: "0.9rem" }}>
            密码更改成功！
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          fullWidth
          sx={{ fontSize: "0.9rem", height: 36 }}
        >
          更改密码
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
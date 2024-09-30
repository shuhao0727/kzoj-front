"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null); // 模拟生成验证码
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerateCode = () => {
    // 模拟生成验证码
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    console.log("生成的验证码:", newCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (email !== confirmEmail) {
      setError("邮箱和确认邮箱不一致");
      return;
    }

    if (verificationCode !== generatedCode) {
      setError("验证码不正确");
      return;
    }

    // 模拟邮箱更改成功
    setSuccess(true);
    console.log("新邮箱: ", email);

    setEmail("");
    setConfirmEmail("");
    setVerificationCode("");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom className="font-bold">
        更改邮箱
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="新邮箱"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="确认新邮箱"
            type="email"
            fullWidth
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </Box>

        <Box mb={2} display="flex" alignItems="center">
          <TextField
            label="验证码"
            type="text"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleGenerateCode}
            sx={{ ml: 2 }}
          >
            获取验证码
          </Button>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            邮箱更改成功！
          </Alert>
        )}

        <Button variant="contained" color="primary" type="submit" size="small" fullWidth>
          更改邮箱
        </Button>
      </form>
    </Box>
  );
};

export default ChangeEmail;
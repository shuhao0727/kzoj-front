"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Switch } from '@mui/material';
import { Grid, Typography } from '@mui/material';

const CreateEditTraining = ({ existingTraining, onSave, categories, closeModal, allSerials }) => {
  const [title, setTitle] = useState(existingTraining?.title || '');
  const [serial, setSerial] = useState(existingTraining?.serial || generateMinSerial(allSerials));
  const [category, setCategory] = useState(existingTraining?.category || '');
  const [access, setAccess] = useState(existingTraining?.access || 'Private');
  const [visible, setVisible] = useState(existingTraining?.visible || true);
  const [description, setDescription] = useState(existingTraining?.description || '');
  const [password, setPassword] = useState(existingTraining?.password || ''); // 可编辑密码

  // 自动生成未使用的最小序号的函数
  function generateMinSerial(allSerials) {
    if (!Array.isArray(allSerials)) return 1000; // 确保allSerials是数组
    let serial = 1000;
    while (allSerials.includes(serial)) {
      serial += 1;
    }
    return serial; // 返回未使用的最小序号
  }

  useEffect(() => {
    if (existingTraining) {
      setTitle(existingTraining.title);
      setSerial(existingTraining.serial);
      setCategory(existingTraining.category);
      setAccess(existingTraining.access);
      setVisible(existingTraining.visible);
      setDescription(existingTraining.description || '');
      setPassword(existingTraining.password || ''); // 如果已有训练，则设置密码
    }
  }, [existingTraining]);

  const handleSave = () => {
    const trainingData = {
      id: existingTraining?.id || Date.now(), // 如果是编辑，使用现有的ID；否则生成新ID
      serial,
      title,
      category,
      access,
      visible,
      description,
      password, // 添加密码字段
    };
    onSave(trainingData); // 传递数据给父组件
    closeModal(); // 关闭弹窗
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <Typography variant="h5" className="font-semibold mb-4">{existingTraining ? '编辑训练' : '创建训练'}</Typography>
      <form className="space-y-6">
        <Grid container spacing={4}>
          {/* 训练序号 */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="训练序号"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* 训练标题 */}
          <Grid item xs={12}>
            <TextField
              label="训练标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* 训练描述 */}
          <Grid item xs={12}>
            <TextField
              label="训练描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>

          {/* 分类 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>分类</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} label="分类">
                {categories.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 权限 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>训练权限</InputLabel>
              <Select value={access} onChange={(e) => setAccess(e.target.value)} label="训练权限">
                <MenuItem value="Private">私有训练</MenuItem>
                <MenuItem value="Public">公开训练</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* 可见性 */}
          <Grid item xs={12} sm={6}>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">是否可见：</label>
              <Switch checked={visible} onChange={() => setVisible(!visible)} />
            </div>
          </Grid>

          {/* 训练密码（可编辑） */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="训练密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 可编辑密码
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* 底部操作按钮 */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="contained" color="primary" onClick={handleSave}>
            {existingTraining ? '保存更改' : '创建'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            取消
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTraining;
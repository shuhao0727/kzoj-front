"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Competition {
  id: number;
  serial: number;
  title: string;
  category: string;
  access: string;
  visible: boolean;
  startTime: string;
  endTime: string;
  problems: number[];
}

interface Props {
  competition: Competition | null;
  onSave: (competition: Competition) => void;
  closeModal: () => void;
}

const CreateEditCompetition: React.FC<Props> = ({ competition, onSave, closeModal }) => {
  const [title, setTitle] = useState(competition?.title || '');
  const [category, setCategory] = useState(competition?.category || '');
  const [startTime, setStartTime] = useState(competition?.startTime || '');
  const [endTime, setEndTime] = useState(competition?.endTime || '');
  const [access, setAccess] = useState(competition?.access || 'Private');
  const [categories, setCategories] = useState<string[]>(['算法比赛', '编程比赛', '数学比赛']); // 默认的比赛类别
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // 通过 useEffect 来预填充编辑时的比赛信息
  useEffect(() => {
    if (competition) {
      setTitle(competition.title);
      setCategory(competition.category);
      setStartTime(competition.startTime);
      setEndTime(competition.endTime);
      setAccess(competition.access);
    }
  }, [competition]);

  // 保存比赛信息
  const handleSave = () => {
    const newCompetition = {
      ...competition,
      title,
      category,
      startTime,
      endTime,
      access,
    } as Competition;

    onSave(newCompetition);
  };

  // 打开添加类别的对话框
  const handleAddCategory = () => {
    setShowAddCategoryDialog(true);
  };

  // 关闭添加类别的对话框
  const handleCloseAddCategoryDialog = () => {
    setShowAddCategoryDialog(false);
    setNewCategory('');
  };

  // 添加新类别
  const handleSaveNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
    handleCloseAddCategoryDialog();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">{competition ? '编辑比赛' : '创建比赛'}</h2>
      <form className="space-y-4">
        {/* 比赛标题 */}
        <TextField
          label="比赛名称"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
        />
        
        {/* 比赛类别 */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>类别</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="类别"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // 控制类别选择列表的最大高度
                },
              },
            }}
          >
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                无类别
              </MenuItem>
            )}
            <MenuItem value="" onClick={handleAddCategory}>
              + 添加新类别
            </MenuItem>
          </Select>
        </FormControl>

        {/* 开始时间 */}
        <TextField
          label="开始时间"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* 结束时间 */}
        <TextField
          label="结束时间"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* 比赛权限 */}
        <FormControl fullWidth variant="outlined">
          <InputLabel>权限</InputLabel>
          <Select value={access} onChange={(e) => setAccess(e.target.value)} label="权限">
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
          </Select>
        </FormControl>

        {/* 操作按钮 */}
        <div className="flex justify-end space-x-4">
          <Button variant="contained" color="primary" onClick={handleSave}>
            保存
          </Button>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            取消
          </Button>
        </div>
      </form>

      {/* 添加新类别的对话框 */}
      <Dialog open={showAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>添加新类别</DialogTitle>
        <DialogContent>
          <TextField
            label="新类别名称"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCategoryDialog} color="secondary">
            取消
          </Button>
          <Button onClick={handleSaveNewCategory} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateEditCompetition;
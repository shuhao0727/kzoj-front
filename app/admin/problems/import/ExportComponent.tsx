"use client";

import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ExportComponent = () => {
  const [problemIds, setProblemIds] = useState(''); // 用于输入多个题目 ID
  const [exportType, setExportType] = useState('json'); // 默认导出类型

  // 解析输入字符串，生成题目 ID 列表
  const parseProblemIds = (input) => {
    const problemList = [];
    const ranges = input.split(','); // 以逗号分隔输入
    
    ranges.forEach((range) => {
      range = range.trim(); // 去除空格
      if (range.includes('-')) {
        // 如果是范围，例如 "1-5"
        const [start, end] = range.split('-').map(Number); // 将范围的起始和结束转为数字
        for (let i = start; i <= end; i++) {
          problemList.push(i); // 将范围内的每个 ID 加入列表
        }
      } else {
        // 如果是单个 ID，直接加入列表
        problemList.push(Number(range));
      }
    });

    return problemList;
  };

  const handleExport = () => {
    if (!problemIds) {
      alert('请输入要导出的题目 ID 或名称');
      return;
    }
    
    const problemList = parseProblemIds(problemIds);
    if (problemList.length === 0) {
      alert('请输入有效的题目 ID 或名称');
      return;
    }

    // 模拟导出功能
    console.log(`Exporting problems: ${problemList.join(', ')} as ${exportType}`);
    // 这里你可以将 problemList 传递到后端处理导出逻辑
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full space-y-4">
      <TextField
        label="题目 ID 或名称 (使用逗号分隔, 范围如 1-100)"
        variant="outlined"
        fullWidth
        value={problemIds}
        onChange={(e) => setProblemIds(e.target.value)}
        className="mb-4"
      />
      
      <FormControl fullWidth className="mb-4">
        <InputLabel id="export-type-label">导出类型</InputLabel>
        <Select
          labelId="export-type-label"
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          label="导出类型"
        >
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="xml">XML</MenuItem>
          <MenuItem value="yaml">YAML</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleExport} className="ml-0">
        导出题目
      </Button>
    </div>
  );
};

export default ExportComponent;
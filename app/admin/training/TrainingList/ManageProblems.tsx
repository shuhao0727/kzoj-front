import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

// 表格的列定义
const columns = [
  { id: 'displayId', label: '展示ID', minWidth: 100, width: '15%' },
  { id: 'title', label: '标题', minWidth: 200, width: '35%' },
  { id: 'difficulty', label: '难度', minWidth: 150, width: '20%', sortable: true },
  { id: 'order', label: '序号', minWidth: 100, width: '10%', sortable: true },
  { id: 'edit', label: '修改', minWidth: 100, width: '10%' },
  { id: 'delete', label: '删除', minWidth: 100, width: '10%' },
];

// 初始的题目数据
const initialProblems = [
  { id: 1, displayId: 'P1001', title: '二叉树遍历', difficulty: '提高+/省选-', order: 1 },
  { id: 2, displayId: 'P1002', title: '动态规划基础', difficulty: '普及-', order: 2 },
  { id: 3, displayId: 'P1003', title: '图论最短路径', difficulty: '提高+/省选-', order: 3 },
];

// 难度等级的定义，从低到高排序
const difficultyLevels = [
  '入门',
  '普及-', 
  '普及/提高-', 
  '普及+/提高', 
  '提高+/省选-', 
  '省选/NOI-', 
  'NOI/NOI+/CTSC'
];

// 将难度标签转换为对应的排序值
const difficultyToNumber = (difficulty) => difficultyLevels.indexOf(difficulty);

// 搜索功能：支持搜索题目ID、名称或难度
const filterProblems = (problems, query) => {
  if (query.match(/^\d+-\d+$/)) {
    const [start, end] = query.split('-').map(Number);
    return problems.filter((p) => p.id >= start && p.id <= end);
  }
  return problems.filter(
    (p) =>
      p.displayId.toLowerCase().includes(query.toLowerCase()) ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.difficulty.toLowerCase().includes(query.toLowerCase())
  );
};

export default function ManageProblems({ closeModal }) {
  const [problems, setProblems] = useState(initialProblems);
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'order', direction: 'asc' }); // 默认按序号排序

  const handleSearch = () => {
    const result = filterProblems(problems, searchQuery);
    setFilteredProblems(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // 处理表头的排序逻辑
  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedProblems = [...filteredProblems].sort((a, b) => {
      if (columnId === 'difficulty') {
        const aLevel = difficultyToNumber(a[columnId]);
        const bLevel = difficultyToNumber(b[columnId]);
        return direction === 'asc' ? aLevel - bLevel : bLevel - aLevel;
      }

      if (columnId === 'order') {
        return direction === 'asc' ? a[columnId] - b[columnId] : b[columnId] - a[columnId];
      }

      return direction === 'asc'
        ? a[columnId].localeCompare(b[columnId])
        : b[columnId].localeCompare(a[columnId]);
    });

    // 当按难度排序时，更新序号
    if (columnId === 'difficulty') {
      sortedProblems.forEach((p, idx) => {
        p.order = idx + 1; // 按照排序后的顺序重新分配序号
      });
    }

    setFilteredProblems(sortedProblems);
    setSortConfig({ key: columnId, direction });
  };

  // 修改序号
  const handleEditOrder = (problemId, newOrder) => {
    const newProblems = problems.map((p) =>
      p.id === problemId ? { ...p, order: parseInt(newOrder) } : p
    );
    setProblems(newProblems);
    setFilteredProblems(newProblems); // 同时更新filteredProblems
  };

  // 删除题目
  const handleDeleteProblem = (problemId) => {
    const updatedProblems = problems.filter((p) => p.id !== problemId);
    setProblems(updatedProblems);
    setFilteredProblems(updatedProblems);
  };

  // 点击确定后关闭弹窗
  const handleConfirm = () => {
    closeModal(); // 调用传递进来的关闭函数
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">题目管理</h2>

      {/* 搜索框 */}
      <div className="flex items-center space-x-4 mb-6">
        <TextField
          fullWidth
          variant="outlined"
          label="搜索题目"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="请输入题目ID, 名称或难度，支持1-100范围搜索"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          搜索
        </Button>
      </div>

      {/* 表单内容 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="py-2 px-4 border-b text-left cursor-pointer"
                  style={{ minWidth: column.minWidth, width: column.width }} // 动态调整宽度
                  onClick={column.sortable ? () => handleSort(column.id) : undefined}
                >
                  {column.label} {sortConfig.key === column.id && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="text-left">
                <td className="py-2 px-4 border-b">{problem.displayId}</td>
                <td className="py-2 px-4 border-b">{problem.title}</td>
                <td className="py-2 px-4 border-b">{problem.difficulty}</td>
                <td className="py-2 px-4 border-b">
                  <TextField
                    value={problem.order}
                    onChange={(e) => handleEditOrder(problem.id, e.target.value)}
                    variant="outlined"
                    size="small"
                    style={{ width: '50px' }} // 缩小输入框宽度
                    InputProps={{ style: { padding: '5px' } }}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditOrder(problem.id)}
                  >
                    修改
                  </Button>
                </td>
                <td className="py-2 px-4 border-b">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteProblem(problem.id)}
                  >
                    删除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 确定按钮 */}
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm} // 点击时关闭整个弹窗
        >
          确定
        </Button>
      </div>
    </div>
  );
}
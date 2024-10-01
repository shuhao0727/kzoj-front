"use client"; // 确保这个文件被当作客户端组件处理

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, IconButton, Switch, TextField } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

const discussions = [
  { id: 1, title: '讨论 1', author: '用户1', views: 100, likes: 20, dislikes: 2, comments: 5, createdAt: '2024-09-01', active: true },
  { id: 2, title: '讨论 2', author: '用户2', views: 50, likes: 15, dislikes: 0, comments: 3, createdAt: '2024-09-02', active: false },
  { id: 3, title: '讨论 3', author: '用户3', views: 200, likes: 30, dislikes: 1, comments: 10, createdAt: '2024-09-03', active: true },
];

const DiscussionTable = () => {
  const [discussionData, setDiscussionData] = useState(discussions);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  // 搜索过滤功能
  const filteredDiscussions = discussionData.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 排序功能
  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...filteredDiscussions].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setDiscussionData(sortedData);
  };

  const handleDelete = (id: number) => {
    const updatedDiscussions = discussionData.filter((discussion) => discussion.id !== id);
    setDiscussionData(updatedDiscussions);
  };

  const handleToggleActive = (id: number) => {
    const updatedDiscussions = discussionData.map((discussion) =>
      discussion.id === id ? { ...discussion, active: !discussion.active } : discussion
    );
    setDiscussionData(updatedDiscussions);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">讨论列表</h2>

      {/* 搜索框 */}
      <div className="mb-4">
        <TextField
          fullWidth
          label="搜索讨论标题或作者"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">标题</th>
            <th className="py-2 px-4 border-b">作者</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('views')}>
              浏览 {sortConfig.key === 'views' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('likes')}>
              点赞 {sortConfig.key === 'likes' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('dislikes')}>
              踩 {sortConfig.key === 'dislikes' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('comments')}>
              评论 {sortConfig.key === 'comments' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="py-2 px-4 border-b">创建时间</th>
            <th className="py-2 px-4 border-b text-center">讨论开关</th> {/* 添加居中对齐 */}
            <th className="py-2 px-4 border-b text-center">操作</th> {/* 添加居中对齐 */}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredDiscussions.map((discussion) => (
            <tr key={discussion.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 border-b">{discussion.id}</td>
              <td className="py-2 px-4 border-b">{discussion.title}</td>
              <td className="py-2 px-4 border-b">{discussion.author}</td>
              <td className="py-2 px-4 border-b">{discussion.views}</td>
              <td className="py-2 px-4 border-b">{discussion.likes}</td>
              <td className="py-2 px-4 border-b">{discussion.dislikes}</td>
              <td className="py-2 px-4 border-b">{discussion.comments}</td>
              <td className="py-2 px-4 border-b">{discussion.createdAt}</td>
              <td className="py-2 px-4 border-b text-center">
                <Switch
                  checked={discussion.active}
                  onChange={() => handleToggleActive(discussion.id)}
                  color="primary"
                />
              </td>
              <td className="py-2 px-4 border-b text-center flex justify-center">
                <Link href={`/discussion/${discussion.id}`} passHref>
                  <IconButton color="primary" aria-label="查看">
                    <Visibility />
                  </IconButton>
                </Link>
                <IconButton
                  color="secondary"
                  aria-label="删除"
                  onClick={() => handleDelete(discussion.id)}
                >
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscussionTable;
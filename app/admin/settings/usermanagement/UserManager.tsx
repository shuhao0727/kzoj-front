"use client";

import React, { useState } from 'react';
import EditUserDialog from './EditUserDialog';
import Pagination from './Pagination';
import GenerateUsers from './GenerateUsers';

// 初始用户数据，包含创建时间字段
const initialUsers = [
  { id: 1, username: 'dbtz', name: '杨沛然', school: '二中', role: '题目管理员', grade: '七年级', gender: '男', email: '2088147520@qq.com', status: true, title: '首席程序员', titleColor: '#FF4500', createdAt: '2023-09-01' },
  { id: 2, username: 'lisi', name: '李四', school: '清华大学', role: '普通管理员', grade: '八年级', gender: '男', email: 'lisi@example.com', status: true, title: '', titleColor: '', createdAt: '2023-08-20' },
  { id: 3, username: 'wangwu', name: '王五', school: '北大附中', role: '用户（默认）', grade: '九年级', gender: '女', email: 'wangwu@example.com', status: true, title: '', titleColor: '', createdAt: '2023-07-15' },
];

const UserManager = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleEditUser = (user) => setEditingUser(user);
  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 搜索框、用户总数和生成用户按钮平行 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4 w-2/3"> {/* 搜索框占2/3宽度 */}
          <input
            type="text"
            placeholder="通过用户名、姓名、学校、角色、邮箱搜索..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"  // 移除 rounded-full，使其成为长方形
          />
        </div>
        <div className="flex items-center space-x-4 w-1/3 justify-end"> {/* 总用户数占1/3宽度 */}
          <span className="text-lg text-gray-700">总用户数: {filteredUsers.length}</span> {/* 字体稍微小一点且不加粗 */}
          <GenerateUsers users={users} setUsers={setUsers} />
        </div>
      </div>

      {/* 用户列表 */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-sm rounded-t-lg">
            <th className="px-6 py-2 font-semibold">ID</th> {/* 新增ID列 */}
            <th className="px-6 py-2 font-semibold">用户名</th>
            <th className="px-6 py-2 font-semibold">姓名</th>
            <th className="px-6 py-2 font-semibold">学校</th>
            <th className="px-6 py-2 font-semibold">角色</th>
            <th className="px-6 py-2 font-semibold">注册时间</th> {/* 新增创建时间列 */}
            <th className="px-6 py-2 font-semibold">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 rounded-b-lg" style={{ lineHeight: '1.2rem' }}>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-100 transition">
                <td className="px-6 py-3">{String(user.id).padStart(4, '0')}</td> {/* ID显示四位数字 */}
                <td className="px-6 py-3 relative flex items-center">
                  <span>{user.username}</span>
                  {user.title && (
                    <span
                      className="ml-2 text-xs font-semibold rounded-md px-1 py-0.5"
                      style={{ backgroundColor: user.titleColor }}
                    >
                      {user.title}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.school}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">{user.createdAt}</td> {/* 显示创建时间 */}
                <td className="px-6 py-3">
                  {/* 将按钮变为普通可点击文字 */}
                  <span
                    onClick={() => handleEditUser(user)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    编辑
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">未找到符合条件的用户</td> {/* 更新colSpan为7 */}
            </tr>
          )}
        </tbody>
      </table>

      {/* 分页和每页显示数量选择 */}
      <div className="flex justify-between items-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 编辑用户弹窗 */}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default UserManager;
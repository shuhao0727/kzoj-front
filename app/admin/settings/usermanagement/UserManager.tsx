"use client";
import React, { useState } from 'react';
import EditUserDialog from './EditUserDialog';
import Pagination from './Pagination';
import GenerateUsers from './GenerateUsers';

const initialUsers = [
  { id: 1, username: 'dbtz', name: '杨沛然', school: '二中', role: '题目管理员', grade: '七年级', gender: '男', email: '2088147520@qq.com', status: true, title: '首席程序员', titleColor: '#FF4500' },
  { id: 2, username: 'lisi', name: '李四', school: '清华大学', role: '普通管理员', grade: '八年级', gender: '男', email: 'lisi@example.com', status: true, title: '', titleColor: '' },
  { id: 3, username: 'wangwu', name: '王五', school: '北大附中', role: '用户（默认）', grade: '九年级', gender: '女', email: 'wangwu@example.com', status: true, title: '', titleColor: '' },
];

const UserManager = () => {
  const [users, setUsers] = useState(initialUsers);  // 用户数据
  const [searchQuery, setSearchQuery] = useState('');  // 搜索内容
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [editingUser, setEditingUser] = useState(null);  // 当前正在编辑的用户
  const [itemsPerPage, setItemsPerPage] = useState(10);  // 每页显示的用户数量

  // 搜索功能：通过用户名、姓名、学校、角色等多个字段进行搜索
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 分页功能
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  // 处理编辑用户
  const handleEditUser = (user) => setEditingUser(user);

  // 保存编辑后的用户数据
  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">用户管理</h1>

      {/* 搜索框和生成用户按钮平行 */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="通过用户名、姓名、学校、角色、邮箱搜索..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 p-3 rounded-full w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <GenerateUsers users={users} setUsers={setUsers} />
      </div>

      {/* 用户列表 */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-sm rounded-t-lg">
            <th className="px-6 py-3 font-semibold">用户名</th>
            <th className="px-6 py-3 font-semibold">姓名</th>
            <th className="px-6 py-3 font-semibold">学校</th>
            <th className="px-6 py-3 font-semibold">角色</th>
            <th className="px-6 py-3 font-semibold">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 rounded-b-lg">
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-100 transition">
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
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                  >
                    编辑
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">未找到符合条件的用户</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 分页和每页显示数量选择 */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">每页显示:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

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
import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'dbtz', name: '杨沛然', school: '二中', role: '题目管理员', status: true, gender: '男', email: '2088147520@qq.com' },
    { id: 2, username: '821778234kz', name: '', school: '', role: '用户(默认)', status: true, gender: '男', email: '' },
    // 更多用户...
  ]);

  const [selectedUser, setSelectedUser] = useState(null); // 当前选中的用户
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 控制弹窗
  const [searchQuery, setSearchQuery] = useState(''); // 搜索框
  const [currentPage, setCurrentPage] = useState(1); // 当前页
  const [itemsPerPage] = useState(20); // 每页显示数量

  // 根据搜索框内容过滤用户
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // 分页

  // 打开弹窗
  const handleOpenUserDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // 关闭弹窗
  const handleCloseUserDialog = () => {
    setIsDialogOpen(false);
  };

  // 删除用户
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // 切换用户状态
  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: !user.status } : user
    ));
  };

  // 切换分页
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">用户管理</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 border rounded-md"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* 用户表格 */}
        <table className="min-w-full bg-white shadow-md rounded-lg text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">用户名</th>
              <th className="px-4 py-2">姓名</th>
              <th className="px-4 py-2">学校</th>
              <th className="px-4 py-2">角色</th>
              <th className="px-4 py-2">状态</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.school}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <Switch
                    checked={user.status}
                    onChange={() => handleToggleStatus(user.id)}
                    className={`${user.status ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span className="sr-only">Toggle Status</span>
                    <span className={`${user.status ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`} />
                  </Switch>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => handleOpenUserDialog(user)} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分页 */}
        <nav className="flex items-center justify-between border-t border-gray-200 mt-6 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={() => handlePageChange('prev')}
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </button>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {[...Array(Math.ceil(filteredUsers.length / itemsPerPage)).keys()].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${currentPage === page + 1 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              onClick={() => handlePageChange('next')}
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* 用户信息弹窗 */}
        {selectedUser && (
          <Transition show={isDialogOpen} as={Fragment}>
            <Dialog open={isDialogOpen} onClose={handleCloseUserDialog} className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">用户信息</Dialog.Title>
                    <form className="mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">用户名</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={selectedUser.username} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">姓名</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={selectedUser.name} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">学校</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={selectedUser.school} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">年级</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="七年级" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">性别</label>
                          <div className="mt-1">
                            <select value={selectedUser.gender} className="block w-full rounded-md border-gray-300 shadow-sm">
                              <option value="男">男</option>
                              <option value="女">女</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">邮箱</label>
                          <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={selectedUser.email} />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={handleCloseUserDialog}>取消</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">确定</button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
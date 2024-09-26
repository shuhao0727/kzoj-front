import React, { useState, Fragment } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

// 假设我们已经有一个用于与数据库交互的 API
import { fetchUsers, updateUser, createUsers, deleteUsers } from './api'; // 你需要实现这些API
import { UserIcon } from '@heroicons/react/24/solid'; // 使用HeroIcons中的User图标代表女生

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'user001', name: '张三', school: '清华大学', role: '题目管理员', grade: '初一', gender: '男', email: 'zhangsan@tsinghua.edu.cn', title: '首席程序员', titleColor: '#ff0000' },
    { id: 2, username: 'user002', name: '李四', school: '北京大学', role: '用户（默认）', grade: '初一', gender: '女', email: 'lisi@pku.edu.cn', title: '', titleColor: '#000000' },
  ]); // 从数据库获取的用户

  const [selectedUser, setSelectedUser] = useState(null); // 当前选中的用户
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 控制弹窗
  const [isAdvancedInfoVisible, setIsAdvancedInfoVisible] = useState(false); // 控制高级信息显示
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false); // 是否启用密码重置
  const [newPassword, setNewPassword] = useState(''); // 新密码
  const [searchQuery, setSearchQuery] = useState(''); // 搜索框
  const [currentPage, setCurrentPage] = useState(1); // 当前页
  const [itemsPerPage, setItemsPerPage] = useState(20); // 每页显示数量
  const [selectedUserIds, setSelectedUserIds] = useState([]); // 选择的用户ID

  // 用于生成新用户的状态
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [startNumber, setStartNumber] = useState(0);
  const [endNumber, setEndNumber] = useState(10);
  const [passwordLength, setPasswordLength] = useState(6);

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
    setIsAdvancedInfoVisible(false); // 关闭时隐藏高级信息
  };

  // 保存用户修改（更新数据库）
  const handleSaveUser = async (e) => {
    e.preventDefault();
    // 检查用户名是否重复
    if (users.some(user => user.username === selectedUser.username && user.id !== selectedUser.id)) {
      alert('用户名已存在，请更换用户名。');
      return;
    }

    const updatedUser = { ...selectedUser, newPassword: isPasswordEnabled ? newPassword : undefined };
    await updateUser(updatedUser); // 更新数据库中的用户数据
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user))); // 更新前端显示
    setIsDialogOpen(false);
  };

  // 切换分页
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 删除选中的用户
  const handleDeleteUsers = async () => {
    await deleteUsers(selectedUserIds); // 调用API删除用户
    setUsers(users.filter(user => !selectedUserIds.includes(user.id))); // 更新前端显示
    setSelectedUserIds([]); // 清空选择
  };

  // 生成用户并导出
  const handleGenerateUsers = async () => {
    const newUsers = [];
    for (let i = startNumber; i <= endNumber; i++) {
      newUsers.push({
        username: `${prefix}${i}${suffix}`,
        password: Array(passwordLength).fill('*').join(''), // 使用 * 作为密码的占位符
      });
    }

    // 检查用户名是否重复
    const duplicateUsernames = newUsers.filter(newUser =>
      users.some(existingUser => existingUser.username === newUser.username)
    );
    if (duplicateUsernames.length > 0) {
      alert(`以下用户名已存在：${duplicateUsernames.map(user => user.username).join(', ')}`);
      return;
    }

    await createUsers(newUsers); // 将新用户保存到数据库
    setUsers([...users, ...newUsers]); // 更新前端显示
    // 生成导出文件
    const exportData = newUsers.map(user => `用户名: ${user.username}, 密码: ${user.password}`).join('\n');
    const blob = new Blob([exportData], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated_users.txt';
    link.click();
  };

  // 处理选择用户
  const handleSelectUser = (userId) => {
    setSelectedUserIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId); // 取消选择
      } else {
        return [...prev, userId]; // 添加选择
      }
    });
  };

  // 处理每页显示数量变化
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // 重置为第一页
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">用户管理 ({users.length} 名用户)</h2>
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
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUserIds(
                      e.target.checked ? users.map((user) => user.id) : []
                    )
                  }
                  checked={selectedUserIds.length === users.length}
                />
              </th>
              <th className="px-4 py-2">用户名</th>
              <th className="px-4 py-2">姓名</th>
              <th className="px-4 py-2">学校</th>
              <th className="px-4 py-2">角色</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="px-4 py-2 relative">
                  {user.username}
                  {user.title && (
                    <span className="absolute top-0 right-0 text-xs font-semibold rounded-md px-1 py-0.5" style={{ backgroundColor: user.titleColor }}>
                      {user.title}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  {user.gender === '女' && (
                    <UserIcon className="h-5 w-5 text-pink-400" />
                  )}
                  <span>{user.name}</span>
                </td>
                <td className="px-4 py-2">{user.school}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => handleOpenUserDialog(user)} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleSelectUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
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

        {/* 每页显示数量选择 */}
        <div className="flex justify-end mt-4">
          <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-gray-700">每页显示:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

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
                    <form className="mt-4" onSubmit={handleSaveUser}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">用户名</label>
                          <input type="text" name="username" value={selectedUser.username} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">姓名</label>
                          <input type="text" name="name" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">学校</label>
                          <input type="text" name="school" value={selectedUser.school} onChange={(e) => setSelectedUser({ ...selectedUser, school: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">年级</label>
                          <select name="grade" value={selectedUser.grade} onChange={(e) => setSelectedUser({ ...selectedUser, grade: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="初一">初一</option>
                            <option value="初二">初二</option>
                            <option value="初三">初三</option>
                            <option value="高一">高一</option>
                            <option value="高二">高二</option>
                            <option value="高三">高三</option>
                            <option value="教师">教师</option> {/* 添加教师选项 */}
                          </select>
                        </div>

                        {/* 用户角色 */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">用户角色</label>
                          <select name="role" value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="超级管理员">超级管理员</option>
                            <option value="题目管理员">题目管理员</option> {/* 修改管理员为题目管理员 */}
                            <option value="普通管理员">普通管理员</option>
                            <option value="用户（默认）">用户（默认）</option>
                            <option value="用户（禁止提交）">用户（禁止提交）</option>
                            <option value="用户（禁止发讨论）">用户（禁止发讨论）</option>
                            <option value="用户（禁言）">用户（禁言）</option>
                          </select>
                        </div>

                        {/* 性别 */}
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">性别</label>
                          <div className="mt-1 flex space-x-4">
                            <label className="inline-flex items-center">
                              <input type="radio" name="gender" value="男" checked={selectedUser.gender === '男'} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })} className="text-indigo-600" />
                              <span className="ml-2">男</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input type="radio" name="gender" value="女" checked={selectedUser.gender === '女'} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })} className="text-indigo-600" />
                              <span className="ml-2">女</span>
                            </label>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">邮箱</label>
                          <input type="email" name="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>

                        {/* 密码重置 */}
                        <div className="col-span-2 flex items-center space-x-2">
                          <Switch
                            checked={isPasswordEnabled}
                            onChange={setIsPasswordEnabled}
                            className={`${isPasswordEnabled ? 'bg-indigo-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">是否设置新密码</span>
                            <span className={`${isPasswordEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                          </Switch>
                          <span>设置新密码</span>
                        </div>

                        {isPasswordEnabled && (
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">新密码</label>
                            <input
                              type="text" // 明文显示
                              name="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                          </div>
                        )}

                        {/* 头衔名称 */}
                        <div className="col-span-2">
                          <button
                            type="button"
                            className="flex justify-between items-center w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setIsAdvancedInfoVisible(!isAdvancedInfoVisible)}
                          >
                            <span>高级信息</span>
                            {isAdvancedInfoVisible ? (
                              <ChevronUpIcon className="h-5 w-5 text-indigo-600" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-indigo-600" />
                            )}
                          </button>
                        </div>

                        {/* 高级信息：可折叠部分 */}
                        {isAdvancedInfoVisible && (
                          <>
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700">头衔名称</label>
                              <input type="text" name="title" value={selectedUser.title || ''} onChange={(e) => setSelectedUser({ ...selectedUser, title: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700">头衔颜色</label>
                              <input type="color" name="titleColor" value={selectedUser.titleColor || '#000000'} onChange={(e) => setSelectedUser({ ...selectedUser, titleColor: e.target.value })} className="mt-1 block w-16 h-10" />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={handleCloseUserDialog}>取消</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">确定</button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        )}

        {/* 生成用户模块 */}
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium mb-4">生成用户</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">前缀</label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">后缀</label>
              <input
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">开始数字</label>
              <input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">结束数字</label>
              <input
                type="number"
                value={endNumber}
                onChange={(e) => setEndNumber(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">密码长度</label>
              <input
                type="number"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <button
            onClick={handleGenerateUsers}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            生成 & 导出
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
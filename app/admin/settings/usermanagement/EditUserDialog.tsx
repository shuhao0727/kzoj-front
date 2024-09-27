"use client";
import React, { useState } from 'react';

const roleOptions = [
  "超级管理员",
  "题目管理员",
  "普通管理员",
  "用户（默认）",
  "用户（禁止提交）",
  "用户（禁止发讨论）",
  "用户（禁言）",
  "用户（禁止提交&禁止发讨论）",
  "用户（禁止提交&禁言）",
];

const gradeOptions = [
  "初一", "初二", "初三", "高一", "高二", "高三", "教师"
];

const colorOptions = [
  { name: "红色", value: "#ff0000" },
  { name: "绿色", value: "#00ff00" },
  { name: "蓝色", value: "#0000ff" },
  { name: "黄色", value: "#ffff00" },
  { name: "紫色", value: "#800080" },
  { name: "橙色", value: "#ffa500" }
];

const EditUserDialog = ({ user, onSave, onClose }) => {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [school, setSchool] = useState(user.school);
  const [grade, setGrade] = useState(user.grade);
  const [role, setRole] = useState(user.role);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);  // 是否启用密码重置
  const [title, setTitle] = useState(user.title || '');  // 用户头衔
  const [titleColor, setTitleColor] = useState(user.titleColor || '#000000');  // 头衔颜色

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      username,
      name,
      school,
      grade,
      role,
      gender,
      email,
      title,
      titleColor,
      newPassword: isPasswordEnabled ? newPassword : undefined,  // 重置密码
    };
    onSave(updatedUser);  // 保存修改
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">编辑用户</h2>
        <form onSubmit={handleSave}>
          {/* 用户名 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              readOnly
            />
          </div>

          {/* 姓名 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* 学校 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">学校</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* 年级 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">年级</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {gradeOptions.map((gradeOption) => (
                <option key={gradeOption} value={gradeOption}>
                  {gradeOption}
                </option>
              ))}
            </select>
          </div>

          {/* 性别 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">性别</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="男"
                  checked={gender === '男'}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-indigo-600"
                />
                <span className="ml-2">男</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="女"
                  checked={gender === '女'}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-indigo-600"
                />
                <span className="ml-2">女</span>
              </label>
            </div>
          </div>

          {/* 邮箱 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* 用户角色 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">用户角色</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {roleOptions.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>

          {/* 重置密码 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">设置新密码</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPasswordEnabled}
                onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
                className="h-4 w-4"
              />
              {isPasswordEnabled && (
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="新密码"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              )}
            </div>
          </div>

          {/* 头衔名称 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">头衔名称</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="头衔名称"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* 头衔颜色 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">头衔颜色</label>
            <select
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {colorOptions.map((colorOption) => (
                <option key={colorOption.value} value={colorOption.value}>
                  {colorOption.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">
              取消
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDialog;
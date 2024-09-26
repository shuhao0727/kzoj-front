import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';

const QuestionList = () => {
  const [questions, setQuestions] = useState([
    { id: 3724, displayId: 'SFJS 1002', title: '数字码', author: 'root', createdAt: '2024-09-09 10:29:40', modifiedAt: '2024-09-09 10:29:40', permission: '团队题目', type: 'OI', visible: true },
    { id: 3723, displayId: 'SFJS 1001', title: '第K级题', author: 'root', createdAt: '2024-09-09 10:23:27', modifiedAt: '2024-09-09 10:23:27', permission: '团队题目', type: 'OI', visible: true },
    { id: 3722, displayId: 'COCI 1197', title: '[COCI2016-2017#7] KLAVIR', author: 'root', createdAt: '2024-09-07 15:02:23', modifiedAt: '2024-09-07 15:02:23', permission: '团队题目', type: 'OI', visible: true },
    // 可以根据需要添加更多题目...
  ]);

  const handleToggleVisibility = (id) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, visible: !question.visible } : question
      )
    );
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`正在编辑题目 ID: ${id}`);
    // 在此处实现编辑功能
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">题目列表</h2>
      <div className="mb-4 flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">编辑</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">+ 创建</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">添加课程OJ题目</button>
        <input
          type="text"
          placeholder="输入关键字搜索"
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">显示ID</th>
            <th className="px-4 py-2">标题</th>
            <th className="px-4 py-2">作者</th>
            <th className="px-4 py-2">创建时间</th>
            <th className="px-4 py-2">最近修改者</th>
            <th className="px-4 py-2">权限</th>
            <th className="px-4 py-2">类型</th>
            <th className="px-4 py-2">是否可见</th>
            <th className="px-4 py-2">选项</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2">{question.id}</td>
              <td className="px-4 py-2">{question.displayId}</td>
              <td className="px-4 py-2">{question.title}</td>
              <td className="px-4 py-2">{question.author}</td>
              <td className="px-4 py-2">{question.createdAt}</td>
              <td className="px-4 py-2">{question.modifiedAt}</td>
              <td className="px-4 py-2">{question.permission}</td>
              <td className="px-4 py-2">{question.type}</td>
              <td className="px-4 py-2">
                <Switch
                  checked={question.visible}
                  onChange={() => handleToggleVisibility(question.id)}
                  className={`${question.visible ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">切换可见性</span>
                  <span
                    className={`${question.visible ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
                  />
                </Switch>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(question.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 分页（占位符） */}
      <div className="flex justify-end mt-4">
        <span className="text-sm text-gray-600">1 / 10</span>
        {/* 根据需要实现实际分页 */}
      </div>
    </div>
  );
};

export default QuestionList;
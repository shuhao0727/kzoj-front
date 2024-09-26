import React, { useState } from 'react';

const trainingData = [
  { id: 1000, title: '入门', privilege: '私有训练', category: 'C++基础', problemCount: 3, author: 'root', lastUpdate: '1年前', progress: 66.67 },
  { id: 1001, title: '顺序结构', privilege: '私有训练', category: 'C++基础', problemCount: 16, author: 'root', lastUpdate: '19天前', progress: 62.25 },
  { id: 1002, title: '选择结构', privilege: '私有训练', category: 'C++基础', problemCount: 13, author: 'root', lastUpdate: '19天前', progress: 0 },
  { id: 1003, title: '循环结构', privilege: '私有训练', category: 'C++基础', problemCount: 12, author: 'root', lastUpdate: '19天前', progress: 0 },
  { id: 1004, title: '数组', privilege: '私有训练', category: 'C++基础', problemCount: 15, author: 'root', lastUpdate: '19天前', progress: 0 },
  { id: 1005, title: '函数与递归', privilege: '私有训练', category: 'C++基础', problemCount: 22, author: 'root', lastUpdate: '19天前', progress: 0 },
  { id: 1006, title: '指针', privilege: '私有训练', category: 'C++基础', problemCount: 9, author: 'root', lastUpdate: '19天前', progress: 0 },
  { id: 1007, title: '结构体', privilege: '私有训练', category: '初级数据结构', problemCount: 9, author: 'root', lastUpdate: '1年前', progress: 0 },
  { id: 1008, title: '链表', privilege: '私有训练', category: '初级数据结构', problemCount: 9, author: 'root', lastUpdate: '1年前', progress: 0 },
];

const categories = [
  '全部', 'C++基础', '初级数据结构', '高级数据结构', '算法进阶', '动态规划'
];

const privileges = [
  '全部', '公开训练', '私有训练'
];

const types = [
  'NOI', 'USACO', 'CCC', 'COCI', 'AtCoder'
];

const Train = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedPrivilege, setSelectedPrivilege] = useState('全部');

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">搜索训练</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="输入关键词"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">训练权限</h3>
            <div className="flex space-x-2">
              {privileges.map((privilege) => (
                <button
                  key={privilege}
                  onClick={() => setSelectedPrivilege(privilege)}
                  className={`px-3 py-2 rounded-lg transition duration-300 ease-in-out ${selectedPrivilege === privilege ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {privilege}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">训练分类</h3>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg transition duration-300 ease-in-out ${selectedCategory === category ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">训练类型</h3>
            <div className="flex space-x-2">
              {types.map((type) => (
                <button
                  key={type}
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3">编号</th>
            <th className="px-4 py-3">标题</th>
            <th className="px-4 py-3">权限</th>
            <th className="px-4 py-3">分类</th>
            <th className="px-4 py-3">题目数</th>
            <th className="px-4 py-3">作者</th>
            <th className="px-4 py-3">最近更新</th>
            <th className="px-4 py-3">进度</th>
          </tr>
        </thead>
        <tbody>
          {trainingData.map((train) => (
            <tr key={train.id} className="border-b hover:bg-gray-100 transition-colors duration-200">
              <td className="px-4 py-3">{train.id}</td>
              <td className="px-4 py-3 text-blue-500 underline">{train.title}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-lg bg-red-200 text-red-800">{train.privilege}</span>
              </td>
              <td className="px-4 py-3">{train.category}</td>
              <td className="px-4 py-3">{train.problemCount}</td>
              <td className="px-4 py-3">{train.author}</td>
              <td className="px-4 py-3">{train.lastUpdate}</td>
              <td className="px-4 py-3">
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${train.progress}%` }}
                  >
                    {train.progress}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Train;
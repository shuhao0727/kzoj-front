"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css'; // 引入 Markdown 编辑器的样式

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const markdownIt = require('markdown-it')();

const TestCaseUploader = () => {
  const [testCases, setTestCases] = useState([
    { input: '', output: '' }
  ]); // 初始测试样例
  const [scores, setScores] = useState([]); // 分值数组

  // 添加测试样例
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  // 删除测试样例
  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
    setScores(scores.filter((_, i) => i !== index)); // 同步删除分值
  };

  // 更新测试样例数据
  const updateTestCase = (index, field, value) => {
    const updatedTestCases = testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setTestCases(updatedTestCases);
  };

  // 上传测试数据并生成分值
  const handleUpload = () => {
    const newScores = testCases.map(() => Math.floor(100 / testCases.length)); // 根据样例数量平均分配总分100
    setScores(newScores);
    console.log('上传的测试数据:', testCases);
    console.log('生成的分值:', newScores);
    // 这里可以添加实际上传数据的逻辑
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">测试数据上传</h2>

      {testCases.map((testCase, index) => (
        <div key={index} className="mb-6">
          <div className="flex space-x-4 items-center">
            {/* 输入样例 */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">输入样例</label>
              <MdEditor
                value={testCase.input}
                style={{ height: '150px' }}
                renderHTML={(text) => markdownIt.render(text)}
                onChange={({ text }) => updateTestCase(index, 'input', text)}
              />
            </div>

            {/* 输出样例 */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">输出样例</label>
              <MdEditor
                value={testCase.output}
                style={{ height: '150px' }}
                renderHTML={(text) => markdownIt.render(text)}
                onChange={({ text }) => updateTestCase(index, 'output', text)}
              />
            </div>

            {/* 删除按钮 */}
            <div>
              <button
                onClick={() => removeTestCase(index)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 分值展示 */}
      {scores.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">生成的分值:</h3>
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                样例 {index + 1}: {score} 分
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 操作按钮：一行显示 */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={addTestCase}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          添加测试样例
        </button>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          上传测试数据
        </button>
      </div>
    </div>
  );
};

export default TestCaseUploader;
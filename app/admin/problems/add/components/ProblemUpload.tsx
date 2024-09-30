"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css'; // 引入 Markdown 编辑器的样式

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const markdownIt = require('markdown-it')();

const TestCaseUploader = () => {
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]); // 初始测试样例
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

  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      // 假设内容是 JSON 格式，您可以根据实际内容进行解析
      const uploadedTestCases = JSON.parse(content);
      setTestCases(uploadedTestCases);
      // 生成分值的逻辑
      const newScores = uploadedTestCases.map(() => Math.floor(100 / uploadedTestCases.length));
      setScores(newScores);
    };

    if (file) {
      reader.readAsText(file); // 读取文件内容
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                className="bg-transparent text-gray-500 border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-200"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 操作按钮 */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={addTestCase}
          className="bg-transparent text-gray-500 border border-gray-300 px-3 py-1 rounded hover:bg-gray-200 transition-all duration-200 text-sm"
        >
          添加样例
        </button>
      </div>

      {/* 文件上传控件 */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">上传测试数据 (ZIP 或 RAR 格式)</label>
        <input 
          type="file" 
          accept=".zip,.rar" 
          onChange={handleFileUpload} 
          className="border border-gray-300 rounded-md p-2 w-full" 
        />
      </div>

      {/* 分值展示 */}
      {scores.length > 0 && (
        <div className="mt-4">
         
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                样例 {index + 1}: {score} 分
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestCaseUploader;
"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css'; // 引入Markdown编辑器的样式

// 动态导入 Markdown 编辑器
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const markdownIt = require('markdown-it')();

const ProblemDetails = ({ problemDetails, handleChange }) => {
  const handleEditorChange = ({ text }, field) => {
    handleChange({ target: { value: text } }, field);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      

      {/* 题目描述 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">题目描述</label>
        <MdEditor
          value={problemDetails.description}
          style={{ height: '200px' }}
          renderHTML={(text) => markdownIt.render(text)}
          onChange={(e) => handleEditorChange(e, 'description')}
        />
      </div>

      {/* 输入描述 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">输入描述</label>
        <MdEditor
          value={problemDetails.inputDescription}
          style={{ height: '200px' }}
          renderHTML={(text) => markdownIt.render(text)}
          onChange={(e) => handleEditorChange(e, 'inputDescription')}
        />
      </div>

      {/* 输出描述 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">输出描述</label>
        <MdEditor
          value={problemDetails.outputDescription}
          style={{ height: '200px' }}
          renderHTML={(text) => markdownIt.render(text)}
          onChange={(e) => handleEditorChange(e, 'outputDescription')}
        />
      </div>
    </div>
  );
};

export default ProblemDetails;
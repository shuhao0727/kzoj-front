"use client";
import React, { useState } from 'react';
import ProblemDetails from './components/ProblemDetails';
import ProblemDescription from './components/ProblemDescription';
import ProblemUpload from './components/ProblemUpload';

const ProblemAddPage = () => {
  const [problemDetails, setProblemDetails] = useState({
    displayId: '',
    title: '',
    description: '',
    timeLimit: '1000', // 默认时间限制为1000ms
    memoryLimit: '512', // 默认内存限制为512MB
    difficulty: '未知',
    tags: '',
    type: 'public',  // 默认公开题目
    testData: [{ input: '', output: '' }],
  });

  // 处理表单变化
  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedTestData = [...problemDetails.testData];
      updatedTestData[index][field] = e.target.value;
      setProblemDetails({ ...problemDetails, testData: updatedTestData });
    } else {
      setProblemDetails({ ...problemDetails, [field]: e.target.value });
    }
  };

  // 添加新的测试数据
  const addTestData = () => {
    setProblemDetails({
      ...problemDetails,
      testData: [...problemDetails.testData, { input: '', output: '' }],
    });
  };

  // 删除测试数据
  const removeTestData = (index) => {
    const updatedTestData = problemDetails.testData.filter((_, i) => i !== index);
    setProblemDetails({ ...problemDetails, testData: updatedTestData });
  };

  // 表单提交处理
  const handleSubmit = (e) => {
    e.preventDefault();
    // 在这里处理表单提交逻辑
    console.log('提交题目数据：', problemDetails);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">添加题目</h1>

        <ProblemDetails problemDetails={problemDetails} handleChange={handleChange} />
        <ProblemDescription problemDetails={problemDetails} handleChange={handleChange} />
        <ProblemUpload
          problemDetails={problemDetails}
          handleChange={handleChange}
          addTestData={addTestData}
          removeTestData={removeTestData}
        />

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            提交题目
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemAddPage;
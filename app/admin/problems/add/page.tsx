'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProblemForm from './components/ProblemForm';

const ProblemPage = () => {
  const [initialData, setInitialData] = useState(null);
  const searchParams = useSearchParams();
  const problemId = searchParams.get('id'); // 获取路由参数，判断是修改还是新增

  useEffect(() => {
    if (problemId) {
      // 假设通过 problemId 从后端获取题目数据
      fetch(`/api/problems/${problemId}`)
        .then((res) => res.json())
        .then((data) => setInitialData(data));
    }
  }, [problemId]);

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">
        {problemId ? '修改题目' : '添加题目'}
      </h2>
      <ProblemForm initialData={initialData} />
    </div>
  );
};

export default ProblemPage;
"use client";
import React, { useState } from 'react';
import TagList from './components/TagList';
import AddTagModal from './components/AddTagModal';
import AddTagTypeModal from './components/AddTagTypeModal';

const TagManager = () => {
  const [isAddTagModalOpen, setAddTagModalOpen] = useState(false);
  const [isAddTagTypeModalOpen, setAddTagTypeModalOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">标签管理</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setAddTagModalOpen(true)}
          className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-500 hover:text-white transition"
        >
          添加标签
        </button>
        <button
          onClick={() => setAddTagTypeModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          添加标签类型
        </button>
      </div>

      <TagList />

      {isAddTagModalOpen && (
        <AddTagModal onClose={() => setAddTagModalOpen(false)} />
      )}
      {isAddTagTypeModalOpen && (
        <AddTagTypeModal onClose={() => setAddTagTypeModalOpen(false)} />
      )}
    </div>
  );
};

export default TagManager;
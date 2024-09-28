"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditTagTypeModal = ({ showEditTagTypeModal, setShowEditTagTypeModal, editingTagType, handleEditTagType, setEditingTagType }) => {
  const [tagTypeName, setTagTypeName] = useState('');

  useEffect(() => {
    if (editingTagType) {
      setTagTypeName(editingTagType.title); // 设置标签分类名称
    }
  }, [editingTagType]);

  const handleSave = () => {
    if (tagTypeName) {
      handleEditTagType({ ...editingTagType, title: tagTypeName });
      setShowEditTagTypeModal(false);
    } else {
      alert("请填写标签分类名称");
    }
  };

  const handleDelete = () => {
    if (window.confirm(`确定删除标签分类 ${tagTypeName} 吗？`)) {
      handleEditTagType(null); // 删除分类
      setShowEditTagTypeModal(false);
    }
  };

  return (
    <Modal
      isOpen={showEditTagTypeModal}
      onRequestClose={() => setShowEditTagTypeModal(false)}
      contentLabel="编辑标签分类"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '250px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">编辑标签分类</h2>
      <input
        type="text"
        value={tagTypeName}
        onChange={(e) => setTagTypeName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="标签分类名称"
      />
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          保存
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          删除
        </button>
      </div>
    </Modal>
  );
};

export default EditTagTypeModal;
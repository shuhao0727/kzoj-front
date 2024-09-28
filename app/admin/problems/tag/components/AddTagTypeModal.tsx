"use client";

import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTagTypeModal = ({ showAddTagTypeModal, setShowAddTagTypeModal, handleAddTagType }) => {
  const [tagType, setTagType] = useState('');

  const handleSave = () => {
    if (tagType) {
      handleAddTagType(tagType);
      setShowAddTagTypeModal(false);
    } else {
      alert("请填写标签分类名称");
    }
  };

  return (
    <Modal
      isOpen={showAddTagTypeModal}
      onRequestClose={() => setShowAddTagTypeModal(false)}
      contentLabel="添加标签分类"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '200px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">添加新标签分类</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="标签分类名称"
          value={tagType}
          onChange={(e) => setTagType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          保存
        </button>
      </div>
    </Modal>
  );
};

export default AddTagTypeModal;
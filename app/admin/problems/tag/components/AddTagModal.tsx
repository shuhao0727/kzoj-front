"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ChromePicker } from 'react-color'; // 更高级的颜色选择器

const AddTagModal = ({ showAddTagModal, setShowAddTagModal, handleAddTag, cardTitles, currentTag, handleEditTag, setCurrentTag }) => {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#1E90FF'); // 默认颜色为天蓝色
  const [tagType, setTagType] = useState('');

  // 监听 currentTag 的变化，如果存在 currentTag，则为编辑模式
  useEffect(() => {
    if (currentTag) {
      setTagName(currentTag.name);
      setTagColor(currentTag.color);
      setTagType(currentTag.type);
    } else {
      setTagName('');
      setTagColor('#1E90FF');
      setTagType('');
    }
  }, [currentTag]);

  const handleSave = () => {
    if (tagName && tagColor && tagType) {
      if (currentTag) {
        handleEditTag({ name: tagName, color: tagColor, type: tagType });
      } else {
        handleAddTag({ name: tagName, color: tagColor, type: tagType });
      }
      setShowAddTagModal(false);
      setCurrentTag(null); // 清除当前编辑的标签
    } else {
      alert("请填写所有字段");
    }
  };

  return (
    <Modal
      isOpen={showAddTagModal}
      onRequestClose={() => {
        setShowAddTagModal(false);
        setCurrentTag(null); // 清除编辑状态
      }}
      contentLabel="添加或编辑标签"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '550px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{currentTag ? '编辑标签' : '添加新标签'}</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="标签名称"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-600 mb-2 block">选择标签颜色：</label>
          <ChromePicker color={tagColor} onChangeComplete={(color) => setTagColor(color.hex)} />
        </div>
        <select
          value={tagType}
          onChange={(e) => setTagType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        >
          <option value="">请选择标签分类</option>
          {cardTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          保存标签
        </button>
      </div>
    </Modal>
  );
};

export default AddTagModal;
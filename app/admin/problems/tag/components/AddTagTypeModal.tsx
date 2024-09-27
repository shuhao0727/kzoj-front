import React, { useState } from 'react';

const AddTagTypeModal = ({ onClose }) => {
  const [tagTypeName, setTagTypeName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理添加标签类型的逻辑
    // 在成功添加后，更新类型列表并关闭模态框
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">添加标签类型</h2>
        <input
          type="text"
          value={tagTypeName}
          onChange={(e) => setTagTypeName(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
          placeholder="标签类型名称"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          添加
        </button>
        <button type="button" onClick={onClose} className="mt-2 w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition">
          取消
        </button>
      </form>
    </div>
  );
};

export default AddTagTypeModal;
"use client";

import React, { useState } from 'react';
import { Button, TextField, Modal } from '@mui/material';

const TrainingCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // 保存分类并更新分类列表
  const handleSaveCategory = () => {
    if (newCategory.trim() === '') return;

    if (editingCategory) {
      // 编辑现有分类
      setCategories(categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: newCategory } : cat
      ));
    } else {
      // 添加新分类
      setCategories([...categories, { id: Date.now(), name: newCategory }]);
    }

    setNewCategory('');
    setEditingCategory(null);
    setShowAddCategoryModal(false);
  };

  // 编辑分类
  const handleEditCategory = (category) => {
    setNewCategory(category.name);
    setEditingCategory(category);
    setShowAddCategoryModal(true);
  };

  // 删除分类
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('确定要删除这个分类吗？')) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <div className="flex justify-end items-center mb-4">
        <Button variant="contained" color="primary" onClick={() => setShowAddCategoryModal(true)}>
          + 添加分类
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="py-3 px-4 border-b">分类名称</th>
            <th className="py-3 px-4 border-b">操作</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id} className="text-gray-700">
                <td className="py-3 px-4 border-b">{category.name}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditCategory(category)}
                    className="shadow-sm"
                  >
                    编辑
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className="ml-2 shadow-sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    删除
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-4 border-b text-gray-500" colSpan={2}>
                目前没有分类
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 添加或编辑分类的弹窗 */}
      <Modal open={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <TextField
              label="分类名称"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              variant="outlined"
              className="mb-4"
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveCategory}
                className="shadow-md"
              >
                保存
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowAddCategoryModal(false)}
                className="shadow-md"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrainingCategory;
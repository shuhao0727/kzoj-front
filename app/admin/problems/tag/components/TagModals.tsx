"use client";

import React from 'react';
import AddTagModal from './AddTagModal';
import AddTagTypeModal from './AddTagTypeModal';
import EditTagTypeModal from './EditTagTypeModal'; // 新增的标签分类编辑弹窗

const TagModals = ({
  showAddTagModal,
  setShowAddTagModal,
  showAddTagTypeModal,
  setShowAddTagTypeModal,
  showEditTagTypeModal,
  setShowEditTagTypeModal,
  handleAddTag,
  handleAddTagType,
  handleEditTagType, // 新增的处理编辑标签分类
  cardTitles,
  currentTag,
  handleEditTag,
  setCurrentTag,
  editingTagType, // 当前正在编辑的标签分类
  setEditingTagType, // 设置当前编辑的标签分类
}) => {
  return (
    <>
      {/* 添加/编辑标签的弹窗 */}
      <AddTagModal
        showAddTagModal={showAddTagModal}
        setShowAddTagModal={setShowAddTagModal}
        handleAddTag={handleAddTag}
        cardTitles={cardTitles}
        currentTag={currentTag}
        handleEditTag={handleEditTag}
        setCurrentTag={setCurrentTag}
      />

      {/* 添加标签分类的弹窗 */}
      <AddTagTypeModal
        showAddTagTypeModal={showAddTagTypeModal}
        setShowAddTagTypeModal={setShowAddTagTypeModal}
        handleAddTagType={handleAddTagType}
      />

      {/* 编辑标签分类的弹窗 */}
      <EditTagTypeModal
        showEditTagTypeModal={showEditTagTypeModal}
        setShowEditTagTypeModal={setShowEditTagTypeModal}
        editingTagType={editingTagType}
        handleEditTagType={handleEditTagType}
        setEditingTagType={setEditingTagType}
      />
    </>
  );
};

export default TagModals;
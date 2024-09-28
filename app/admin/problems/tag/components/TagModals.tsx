"use client"; // 确保这个组件是客户端组件

import React from 'react';
import AddTagModal from './AddTagModal';
import AddTagTypeModal from './AddTagTypeModal';

const TagModals = ({
  showAddTagModal,
  setShowAddTagModal,
  showAddTagTypeModal,
  setShowAddTagTypeModal,
  handleAddTag,
  handleAddTagType,
  cardTitles,
  editTag,
  currentTag,
  setCurrentTag
}) => {
  return (
    <>
      {/* 添加/编辑标签的弹窗 */}
      <AddTagModal
        showAddTagModal={showAddTagModal}
        setShowAddTagModal={setShowAddTagModal}
        handleAddTag={handleAddTag}
        cardTitles={cardTitles}
        editTag={editTag}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />

      {/* 添加标签分类的弹窗 */}
      <AddTagTypeModal
        showAddTagTypeModal={showAddTagTypeModal}
        setShowAddTagTypeModal={setShowAddTagTypeModal}
        handleAddTagType={handleAddTagType}
      />
    </>
  );
};

export default TagModals;
"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TagModals from '../components/TagModals';
import TagSlider from '../components/TagSlider';

const TagPage = () => {
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showAddTagTypeModal, setShowAddTagTypeModal] = useState(false);
  const [showEditTagTypeModal, setShowEditTagTypeModal] = useState(false); // 控制编辑标签分类的弹窗
  const [cards, setCards] = useState([{ title: '默认分类', tags: [] }]);
  const [editingTag, setEditingTag] = useState(null);
  const [editingTagType, setEditingTagType] = useState(null); // 当前编辑的标签分类

  const handleAddTag = (tag) => {
    const updatedCards = [...cards];
    const cardIndex = updatedCards.findIndex((card) => card.title === tag.type);
    if (cardIndex > -1) {
      updatedCards[cardIndex].tags.push(tag);
    }
    setCards(updatedCards);
  };

  const handleAddTagType = (tagType) => {
    setCards([...cards, { title: tagType, tags: [] }]);
  };

  const handleEditTagType = (updatedTagType) => {
    if (!updatedTagType) {
      setCards(cards.filter(card => card !== editingTagType)); // 删除标签分类
    } else {
      setCards(cards.map(card => card.title === editingTagType.title ? updatedTagType : card)); // 更新标签分类
    }
    setEditingTagType(null); // 清除当前编辑的标签分类
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex space-x-4 mb-4">
        <Button variant="contained" color="primary" onClick={() => setShowAddTagModal(true)}>
          添加标签
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setShowAddTagTypeModal(true)}>
          添加标签分类
        </Button>
      </div>
      <TagSlider
        cards={cards}
        setCards={setCards}
        setEditingTag={setEditingTag}
        setShowAddTagModal={setShowAddTagModal}
        setEditingTagType={setEditingTagType} // 用于编辑标签分类
        setShowEditTagTypeModal={setShowEditTagTypeModal} // 打开编辑标签分类弹窗
      />
      <TagModals
        showAddTagModal={showAddTagModal}
        setShowAddTagModal={setShowAddTagModal}
        showAddTagTypeModal={showAddTagTypeModal}
        setShowAddTagTypeModal={setShowAddTagTypeModal}
        showEditTagTypeModal={showEditTagTypeModal} // 编辑标签分类弹窗控制
        setShowEditTagTypeModal={setShowEditTagTypeModal}
        handleAddTag={handleAddTag}
        handleAddTagType={handleAddTagType}
        handleEditTagType={handleEditTagType} // 处理编辑标签分类
        cardTitles={cards.map((card) => card.title)}
        currentTag={editingTag}
        handleEditTag={setEditingTag}
        setCurrentTag={setEditingTag}
        editingTagType={editingTagType} // 当前编辑的标签分类
        setEditingTagType={setEditingTagType}
      />
    </div>
  );
};

export default TagPage;
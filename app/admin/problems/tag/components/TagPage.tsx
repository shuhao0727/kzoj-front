"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TagModals from '../components/TagModals';
import TagSlider from '../components/TagSlider';

const TagPage = () => {
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showAddTagTypeModal, setShowAddTagTypeModal] = useState(false);
  const [cards, setCards] = useState([{ title: '默认分类', tags: [] }]);
  const [editingTag, setEditingTag] = useState(null);

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

  const handleEditTag = (updatedTag) => {
    const updatedCards = cards.map((card) => {
      if (card.title === updatedTag.type) {
        const updatedTags = card.tags.map((tag) =>
          tag.name === editingTag.name ? updatedTag : tag
        );
        return { ...card, tags: updatedTags };
      }
      return card;
    });
    setCards(updatedCards);
    setEditingTag(null);
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
      <TagSlider cards={cards} setCards={setCards} setEditingTag={setEditingTag} />
      <TagModals
        showAddTagModal={showAddTagModal}
        setShowAddTagModal={setShowAddTagModal}
        showAddTagTypeModal={showAddTagTypeModal}
        setShowAddTagTypeModal={setShowAddTagTypeModal}
        handleAddTag={handleAddTag}
        handleAddTagType={handleAddTagType}
        cardTitles={cards.map((card) => card.title)}
        editingTag={editingTag}
        handleEditTag={handleEditTag}
      />
    </div>
  );
};

export default TagPage;
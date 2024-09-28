"use client";

import React, { useState } from 'react';
import { Button, Modal, Switch, TextField, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CreateEditTraining from './CreateEditTraining';
import ManageProblems from './ManageProblems';

interface Training {
  id: number;
  serial: number;
  title: string;
  category: string;
  access: string;
  visible: boolean;
  problems: number[];
}

const TrainingList = () => {
  const [trainings, setTrainings] = useState<Training[]>([
    { id: 2, serial: 1000, title: '入门', category: '基础训练', access: 'Private', visible: true, problems: [1, 2] },
    { id: 4, serial: 1001, title: '顺序结构', category: '数据结构', access: 'Private', visible: true, problems: [3] },
    { id: 5, serial: 1002, title: '选择结构', category: '算法进阶', access: 'Private', visible: false, problems: [] },
  ]);

  const [filteredCategory, setFilteredCategory] = useState('');
  const [filteredTitle, setFilteredTitle] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showProblemsModal, setShowProblemsModal] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);

  const categories = Array.from(new Set(trainings.map((t) => t.category)));
  const titles = trainings.map((t) => t.title);

  const handleSaveTraining = (training: Training) => {
    if (editingTraining) {
      setTrainings(trainings.map((t) => (t.id === training.id ? training : t)));
    } else {
      setTrainings([...trainings, { ...training, serial: generateMinSerial() }]);
    }
    setEditingTraining(null);
    setShowModal(false);
  };

  const generateMinSerial = () => {
    let serial = 1000;
    const allSerials = trainings.map((t) => t.serial);
    while (allSerials.includes(serial)) {
      serial += 1;
    }
    return serial;
  };

  const handleDeleteTraining = (id: number) => {
    setTrainings(trainings.filter((training) => training.id !== id));
  };

  const handleToggleVisibility = (id: number) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id ? { ...training, visible: !training.visible } : training
      )
    );
  };

  const handleManageProblems = (training: Training) => {
    setEditingTraining(training);
    setShowProblemsModal(true);
  };

  const handleCreateClick = () => {
    setEditingTraining(null);
    setShowModal(true);
  };

  const handleEditClick = (training: Training) => {
    setEditingTraining(training);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">训练列表</h1>
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          + 创建
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <FormControl fullWidth>
          <Autocomplete
            options={categories}
            value={filteredCategory}
            onInputChange={(event, newValue) => setFilteredCategory(newValue || '')}
            renderInput={(params) => <TextField {...params} label="分类" variant="outlined" />}
            freeSolo
          />
        </FormControl>
        <FormControl fullWidth>
          <Autocomplete
            options={titles}
            value={filteredTitle}
            onInputChange={(event, newValue) => setFilteredTitle(newValue || '')}
            renderInput={(params) => <TextField {...params} label="标题" variant="outlined" />}
            freeSolo
          />
        </FormControl>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">序号</th>
            <th className="py-2 px-4 border-b text-left">分类</th>
            <th className="py-2 px-4 border-b text-left">标题</th>
            <th className="py-2 px-4 border-b">权限</th>
            <th className="py-2 px-4 border-b">是否可见</th>
            <th className="py-2 px-4 border-b">操作</th>
          </tr>
        </thead>
        <tbody>
          {trainings
            .filter(
              (training) =>
                (filteredCategory === '' || training.category === filteredCategory) &&
                (filteredTitle === '' || training.title === filteredTitle)
            )
            .map((training) => (
              <tr key={training.id} className="text-center">
                <td className="py-2 px-4 border-b">{training.serial}</td>
                <td className="py-2 px-4 border-b text-left">{training.category}</td>
                <td className="py-2 px-4 border-b text-left">{training.title}</td>
                <td className="py-2 px-4 border-b">
                  <span className="text-white bg-red-500 px-2 py-1 rounded">{training.access}</span>
                </td>
                <td className="py-2 px-4 border-b">
                  <Switch
                    checked={training.visible}
                    onChange={() => handleToggleVisibility(training.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(training)}>
                    编辑
                  </Button>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteTraining(training.id)}>
                    删除
                  </Button>
                  <Button variant="contained" color="default" size="small" onClick={() => handleManageProblems(training)}>
                    管理题目
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <CreateEditTraining
            existingTraining={editingTraining}
            onSave={handleSaveTraining}
            categories={categories}
            closeModal={() => setShowModal(false)}
            allSerials={trainings.map((t) => t.serial)}
          />
        </div>
      </Modal>

      <Modal open={showProblemsModal} onClose={() => setShowProblemsModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          {editingTraining && (
            <ManageProblems
              closeModal={() => setShowProblemsModal(false)}
              training={editingTraining}
              onSave={(updatedProblems) => {
                setTrainings(
                  trainings.map((t) => (t.id === editingTraining.id ? { ...t, problems: updatedProblems } : t))
                );
                setShowProblemsModal(false);
              }}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TrainingList;
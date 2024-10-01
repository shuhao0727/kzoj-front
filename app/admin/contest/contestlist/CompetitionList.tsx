"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal, Switch, TextField } from "@mui/material";
import CreateEditCompetition from "./CreateEditCompetition";
import ManageCompetitionProblems from "./ManageCompetitionProblems";

interface Competition {
  id: number;
  serial: number;
  title: string;
  category: string;
  access: string;
  visible: boolean;
  startTime: string;
  endTime: string;
  problems: { id: number, title: string, difficulty: string, score: number }[]; // 修改为带有分值的结构
}

const CompetitionList = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: 2,
      serial: 1000,
      title: "比赛一",
      category: "算法比赛",
      access: "Private",
      visible: true,
      startTime: "2024-10-01 10:00",
      endTime: "2024-10-01 12:00",
      problems: [
        { id: 1, title: "模拟题目标题 1", difficulty: "中等", score: 100 },
        { id: 2, title: "模拟题目标题 2", difficulty: "困难", score: 150 },
      ],
    },
    {
      id: 4,
      serial: 1001,
      title: "比赛二",
      category: "编程比赛",
      access: "Public",
      visible: true,
      startTime: "2024-10-02 15:00",
      endTime: "2024-10-02 17:00",
      problems: [{ id: 3, title: "模拟题目标题 3", difficulty: "简单", score: 50 }],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 比赛类型搜索框的状态
  const [searchTerm, setSearchTerm] = useState<string>(""); // 比赛名称或题目名称的搜索框状态

  const [showModal, setShowModal] = useState(false); // 控制创建/编辑弹窗
  const [showProblemsModal, setShowProblemsModal] = useState(false); // 管理题目弹窗状态
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null); // 控制只展开一个比赛

  // 保存比赛信息
  const handleSaveCompetition = (competition: Competition) => {
    if (editingCompetition) {
      setCompetitions(
        competitions.map((c) => (c.id === competition.id ? competition : c))
      );
    } else {
      setCompetitions([...competitions, { ...competition, serial: generateMinSerial() }]);
    }
    setEditingCompetition(null);
    setShowModal(false);
  };

  // 生成未使用的最小序号
  const generateMinSerial = () => {
    let serial = 1000;
    const allSerials = competitions.map((c) => c.serial);
    while (allSerials.includes(serial)) {
      serial += 1;
    }
    return serial;
  };

  // 删除比赛
  const handleDeleteCompetition = (id: number) => {
    setCompetitions(competitions.filter((competition) => competition.id !== id));
  };

  // 切换比赛的可见性状态
  const handleToggleVisibility = (id: number) => {
    setCompetitions(
      competitions.map((competition) =>
        competition.id === id ? { ...competition, visible: !competition.visible } : competition
      )
    );
  };

  // 打开管理题目的弹窗
  const handleManageProblems = (competition: Competition) => {
    setEditingCompetition(competition);
    setShowProblemsModal(true);
  };

  // 打开创建/编辑比赛的弹窗
  const handleCreateClick = () => {
    setEditingCompetition(null);
    setShowModal(true); // 设置 showModal 为 true，显示弹窗
  };

  const handleEditClick = (competition: Competition) => {
    setEditingCompetition(competition);
    setShowModal(true);
  };

  // 展开和关闭比赛详情
  const toggleExpand = (serial: number) => {
    setExpanded((prevExpanded) => (prevExpanded === serial ? null : serial));
  };

  // 根据比赛类型和比赛名称/题目名称过滤比赛
  const filteredCompetitions = competitions.filter((competition) => {
    const categoryMatch = selectedCategory === "" || competition.category.includes(selectedCategory);
    const termMatch =
      searchTerm === "" ||
      competition.title.includes(searchTerm) ||
      competition.problems.some((problem) => problem.title.includes(searchTerm));
    return categoryMatch && termMatch;
  });

  return (
    <div className="container mx-auto p-6 overflow-hidden"> {/* 页面整体禁止滚动 */}
      <div className="sticky top-0 bg-white z-10 p-6"> {/* 固定顶部 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">比赛列表</h1>
          <Button variant="contained" color="primary" onClick={handleCreateClick}>
            + 创建
          </Button>
        </div>

        <div className="flex space-x-4 mb-4">
          {/* 搜索比赛类型 */}
          <TextField
            label="搜索比赛类型"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            variant="outlined"
          />

          {/* 搜索比赛名称、题目名称 */}
          <TextField
            label="搜索比赛名称、题目名称"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>
      </div>

      {/* 比赛列表区域，确保列表区域的滚动条只在内容超出时显示 */}
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto"> {/* 仅让比赛列表可滚动 */}
        {filteredCompetitions.map((competition) => (
          <div key={competition.id} className="mb-4">
            <div
              className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer"
              onClick={() => toggleExpand(competition.serial)}
            >
              <span>{competition.serial} - {competition.title}</span>
              <div className="flex items-center space-x-4">
                <span>{competition.category}</span>
                <span className={`text-white px-2 py-1 rounded ${competition.access === 'Private' ? 'bg-red-500' : 'bg-green-500'}`}>
                  {competition.access}
                </span>
                <span>{competition.startTime} - {competition.endTime}</span>
                <Switch
                  checked={competition.visible}
                  onChange={() => handleToggleVisibility(competition.id)}
                />
              </div>
            </div>

            {/* 比赛展开后的题目信息 */}
            {expanded === competition.serial && (
              <div className="p-4 bg-white border">
                <h3 className="font-bold mb-2">比赛题目：</h3>
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">题目ID</th>
                      <th className="py-2 px-4 border-b text-left">题目标题</th>
                      <th className="py-2 px-4 border-b text-left">难度</th>
                      <th className="py-2 px-4 border-b text-left">分值</th> {/* 新增分值列 */}
                    </tr>
                  </thead>
                  <tbody>
                    {competition.problems.map((problem) => (
                      <tr key={problem.id}>
                        <td className="py-2 px-4 border-b text-left">{problem.id}</td>
                        <td className="py-2 px-4 border-b text-left">{problem.title}</td>
                        <td className="py-2 px-4 border-b text-left">{problem.difficulty}</td>
                        <td className="py-2 px-4 border-b text-left">{problem.score}</td> {/* 显示题目的分值 */}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end space-x-4 mt-4">
                  <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(competition)}>
                    编辑
                  </Button>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteCompetition(competition.id)}>
                    删除
                  </Button>
                  <Button variant="contained" color="default" size="small" onClick={() => handleManageProblems(competition)}>
                    管理题目
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 创建/编辑比赛的弹窗 */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <CreateEditCompetition
            competition={editingCompetition}
            onSave={handleSaveCompetition}
            closeModal={() => setShowModal(false)}
          />
        </div>
      </Modal>

      {/* 管理题目的弹窗 */}
      <Modal open={showProblemsModal} onClose={() => setShowProblemsModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          {editingCompetition && (
            <ManageCompetitionProblems
              competition={editingCompetition}
              onSave={(updatedProblems) => {
                setCompetitions(
                  competitions.map((t) =>
                    t.id === editingCompetition.id ? { ...t, problems: updatedProblems } : t
                  )
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

export default CompetitionList;
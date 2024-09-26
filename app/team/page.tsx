"use client";

import { useMemo, useState } from "react";

const teamData: {
  id: number;
  name: string;
  members: number;
  type: string;
  date: string;
  owner: string;
}[] = [
  {
    id: 1,
    name: "CSP-J/S",
    members: 11,
    type: "私有团队",
    date: "2023-08-27",
    owner: "root",
  },
  {
    id: 2,
    name: "NOIP团队",
    members: 7,
    type: "私有团队",
    date: "2023-09-24",
    owner: "root",
  },
  // 其他团队数据...
];

const TeamList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("全部");
  const [myTeams] = useState<boolean>(false);

  const filteredTeams = useMemo(
    () =>
      teamData.filter((team) => {
        return (
          (selectedType === "全部" || team.type === selectedType) &&
          (!myTeams || team.owner === "root") && // 假设'root'为当前用户
          team.name.includes(searchTerm)
        );
      }),
    [searchTerm, selectedType, myTeams]
  );

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      {/* 搜索框和按钮 */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入关键词"
          className="border p-2 rounded-lg w-full md:w-1/3 shadow-md"
        />
        <div className="flex space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
            我的团队
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            + 创建团队
          </button>
        </div>
      </div>

      {/* 筛选选项 */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedType("全部")}
            className={`px-3 py-1 rounded-lg shadow-md ${
              selectedType === "全部"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-300`}
          >
            全部
          </button>
          <button
            onClick={() => setSelectedType("公开团队")}
            className={`px-3 py-1 rounded-lg shadow-md ${
              selectedType === "公开团队"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-300`}
          >
            公开团队
          </button>
          <button
            onClick={() => setSelectedType("保护团队")}
            className={`px-3 py-1 rounded-lg shadow-md ${
              selectedType === "保护团队"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-300`}
          >
            保护团队
          </button>
          <button
            onClick={() => setSelectedType("私有团队")}
            className={`px-3 py-1 rounded-lg shadow-md ${
              selectedType === "私有团队"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-300`}
          >
            私有团队
          </button>
        </div>
      </div>

      {/* 团队列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:bg-gray-50 transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src="https://example.com/team-icon.png"
                alt="Team Icon"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {team.name}
                </h3>
                <p className="text-gray-500">
                  成员: {team.members} | 类型: {team.type}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>👤 {team.owner}</span>
              <span>📅 {team.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分页组件 */}
      <div className="flex justify-end items-center mt-6 space-x-2">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          &lt;
        </button>
        <span className="px-4 py-2 text-gray-600">1</span>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TeamList;

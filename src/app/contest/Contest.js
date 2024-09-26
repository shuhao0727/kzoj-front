import React, { useState } from 'react';

const contestData = [
  { id: 1, title: '24.8.17', type: '公开赛', status: '赛后提交', date: '2024-08-17 00:00:00', duration: '1天', contestType: 'OI', ended: false },
  { id: 2, title: '24.8.14', type: '私有赛', status: '赛后提交', date: '2024-08-14 00:00:00', duration: '1天', contestType: 'OI', ended: false },
  { id: 3, title: '24.8.11', type: '私有赛', status: '已结束', date: '2024-08-11 00:00:00', duration: '1天', contestType: 'OI', ended: true },
  { id: 4, title: '23/7/16暑假适应性练习6', type: '私有赛', status: '已结束', date: '2024-07-16 08:30:00', duration: '3.5小时', contestType: 'OI', ended: true },
  { id: 5, title: '23/7/13暑假适应性练习5', type: '私有赛', status: '已结束', date: '2024-07-13 08:30:00', duration: '3.5小时', contestType: 'OI', ended: true },
];

const Contest = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">全部比赛</h1>

      {/* 搜索和筛选框 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="mr-2 text-gray-700">赛制</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="全部">全部</option>
              <option value="公开赛">公开赛</option>
              <option value="私有赛">私有赛</option>
            </select>
          </div>

          <div>
            <label className="mr-2 text-gray-700">状态</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="全部">全部</option>
              <option value="进行中">进行中</option>
              <option value="已结束">已结束</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="输入关键词"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 比赛列表 */}
      <div className="space-y-4">
        {contestData
          .filter(contest => 
            (selectedType === '全部' || contest.type === selectedType) &&
            (selectedStatus === '全部' || (selectedStatus === '已结束' ? contest.ended : !contest.ended)) &&
            (contest.title.includes(search))
          )
          .map((contest) => (
            <div key={contest.id} className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* 图标和标题 */}
                <div>
                  <img src="https://example.com/trophy-icon.png" alt="Trophy" className="h-12 w-12 rounded-full shadow-md" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{contest.title}</h3>
                  <p className="text-gray-600">
                    <span className="mr-4">
                      <i className="far fa-calendar-alt"></i> {contest.date}
                    </span>
                    <span className="mr-4">
                      <i className="far fa-clock"></i> {contest.duration}
                    </span>
                    <span>
                      <i className="fas fa-trophy"></i> {contest.contestType}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* 比赛类型和状态 */}
                <span className={`px-3 py-1 rounded-full shadow-sm ${contest.type === '公开赛' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {contest.type}
                </span>
                <span className={`px-3 py-1 rounded-full shadow-sm ${contest.ended ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                  {contest.status}
                </span>

                {/* 提交按钮 */}
                {contest.ended ? (
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                    已结束
                  </button>
                ) : (
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    赛后提交
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contest;
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  // 定义状态用于保存数据
  const [recentLogin, setRecentLogin] = useState({
    time: '2024-09-25 16:19:18',
    ip: '112.80.13.131',
    os: 'OS X 10.15.7',
    browser: 'chrome 129.0.0',
  });

  const [backendData, setBackendData] = useState({
    totalUsers: 313,
    totalSubmissionsToday: 4,
    recentCompetitions: 0,
  });

  const [backendServices, setBackendServices] = useState([
    {
      name: 'hoj-data-backup',
      host: '172.20.0.5',
      port: 6688,
      cpuCores: 2,
      cpuUsage: '0.51%',
      memoryUsage: '36.46%',
      unstable: false,
      status: 'healthy',
    },
  ]);

  const [judgeSystem, setJudgeSystem] = useState([
    {
      id: 1,
      name: 'judger-alone',
      host: '172.20.0.7',
      port: 8088,
      cpuCores: 2,
      cpuUsage: '4.04%',
      memoryUsage: '36.46%',
      unstable: false,
      status: 'healthy',
    },
  ]);

  // 模拟接口请求
  useEffect(() => {
    // 此处可通过API请求动态获取数据
    // setRecentLogin(apiResponse.login);
    // setBackendData(apiResponse.backendData);
    // setBackendServices(apiResponse.backendServices);
    // setJudgeSystem(apiResponse.judgeSystem);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* 用户信息及数据统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 用户信息板块 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
          <img className="h-16 w-16 rounded-full" src="https://via.placeholder.com/150" alt="avatar" />
          <div>
            <h2 className="text-2xl font-bold text-blue-600">root</h2>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">超级管理员</span>
            <div className="mt-4 text-sm text-gray-600">
              <p>最近登录: {recentLogin.time}</p>
              <p>IP: {recentLogin.ip}</p>
              <p>OS: {recentLogin.os}</p>
              <p>Browser: {recentLogin.browser}</p>
            </div>
          </div>
        </div>

        {/* 数据统计模块 */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg text-gray-500">总用户数</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{backendData.totalUsers}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg text-gray-500">今日总提交数</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{backendData.totalSubmissionsToday}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg text-gray-500">最近两周比赛</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{backendData.recentCompetitions}</p>
          </div>
        </div>
      </div>

      {/* 后端服务面板 */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700">后端系统</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">服务器数量: 1</p>
          <div className="flex items-center space-x-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">Nacos 状态: UP</span>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">HTTPS 状态: Enabled</span>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-gray-500">名称</th>
                <th className="p-2 text-left text-gray-500">主机</th>
                <th className="p-2 text-left text-gray-500">端口</th>
                <th className="p-2 text-left text-gray-500">CPU核心数</th>
                <th className="p-2 text-left text-gray-500">CPU使用率</th>
                <th className="p-2 text-left text-gray-500">内存使用率</th>
                <th className="p-2 text-left text-gray-500">不稳定</th>
                <th className="p-2 text-left text-gray-500">状态</th>
              </tr>
            </thead>
            <tbody>
              {backendServices.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2">{service.name}</td>
                  <td className="p-2">{service.host}</td>
                  <td className="p-2">{service.port}</td>
                  <td className="p-2">{service.cpuCores}</td>
                  <td className="p-2">{service.cpuUsage}</td>
                  <td className="p-2">{service.memoryUsage}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.unstable ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {service.unstable ? 'True' : 'False'}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.status === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {service.status === 'healthy' ? '健康' : '不健康'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 判题系统面板 */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700">判题系统</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">服务器数量: 1</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-gray-500">#</th>
                <th className="p-2 text-left text-gray-500">名称</th>
                <th className="p-2 text-left text-gray-500">主机</th>
                <th className="p-2 text-left text-gray-500">端口</th>
                <th className="p-2 text-left text-gray-500">CPU核心数</th>
                <th className="p-2 text-left text-gray-500">CPU使用率</th>
                <th className="p-2 text-left text-gray-500">内存使用率</th>
                <th className="p-2 text-left text-gray-500">不稳定</th>
                <th className="p-2 text-left text-gray-500">状态</th>
              </tr>
            </thead>
            <tbody>
              {judgeSystem.map((system, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2">{system.id}</td>
                  <td className="p-2">{system.name}</td>
                  <td className="p-2">{system.host}</td>
                  <td className="p-2">{system.port}</td>
                  <td className="p-2">{system.cpuCores}</td>
                  <td className="p-2">{system.cpuUsage}</td>
                  <td className="p-2">{system.memoryUsage}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${system.unstable ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {system.unstable ? 'True' : 'False'}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${system.status === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {system.status === 'healthy' ? '健康' : '不健康'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
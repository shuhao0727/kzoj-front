"use client";

import "chart.js/auto";
import Link from "next/link";
import { Line } from "react-chartjs-2";

const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }
  return dates;
};

type NewsItem = {
  title: string;
  date: string;
  author: string;
};

type Announcement = {
  title: string;
  date: string;
  author: string;
};

type LinkItem = {
  name: string;
  href: string;
};

const newsList: NewsItem[] = [
  { title: "2024年CSP认证新闻", date: "2024-09-25", author: "Admin" },
  { title: "2023年NOIP资格赛新闻", date: "2023-12-17", author: "Admin" },
  {
    title: "提醒：2023年NOIP复赛新闻",
    date: "2023-10-11",
    author: "Admin",
  },
];

const announcements: Announcement[] = [
  { title: "安全须知", date: "2024-09-24", author: "root" },
  { title: "2023年NOIP资格赛监测公告", date: "2023-12-17", author: "root" },
  {
    title: "提醒：2023年NOIP复赛即将到来",
    date: "2023-10-11",
    author: "root",
  },
];

const links: LinkItem[] = [
  { name: "Google", href: "https://www.google.com" },
  { name: "GitHub", href: "https://github.com" },
  { name: "LeetCode", href: "https://leetcode.com" },
];

const leaderboard: { user: string; submissions: number }[] = [];

const submissions = {
  labels: getLast7Days(),
  datasets: [
    {
      label: "通过数",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "rgba(144, 238, 144, 1)",
      backgroundColor: "rgba(144, 238, 144, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
    },
    {
      label: "提交总数",
      data: [20, 25, 10, 12, 8, 10, 15],
      borderColor: "rgba(173, 216, 230, 1)",
      backgroundColor: "rgba(173, 216, 230, 0.2)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
    },
  ],
};

const countdown: Record<string, number> = {
  csp: 31,
  noip: 66,
};

const Home = () => {
  return (
    <div className="container mx-auto p-6 space-y-12 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* 新闻板块 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">新闻</h2>
            <ul>
              {newsList.map((news, index) => (
                <li key={index} className="mb-2">
                  {news.title} - {news.date} - {news.author}
                </li>
              ))}
            </ul>
          </div>

          {/* 公告板块 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">公告</h2>
            <ul>
              {announcements.map((announcement, index) => (
                <li key={index} className="mb-2">
                  {announcement.title} - {announcement.date} -{" "}
                  {announcement.author}
                </li>
              ))}
            </ul>
          </div>

          {/* 最近一周提交统计 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              最近一周提交统计
            </h2>
            <div className="h-64">
              <Line
                data={submissions}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      ticks: {
                        autoSkip: false,
                      },
                    },
                  },
                  plugins: {
                    tooltip: {
                      enabled: true,
                    },
                    legend: {
                      labels: {
                        usePointStyle: false, // 禁用点样式，显示线段
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          {/* 倒计时 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">倒计时</h2>
            <p>
              2024年CSP一轮认证倒计时: <strong>{countdown.csp}天</strong>
            </p>
            <p>
              2024年NOIP倒计时: <strong>{countdown.noip}天</strong>
            </p>
          </div>

          {/* 最近一周通过题目榜 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              最近一周通过题目榜
            </h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">序号</th>
                  <th className="px-4 py-2 text-left">用户名</th>
                  <th className="px-4 py-2 text-left">通过数</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 10).map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.user}</td>
                    <td className="px-4 py-2">{user.submissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 友情链接 */}
          <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-blue-600 mb-4">友情链接</h2>
            <ul>
              {links.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-blue-500 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

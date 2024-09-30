"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsSection from "./home/News";
import AnnouncementsSection from "./home/Announcements";
import SubmissionsStats from "./home/SubmissionsStats";
import LinksSection from "./home/Links";
import Leaderboard from "./home/Leaderboard"; 

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 增加加载状态
  const [loggedIn, setLoggedIn] = useState(false); // 增加登录状态

  useEffect(() => {
    const loginStatus = localStorage.getItem("loggedIn");

    if (!loginStatus) {
      router.push("/login");
    } else {
      setLoggedIn(true); // 设置已登录状态
      setLoading(false);  // 关闭加载状态
    }
  }, [router]);

  // 如果还在检查登录状态，显示加载中
  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  // 当用户未登录时的处理逻辑
  if (!loggedIn) {
    return <div className="flex justify-center items-center h-screen">请先登录！</div>;
  }

  // 用户已登录时显示主页面内容
  return (
    <div className="container mx-auto p-6 space-y-12 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <NewsSection />
          <AnnouncementsSection />
          <SubmissionsStats />
        </div>
        <div className="col-span-1 space-y-8">
          <Leaderboard />
          <LinksSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
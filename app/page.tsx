"use client";

import React from "react";
import NewsSection from "./home/News";
import AnnouncementsSection from "./home/Announcements";
import SubmissionsStats from "./home/SubmissionsStats";
import LinksSection from "./home/Links";
import Leaderboard from "./home/Leaderboard"; // 引入Leaderboard组件

const Home = () => {
  return (
    <div className="container mx-auto p-6 space-y-12 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <NewsSection />
          <AnnouncementsSection />
          <SubmissionsStats />
        </div>
        <div className="col-span-1 space-y-8"> {/* 将Leaderboard和LinksSection放在同一列 */}
          <Leaderboard /> 
          <LinksSection /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
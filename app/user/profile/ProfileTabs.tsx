"use client";

import React, { useState } from "react";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import HomePage from "./home/page"; // 主页内容组件
import TrainingPage from "./training/page"; // 练习内容组件
import ContestPage from "./contest/page"; // 比赛内容组件
import ColumnPage from "./column/page"; // 专栏内容组件

const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue); // 根据点击的选项卡更新 value
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 导航栏部分 */}
      <Paper className="mb-4">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="主页" sx={{ fontSize: "1.25rem" }} /> {/* 字体大小调整 */}
          <Tab label="练习" sx={{ fontSize: "1.25rem" }} /> {/* 字体大小调整 */}
          <Tab label="比赛" sx={{ fontSize: "1.25rem" }} /> {/* 字体大小调整 */}
          <Tab label="专栏" sx={{ fontSize: "1.25rem" }} /> {/* 字体大小调整 */}
        </Tabs>
      </Paper>

      {/* 选项卡对应的内容 */}
      <Box className="mt-4">
        {value === 0 && <HomePage />} {/* 主页内容 */}
        {value === 1 && <TrainingPage />} {/* 练习内容 */}
        {value === 2 && <ContestPage />} {/* 比赛内容 */}
        {value === 3 && <ColumnPage />} {/* 专栏内容 */}
      </Box>
    </div>
  );
};

export default ProfileTabs;
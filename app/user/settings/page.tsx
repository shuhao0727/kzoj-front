"use client";

import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import AvatarSettings from "./AvatarSettings";
import ProfileInfoSettings from "./ProfileSettings";

const SettingsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="flex max-w-screen-lg mx-auto mt-8">
      {/* 左侧导航 */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className="mr-8"
      >
        <Tab label="更改密码" />
        <Tab label="更改邮箱" />
        <Tab label="头像设置" />
        <Tab label="资料设置" />
      </Tabs>

      {/* 右侧内容 */}
      <Box className="flex-grow p-4 bg-white rounded shadow-md">
        {value === 0 && <ChangePassword />}
        {value === 1 && <ChangeEmail />}
        {value === 2 && <AvatarSettings />}
        {value === 3 && <ProfileInfoSettings />}
      </Box>
    </Box>
  );
};

export default SettingsPage;
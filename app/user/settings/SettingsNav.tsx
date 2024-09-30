"use client";

import React from "react";
import { Tabs, Tab } from "@mui/material";

const SettingsNav = ({ activeTab, setActiveTab }: { activeTab: number, setActiveTab: (value: number) => void }) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange={handleTabChange}
      className="border-r"
      aria-label="Settings Navigation"
    >
      <Tab label="更改密码" />
      <Tab label="更改邮箱" />
      <Tab label="头像设置" />
      <Tab label="资料设置" />
    </Tabs>
  );
};

export default SettingsNav;
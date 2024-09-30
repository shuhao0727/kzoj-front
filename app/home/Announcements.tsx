"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AnnouncementsSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showAll, setShowAll] = useState(false); // 用于控制是否显示所有公告

  // 模拟公告数据
  const announcements = [
    {
      title: "系统更新通知",
      startDate: "2024-09-28",
      author: "管理员",
      description:
        "我们将在本周末进行系统维护，预计将持续2小时，期间系统不可用。请提前保存好你的工作进度。",
      visible: true,
    },
    {
      title: "新功能发布",
      startDate: "2024-09-27",
      author: "开发团队",
      description:
        "本次更新新增了个人中心的自定义背景功能，用户可以上传自己喜欢的图片作为背景。",
      visible: true,
    },
    {
      title: "节假日放假安排",
      startDate: "2024-09-25",
      author: "人事部",
      description:
        "根据国家法定节假日安排，系统将在国庆假期期间暂停使用，假期时间为2024年10月1日至10月7日。",
      visible: true,
    },
    {
      title: "服务升级公告",
      startDate: "2024-09-20",
      author: "运营团队",
      description:
        "为了提升系统性能，我们将在未来一周内进行服务升级。期间可能会有短暂的服务中断。",
      visible: true,
    },
    {
      title: "重要安全提示",
      startDate: "2024-09-15",
      author: "安全团队",
      description:
        "请确保您的账户使用了强密码，并启用了双因素认证，以保障您的账户安全。",
      visible: true,
    },
  ];

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleShowAll = () => {
    setShowAll(!showAll); // 切换折叠/展开状态
  };

  // 根据 `showAll` 的状态显示前三条或所有公告
  const displayedAnnouncements = showAll
    ? announcements
    : announcements.slice(0, 3);

  return (
    <Box className="bg-white rounded-lg p-8 mb-8">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" color="textPrimary">
          公告
        </Typography>
        {/* 折叠图标按钮 */}
        {announcements.length > 3 && (
          <IconButton onClick={toggleShowAll}>
            <ExpandMoreIcon
              sx={{
                transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </IconButton>
        )}
      </Box>
      <Box>
        {displayedAnnouncements
          .filter((announcement) => announcement.visible)
          .map((announcement, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ flexBasis: "70%", flexShrink: 0 }}>
                  {announcement.title}
                </Typography>
                <Typography color="textSecondary">
                  {announcement.startDate} - {announcement.author}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{announcement.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </Box>
  );
};

export default AnnouncementsSection;
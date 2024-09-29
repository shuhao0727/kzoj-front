"use client";

import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // 导入图标

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      flexBasis: "70%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
    },
    accordion: {
      marginBottom: theme.spacing(1),
      backgroundColor: "white",
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      "&:before": {
        display: "none",
      },
    },
    accordionSummary: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    accordionDetails: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    header: {
      display: "flex",
      justifyContent: "space-between", // 标题和按钮在同一行，两边对齐
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    expandIcon: {
      transform: (props: { showAll: boolean }) =>
        props.showAll ? "rotate(90deg)" : "rotate(0deg)", // 通过旋转图标实现折叠
      transition: "transform 0.3s ease", // 添加动画效果
      cursor: "pointer", // 设置鼠标样式为指针
    },
  })
);

const AnnouncementsSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showAll, setShowAll] = useState(false); // 用于控制是否显示所有公告

  const classes = useStyles({ showAll }); // 动态传递 `showAll` 状态给样式

  // 模拟公告数据
  const announcements = [
    { title: "系统更新通知", startDate: "2024-09-28", author: "管理员", description: "我们将在本周末进行系统维护，预计将持续2小时，期间系统不可用。请提前保存好你的工作进度。", visible: true },
    { title: "新功能发布", startDate: "2024-09-27", author: "开发团队", description: "本次更新新增了个人中心的自定义背景功能，用户可以上传自己喜欢的图片作为背景。", visible: true },
    { title: "节假日放假安排", startDate: "2024-09-25", author: "人事部", description: "根据国家法定节假日安排，系统将在国庆假期期间暂停使用，假期时间为2024年10月1日至10月7日。", visible: true },
    { title: "服务升级公告", startDate: "2024-09-20", author: "运营团队", description: "为了提升系统性能，我们将在未来一周内进行服务升级。期间可能会有短暂的服务中断。", visible: true },
    { title: "重要安全提示", startDate: "2024-09-15", author: "安全团队", description: "请确保您的账户使用了强密码，并启用了双因素认证，以保障您的账户安全。", visible: true },
  ];

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll); // 切换折叠/展开状态
  };

  // 根据 `showAll` 的状态显示前三条或所有公告
  const displayedAnnouncements = showAll ? announcements : announcements.slice(0, 3);

  return (
    <div className="bg-white rounded-lg p-8 mb-8">
      <div className={classes.header}>
        <h2 className="text-xl font-semibold text-gray-700">公告</h2>
        {/* 折叠图标按钮 */}
        {announcements.length > 3 && (
          <ExpandMoreIcon
            className={classes.expandIcon}
            onClick={toggleShowAll}
          />
        )}
      </div>
      <div className={classes.root}>
        {displayedAnnouncements
          .filter((announcement) => announcement.visible)
          .map((announcement, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className={classes.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
                className={classes.accordionSummary}
              >
                <Typography className={classes.heading}>{announcement.title}</Typography>
                <Typography className={classes.secondaryHeading}>
                  {announcement.startDate} - {announcement.author}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Typography>{announcement.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default AnnouncementsSection;
"use client";

import { Card } from "@/components/card";
import { Title } from "@/components/title";
import React from "react";

export const MainIndexBulletin: React.FC = () => {
  return (
    <Card
      title={
        <Title as="h2" size="2xl">
          欢迎使用
        </Title>
      }
    >
      <p>公告栏公告栏公告栏</p>
    </Card>
  );
};

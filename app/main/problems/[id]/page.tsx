import { config } from "@/lib/config";
import { Metadata } from "next";
import { MainProblemDetailCard } from "./card";

export const metadata: Metadata = {
  title: `题目详情 | ${config.siteName}`,
};

export default function MainProblemDetailPage() {
  return <MainProblemDetailCard />;
}

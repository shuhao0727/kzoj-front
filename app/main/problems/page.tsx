import { config } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `题目列表 | ${config.siteName}`,
};

export default function MainProblemsListPage() {
  return <div></div>;
}

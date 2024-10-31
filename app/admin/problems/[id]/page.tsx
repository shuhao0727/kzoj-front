import { config } from "@/lib/config";
import { Metadata } from "next";
import { AdminUpdateProblemCard } from "./card";

export const metadata: Metadata = {
  title: `更新题目 | ${config.siteName}`,
};

export default function AdminProblemsListPage() {
  return <AdminUpdateProblemCard />;
}

import { config } from "@/lib/config";
import { Metadata } from "next";
import { AdminProblemsListTable } from "../table";

export const metadata: Metadata = {
  title: `题目管理 | ${config.siteName}`,
};

export default function AdminProblemsListPage() {
  return <AdminProblemsListTable />;
}

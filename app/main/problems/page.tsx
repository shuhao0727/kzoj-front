import { config } from "@/lib/config";
import { Metadata } from "next";
import { MainProblemsListTable } from "./table";

export const metadata: Metadata = {
  title: `题目列表 | ${config.siteName}`,
};

export default function MainProblemsListPage() {
  return (
    <div>
      <MainProblemsListTable />
    </div>
  );
}

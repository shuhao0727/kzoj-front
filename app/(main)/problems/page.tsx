import { config } from "@/lib/config";
import { Metadata } from "next";
import { ProblemsListTable } from "./table";

export const metadata: Metadata = {
  title: `题目列表 | ${config.siteName}`,
};

export default function ProblemsListPage() {
  return (
    <div>
      <ProblemsListTable />
    </div>
  );
}

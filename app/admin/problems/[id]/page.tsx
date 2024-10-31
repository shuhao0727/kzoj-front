import { config } from "@/lib/config";
import { Metadata } from "next";
import { AdminUpdateProblemCard } from "./card";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pid = (await params).id ?? "";
  return {
    title: `更新题目 P${pid.padStart(4, "0")} | ${config.siteName}`,
  };
}

export default function AdminProblemsListPage() {
  return <AdminUpdateProblemCard />;
}

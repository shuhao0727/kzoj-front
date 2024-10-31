import { config } from "@/lib/config";
import { Metadata } from "next";
import { AdminUpdateProblemCard } from "./card";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return {
    title: `更新题目 P${params.id.padStart(4, "0")} | ${config.siteName}`,
  };
}

export default function AdminProblemsListPage() {
  return <AdminUpdateProblemCard />;
}

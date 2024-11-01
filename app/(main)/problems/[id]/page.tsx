import { config } from "@/lib/config";
import { Metadata } from "next";
import { ProblemDetailCard } from "./card";

export const metadata: Metadata = {
  title: `题目详情 | ${config.siteName}`,
};

export default function ProblemDetailPage() {
  return <ProblemDetailCard />;
}

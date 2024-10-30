import { config } from "@/lib/config";
import { Metadata } from "next";
import { AdminCreateProblemCard } from "./card";

export const metadata: Metadata = {
  title: `添加题目 | ${config.siteName}`,
};

export default function AdminProblemCreatePage() {
  return <AdminCreateProblemCard />;
}

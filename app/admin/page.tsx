import { config } from "@/lib/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `管理首页 | ${config.siteName}`,
};

export default function AdminIndexPage() {
  return <p>Hello, admin</p>;
}

import { config } from "@/lib/config";
import { Metadata } from "next";
import { AuthLoginCard } from "./card";

export const metadata: Metadata = {
  title: `用户登录 | ${config.siteName}`,
};

export default function AuthLoginPage() {
  return <AuthLoginCard />;
}

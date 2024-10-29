import { config } from "@/lib/config";
import { Metadata } from "next";
import { AuthRegisterCard } from "./card";

export const metadata: Metadata = {
  title: `用户注册 | ${config.siteName}`,
};

export default function AuthRegisterPage() {
  return <AuthRegisterCard />;
}

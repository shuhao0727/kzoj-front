import { config } from "@/lib/config";
import { Metadata } from "next";
import { MainIndexBulletin } from "./bulletin";

export const metadata: Metadata = {
  title: `系统首页 | ${config.siteName}`,
};

export default function MainIndexPage() {
  return (
    <div>
      <MainIndexBulletin />
    </div>
  );
}

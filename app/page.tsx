"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/states/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const IndexPage: React.FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?error=unauthenticated");
    } else {
      router.push("/main/index");
    }
  }, [user, router]);

  return <div className="flex-grow bg-gray-50" />;
};

export default IndexPage;

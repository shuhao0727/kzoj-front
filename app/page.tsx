"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./context";

const IndexPage: React.FC = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?error=unauthenticated");
    } else {
      router.push("/main/index");
    }
  }, [user, router]);

  return "";
};

export default IndexPage;

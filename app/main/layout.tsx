"use client";

import { useAxios } from "@/lib/axios";
import { useUserService } from "@/lib/user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { UserContext } from "../context";
import { Footer } from "./footer";
import { Header } from "./header";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const axios = useAxios();
  const userService = useUserService(axios);
  const router = useRouter();
  const pathname = usePathname();

  const { data: user, error } = useSWR("/user/self", () =>
    userService.getSelf()
  );

  useEffect(() => {
    if (!!error) {
      router.push(`/auth/login?redirect=${pathname}&error=unauthenticated`);
    }
  }, [error, router, pathname]);

  return (
    <UserContext.Provider value={user ?? null}>
      <Header />
      <main className="pb-12 flex-grow bg-gray-50">
        <div className="container max-w-6xl mx-auto my-6 space-y-12">
          {children}
        </div>
      </main>
      <Footer />
    </UserContext.Provider>
  );
};

export default MainLayout;

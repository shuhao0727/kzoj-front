"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/states/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=${pathname}&error=unauthenticated`);
    }
  }, [user, router, pathname]);

  return (
    <>
      <Header />
      <main className="pb-12 flex-grow bg-gray-50">
        <div className="container max-w-6xl mx-auto my-6 space-y-12">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

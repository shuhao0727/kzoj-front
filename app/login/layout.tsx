import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Header } from "./header";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="zh_CN" className="h-full">
      <body className="flex flex-col min-h-screen h-full">
        {pathname !== '/login' && <Header />}
        <main className="flex-grow">{children}</main>
        {pathname !== '/login' && <Footer />}
      </body>
    </html>
  );
};

export default RootLayout;
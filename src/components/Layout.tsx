
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="container py-6">
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Layout;

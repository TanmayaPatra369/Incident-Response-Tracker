
import { Link, useLocation } from "react-router-dom";
import { Activity, Home, LogOut, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Create Incident", href: "/incidents/create", icon: Plus },
    { name: "Activity Log", href: "/activity", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-full flex flex-col bg-white border-r">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">IRT</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = location.pathname === link.href;
          
          return (
            <Link key={link.name} to={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1",
                  isActive ? "bg-secondary" : ""
                )}
              >
                <LinkIcon className="mr-3 h-5 w-5" />
                {link.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-500 hover:text-gray-700"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

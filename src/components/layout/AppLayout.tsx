import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AppHeader sidebarCollapsed={sidebarCollapsed} />
      
      <main
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarCollapsed ? "ml-sidebar-collapsed" : "ml-sidebar"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  sidebarCollapsed: boolean;
  onToggle?: () => void;
}

export function AppHeader({ sidebarCollapsed, onToggle }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 h-16 bg-background border-b border-border transition-all duration-300",
        sidebarCollapsed ? "left-sidebar-collapsed" : "left-sidebar"
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cargo, clients, or tracking numbers..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" onClick={() => window.location.href = '/notifications'}>
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">Admin User</div>
                  <div className="text-xs text-muted-foreground">admin@primepre.com</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/profile'}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/notifications'}>Notifications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/support'}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
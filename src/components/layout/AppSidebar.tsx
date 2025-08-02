import { 
  LayoutDashboard, 
  Users, 
  Ship, 
  Plane, 
  AlertTriangle, 
  Package, 
  MapPin, 
  Calculator, 
  Settings, 
  UserCog,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  {
    name: "Cargo",
    children: [
      { name: "Sea Cargo", href: "/cargos/sea", icon: Ship },
      { name: "Air Cargo", href: "/cargos/air", icon: Plane },
    ],
  },
  {
    name: "Goods Received",
    children: [
      { name: "China", href: "/goods/china", icon: Package },
      { name: "Ghana", href: "/goods/ghana", icon: MapPin },
    ],
  },
  { name: "Package Claims", href: "/claims", icon: AlertTriangle },
  { name: "Rates", href: "/rates", icon: Calculator },
  { name: "Admins", href: "/my-admins", icon: UserCog },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isGroupActive = (children: Array<{ href: string }>) => {
    return children.some((child) => isActive(child.href));
  };

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-30 h-full bg-background border-r border-border transition-all duration-300",
        isCollapsed ? "w-sidebar-collapsed" : "w-sidebar",
        "md:z-30 z-30"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-heading font-semibold text-foreground">PRIMEPRE</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          if (item.children) {
            const groupActive = isGroupActive(item.children);
            const isOpen = openGroups[item.name] || groupActive;
            
            return (
              <Collapsible key={item.name} open={isOpen} onOpenChange={() => toggleGroup(item.name)}>
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted",
                      groupActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center">
                      <Package className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </span>
                    {!isCollapsed && (
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      className={cn(
                        "flex items-center px-3 py-2 ml-6 text-sm font-medium rounded-md transition-colors",
                        isActive(child.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span className="ml-3">{child.name}</span>}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
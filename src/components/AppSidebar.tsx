import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Truck, 
  UserCheck, 
  Wrench, 
  AlertTriangle, 
  Shield,
  Users,
  BarChart3,
  Settings,
  MapPin,
  Package,
  Lightbulb
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface NavigationItem {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
}

const mainNavigationItems: NavigationItem[] = [
  { title: "Overview", value: "overview", icon: LayoutDashboard },
  { title: "Vehicles", value: "vehicles", icon: Truck },
  { title: "Drivers", value: "drivers", icon: UserCheck },
  { title: "Technicians", value: "technicians", icon: Wrench },
  { title: "Assign", value: "assign", icon: Users },
  { title: "Live Map", value: "live-map", icon: MapPin },
];

const systemNavigationItems: NavigationItem[] = [
  { title: "Maintenance", value: "maintenance", icon: Shield },
  { title: "Issues", value: "issues", icon: AlertTriangle },
  { title: "Scheduled Service", value: "scheduled-service", icon: Package },
  { title: "Actionable Insights", value: "insights", icon: Lightbulb },
  { title: "Reports", value: "reports", icon: BarChart3 },
  { title: "Settings", value: "settings", icon: Settings },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleItemClick = (value: string) => {
    onTabChange(value);
  };

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-60"} bg-sidebar border-sidebar-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => handleItemClick(item.value)}
                    className={`w-full justify-start text-sidebar-foreground ${
                      activeTab === item.value
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="px-3 py-2">
          <Separator />
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => handleItemClick(item.value)}
                    className={`w-full justify-start text-sidebar-foreground ${
                      activeTab === item.value
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
import { useState } from "react";
import FleetOverview from "@/components/FleetOverview";
import VehicleList from "@/components/VehicleList";
import DriversSection from "@/components/DriversSection";
import TechniciansSection from "@/components/TechniciansSection";
import IssueReporting from "@/components/IssueReporting";
import EmergencyAlerts from "@/components/EmergencyAlerts";
import MaintenanceReminders from "@/components/MaintenanceReminders";
import AssignSection from "@/components/AssignSection";
import ReportsSection from "@/components/ReportsSection";
import SettingsSection from "@/components/SettingsSection";
import LiveMap from "@/components/LiveMap";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Truck, AlertTriangle, Wrench, Shield, Activity, Menu } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock drivers data for now - this will be managed in DriversSection
  const drivers = [
    { id: "DRV-001", name: "Adebayo Johnson" },
    { id: "DRV-002", name: "Kemi Okafor" },
    { id: "DRV-003", name: "Emeka Nwankwo" },
    { id: "DRV-004", name: "Fatima Hassan" },
    { id: "DRV-005", name: "Tunde Bakare" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <FleetOverview />;
      case "vehicles":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fleet Vehicles</CardTitle>
              <CardDescription>
                Monitor and manage all vehicles in your fleet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VehicleList drivers={drivers} />
            </CardContent>
          </Card>
        );
      case "drivers":
        return <DriversSection />;
      case "technicians":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fleet Technicians</CardTitle>
              <CardDescription>
                Manage technician profiles, specializations, and repair assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TechniciansSection />
            </CardContent>
          </Card>
        );
      case "assign":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personnel Assignments</CardTitle>
              <CardDescription>
                Assign drivers and technicians to vehicles and manage their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssignSection />
            </CardContent>
          </Card>
        );
      case "maintenance":
        return <MaintenanceReminders />;
      case "issues":
        return <IssueReporting />;
      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fleet Reports</CardTitle>
              <CardDescription>
                Comprehensive reporting hub for drivers, vehicles, and technicians
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsSection />
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fleet Settings</CardTitle>
              <CardDescription>
                Configure notifications, report frequency, and role permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsSection />
            </CardContent>
          </Card>
        );
      case "live-map":
        return <LiveMap />;
      default:
        return <FleetOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Bumble Bee</h1>
                    <p className="text-muted-foreground text-sm">Fleet Management Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
                    ● Online
                  </div>
                  <button
                    onClick={() => window.location.href = '/alerts'}
                    className="p-2 rounded-full hover:bg-critical/10 transition-colors"
                    title="Emergency Alerts"
                  >
                    <AlertTriangle className="h-5 w-5 text-critical animate-pulse" />
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>


          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6">
            <div className="space-y-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
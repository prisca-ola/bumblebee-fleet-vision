import { useState } from "react";
import FleetOverview from "@/components/FleetOverview";
import VehicleList from "@/components/VehicleList";
import DriversSection from "@/components/DriversSection";
import IssueReporting from "@/components/IssueReporting";
import EmergencyAlerts from "@/components/EmergencyAlerts";
import MaintenanceReminders from "@/components/MaintenanceReminders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, AlertTriangle, Wrench, Shield, Activity } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bumble Bee</h1>
                <p className="text-muted-foreground text-sm">Fleet Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
                ● Online
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Alerts - Always visible when present */}
      <EmergencyAlerts />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Issues
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <FleetOverview />
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Drivers</CardTitle>
                <CardDescription>
                  Manage driver information, licenses, and assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DriversSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <MaintenanceReminders />
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <IssueReporting />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Track vehicle licenses, insurance, and regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Compliance tracking coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
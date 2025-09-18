import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Fuel,
  Clock,
  Shield,
  TrendingUp
} from "lucide-react";

const FleetOverview = () => {
  // Mock data - in real app this would come from API
  const fleetStats = {
    totalVehicles: 24,
    healthyVehicles: 18,
    maintenanceNeeded: 4,
    criticalIssues: 2,
    averageFuelEconomy: 12.5,
    totalDowntime: 48,
    complianceRate: 92,
    activeDrivers: 22
  };

  const issuesByType = [
    { type: "Engine Issues", count: 3, severity: "critical" },
    { type: "Brake System", count: 2, severity: "warning" },
    { type: "Tire Wear", count: 5, severity: "maintenance" },
    { type: "Electrical", count: 1, severity: "critical" },
  ];

  const upcomingServices = [
    { vehicle: "BUS-001", type: "Oil Change", dueDate: "2024-01-15", dueKm: 5000 },
    { vehicle: "VAN-003", type: "Brake Inspection", dueDate: "2024-01-18", dueKm: 2500 },
    { vehicle: "TRK-007", type: "Annual Service", dueDate: "2024-01-20", dueKm: 8000 },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Fleet Health */}
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round((fleetStats.healthyVehicles / fleetStats.totalVehicles) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {fleetStats.healthyVehicles} of {fleetStats.totalVehicles} vehicles healthy
            </p>
            <Progress 
              value={(fleetStats.healthyVehicles / fleetStats.totalVehicles) * 100} 
              className="mt-2 h-1"
            />
          </CardContent>
        </Card>

        {/* Critical Issues */}
        <Card className="border-critical/20 bg-critical/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <XCircle className="h-4 w-4 text-critical" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-critical">{fleetStats.criticalIssues}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        {/* Average Fuel Economy */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Economy</CardTitle>
            <Fuel className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.averageFuelEconomy}L</div>
            <p className="text-xs text-muted-foreground">
              Per 100km average
            </p>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3% vs last month
            </div>
          </CardContent>
        </Card>

        {/* Compliance Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.complianceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Licenses & insurance up to date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Issues Breakdown and Upcoming Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Issues by Severity */}
        <Card>
          <CardHeader>
            <CardTitle>Open Issues by Type</CardTitle>
            <CardDescription>Current issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {issuesByType.map((issue, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    issue.severity === 'critical' ? 'bg-critical' :
                    issue.severity === 'warning' ? 'bg-warning' :
                    'bg-maintenance'
                  }`} />
                  <span className="font-medium">{issue.type}</span>
                </div>
                <Badge variant={
                  issue.severity === 'critical' ? 'destructive' :
                  issue.severity === 'warning' ? 'secondary' :
                  'outline'
                }>
                  {issue.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Services</CardTitle>
            <CardDescription>Scheduled maintenance reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    {service.vehicle}
                  </div>
                  <div className="text-sm text-muted-foreground">{service.type}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{service.dueDate}</div>
                  <div className="text-muted-foreground">{service.dueKm.toLocaleString()}km</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Downtime Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Performance Summary</CardTitle>
          <CardDescription>Key performance indicators for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{fleetStats.totalDowntime}h</div>
              <p className="text-sm text-muted-foreground">Total Downtime</p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{fleetStats.activeDrivers}</div>
              <p className="text-sm text-muted-foreground">Active Drivers</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">98.2%</div>
              <p className="text-sm text-muted-foreground">Uptime Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetOverview;
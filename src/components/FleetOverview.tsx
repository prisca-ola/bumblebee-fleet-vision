import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Fuel,
  Clock,
  Shield,
  TrendingUp,
  DollarSign,
  Wrench,
  TrendingDown,
  Lightbulb
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

  const actionableInsights = [
    {
      id: 1,
      title: "Schedule Preventive Maintenance for BUS-001",
      description: "Oil change due in 5 days. Early servicing can prevent ₦120,000 in potential engine repairs.",
      impact: "Cost Savings",
      savings: "₦120,000",
      icon: Wrench,
      color: "success"
    },
    {
      id: 2,
      title: "Reduce Downtime by 35%",
      description: "4 vehicles need semi-major maintenance. Scheduling them during off-peak hours can reduce revenue loss by ₦280,000/month.",
      impact: "Downtime Reduction",
      savings: "₦280,000/mo",
      icon: Clock,
      color: "warning"
    },
    {
      id: 3,
      title: "Improve Fuel Economy by 8%",
      description: "6 vehicles show declining fuel efficiency. Regular maintenance can save ₦450,000 annually in fuel costs.",
      impact: "Performance",
      savings: "₦450,000/yr",
      icon: Fuel,
      color: "primary"
    },
    {
      id: 4,
      title: "Address Critical Issues Immediately",
      description: "2 critical issues if left unresolved could lead to ₦500,000 in emergency repairs and 72 hours of downtime.",
      impact: "Risk Prevention",
      savings: "₦500,000",
      icon: AlertTriangle,
      color: "critical"
    }
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

        {/* Total Drivers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.activeDrivers}</div>
            <p className="text-xs text-muted-foreground">
              Active fleet drivers
            </p>
          </CardContent>
        </Card>

        {/* Total Technicians */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technicians</CardTitle>
            <Wrench className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Available maintenance staff
            </p>
          </CardContent>
        </Card>

        {/* Total Vehicles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetStats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">
              {fleetStats.healthyVehicles} healthy, {fleetStats.maintenanceNeeded} maintenance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Fleet Performance Summary</CardTitle>
            <CardDescription className="mt-1">Key performance indicators for this month</CardDescription>
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

      {/* Actionable Insights - Priority Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-bold">Actionable Insights & Recommendations</CardTitle>
          </div>
          <CardDescription className="mt-2">
            Smart recommendations to reduce costs, minimize downtime, and improve performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionableInsights.map((insight) => {
            const IconComponent = insight.icon;
            return (
              <Card key={insight.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      insight.color === 'success' ? 'bg-success/10' :
                      insight.color === 'warning' ? 'bg-warning/10' :
                      insight.color === 'critical' ? 'bg-critical/10' :
                      'bg-primary/10'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        insight.color === 'success' ? 'text-success' :
                        insight.color === 'warning' ? 'text-warning' :
                        insight.color === 'critical' ? 'text-critical' :
                        'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-base">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {insight.savings}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">{insight.impact}</div>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Issues Breakdown and Upcoming Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Issues by Severity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Open Issues by Type</CardTitle>
              <CardDescription className="mt-2">Current issues requiring attention</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/alerts'}
              className="shrink-0"
            >
              View All
            </Button>
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
            <CardTitle className="text-lg font-semibold">Upcoming Services</CardTitle>
            <CardDescription className="mt-1">Scheduled maintenance reminders</CardDescription>
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
    </div>
  );
};

export default FleetOverview;
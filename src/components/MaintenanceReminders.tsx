import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Calendar, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Shield,
  FileText
} from "lucide-react";

interface MaintenanceReminder {
  id: string;
  vehicleId: string;
  type: "Oil Change" | "Brake Service" | "Annual Service" | "Tire Rotation" | "Filter Replacement";
  dueDate: string;
  currentKm: number;
  dueKm: number;
  priority: "low" | "medium" | "high" | "overdue";
  lastCompleted?: string;
  cost?: string;
}

interface ComplianceItem {
  id: string;
  vehicleId: string;
  type: "License" | "Insurance" | "Inspection" | "Registration";
  expiryDate: string;
  status: "valid" | "expiring" | "expired";
  daysUntilExpiry: number;
  documentUrl?: string;
}

const MaintenanceReminders = () => {
  const [activeTab, setActiveTab] = useState<"maintenance" | "compliance">("maintenance");
  
  // Mock maintenance data
  const maintenanceReminders: MaintenanceReminder[] = [
    {
      id: "MAINT-001",
      vehicleId: "BUS-001",
      type: "Oil Change",
      dueDate: "2024-01-15",
      currentKm: 48230,
      dueKm: 50000,
      priority: "medium",
      lastCompleted: "2023-12-15",
      cost: "₦15,000"
    },
    {
      id: "MAINT-002", 
      vehicleId: "VAN-003",
      type: "Brake Service",
      dueDate: "2024-01-18",
      currentKm: 32110,
      dueKm: 32500,
      priority: "high",
      lastCompleted: "2023-07-18",
      cost: "₦45,000"
    },
    {
      id: "MAINT-003",
      vehicleId: "TRK-007", 
      type: "Annual Service",
      dueDate: "2024-01-10",
      currentKm: 78540,
      dueKm: 80000,
      priority: "overdue",
      lastCompleted: "2023-01-10",
      cost: "₦85,000"
    }
  ];

  // Mock compliance data
  const complianceItems: ComplianceItem[] = [
    {
      id: "COMP-001",
      vehicleId: "BUS-001", 
      type: "Insurance",
      expiryDate: "2024-02-15",
      status: "valid",
      daysUntilExpiry: 34
    },
    {
      id: "COMP-002",
      vehicleId: "VAN-003",
      type: "License", 
      expiryDate: "2024-01-25",
      status: "expiring",
      daysUntilExpiry: 13
    },
    {
      id: "COMP-003",
      vehicleId: "TRK-007",
      type: "Inspection",
      expiryDate: "2024-01-05", 
      status: "expired",
      daysUntilExpiry: -7
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "overdue": return "bg-critical/10 text-critical border-critical/20";
      case "high": return "bg-warning/10 text-warning border-warning/20";
      case "medium": return "bg-primary/10 text-primary border-primary/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "expired": return "bg-critical/10 text-critical border-critical/20";
      case "expiring": return "bg-warning/10 text-warning border-warning/20";
      case "valid": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const calculateKmProgress = (current: number, due: number) => {
    const lastServiceKm = due - 10000; // Assuming 10k km intervals
    return Math.min(((current - lastServiceKm) / (due - lastServiceKm)) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === "maintenance" ? "default" : "outline"}
          onClick={() => setActiveTab("maintenance")}
          className="flex items-center gap-2"
        >
          <Wrench className="h-4 w-4" />
          Maintenance
        </Button>
        <Button
          variant={activeTab === "compliance" ? "default" : "outline"}
          onClick={() => setActiveTab("compliance")}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Compliance
        </Button>
      </div>

      {/* Maintenance Tab */}
      {activeTab === "maintenance" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Maintenance Schedule</h3>
              <p className="text-muted-foreground text-sm">Track upcoming services and maintenance tasks</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Service
            </Button>
          </div>

          {maintenanceReminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      reminder.priority === 'overdue' ? 'bg-critical/10' :
                      reminder.priority === 'high' ? 'bg-warning/10' :
                      reminder.priority === 'medium' ? 'bg-primary/10' :
                      'bg-success/10'
                    }`}>
                      <Wrench className={`h-5 w-5 ${
                        reminder.priority === 'overdue' ? 'text-critical' :
                        reminder.priority === 'high' ? 'text-warning' :
                        reminder.priority === 'medium' ? 'text-primary' :
                        'text-success'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{reminder.type}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Truck className="h-3 w-3" />
                        {reminder.vehicleId}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(reminder.priority)}>
                    {reminder.priority === 'overdue' ? 'OVERDUE' : reminder.priority.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Due Date</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {reminder.dueDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Mileage Progress</div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {reminder.currentKm.toLocaleString()} / {reminder.dueKm.toLocaleString()} km
                      </div>
                      <Progress 
                        value={calculateKmProgress(reminder.currentKm, reminder.dueKm)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Estimated Cost</div>
                    <div className="font-bold text-lg">{reminder.cost}</div>
                  </div>
                </div>

                {reminder.lastCompleted && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      Last completed: {reminder.lastCompleted}
                    </div>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Mark Complete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === "compliance" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Compliance Tracking</h3>
              <p className="text-muted-foreground text-sm">Monitor vehicle licenses, insurance, and inspections</p>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {complianceItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.status === 'expired' ? 'bg-critical/10' :
                      item.status === 'expiring' ? 'bg-warning/10' :
                      'bg-success/10'
                    }`}>
                      <Shield className={`h-5 w-5 ${
                        item.status === 'expired' ? 'text-critical' :
                        item.status === 'expiring' ? 'text-warning' :
                        'text-success'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.type}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Truck className="h-3 w-3" />
                        {item.vehicleId}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getComplianceColor(item.status)}>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Expiry Date</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.expiryDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs mb-1">Days Until Expiry</div>
                    <div className={`font-bold ${
                      item.daysUntilExpiry < 0 ? 'text-critical' :
                      item.daysUntilExpiry <= 14 ? 'text-warning' :
                      'text-success'
                    }`}>
                      {item.daysUntilExpiry < 0 ? 
                        `${Math.abs(item.daysUntilExpiry)} days overdue` :
                        `${item.daysUntilExpiry} days`
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-3 w-3" />
                    <span>{item.documentUrl ? 'Document on file' : 'No document uploaded'}</span>
                  </div>
                  <div className="flex gap-2">
                    {item.documentUrl && (
                      <Button size="sm" variant="outline">
                        View Document
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload Renewal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "maintenance" && maintenanceReminders.length === 0) ||
        (activeTab === "compliance" && complianceItems.length === 0)) && (
        <div className="text-center py-12 text-muted-foreground">
          {activeTab === "maintenance" ? (
            <>
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No maintenance reminders at this time.</p>
            </>
          ) : (
            <>
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>All compliance documents are up to date.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceReminders;
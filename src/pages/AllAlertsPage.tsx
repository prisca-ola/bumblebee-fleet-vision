import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  X,
  Clock,
  Zap,
  Search,
  Filter,
  ArrowLeft,
  Wrench
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DtcCode {
  code: string;
  description: string;
  severity: "critical" | "warning" | "maintenance";
  category: string;
}

interface EmergencyAlert {
  id: string;
  vehicleId: string;
  driver: string;
  issue: string;
  location: string;
  timestamp: string;
  severity: "critical" | "emergency" | "warning" | "maintenance";
  dtcCode?: DtcCode;
  nearestWorkshop?: {
    name: string;
    distance: string;
    phone: string;
  };
}

// DTC Code interpretation mapping
const dtcDatabase: Record<string, DtcCode> = {
  "P0300": {
    code: "P0300",
    description: "Engine Misfire Detected – Vehicle may run rough. Likely spark plug or fuel issue.",
    severity: "critical",
    category: "Engine"
  },
  "P0171": {
    code: "P0171",
    description: "Engine Running Lean – Fuel mixture too lean. Check for vacuum leaks or dirty air filter.",
    severity: "warning",
    category: "Fuel System"
  },
  "P0420": {
    code: "P0420",
    description: "Catalytic Converter Efficiency Below Threshold – Emissions system issue. Service required.",
    severity: "maintenance",
    category: "Emissions"
  },
  "P0456": {
    code: "P0456",
    description: "Small EVAP Leak Detected – Minor fuel vapor leak. Check gas cap and fuel lines.",
    severity: "maintenance",
    category: "Emissions"
  },
  "B1000": {
    code: "B1000",
    description: "ECU Malfunction – Electronic control unit needs diagnostic check.",
    severity: "critical",
    category: "Electrical"
  },
  "C0561": {
    code: "C0561",
    description: "ABS System Malfunction – Anti-lock braking system requires immediate attention.",
    severity: "critical",
    category: "Brakes"
  }
};

const AllAlertsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);
  
  // Form state
  const [workOrderId, setWorkOrderId] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [assignedTechnician, setAssignedTechnician] = useState("");
  const [estimatedRepairTime, setEstimatedRepairTime] = useState("");
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [workProgress, setWorkProgress] = useState([0]);
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [vehicleLocation, setVehicleLocation] = useState("");
  const [requiredParts, setRequiredParts] = useState("");
  const [managerApproved, setManagerApproved] = useState(false);

  // Mock alerts with DTC codes
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EMRG-001",
      vehicleId: "TRK-007",
      driver: "Emeka Nwankwo",
      issue: "Engine overheating - temperature critical",
      location: "Third Mainland Bridge, Lagos",
      timestamp: "2024-01-12 10:45",
      severity: "emergency",
      dtcCode: dtcDatabase["P0300"],
      nearestWorkshop: {
        name: "Lagos Emergency Auto Repair",
        distance: "2.3km",
        phone: "+234-801-234-5678"
      }
    },
    {
      id: "ALERT-002",
      vehicleId: "VAN-003",
      driver: "Kemi Adebayo",
      issue: "Engine running lean detected",
      location: "Ikeja, Lagos",
      timestamp: "2024-01-12 09:30",
      severity: "warning",
      dtcCode: dtcDatabase["P0171"],
      nearestWorkshop: {
        name: "Ikeja Auto Services",
        distance: "1.8km",
        phone: "+234-803-765-4321"
      }
    },
    {
      id: "ALERT-003",
      vehicleId: "BUS-001",
      driver: "Ahmed Suleiman",
      issue: "ABS system malfunction",
      location: "Victoria Island, Lagos",
      timestamp: "2024-01-12 08:15",
      severity: "critical",
      dtcCode: dtcDatabase["C0561"],
      nearestWorkshop: {
        name: "VI Motor Workshop",
        distance: "0.9km",
        phone: "+234-807-123-9876"
      }
    },
    {
      id: "ALERT-004",
      vehicleId: "TRK-012",
      driver: "Chioma Okoro",
      issue: "Catalytic converter efficiency low",
      location: "Lekki Phase 1, Lagos",
      timestamp: "2024-01-12 07:45",
      severity: "maintenance",
      dtcCode: dtcDatabase["P0420"]
    },
    {
      id: "ALERT-005",
      vehicleId: "VAN-008",
      driver: "Bola Adeyemi",
      issue: "Small EVAP leak detected",
      location: "Surulere, Lagos",
      timestamp: "2024-01-11 16:20",
      severity: "maintenance",
      dtcCode: dtcDatabase["P0456"]
    }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  // Generate unique Work Order ID
  const generateWorkOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `WO-${timestamp}-${random}`;
  };

  // Calculate estimated completion date
  const calculateCompletionDate = (repairTime: string) => {
    if (!repairTime) return "";
    const match = repairTime.match(/(\d+)\s*(hour|day)s?/i);
    if (!match) return "";
    
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    const now = new Date();
    
    if (unit === "hour") {
      now.setHours(now.getHours() + value);
    } else if (unit === "day") {
      now.setDate(now.getDate() + value);
    }
    
    return now.toLocaleString();
  };

  const handleAssignTechnician = (alert: EmergencyAlert) => {
    setSelectedAlert(alert);
    
    // Auto-fill fields
    setWorkOrderId(generateWorkOrderId());
    setIssueTitle(alert.issue);
    setVehicleInfo(alert.vehicleId);
    setReportedBy(alert.driver);
    setDateReported(alert.timestamp);
    setIssueDescription(alert.issue + (alert.dtcCode ? `\n\nDTC Code: ${alert.dtcCode.code}\n${alert.dtcCode.description}` : ''));
    setVehicleLocation(alert.location);
    
    setIsAssignSheetOpen(true);
  };

  const handleSubmitAssignment = () => {
    if (!assignedTechnician) {
      toast({
        title: "Missing Information",
        description: "Please assign a technician.",
        variant: "destructive"
      });
      return;
    }

    // Generate unique link for the work order
    const workOrderLink = `${window.location.origin}/work-order/${workOrderId}`;

    toast({
      title: "Work Order Created",
      description: `${workOrderId} assigned to ${assignedTechnician}`,
      action: (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(workOrderLink);
            toast({
              title: "Link Copied",
              description: "Work order link copied to clipboard",
            });
          }}
        >
          Copy Link
        </Button>
      ),
    });

    // Reset form
    resetForm();
    setIsAssignSheetOpen(false);
    setSelectedAlert(null);
  };

  const resetForm = () => {
    setWorkOrderId("");
    setIssueTitle("");
    setVehicleInfo("");
    setReportedBy("");
    setDateReported("");
    setIssueDescription("");
    setAssignedTechnician("");
    setEstimatedRepairTime("");
    setEstimatedCompletion("");
    setCurrentStatus("Pending");
    setWorkProgress([0]);
    setTechnicianNotes("");
    setVehicleLocation("");
    setRequiredParts("");
    setManagerApproved(false);
  };

  // Update completion date when repair time changes
  const handleRepairTimeChange = (value: string) => {
    setEstimatedRepairTime(value);
    setEstimatedCompletion(calculateCompletionDate(value));
  };

  // Filter alerts based on search and severity
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.dtcCode?.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterSeverity === "all" || alert.severity === filterSeverity;
    
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "emergency":
        return "bg-critical text-critical-foreground";
      case "critical":
        return "bg-critical text-critical-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "maintenance":
        return "bg-maintenance text-maintenance-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "emergency":
        return <Zap className="h-5 w-5" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "maintenance":
        return <Wrench className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">All Vehicle Alerts</h1>
            <p className="text-muted-foreground">Manage and monitor all fleet alerts and DTC codes</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by vehicle ID, driver, issue, or DTC code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No alerts found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`${alert.severity === "emergency" ? "border-critical bg-critical/5" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Severity Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <span className="font-bold text-lg">
                            {alert.vehicleId}
                          </span>
                          {alert.dtcCode && (
                            <Badge variant="outline" className="font-mono text-xs">
                              {alert.dtcCode.code}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                          {alert.issue}
                        </h3>
                        {alert.dtcCode && (
                          <div className="bg-muted/50 p-3 rounded-lg mb-2">
                            <div className="text-sm font-medium text-foreground mb-1">
                              DTC Code Interpretation:
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {alert.dtcCode.description}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {alert.dtcCode.category}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Driver: {alert.driver}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{alert.location}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="default">
                        <Phone className="h-3 w-3 mr-1" />
                        Call Driver
                      </Button>
                      {alert.nearestWorkshop && (
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call Workshop
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <MapPin className="h-3 w-3 mr-1" />
                        View Location
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAssignTechnician(alert)}>
                        Assign Technician
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Assign Technician Sheet */}
      <Sheet open={isAssignSheetOpen} onOpenChange={setIsAssignSheetOpen}>
        <SheetContent side="right" className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Work Order</SheetTitle>
            <SheetDescription>
              Assign technician and manage repair details
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Header Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Header Info</h3>
              
              <div className="space-y-2">
                <Label>Work Order ID</Label>
                <Input value={workOrderId} disabled className="font-mono bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue-title">Issue Title</Label>
                <Input
                  id="issue-title"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Vehicle ID / Plate Number</Label>
                <Input value={vehicleInfo} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Reported By</Label>
                <Input value={reportedBy} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Date Reported</Label>
                <Input value={dateReported} disabled className="bg-muted" />
              </div>
            </div>

            <Separator />

            {/* Issue Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Issue Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="issue-description">Issue Description</Label>
                <Textarea
                  id="issue-description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={5}
                  placeholder="Full description of the problem..."
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground">
                  No attachments from driver report
                </div>
              </div>
            </div>

            <Separator />

            {/* Repair Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Repair Details (Technician Section)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="assigned-technician">Assigned Technician *</Label>
                <Input
                  id="assigned-technician"
                  value={assignedTechnician}
                  onChange={(e) => setAssignedTechnician(e.target.value)}
                  placeholder="Enter name or email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated-repair-time">Estimated Repair Time</Label>
                <Input
                  id="estimated-repair-time"
                  value={estimatedRepairTime}
                  onChange={(e) => handleRepairTimeChange(e.target.value)}
                  placeholder="e.g., 2 hours or 3 days"
                />
              </div>

              <div className="space-y-2">
                <Label>Estimated Completion Date</Label>
                <Input 
                  value={estimatedCompletion} 
                  disabled 
                  className="bg-muted"
                  placeholder="Auto-calculated from repair time"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-status">Current Status</Label>
                <Select value={currentStatus} onValueChange={setCurrentStatus}>
                  <SelectTrigger id="current-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Work Progress ({workProgress[0]}%)</Label>
                <Slider
                  value={workProgress}
                  onValueChange={setWorkProgress}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technician-notes">Technician Notes</Label>
                <Textarea
                  id="technician-notes"
                  value={technicianNotes}
                  onChange={(e) => setTechnicianNotes(e.target.value)}
                  rows={3}
                  placeholder="Optional comments during execution..."
                />
              </div>
            </div>

            <Separator />

            {/* Logistics */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Logistics</h3>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-location">Vehicle Location</Label>
                <Input
                  id="vehicle-location"
                  value={vehicleLocation}
                  onChange={(e) => setVehicleLocation(e.target.value)}
                  placeholder="e.g., Workshop 3 or GPS coordinates"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="required-parts">Required Parts/Materials</Label>
                <Textarea
                  id="required-parts"
                  value={requiredParts}
                  onChange={(e) => setRequiredParts(e.target.value)}
                  rows={2}
                  placeholder="List required parts or materials..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manager-approved"
                  checked={managerApproved}
                  onCheckedChange={(checked) => setManagerApproved(checked as boolean)}
                />
                <Label
                  htmlFor="manager-approved"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Manager approved for repair
                </Label>
              </div>
            </div>

            <Separator />

            {/* Audit Trail */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Audit Trail</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Created By</Label>
                  <Input value="Fleet Manager" disabled className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <Input value={new Date().toLocaleString()} disabled className="bg-muted" />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Version tracking available in full system implementation
              </div>
            </div>
          </div>

          <SheetFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAssignSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitAssignment}>
              Create Work Order
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AllAlertsPage;
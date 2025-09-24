import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

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
                      <Button size="sm" variant="outline">
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
    </div>
  );
};

export default AllAlertsPage;
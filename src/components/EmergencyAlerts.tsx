import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  X,
  Clock,
  Zap,
  Wrench,
  Calendar,
  DollarSign
} from "lucide-react";

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
  issueExplanation: string;
  systemAffected: string;
  location: string;
  timestamp: string;
  severity: "Safety Critical" | "High Priority" | "Medium Priority" | "Low Priority";
  estimatedCostRange: string;
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
  "B1000": {
    code: "B1000",
    description: "ECU Malfunction – Electronic control unit needs diagnostic check.",
    severity: "critical",
    category: "Electrical"
  }
};

const EmergencyAlerts = () => {
  // Mock emergency alerts - in real app this would come from real-time API
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EMRG-001",
      vehicleId: "TRK-045",
      driver: "Emeka Nwankwo",
      issue: "Engine Misfire Detected",
      issueExplanation: "Multiple cylinders are misfiring, causing rough idling and potential engine damage if not addressed immediately.",
      systemAffected: "Engine Control System",
      location: "Third Mainland Bridge, Lagos",
      timestamp: "2024-01-12 10:45 AM",
      severity: "Safety Critical",
      estimatedCostRange: "₦50,000 - ₦120,000",
      dtcCode: dtcDatabase["P0300"],
      nearestWorkshop: {
        name: "Lagos Emergency Auto Repair",
        distance: "2.3km",
        phone: "+234-801-234-5678"
      }
    },
    {
      id: "EMRG-002",
      vehicleId: "BUS-023",
      driver: "Fatima Ibrahim",
      issue: "ECU Malfunction Detected",
      issueExplanation: "Electronic Control Unit is experiencing communication errors, affecting vehicle performance and diagnostics.",
      systemAffected: "Electrical Control System",
      location: "Apapa, Lagos",
      timestamp: "2024-01-12 11:20 AM",
      severity: "High Priority",
      estimatedCostRange: "₦80,000 - ₦200,000",
      dtcCode: dtcDatabase["B1000"],
      nearestWorkshop: {
        name: "Apapa Auto Diagnostics",
        distance: "1.5km",
        phone: "+234-802-987-6543"
      }
    }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Safety Critical":
        return "bg-destructive text-destructive-foreground";
      case "High Priority":
        return "bg-orange-500 text-white";
      case "Medium Priority":
        return "bg-yellow-500 text-black";
      case "Low Priority":
        return "bg-blue-500 text-white";
      default:
        return "bg-destructive text-destructive-foreground";
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="border-destructive/20 bg-destructive/5 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    {alert.dtcCode && (
                      <Badge variant="outline" className="font-mono">
                        {alert.dtcCode.code}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="font-mono">
                      {alert.vehicleId}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{alert.timestamp}</span>
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
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Issue Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {alert.issue}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {alert.issueExplanation}
              </p>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background/50 rounded-lg">
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Driver</div>
                  <div className="text-sm font-medium">{alert.driver}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">System Affected</div>
                  <div className="text-sm font-medium">{alert.systemAffected}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Location</div>
                  <div className="flex items-start gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{alert.location}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Estimated Cost</div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{alert.estimatedCostRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Calendar className="h-3 w-3 mr-2" />
                Schedule Maintenance
              </Button>
              <Button size="sm" variant="outline">
                <Wrench className="h-3 w-3 mr-2" />
                Dispatch Mechanic
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3 mr-2" />
                Call Driver
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmergencyAlerts;
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  X,
  Clock,
  Zap
} from "lucide-react";

interface EmergencyAlert {
  id: string;
  vehicleId: string;
  driver: string;
  issue: string;
  location: string;
  timestamp: string;
  severity: "critical" | "emergency";
  nearestWorkshop?: {
    name: string;
    distance: string;
    phone: string;
  };
}

const EmergencyAlerts = () => {
  // Mock emergency alerts - in real app this would come from real-time API
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EMRG-001",
      vehicleId: "TRK-007",
      driver: "Emeka Nwankwo",
      issue: "Engine overheating - temperature critical",
      location: "Third Mainland Bridge, Lagos",
      timestamp: "2024-01-12 10:45",
      severity: "emergency",
      nearestWorkshop: {
        name: "Lagos Emergency Auto Repair",
        distance: "2.3km",
        phone: "+234-801-234-5678"
      }
    }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="border-critical bg-critical/5 shadow-critical animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Emergency Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-critical rounded-full flex items-center justify-center animate-bounce">
                  {alert.severity === "emergency" ? (
                    <Zap className="h-6 w-6 text-critical-foreground" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-critical-foreground" />
                  )}
                </div>
              </div>

              {/* Alert Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-critical text-critical-foreground">
                        EMERGENCY
                      </Badge>
                      <span className="font-bold text-critical text-lg">
                        {alert.vehicleId}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {alert.issue}
                    </h3>
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
                  <MapPin className="h-4 w-4 text-critical" />
                  <span className="font-medium">{alert.location}</span>
                </div>

                {/* Emergency Actions */}
                <div className="bg-background/80 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Emergency Response</h4>
                    <Badge variant="outline" className="text-xs">
                      Auto-assigned
                    </Badge>
                  </div>
                  
                  {alert.nearestWorkshop && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Nearest Workshop</div>
                        <div>
                          <div className="font-medium text-sm">{alert.nearestWorkshop.name}</div>
                          <div className="text-xs text-muted-foreground">{alert.nearestWorkshop.distance} away</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-critical hover:opacity-90 text-critical-foreground"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call Workshop
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-critical hover:bg-critical/90 text-critical-foreground"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call Driver
                    </Button>
                    <Button size="sm" variant="outline">
                      Dispatch Tow Truck
                    </Button>
                    <Button size="sm" variant="outline">
                      Alert Fleet Manager
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmergencyAlerts;
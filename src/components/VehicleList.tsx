import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Truck, 
  Search, 
  MapPin, 
  Fuel,
  Clock,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Vehicle {
  id: string;
  plateNumber: string;
  type: "Bus" | "Van" | "Truck";
  status: "healthy" | "maintenance" | "critical" | "offline";
  location: string;
  driver: string;
  fuelLevel: number;
  lastScan: string;
  issues: number;
  mileage: number;
}

const VehicleList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock vehicle data
  const vehicles: Vehicle[] = [
    {
      id: "BUS-001",
      plateNumber: "ABC-123-XY",
      type: "Bus",
      status: "healthy",
      location: "Lagos Island",
      driver: "Adebayo Johnson",
      fuelLevel: 85,
      lastScan: "2 min ago",
      issues: 0,
      mileage: 45230
    },
    {
      id: "VAN-003",
      plateNumber: "DEF-456-ZA",
      type: "Van",
      status: "maintenance",
      location: "Victoria Island",
      driver: "Kemi Okafor",
      fuelLevel: 45,
      lastScan: "15 min ago",
      issues: 2,
      mileage: 32110
    },
    {
      id: "TRK-007",
      plateNumber: "GHI-789-BC",
      type: "Truck",
      status: "critical",
      location: "Ikoyi",
      driver: "Emeka Nwankwo",
      fuelLevel: 25,
      lastScan: "5 min ago",
      issues: 3,
      mileage: 78540
    },
    {
      id: "BUS-012",
      plateNumber: "JKL-012-DE",
      type: "Bus",
      status: "offline",
      location: "Unknown",
      driver: "Fatima Hassan",
      fuelLevel: 0,
      lastScan: "2 hours ago",
      issues: 1,
      mileage: 28970
    },
    {
      id: "VAN-008",
      plateNumber: "MNO-345-FG",
      type: "Van",
      status: "healthy",
      location: "Lekki",
      driver: "Tunde Bakare",
      fuelLevel: 92,
      lastScan: "1 min ago",
      issues: 0,
      mileage: 21450
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "healthy": return "text-success";
      case "maintenance": return "text-warning";
      case "critical": return "text-critical";
      case "offline": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  const getStatusIcon = (status: Vehicle["status"]) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4" />;
      case "maintenance": return <AlertTriangle className="h-4 w-4" />;
      case "critical": return <XCircle className="h-4 w-4" />;
      case "offline": return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Vehicle["status"]) => {
    switch (status) {
      case "healthy": return <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case "maintenance": return <Badge className="bg-warning/10 text-warning border-warning/20">Maintenance</Badge>;
      case "critical": return <Badge className="bg-critical/10 text-critical border-critical/20">Critical</Badge>;
      case "offline": return <Badge variant="secondary">Offline</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vehicles by ID, plate number, or driver..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    vehicle.status === 'healthy' ? 'bg-success/10' :
                    vehicle.status === 'maintenance' ? 'bg-warning/10' :
                    vehicle.status === 'critical' ? 'bg-critical/10' :
                    'bg-muted'
                  }`}>
                    <Truck className={`h-5 w-5 ${getStatusColor(vehicle.status)}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vehicle.id}</CardTitle>
                    <CardDescription>{vehicle.plateNumber}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Driver & Location */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Driver</div>
                  <div className="font-medium">{vehicle.driver}</div>
                </div>
                <div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Location
                  </div>
                  <div className="font-medium">{vehicle.location}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                    <Fuel className="h-3 w-3" />
                    Fuel
                  </div>
                  <div className="font-bold">{vehicle.fuelLevel}%</div>
                  <div className={`w-full bg-muted rounded-full h-1 mt-1 ${
                    vehicle.fuelLevel < 20 ? 'bg-critical/20' : 'bg-muted'
                  }`}>
                    <div 
                      className={`h-1 rounded-full ${
                        vehicle.fuelLevel < 20 ? 'bg-critical' : 
                        vehicle.fuelLevel < 50 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${Math.max(vehicle.fuelLevel, 5)}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-muted-foreground text-xs mb-1">Issues</div>
                  <div className={`font-bold ${
                    vehicle.issues > 0 ? getStatusColor(vehicle.status) : 'text-foreground'
                  }`}>
                    {vehicle.issues}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-muted-foreground text-xs mb-1">Mileage</div>
                  <div className="font-bold text-xs">{vehicle.mileage.toLocaleString()}km</div>
                </div>
              </div>

              {/* Last Scan & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getStatusIcon(vehicle.status)}
                  Last scan: {vehicle.lastScan}
                </div>
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <Settings className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No vehicles found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
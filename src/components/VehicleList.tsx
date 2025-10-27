import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Truck, 
  Search, 
  MapPin, 
  Fuel,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit
} from "lucide-react";
import AddVehicleDialog from "./AddVehicleDialog";

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
  color: string;
  year: number;
  model: string;
}

interface VehicleListProps {
  drivers: Array<{ id: string; name: string; }>;
}

const VehicleList = ({ drivers }: VehicleListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [filterDriver, setFilterDriver] = useState<string>("all");
  const [filterColor, setFilterColor] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterModel, setFilterModel] = useState<string>("all");
  
  // Mock vehicle data
  const [vehicles, setVehicles] = useState<Vehicle[]>([
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
      mileage: 45230,
      color: "White",
      year: 2022,
      model: "Mercedes Sprinter"
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
      mileage: 32110,
      color: "Blue",
      year: 2021,
      model: "Toyota Hiace"
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
      mileage: 78540,
      color: "Red",
      year: 2020,
      model: "Isuzu NPR"
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
      mileage: 28970,
      color: "Yellow",
      year: 2019,
      model: "Yutong ZK6129H"
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
      mileage: 21450,
      color: "White",
      year: 2023,
      model: "Ford Transit"
    }
  ]);

  // Get unique values for filters
  const uniqueDrivers = Array.from(new Set(vehicles.map(v => v.driver)));
  const uniqueColors = Array.from(new Set(vehicles.map(v => v.color)));
  const uniqueYears = Array.from(new Set(vehicles.map(v => v.year))).sort((a, b) => b - a);
  const uniqueModels = Array.from(new Set(vehicles.map(v => v.model)));

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDriver = filterDriver === "all" || vehicle.driver === filterDriver;
    const matchesColor = filterColor === "all" || vehicle.color === filterColor;
    const matchesYear = filterYear === "all" || vehicle.year.toString() === filterYear;
    const matchesModel = filterModel === "all" || vehicle.model === filterModel;

    return matchesSearch && matchesDriver && matchesColor && matchesYear && matchesModel;
  });

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
      case "offline": return <XCircle className="h-4 w-4" />;
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

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <div className="space-y-4">
      {/* Search and Add Vehicle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles by ID, plate number, driver, or model..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="shrink-0" onClick={() => setShowAddVehicle(true)}>
          <Truck className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Select value={filterDriver} onValueChange={setFilterDriver}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Driver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Drivers</SelectItem>
            {uniqueDrivers.map(driver => (
              <SelectItem key={driver} value={driver}>{driver}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterColor} onValueChange={setFilterColor}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Colors</SelectItem>
            {uniqueColors.map(color => (
              <SelectItem key={color} value={color}>{color}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {uniqueYears.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterModel} onValueChange={setFilterModel}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            {uniqueModels.map(model => (
              <SelectItem key={model} value={model}>{model}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vehicles Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Vehicle</TableHead>
              <TableHead className="whitespace-nowrap">Plate Number</TableHead>
              <TableHead className="whitespace-nowrap">Driver</TableHead>
              <TableHead className="whitespace-nowrap">Model & Year</TableHead>
              <TableHead className="whitespace-nowrap">Color</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Fuel Level</TableHead>
              <TableHead className="whitespace-nowrap">Location</TableHead>
              <TableHead className="whitespace-nowrap">Mileage</TableHead>
              <TableHead className="whitespace-nowrap">Issues</TableHead>
              <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      vehicle.status === 'healthy' ? 'bg-success/10' :
                      vehicle.status === 'maintenance' ? 'bg-warning/10' :
                      vehicle.status === 'critical' ? 'bg-critical/10' :
                      'bg-muted'
                    }`}>
                      <Truck className={`h-4 w-4 ${getStatusColor(vehicle.status)}`} />
                    </div>
                    <div>
                      <div className="font-medium">{vehicle.id}</div>
                      <div className="text-sm text-muted-foreground">{vehicle.type}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.plateNumber}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.driver}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{vehicle.model}</div>
                    <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.color}</div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(vehicle.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className={`font-medium ${
                      vehicle.fuelLevel < 20 ? 'text-critical' : 
                      vehicle.fuelLevel < 50 ? 'text-warning' : 'text-success'
                    }`}>
                      {vehicle.fuelLevel}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{vehicle.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.mileage.toLocaleString()}km</div>
                </TableCell>
                <TableCell>
                  <div className={`font-bold ${
                    vehicle.issues > 0 ? getStatusColor(vehicle.status) : 'text-foreground'
                  }`}>
                    {vehicle.issues}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No vehicles found matching your filters.</p>
        </div>
      )}

      <AddVehicleDialog
        open={showAddVehicle}
        onOpenChange={setShowAddVehicle}
        onAddVehicle={handleAddVehicle}
        drivers={drivers}
      />
    </div>
  );
};

export default VehicleList;
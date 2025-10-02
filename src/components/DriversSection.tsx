import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  User, 
  Search, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserPlus,
  Edit
} from "lucide-react";
import AddDriverDialog from "./AddDriverDialog";

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  licenseExpiry: string;
  status: "active" | "inactive" | "suspended";
  assignedVehicle?: string;
}

const DriversSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: "DRV-001",
      name: "Adebayo Johnson",
      licenseNumber: "LIC-AB123456",
      phone: "+234 801 234 5678",
      email: "adebayo.johnson@email.com",
      address: "Lagos Island, Lagos",
      licenseExpiry: "2025-06-15",
      status: "active",
      assignedVehicle: "BUS-001"
    },
    {
      id: "DRV-002",
      name: "Kemi Okafor",
      licenseNumber: "LIC-KO789012",
      phone: "+234 802 345 6789",
      email: "kemi.okafor@email.com",
      address: "Victoria Island, Lagos",
      licenseExpiry: "2024-12-30",
      status: "active",
      assignedVehicle: "VAN-003"
    },
    {
      id: "DRV-003",
      name: "Emeka Nwankwo",
      licenseNumber: "LIC-EN345678",
      phone: "+234 803 456 7890",
      email: "emeka.nwankwo@email.com",
      address: "Ikoyi, Lagos",
      licenseExpiry: "2025-03-20",
      status: "active",
      assignedVehicle: "TRK-007"
    },
    {
      id: "DRV-004",
      name: "Fatima Hassan",
      licenseNumber: "LIC-FH901234",
      phone: "+234 804 567 8901",
      email: "fatima.hassan@email.com",
      address: "Surulere, Lagos",
      licenseExpiry: "2024-11-10",
      status: "inactive"
    },
    {
      id: "DRV-005",
      name: "Tunde Bakare",
      licenseNumber: "LIC-TB567890",
      phone: "+234 805 678 9012",
      email: "tunde.bakare@email.com",
      address: "Lekki, Lagos",
      licenseExpiry: "2025-08-05",
      status: "active",
      assignedVehicle: "VAN-008"
    }
  ]);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: Driver["status"]) => {
    switch (status) {
      case "active": return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "inactive": return <Badge variant="secondary">Inactive</Badge>;
      case "suspended": return <Badge className="bg-critical/10 text-critical border-critical/20">Suspended</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const handleAddDriver = (newDriver: Omit<Driver, "id">) => {
    const driver: Driver = {
      ...newDriver,
      id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
    };
    setDrivers([...drivers, driver]);
  };

  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(d => d.status === 'active').length;
  const avgRating = 4.6; // This would come from actual data
  const safetyScore = 94; // This would come from actual data

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fleet Drivers</h2>
        <p className="text-muted-foreground">Manage your fleet drivers and their assignments</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Drivers</p>
              <p className="text-2xl font-bold">{totalDrivers}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Drivers</p>
              <p className="text-2xl font-bold">{activeDrivers}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <User className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
              <p className="text-2xl font-bold">{avgRating}<span className="text-base text-muted-foreground">/5.0</span></p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Safety Score</p>
              <p className="text-2xl font-bold">{safetyScore}<span className="text-base text-muted-foreground">%</span></p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Add Driver */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers by name, license, or phone..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="shrink-0" onClick={() => setShowAddDriver(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Driver
        </Button>
      </div>

      {/* Drivers Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>License Info</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Assigned Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.map((driver) => (
              <TableRow key={driver.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      driver.status === 'active' ? 'bg-success/10' :
                      driver.status === 'inactive' ? 'bg-muted' :
                      'bg-critical/10'
                    }`}>
                      <User className={`h-4 w-4 ${
                        driver.status === 'active' ? 'text-success' :
                        driver.status === 'inactive' ? 'text-muted-foreground' :
                        'text-critical'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-muted-foreground">{driver.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{driver.licenseNumber}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Expires: {new Date(driver.licenseExpiry).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {driver.phone}
                    </div>
                    <div className="text-sm flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {driver.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {driver.address}
                  </div>
                </TableCell>
                <TableCell>
                  {driver.assignedVehicle ? (
                    <div className="font-medium">{driver.assignedVehicle}</div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(driver.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No drivers found matching your search.</p>
        </div>
      )}

      <AddDriverDialog
        open={showAddDriver}
        onOpenChange={setShowAddDriver}
        onAddDriver={handleAddDriver}
      />
    </div>
  );
};

export default DriversSection;
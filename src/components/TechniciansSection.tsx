import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, MoreHorizontal, Wrench, Phone, Mail, MapPin } from "lucide-react";

interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string;
  status: "Available" | "Assigned" | "Off Duty";
  assignedVehicle?: string;
  completedRepairs: number;
  location: string;
}

export default function TechniciansSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [technicians] = useState<Technician[]>([
    {
      id: "TECH-001",
      name: "Ibrahim Suleiman",
      phone: "+234 803 123 4567",
      email: "ibrahim.s@fleet.com",
      specialization: "Engine Repair",
      status: "Available",
      completedRepairs: 42,
      location: "Lagos Workshop"
    },
    {
      id: "TECH-002",
      name: "Chioma Okwu",
      phone: "+234 805 987 6543",
      email: "chioma.o@fleet.com",
      specialization: "Electrical Systems",
      status: "Assigned",
      assignedVehicle: "NGN-45-XYZ",
      completedRepairs: 38,
      location: "Abuja Service Center"
    },
    {
      id: "TECH-003",
      name: "Ahmad Hassan",
      phone: "+234 807 456 7890",
      email: "ahmad.h@fleet.com",
      specialization: "Brake Systems",
      status: "Available",
      completedRepairs: 29,
      location: "Kano Workshop"
    },
    {
      id: "TECH-004",
      name: "Grace Eze",
      phone: "+234 809 234 5678",
      email: "grace.e@fleet.com",
      specialization: "Transmission",
      status: "Off Duty",
      completedRepairs: 51,
      location: "Port Harcourt Center"
    },
    {
      id: "TECH-005",
      name: "Yusuf Abdullahi",
      phone: "+234 806 345 6789",
      email: "yusuf.a@fleet.com",
      specialization: "AC & Cooling",
      status: "Assigned",
      assignedVehicle: "NGN-12-ABC",
      completedRepairs: 33,
      location: "Kaduna Workshop"
    }
  ]);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success/10 text-success border-success/20";
      case "Assigned":
        return "bg-warning/10 text-warning border-warning/20";
      case "Off Duty":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleAddTechnician = () => {
    toast({
      title: "Add Technician",
      description: "Opening technician registration form...",
    });
  };

  const handleAction = (action: string, techId: string) => {
    toast({
      title: action,
      description: `Action ${action.toLowerCase()} performed for technician ${techId}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search technicians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddTechnician} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Technician
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Wrench className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">On Assignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">193</p>
                <p className="text-sm text-muted-foreground">Total Repairs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technicians Table */}
      <Card>
        <CardHeader>
          <CardTitle>Technicians Directory</CardTitle>
          <CardDescription>
            Manage technician profiles, assignments, and track their maintenance work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Vehicle</TableHead>
                  <TableHead>Completed Repairs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTechnicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{technician.name}</p>
                        <p className="text-sm text-muted-foreground">{technician.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {technician.specialization}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{technician.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{technician.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{technician.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(technician.status)}>
                        {technician.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {technician.assignedVehicle ? (
                        <span className="font-medium">{technician.assignedVehicle}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{technician.completedRepairs}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction("View Profile", technician.id)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Assign Vehicle", technician.id)}>
                            Assign Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("View Work History", technician.id)}>
                            Work History
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Edit", technician.id)}>
                            Edit Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTechnicians.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No technicians found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, MoreHorizontal, Wrench, Phone, Mail, MapPin, Clock, TrendingUp, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkOrder {
  id: string;
  issueTitle: string;
  vehicleInfo: string;
  reportedBy: string;
  dateReported: string;
  issueDescription: string;
  estimatedRepairTime: string;
  estimatedCompletion: string;
  currentStatus: string;
  workProgress: number;
  technicianNotes: string;
  vehicleLocation: string;
  requiredParts: string;
  managerApproved: boolean;
  completionTime?: string;
}

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
  sourcingType: "in-house" | "roadside" | "third-party";
  avgCompletionRate: number; // hours per repair
  timeOfCompletion?: string; // last completion time
  workOrders: WorkOrder[];
}

export default function TechniciansSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isWorkOrderSheetOpen, setIsWorkOrderSheetOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSpecialization, setFilterSpecialization] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");

  const [technicians] = useState<Technician[]>([
    {
      id: "TECH-001",
      name: "Ibrahim Suleiman",
      phone: "+234 803 123 4567",
      email: "ibrahim.s@fleet.com",
      specialization: "Engine Repair",
      status: "Available",
      completedRepairs: 42,
      location: "Lagos Workshop",
      sourcingType: "in-house",
      avgCompletionRate: 3.2,
      timeOfCompletion: "2024-01-10 14:30",
      workOrders: [
        {
          id: "WO-1736780000-123",
          issueTitle: "Engine overheating - temperature critical",
          vehicleInfo: "TRK-007",
          reportedBy: "Emeka Nwankwo (+234-801-234-5678)",
          dateReported: "2024-01-08 10:45",
          issueDescription: "Engine temperature gauge showing critical levels. Need immediate inspection.",
          estimatedRepairTime: "4 hours",
          estimatedCompletion: "2024-01-08 18:00",
          currentStatus: "Completed",
          workProgress: 100,
          technicianNotes: "Replaced coolant pump and thermostat. System tested and functioning normally.",
          vehicleLocation: "Lagos Workshop",
          requiredParts: "Coolant pump, thermostat, coolant fluid",
          managerApproved: true,
          completionTime: "2024-01-10 14:30"
        }
      ]
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
      location: "Abuja Service Center",
      sourcingType: "in-house",
      avgCompletionRate: 2.8,
      timeOfCompletion: "2024-01-11 09:15",
      workOrders: [
        {
          id: "WO-1736790000-456",
          issueTitle: "Electrical system failure",
          vehicleInfo: "NGN-45-XYZ",
          reportedBy: "John Doe (+234-803-765-4321)",
          dateReported: "2024-01-11 07:00",
          issueDescription: "Complete electrical failure. Battery and alternator diagnostics required.",
          estimatedRepairTime: "3 hours",
          estimatedCompletion: "2024-01-11 12:00",
          currentStatus: "In Progress",
          workProgress: 65,
          technicianNotes: "Battery replaced. Currently testing alternator and checking wiring harness.",
          vehicleLocation: "Abuja Service Center",
          requiredParts: "Battery, alternator belt",
          managerApproved: true
        }
      ]
    },
    {
      id: "TECH-003",
      name: "Ahmad Hassan",
      phone: "+234 807 456 7890",
      email: "ahmad.h@fleet.com",
      specialization: "Brake Systems",
      status: "Available",
      completedRepairs: 29,
      location: "Kano Workshop",
      sourcingType: "roadside",
      avgCompletionRate: 4.1,
      timeOfCompletion: "2024-01-09 16:45",
      workOrders: []
    },
    {
      id: "TECH-004",
      name: "Grace Eze",
      phone: "+234 809 234 5678",
      email: "grace.e@fleet.com",
      specialization: "Transmission",
      status: "Off Duty",
      completedRepairs: 51,
      location: "Port Harcourt Center",
      sourcingType: "third-party",
      avgCompletionRate: 5.6,
      timeOfCompletion: "2024-01-07 11:20",
      workOrders: []
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
      location: "Kaduna Workshop",
      sourcingType: "roadside",
      avgCompletionRate: 3.5,
      timeOfCompletion: "2024-01-12 08:00",
      workOrders: []
    }
  ]);

  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(technicians.map(t => t.status)));
  const uniqueSpecializations = Array.from(new Set(technicians.map(t => t.specialization)));
  const uniqueLocations = Array.from(new Set(technicians.map(t => t.location)));

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || tech.status === filterStatus;
    const matchesSpecialization = filterSpecialization === "all" || tech.specialization === filterSpecialization;
    const matchesLocation = filterLocation === "all" || tech.location === filterLocation;

    return matchesSearch && matchesStatus && matchesSpecialization && matchesLocation;
  });

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

  const getSourcingTypeColor = (type: string) => {
    switch (type) {
      case "in-house":
        return "bg-success/10 text-success border-success/20";
      case "roadside":
        return "bg-primary/10 text-primary border-primary/20";
      case "third-party":
        return "bg-info/10 text-info border-info/20";
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

  const handleViewWorkOrder = (technician: Technician) => {
    setSelectedTechnician(technician);
    setIsWorkOrderSheetOpen(true);
  };

  const handleAction = (action: string, techId: string) => {
    toast({
      title: action,
      description: `Action ${action.toLowerCase()} performed for technician ${techId}`,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "Pending":
        return "bg-info/10 text-info border-info/20";
      case "Paused":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
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

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {uniqueSpecializations.map(spec => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          <div className="overflow-x-auto">
            <div className="rounded-md border min-w-max">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Specialization</TableHead>
                    <TableHead className="whitespace-nowrap">Contact</TableHead>
                    <TableHead className="whitespace-nowrap">Location</TableHead>
                    <TableHead className="whitespace-nowrap">Sourcing Type</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Assigned Vehicle</TableHead>
                    <TableHead className="whitespace-nowrap">Completed Repairs</TableHead>
                    <TableHead className="whitespace-nowrap">Avg Completion Rate</TableHead>
                    <TableHead className="whitespace-nowrap">Time of Completion</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnicians.map((technician) => (
                    <TableRow key={technician.id}>
                      <TableCell className="whitespace-nowrap">
                        <div>
                          <p className="font-medium">{technician.name}</p>
                          <p className="text-sm text-muted-foreground">{technician.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline">
                          {technician.specialization}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
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
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{technician.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge className={getSourcingTypeColor(technician.sourcingType)}>
                          {technician.sourcingType.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge className={getStatusColor(technician.status)}>
                          {technician.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {technician.assignedVehicle ? (
                          <span className="font-medium">{technician.assignedVehicle}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className="font-medium">{technician.completedRepairs}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{technician.avgCompletionRate}h</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {technician.timeOfCompletion ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{technician.timeOfCompletion}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
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
                            <DropdownMenuItem onClick={() => handleViewWorkOrder(technician)}>
                              View Work Order
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
          </div>

          {filteredTechnicians.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No technicians found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Work Order Sheet */}
      <Sheet open={isWorkOrderSheetOpen} onOpenChange={setIsWorkOrderSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Work Orders - {selectedTechnician?.name}</SheetTitle>
            <SheetDescription>
              View all work orders assigned to this technician
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-120px)] mt-6">
            {selectedTechnician?.workOrders && selectedTechnician.workOrders.length > 0 ? (
              <div className="space-y-6">
                {selectedTechnician.workOrders.map((workOrder) => (
                  <Card key={workOrder.id} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{workOrder.issueTitle}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">Work Order ID: {workOrder.id}</p>
                        </div>
                        <Badge className={getStatusBadgeColor(workOrder.currentStatus)}>
                          {workOrder.currentStatus}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Header Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Vehicle ID</Label>
                          <p className="font-medium">{workOrder.vehicleInfo}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Reported By</Label>
                          <p className="font-medium">{workOrder.reportedBy}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Date Reported</Label>
                          <p className="font-medium">{workOrder.dateReported}</p>
                        </div>
                        {workOrder.completionTime && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Completed At</Label>
                            <p className="font-medium text-success">{workOrder.completionTime}</p>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <Label className="text-xs text-muted-foreground">Issue Description</Label>
                        <p className="mt-1">{workOrder.issueDescription}</p>
                      </div>

                      {/* Repair Details */}
                      <div className="border-t pt-4 space-y-3">
                        <h4 className="font-semibold text-sm">Repair Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Estimated Repair Time</Label>
                            <p className="font-medium">{workOrder.estimatedRepairTime}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Estimated Completion</Label>
                            <p className="font-medium">{workOrder.estimatedCompletion}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Work Progress</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all"
                                style={{ width: `${workOrder.workProgress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{workOrder.workProgress}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Technician Notes */}
                      {workOrder.technicianNotes && (
                        <div className="border-t pt-4">
                          <Label className="text-xs text-muted-foreground">Technician Notes</Label>
                          <p className="mt-1 text-sm">{workOrder.technicianNotes}</p>
                        </div>
                      )}

                      {/* Logistics */}
                      <div className="border-t pt-4 space-y-3">
                        <h4 className="font-semibold text-sm">Logistics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Vehicle Location</Label>
                            <p className="font-medium">{workOrder.vehicleLocation}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Manager Approved</Label>
                            <p className="font-medium">{workOrder.managerApproved ? "Yes" : "No"}</p>
                          </div>
                        </div>
                        {workOrder.requiredParts && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Required Parts</Label>
                            <p className="mt-1 text-sm">{workOrder.requiredParts}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-muted-foreground">No work orders found for this technician.</p>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
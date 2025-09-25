import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserPlus, Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Assignment {
  id: string;
  name: string;
  role: "driver" | "technician";
  vehicleAssigned: string;
  assignedDate: string;
  status: "active" | "inactive" | "on-leave";
}

const mockAssignments: Assignment[] = [
  {
    id: "ASG-001",
    name: "Adebayo Johnson",
    role: "driver",
    vehicleAssigned: "NGR-001-LA",
    assignedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "ASG-002",
    name: "Kemi Okafor",
    role: "driver",
    vehicleAssigned: "NGR-002-LA",
    assignedDate: "2024-01-20",
    status: "active",
  },
  {
    id: "ASG-003",
    name: "Emeka Nwankwo",
    role: "technician",
    vehicleAssigned: "NGR-003-LA",
    assignedDate: "2024-01-10",
    status: "on-leave",
  },
  {
    id: "ASG-004",
    name: "Fatima Hassan",
    role: "driver",
    vehicleAssigned: "NGR-004-LA",
    assignedDate: "2024-01-25",
    status: "active",
  },
  {
    id: "ASG-005",
    name: "Tunde Bakare",
    role: "technician",
    vehicleAssigned: "NGR-005-LA",
    assignedDate: "2024-01-12",
    status: "inactive",
  },
];

const AssignSection = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    role: "" as "driver" | "technician",
    vehicleAssigned: "",
  });

  const handleAddAssignment = () => {
    if (newAssignment.name && newAssignment.role && newAssignment.vehicleAssigned) {
      const assignment: Assignment = {
        id: `ASG-${String(assignments.length + 1).padStart(3, '0')}`,
        name: newAssignment.name,
        role: newAssignment.role,
        vehicleAssigned: newAssignment.vehicleAssigned,
        assignedDate: new Date().toISOString().split('T')[0],
        status: "active",
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ name: "", role: "" as "driver" | "technician", vehicleAssigned: "" });
      setIsDialogOpen(false);
    }
  };

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "on-leave":
        return <Badge className="bg-warning/10 text-warning border-warning/20">On Leave</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: Assignment['role']) => {
    return role === "driver" ? 
      <Badge variant="outline">Driver</Badge> : 
      <Badge className="bg-primary/10 text-primary border-primary/20">Technician</Badge>;
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.vehicleAssigned.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Personnel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Personnel to Vehicle</DialogTitle>
              <DialogDescription>
                Assign a driver or technician to a specific vehicle.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Personnel Name</Label>
                <Input
                  id="name"
                  value={newAssignment.name}
                  onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newAssignment.role}
                  onValueChange={(value: "driver" | "technician") => 
                    setNewAssignment({ ...newAssignment, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select
                  value={newAssignment.vehicleAssigned}
                  onValueChange={(value) => 
                    setNewAssignment({ ...newAssignment, vehicleAssigned: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGR-001-LA">NGR-001-LA</SelectItem>
                    <SelectItem value="NGR-002-LA">NGR-002-LA</SelectItem>
                    <SelectItem value="NGR-003-LA">NGR-003-LA</SelectItem>
                    <SelectItem value="NGR-004-LA">NGR-004-LA</SelectItem>
                    <SelectItem value="NGR-005-LA">NGR-005-LA</SelectItem>
                    <SelectItem value="NGR-006-LA">NGR-006-LA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddAssignment}>
                Assign Personnel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignments Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Personnel</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Vehicle Assigned</TableHead>
              <TableHead className="font-semibold">Assigned Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{assignment.name}</div>
                    <div className="text-sm text-muted-foreground">{assignment.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {getRoleBadge(assignment.role)}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {assignment.vehicleAssigned}
                </TableCell>
                <TableCell>
                  {new Date(assignment.assignedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getStatusBadge(assignment.status)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                      <DropdownMenuItem>Change Vehicle</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove Assignment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No assignments found</p>
          <p className="text-sm">Try adjusting your search or add a new assignment</p>
        </div>
      )}
    </div>
  );
};

export default AssignSection;
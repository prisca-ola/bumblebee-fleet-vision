import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Download, 
  Filter, 
  FileText, 
  TrendingUp, 
  Users, 
  Truck, 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface ReportActivity {
  id: string;
  date: string;
  time: string;
  type: "Maintenance" | "Issue" | "Assignment" | "Inspection";
  vehicle: string;
  personnel: string;
  personType: "Driver" | "Technician";
  description: string;
  status: "Completed" | "In Progress" | "Pending" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
}

export default function ReportsSection() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [activities] = useState<ReportActivity[]>([
    {
      id: "RPT-001",
      date: "2024-01-15",
      time: "09:30",
      type: "Maintenance",
      vehicle: "NGN-45-XYZ",
      personnel: "Ibrahim Suleiman",
      personType: "Technician",
      description: "Engine oil change and filter replacement",
      status: "Completed",
      priority: "Medium"
    },
    {
      id: "RPT-002",
      date: "2024-01-15",
      time: "11:45",
      type: "Issue",
      vehicle: "NGN-12-ABC",
      personnel: "Adebayo Johnson",
      personType: "Driver",
      description: "Brake system warning light activated",
      status: "In Progress",
      priority: "High"
    },
    {
      id: "RPT-003",
      date: "2024-01-14",
      time: "14:20",
      type: "Assignment",
      vehicle: "NGN-78-DEF",
      personnel: "Kemi Okafor",
      personType: "Driver",
      description: "Driver assigned to vehicle for Lagos-Abuja route",
      status: "Completed",
      priority: "Low"
    },
    {
      id: "RPT-004",
      date: "2024-01-14",
      time: "16:15",
      type: "Inspection",
      vehicle: "NGN-34-GHI",
      personnel: "Chioma Okwu",
      personType: "Technician",
      description: "Monthly safety inspection completed",
      status: "Completed",
      priority: "Medium"
    },
    {
      id: "RPT-005",
      date: "2024-01-13",
      time: "08:00",
      type: "Issue",
      vehicle: "NGN-90-JKL",
      personnel: "Emeka Nwankwo",
      personType: "Driver",
      description: "AC system malfunction reported",
      status: "Pending",
      priority: "Low"
    },
    {
      id: "RPT-006",
      date: "2024-01-13",
      time: "13:30",
      type: "Maintenance",
      vehicle: "NGN-56-MNO",
      personnel: "Ahmad Hassan",
      personType: "Technician",
      description: "Tire rotation and alignment check",
      status: "Completed",
      priority: "Low"
    }
  ]);

  const filteredActivities = activities.filter(activity => {
    if (selectedStatus === "all") return true;
    return activity.status.toLowerCase() === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "Pending":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      case "Cancelled":
        return "bg-critical/10 text-critical border-critical/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-critical/10 text-critical border-critical/20";
      case "High":
        return "bg-warning/10 text-warning border-warning/20";
      case "Medium":
        return "bg-primary/10 text-primary border-primary/20";
      case "Low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Maintenance":
        return <Wrench className="h-4 w-4" />;
      case "Issue":
        return <AlertTriangle className="h-4 w-4" />;
      case "Assignment":
        return <Users className="h-4 w-4" />;
      case "Inspection":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: `Generating ${selectedPeriod} report for download...`,
    });
  };

  const stats = {
    totalActivities: activities.length,
    completed: activities.filter(a => a.status === "Completed").length,
    inProgress: activities.filter(a => a.status === "In Progress").length,
    pending: activities.filter(a => a.status === "Pending").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleExportReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalActivities}</p>
                <p className="text-sm text-muted-foreground">Total Activities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
          <TabsTrigger value="summary">Summary Report</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>
                Detailed timeline of all fleet activities including drivers, vehicles, and technicians
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Personnel</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{activity.date}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(activity.type)}
                            <span>{activity.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{activity.vehicle}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{activity.personnel}</p>
                            <Badge variant="outline" className="text-xs">
                              {activity.personType}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="max-w-xs text-sm">{activity.description}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(activity.priority)}>
                            {activity.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>Overview of this week's activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Maintenance Completed</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Issues Reported</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Driver Assignments</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Inspections Done</span>
                  <span className="font-bold">1</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Personnel</CardTitle>
                <CardDescription>Most active drivers and technicians</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Ibrahim Suleiman</p>
                    <p className="text-sm text-muted-foreground">Technician</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    2 Repairs
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Adebayo Johnson</p>
                    <p className="text-sm text-muted-foreground">Driver</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    1 Report
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for fleet operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">85%</div>
                  <p className="text-sm text-muted-foreground">Issue Resolution Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2.3</div>
                  <p className="text-sm text-muted-foreground">Avg Days to Repair</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">12</div>
                  <p className="text-sm text-muted-foreground">Active Vehicles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
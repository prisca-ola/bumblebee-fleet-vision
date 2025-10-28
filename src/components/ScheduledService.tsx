import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Wrench, 
  User, 
  MapPin,
  AlertCircle,
  CheckCircle,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import { ScheduleServiceDialog } from "./ScheduleServiceDialog";

interface ScheduledServiceEvent {
  id: string;
  date: Date;
  time: string;
  vehicleId: string;
  serviceType: string;
  technician: string;
  location: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  estimatedDuration: string;
  notes?: string;
}

export default function ScheduledService() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  // Mock scheduled services data
  const scheduledServices: ScheduledServiceEvent[] = [
    {
      id: "SRV-001",
      date: new Date(2024, 0, 15, 9, 0),
      time: "09:00 AM",
      vehicleId: "BUS-001",
      serviceType: "Oil Change",
      technician: "Ibrahim Suleiman",
      location: "Lagos Workshop",
      status: "scheduled",
      estimatedDuration: "2 hours",
      notes: "Regular maintenance"
    },
    {
      id: "SRV-002",
      date: new Date(2024, 0, 15, 14, 0),
      time: "02:00 PM",
      vehicleId: "VAN-003",
      serviceType: "Brake Service",
      technician: "Ahmad Hassan",
      location: "Kano Workshop",
      status: "scheduled",
      estimatedDuration: "4 hours",
    },
    {
      id: "SRV-003",
      date: new Date(2024, 0, 16, 10, 0),
      time: "10:00 AM",
      vehicleId: "TRK-007",
      serviceType: "Annual Service",
      technician: "Grace Eze",
      location: "Port Harcourt Center",
      status: "in-progress",
      estimatedDuration: "8 hours",
      notes: "Major service checkup"
    },
    {
      id: "SRV-004",
      date: new Date(2024, 0, 14, 11, 0),
      time: "11:00 AM",
      vehicleId: "NGN-45-XYZ",
      serviceType: "Electrical Systems",
      technician: "Chioma Okwu",
      location: "Abuja Service Center",
      status: "completed",
      estimatedDuration: "3 hours",
    },
    {
      id: "SRV-005",
      date: new Date(2024, 0, 17, 8, 0),
      time: "08:00 AM",
      vehicleId: "BUS-002",
      serviceType: "AC & Cooling",
      technician: "Yusuf Abdullahi",
      location: "Kaduna Workshop",
      status: "scheduled",
      estimatedDuration: "3 hours",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      case "in-progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "cancelled":
        return "bg-critical/10 text-critical border-critical/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <Wrench className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredServices = scheduledServices.filter(service => {
    const matchesDate = selectedDate ? 
      format(service.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") : 
      true;
    const matchesStatus = filterStatus === "all" || service.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const hasScheduledService = (date: Date) => {
    return scheduledServices.some(
      service => format(service.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const handleReschedule = (serviceId: string) => {
    toast({
      title: "Reschedule Service",
      description: "Opening reschedule dialog...",
    });
  };

  const handleCancel = (serviceId: string) => {
    toast({
      title: "Service Cancelled",
      description: `Service ${serviceId} has been cancelled`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Scheduled Services</h2>
          <p className="text-muted-foreground">View and manage all scheduled maintenance services</p>
        </div>
        <Button onClick={() => setIsScheduleDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule New Service
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {scheduledServices.filter(s => s.status === "scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
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
                <p className="text-2xl font-bold">
                  {scheduledServices.filter(s => s.status === "in-progress").length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
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
                <p className="text-2xl font-bold">
                  {scheduledServices.filter(s => s.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted/10 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledServices.length}</p>
                <p className="text-sm text-muted-foreground">Total Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Service Calendar</CardTitle>
            <CardDescription>Select a date to view scheduled services</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasService: (date) => hasScheduledService(date)
              }}
              modifiersStyles={{
                hasService: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "hsl(var(--primary))"
                }
              }}
            />
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Legend:</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs">Dates with scheduled services</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services List Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle>
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "All Services"}
                </CardTitle>
                <CardDescription>
                  {filteredServices.length} service(s) found
                </CardDescription>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredServices.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No services scheduled for this date</p>
                </div>
              ) : (
                filteredServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(service.status)}>
                                {getStatusIcon(service.status)}
                                <span className="ml-1">{service.status.replace("-", " ").toUpperCase()}</span>
                              </Badge>
                              <span className="text-sm font-semibold">{service.serviceType}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{service.time}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Wrench className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{service.vehicleId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{service.technician}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{service.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{service.estimatedDuration}</span>
                            </div>
                          </div>

                          {service.notes && (
                            <p className="text-xs text-muted-foreground italic">
                              Note: {service.notes}
                            </p>
                          )}

                          <div className="flex gap-2 pt-2">
                            {service.status === "scheduled" && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleReschedule(service.id)}
                                >
                                  Reschedule
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCancel(service.id)}
                                  className="text-critical"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {service.status === "in-progress" && (
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ScheduleServiceDialog 
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      />
    </div>
  );
}

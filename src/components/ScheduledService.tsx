import { useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { 
  Clock, 
  Wrench, 
  User, 
  MapPin
} from "lucide-react";

const localizer = momentLocalizer(moment);

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
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ScheduledServiceEvent | null>(null);

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

  const events = useMemo(() => {
    return scheduledServices.map(service => ({
      ...service,
      title: `${service.vehicleId} - ${service.serviceType}`,
      start: service.date,
      end: new Date(service.date.getTime() + 2 * 60 * 60 * 1000), // 2 hours default
      resource: service,
    }));
  }, [scheduledServices]);

  const eventStyleGetter = useCallback((event: any) => {
    const service = event.resource as ScheduledServiceEvent;
    let backgroundColor = "hsl(var(--primary))";
    
    switch (service.status) {
      case "scheduled":
        backgroundColor = "hsl(var(--primary))";
        break;
      case "in-progress":
        backgroundColor = "hsl(var(--warning))";
        break;
      case "completed":
        backgroundColor = "hsl(var(--success))";
        break;
      case "cancelled":
        backgroundColor = "hsl(var(--critical))";
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "none",
        display: "block",
        fontSize: "0.875rem",
        padding: "4px 8px",
      },
    };
  }, []);

  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event.resource);
  }, []);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
        <div className="h-[calc(100vh-16rem)]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            popup
            style={{ height: "100%" }}
          />
        </div>
      </div>

      {selectedEvent && (
        <div className="mt-6 bg-card rounded-2xl shadow-sm border border-primary/20 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selectedEvent.serviceType}</h3>
              <Badge className={`${
                selectedEvent.status === "scheduled" ? "bg-primary/10 text-primary border-primary/20" :
                selectedEvent.status === "in-progress" ? "bg-warning/10 text-warning border-warning/20" :
                selectedEvent.status === "completed" ? "bg-success/10 text-success border-success/20" :
                "bg-critical/10 text-critical border-critical/20"
              }`}>
                {selectedEvent.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{selectedEvent.vehicleId}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>{selectedEvent.technician}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            {selectedEvent.notes && (
              <p className="text-sm text-muted-foreground italic pt-2 border-t border-border">
                Note: {selectedEvent.notes}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              {selectedEvent.status === "scheduled" && (
                <>
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline" className="text-critical hover:text-critical">
                    Cancel Service
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

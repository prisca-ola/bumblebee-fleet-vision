import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface ScheduleServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId?: string;
  serviceType?: string;
}

export function ScheduleServiceDialog({ open, onOpenChange, vehicleId, serviceType }: ScheduleServiceDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("09:00");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleId || "");
  const [selectedService, setSelectedService] = useState(serviceType || "");
  const [technician, setTechnician] = useState("");
  const [notes, setNotes] = useState("");

  const handleSchedule = () => {
    if (!date || !selectedVehicle || !selectedService || !technician) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Service Scheduled",
      description: `${selectedService} scheduled for ${format(date, "PPP")} at ${time}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Service</DialogTitle>
          <DialogDescription>
            Select a date and time for the maintenance service
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Date *</Label>
              <div className="border rounded-lg p-3 bg-background">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Time Slot *</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 AM</SelectItem>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">01:00 PM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Vehicle *</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUS-001">BUS-001</SelectItem>
                    <SelectItem value="VAN-003">VAN-003</SelectItem>
                    <SelectItem value="TRK-007">TRK-007</SelectItem>
                    <SelectItem value="NGN-45-XYZ">NGN-45-XYZ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Service Type *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oil Change">Oil Change</SelectItem>
                    <SelectItem value="Brake Service">Brake Service</SelectItem>
                    <SelectItem value="Annual Service">Annual Service</SelectItem>
                    <SelectItem value="Tire Rotation">Tire Rotation</SelectItem>
                    <SelectItem value="Filter Replacement">Filter Replacement</SelectItem>
                    <SelectItem value="Engine Repair">Engine Repair</SelectItem>
                    <SelectItem value="Electrical Systems">Electrical Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assign Technician *</Label>
                <Select value={technician} onValueChange={setTechnician}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TECH-001">Ibrahim Suleiman - Engine Repair</SelectItem>
                    <SelectItem value="TECH-002">Chioma Okwu - Electrical Systems</SelectItem>
                    <SelectItem value="TECH-003">Ahmad Hassan - Brake Systems</SelectItem>
                    <SelectItem value="TECH-004">Grace Eze - Transmission</SelectItem>
                    <SelectItem value="TECH-005">Yusuf Abdullahi - AC & Cooling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Add any special instructions or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule Service
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

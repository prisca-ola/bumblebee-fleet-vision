import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";

interface ScheduleServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId?: string;
  serviceType?: string;
}

export function ScheduleServiceDialog({ open, onOpenChange, vehicleId, serviceType }: ScheduleServiceDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleId || "");
  const [selectedService, setSelectedService] = useState(serviceType || "");
  const [technician, setTechnician] = useState("");
  const [notes, setNotes] = useState("");

  const handleSchedule = () => {
    if (!date || !time || !selectedVehicle || !selectedService || !technician) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Service Scheduled",
      description: `${selectedService} scheduled for ${date} at ${time}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Schedule Service</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a maintenance service
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">Time *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-sm font-medium">Vehicle *</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger id="vehicle">
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
            <Label htmlFor="service" className="text-sm font-medium">Service Type *</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Select service type" />
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
            <Label htmlFor="technician" className="text-sm font-medium">Assign Technician *</Label>
            <Select value={technician} onValueChange={setTechnician}>
              <SelectTrigger id="technician">
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

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

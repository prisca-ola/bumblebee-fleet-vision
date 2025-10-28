import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, User, Phone, Mail, MapPin, Wrench } from "lucide-react";

interface AddTechnicianDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTechnicianDialog({ open, onOpenChange }: AddTechnicianDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    specialization: "",
    location: "",
    sourcingType: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.specialization || !formData.location || !formData.sourcingType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Technician Added",
      description: `${formData.name} has been added to the technicians directory`,
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      specialization: "",
      location: "",
      sourcingType: "",
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Technician
          </DialogTitle>
          <DialogDescription>
            Enter the technician's details to add them to your fleet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+234 XXX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization *</Label>
            <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
              <SelectTrigger id="specialization">
                <Wrench className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engine Repair">Engine Repair</SelectItem>
                <SelectItem value="Electrical Systems">Electrical Systems</SelectItem>
                <SelectItem value="Brake Systems">Brake Systems</SelectItem>
                <SelectItem value="Transmission">Transmission</SelectItem>
                <SelectItem value="AC & Cooling">AC & Cooling</SelectItem>
                <SelectItem value="Suspension">Suspension</SelectItem>
                <SelectItem value="Body Work">Body Work</SelectItem>
                <SelectItem value="General Maintenance">General Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger id="location">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos Workshop">Lagos Workshop</SelectItem>
                <SelectItem value="Abuja Service Center">Abuja Service Center</SelectItem>
                <SelectItem value="Kano Workshop">Kano Workshop</SelectItem>
                <SelectItem value="Port Harcourt Center">Port Harcourt Center</SelectItem>
                <SelectItem value="Kaduna Workshop">Kaduna Workshop</SelectItem>
                <SelectItem value="Ibadan Center">Ibadan Center</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourcingType">Sourcing Type *</Label>
            <Select value={formData.sourcingType} onValueChange={(value) => handleInputChange("sourcingType", value)}>
              <SelectTrigger id="sourcingType">
                <SelectValue placeholder="Select sourcing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-house">In-House</SelectItem>
                <SelectItem value="roadside">Roadside</SelectItem>
                <SelectItem value="third-party">Third-Party</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Technician
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

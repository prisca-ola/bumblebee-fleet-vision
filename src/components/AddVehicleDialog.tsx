import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface VehicleFormData {
  vehicleName: string;
  plateNumber: string;
  type: "Bus" | "Van" | "Truck";
  color: string;
  model: string;
  year: string;
  driver: string;
  initialMileage: string;
  location: string;
  fuelCapacity: string;
  engineNumber: string;
  chassisNumber: string;
}

interface SimpleDriver {
  id: string;
  name: string;
}

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddVehicle: (vehicle: any) => void;
  drivers: SimpleDriver[];
}

const AddVehicleDialog = ({ open, onOpenChange, onAddVehicle, drivers }: AddVehicleDialogProps) => {
  const form = useForm<VehicleFormData>({
    defaultValues: {
      vehicleName: "",
      plateNumber: "",
      type: "Bus",
      color: "",
      model: "",
      year: "",
      driver: "",
      initialMileage: "",
      location: "",
      fuelCapacity: "",
      engineNumber: "",
      chassisNumber: "",
    },
  });

  const onSubmit = (data: VehicleFormData) => {
    const selectedDriver = drivers.find(d => d.id === data.driver);
    
    const newVehicle = {
      id: data.vehicleName.toUpperCase(),
      plateNumber: data.plateNumber,
      type: data.type,
      status: "healthy" as const,
      location: data.location,
      driver: selectedDriver?.name || "Unassigned",
      fuelLevel: 100,
      lastScan: "Just added",
      issues: 0,
      mileage: parseInt(data.initialMileage) || 0,
      color: data.color,
      model: data.model,
      year: data.year,
      fuelCapacity: data.fuelCapacity,
      engineNumber: data.engineNumber,
      chassisNumber: data.chassisNumber,
    };

    onAddVehicle(newVehicle);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the vehicle details to add it to your fleet.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vehicleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Name/ID</FormLabel>
                    <FormControl>
                      <Input placeholder="BUS-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-123-XY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bus">Bus</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Truck">Truck</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="White" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Toyota Hiace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Driver</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Lagos Island" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="initialMileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Mileage (km)</FormLabel>
                    <FormControl>
                      <Input placeholder="0" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Capacity (L)</FormLabel>
                    <FormControl>
                      <Input placeholder="70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="engineNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Number</FormLabel>
                    <FormControl>
                      <Input placeholder="EN123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chassisNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis Number</FormLabel>
                    <FormControl>
                      <Input placeholder="CH987654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Vehicle</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleDialog;
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Navigation, Clock, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TechnicianLocation {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  status: "Available" | "Assigned" | "Off Duty";
  sourcingType: "in-house" | "roadside" | "third-party";
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  currentJob?: string;
}

const TechnicianMap = () => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedTechnician, setSelectedTechnician] = useState<TechnicianLocation | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock technician data with coordinates (Nigeria locations)
  const technicians: TechnicianLocation[] = [
    {
      id: "TECH-001",
      name: "Ibrahim Suleiman",
      phone: "+234 803 123 4567",
      specialization: "Engine Repair",
      status: "Available",
      sourcingType: "in-house",
      location: "Lagos Workshop",
      coordinates: [3.3792, 6.5244]
    },
    {
      id: "TECH-002",
      name: "Chioma Okwu",
      phone: "+234 805 987 6543",
      specialization: "Electrical Systems",
      status: "Assigned",
      sourcingType: "in-house",
      location: "Abuja Service Center",
      coordinates: [7.4951, 9.0579],
      currentJob: "BUS-045 Electrical Issue"
    },
    {
      id: "TECH-003",
      name: "Ahmad Hassan",
      phone: "+234 807 456 7890",
      specialization: "Brake Systems",
      status: "Available",
      sourcingType: "roadside",
      location: "Kano Mobile Unit",
      coordinates: [8.5167, 12.0022]
    },
    {
      id: "TECH-004",
      name: "Grace Eze",
      phone: "+234 809 234 5678",
      specialization: "Transmission",
      status: "Available",
      sourcingType: "third-party",
      location: "Port Harcourt Partner",
      coordinates: [7.0498, 4.8156]
    },
    {
      id: "TECH-005",
      name: "Yusuf Abdullahi",
      phone: "+234 806 345 6789",
      specialization: "AC & Cooling",
      status: "Assigned",
      sourcingType: "roadside",
      location: "Kaduna Mobile",
      coordinates: [7.4388, 10.5225],
      currentJob: "VAN-023 AC Repair"
    },
    {
      id: "TECH-006",
      name: "Blessing Okon",
      phone: "+234 808 567 8901",
      specialization: "General Maintenance",
      status: "Available",
      sourcingType: "third-party",
      location: "Ibadan Partner Shop",
      coordinates: [3.9470, 7.3775]
    }
  ];

  const filteredTechnicians = technicians.filter(tech => {
    const typeMatch = filterType === "all" || tech.sourcingType === filterType;
    const statusMatch = filterStatus === "all" || tech.status === filterStatus;
    return typeMatch && statusMatch;
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Nigeria
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTZjMjM3aHYwNW5zMmpzaWc2dDRoNG44In0.2v-3cYhTk6D77FGJmIrAaA';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [7.9999, 9.0820], // Center of Nigeria
      zoom: 5.5
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each technician
    filteredTechnicians.forEach((tech) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'technician-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      
      // Color based on sourcing type
      if (tech.sourcingType === 'in-house') {
        el.style.backgroundColor = tech.status === 'Available' ? '#10b981' : '#f59e0b';
      } else if (tech.sourcingType === 'roadside') {
        el.style.backgroundColor = tech.status === 'Available' ? '#3b82f6' : '#8b5cf6';
      } else {
        el.style.backgroundColor = tech.status === 'Available' ? '#06b6d4' : '#ec4899';
      }

      // Add icon
      const icon = document.createElement('div');
      icon.innerHTML = '🔧';
      icon.style.fontSize = '18px';
      el.appendChild(icon);

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(tech.coordinates)
        .addTo(map.current!);

      // Add click event
      el.addEventListener('click', () => {
        setSelectedTechnician(tech);
        map.current?.flyTo({
          center: tech.coordinates,
          zoom: 10,
          duration: 1500
        });
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${tech.name}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${tech.specialization}</p>
            <p style="font-size: 11px; margin-bottom: 4px;">
              <span style="background: ${tech.status === 'Available' ? '#dcfce7' : '#fef3c7'}; 
                           color: ${tech.status === 'Available' ? '#15803d' : '#92400e'}; 
                           padding: 2px 6px; border-radius: 4px;">
                ${tech.status}
              </span>
            </p>
            <p style="font-size: 11px; color: #888;">
              ${tech.sourcingType.replace('-', ' ').toUpperCase()}
            </p>
          </div>
        `);

      marker.setPopup(popup);
    });

    return () => {
      map.current?.remove();
    };
  }, [filterType, filterStatus]);

  const getSourcingTypeColor = (type: string) => {
    switch (type) {
      case "in-house": return "bg-success/10 text-success border-success/20";
      case "roadside": return "bg-primary/10 text-primary border-primary/20";
      case "third-party": return "bg-info/10 text-info border-info/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success/10 text-success border-success/20";
      case "Assigned": return "bg-warning/10 text-warning border-warning/20";
      case "Off Duty": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleDispatch = (techId: string) => {
    toast({
      title: "Dispatching Technician",
      description: `Technician ${techId} has been dispatched to the location.`,
    });
  };

  const handleCallTechnician = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-6">
      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <label className="text-sm font-medium">Sourcing Type:</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="in-house">In-House</SelectItem>
                    <SelectItem value="roadside">Roadside</SelectItem>
                    <SelectItem value="third-party">Third-Party</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <label className="text-sm font-medium">Status:</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success" />
              <div>
                <p className="text-sm font-medium">In-House</p>
                <p className="text-xs text-muted-foreground">
                  {technicians.filter(t => t.sourcingType === 'in-house').length} techs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-xs text-muted-foreground">
                  {technicians.filter(t => t.status === 'Available').length} ready
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Technician Location Map
            </CardTitle>
            <CardDescription>
              Real-time technician locations for faster dispatch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={mapContainer} className="w-full h-[500px] rounded-lg" />
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                In-House Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                Roadside Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-info" />
                Third-Party Available
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technician Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTechnician ? "Technician Details" : "Select a Technician"}
            </CardTitle>
            <CardDescription>
              {selectedTechnician ? "Click on map markers to view details" : "Click on any marker on the map"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTechnician ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedTechnician.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTechnician.id}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTechnician.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTechnician.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTechnician.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge className={getSourcingTypeColor(selectedTechnician.sourcingType)}>
                    {selectedTechnician.sourcingType.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(selectedTechnician.status)}>
                    {selectedTechnician.status}
                  </Badge>
                </div>

                {selectedTechnician.currentJob && (
                  <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Current Job</p>
                        <p className="text-xs text-muted-foreground">{selectedTechnician.currentJob}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => handleDispatch(selectedTechnician.id)}
                    disabled={selectedTechnician.status !== 'Available'}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Dispatch Technician
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleCallTechnician(selectedTechnician.phone)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Technician
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Click on a marker to view technician details and dispatch options</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianMap;
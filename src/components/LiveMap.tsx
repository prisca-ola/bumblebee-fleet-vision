import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Truck, AlertTriangle, Wrench, User, MapPin } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  location: [number, number]; // [lng, lat]
  status: 'active' | 'downtime' | 'maintenance';
  driver?: string;
}

interface Technician {
  id: string;
  name: string;
  location: [number, number]; // [lng, lat]
  status: 'available' | 'assigned' | 'on-route';
  sourcingType: 'in-house' | 'roadside' | 'third-party';
  specialization: string;
  phone: string;
  currentAssignment?: string;
}

const LiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showVehicles, setShowVehicles] = useState(true);
  const [showTechnicians, setShowTechnicians] = useState(true);
  
  const [vehicles] = useState<Vehicle[]>([
    { id: 'TRK-007', name: 'Truck 007', location: [3.3792, 6.5244], status: 'active', driver: 'Emeka Nwankwo' },
    { id: 'BUS-001', name: 'Bus 001', location: [3.4000, 6.4500], status: 'active', driver: 'Adebayo Johnson' },
    { id: 'VAN-003', name: 'Van 003', location: [3.3500, 6.5800], status: 'downtime' },
    { id: 'VAN-008', name: 'Van 008', location: [3.4200, 6.4300], status: 'active', driver: 'Tunde Bakare' },
    { id: 'TRK-045', name: 'Truck 045', location: [3.3900, 6.4900], status: 'maintenance' },
  ]);

  const [technicians] = useState<Technician[]>([
    {
      id: 'TECH-001',
      name: 'John Okafor',
      location: [3.3850, 6.5100],
      status: 'available',
      sourcingType: 'in-house',
      specialization: 'Engine Specialist',
      phone: '+234-801-234-5678'
    },
    {
      id: 'TECH-002',
      name: 'Sarah Ahmed',
      location: [3.3600, 6.5500],
      status: 'assigned',
      sourcingType: 'in-house',
      specialization: 'Electrical Systems',
      phone: '+234-802-345-6789',
      currentAssignment: 'VAN-003'
    },
    {
      id: 'TECH-003',
      name: 'Mike Adeyemi',
      location: [3.4100, 6.4400],
      status: 'on-route',
      sourcingType: 'roadside',
      specialization: 'General Repairs',
      phone: '+234-803-456-7890',
      currentAssignment: 'TRK-045'
    },
    {
      id: 'TECH-004',
      name: 'David Nwosu',
      location: [3.3950, 6.5300],
      status: 'available',
      sourcingType: 'third-party',
      specialization: 'Transmission',
      phone: '+234-804-567-8901'
    }
  ]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [3.3792, 6.5244], // Lagos, Nigeria
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add vehicle markers
    if (showVehicles) {
      vehicles.forEach((vehicle) => {
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.cursor = 'pointer';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        
        if (vehicle.status === 'active') {
          el.style.backgroundColor = 'hsl(142, 76%, 36%)';
        } else if (vehicle.status === 'downtime') {
          el.style.backgroundColor = 'hsl(0, 84%, 60%)';
        } else {
          el.style.backgroundColor = 'hsl(38, 92%, 50%)';
        }

        const icon = document.createElement('div');
        icon.innerHTML = vehicle.status === 'downtime' ? '⚠️' : '🚛';
        icon.style.fontSize = '16px';
        el.appendChild(icon);

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">🚛 ${vehicle.name}</h3>
            <p style="font-size: 12px; color: #666; margin: 4px 0;">ID: ${vehicle.id}</p>
            ${vehicle.driver ? `<p style="font-size: 12px; color: #666; margin: 4px 0;">Driver: ${vehicle.driver}</p>` : ''}
            <p style="font-size: 12px; margin: 4px 0;">
              Status: <span style="
                padding: 2px 8px; 
                border-radius: 12px; 
                background: ${vehicle.status === 'active' ? 'hsl(142, 76%, 36%, 0.1)' : vehicle.status === 'downtime' ? 'hsl(0, 84%, 60%, 0.1)' : 'hsl(38, 92%, 50%, 0.1)'};
                color: ${vehicle.status === 'active' ? 'hsl(142, 76%, 36%)' : vehicle.status === 'downtime' ? 'hsl(0, 84%, 60%)' : 'hsl(38, 92%, 50%)'};
              ">${vehicle.status}</span>
            </p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(vehicle.location)
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    // Add technician markers
    if (showTechnicians) {
      technicians.forEach((tech) => {
        const el = document.createElement('div');
        el.className = 'technician-marker';
        el.style.width = '36px';
        el.style.height = '36px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.cursor = 'pointer';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 3px 10px rgba(0,0,0,0.4)';
        
        if (tech.status === 'available') {
          el.style.backgroundColor = 'hsl(217, 91%, 60%)';
        } else if (tech.status === 'assigned') {
          el.style.backgroundColor = 'hsl(38, 92%, 50%)';
        } else {
          el.style.backgroundColor = 'hsl(280, 65%, 60%)';
        }

        const icon = document.createElement('div');
        icon.innerHTML = '🔧';
        icon.style.fontSize = '18px';
        el.appendChild(icon);

        const getSourcingBadgeColor = (type: string) => {
          switch(type) {
            case 'in-house': return 'hsl(217, 91%, 60%)';
            case 'roadside': return 'hsl(38, 92%, 50%)';
            case 'third-party': return 'hsl(280, 65%, 60%)';
            default: return 'hsl(217, 91%, 60%)';
          }
        };

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 30 }).setHTML(`
          <div style="padding: 10px; min-width: 220px;">
            <h3 style="font-weight: 600; margin-bottom: 8px;">🔧 ${tech.name}</h3>
            <p style="font-size: 12px; color: #666; margin: 4px 0;">ID: ${tech.id}</p>
            <p style="font-size: 12px; color: #666; margin: 4px 0;">Phone: ${tech.phone}</p>
            <p style="font-size: 12px; color: #666; margin: 4px 0;">Specialization: ${tech.specialization}</p>
            <p style="font-size: 12px; margin: 4px 0;">
              Type: <span style="
                padding: 2px 8px; 
                border-radius: 12px; 
                background: ${getSourcingBadgeColor(tech.sourcingType)}20;
                color: ${getSourcingBadgeColor(tech.sourcingType)};
                font-weight: 500;
              ">${tech.sourcingType}</span>
            </p>
            <p style="font-size: 12px; margin: 4px 0;">
              Status: <span style="
                padding: 2px 8px; 
                border-radius: 12px; 
                background: ${tech.status === 'available' ? 'hsl(142, 76%, 36%, 0.1)' : 'hsl(38, 92%, 50%, 0.1)'};
                color: ${tech.status === 'available' ? 'hsl(142, 76%, 36%)' : 'hsl(38, 92%, 50%)'};
                font-weight: 500;
              ">${tech.status}</span>
            </p>
            ${tech.currentAssignment ? `<p style="font-size: 12px; color: #666; margin: 4px 0;">Assignment: ${tech.currentAssignment}</p>` : ''}
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(tech.location)
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, vehicles, technicians, showVehicles, showTechnicians]);

  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const downtimeVehicles = vehicles.filter(v => v.status === 'downtime').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
  
  const availableTechnicians = technicians.filter(t => t.status === 'available').length;
  const assignedTechnicians = technicians.filter(t => t.status === 'assigned').length;
  const onRouteTechnicians = technicians.filter(t => t.status === 'on-route').length;

  if (!mapboxToken) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Live Fleet Map</h2>
          <p className="text-muted-foreground">Track your vehicles in real-time on the map</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-semibold">Mapbox Token Required</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              To display the live map, please enter your Mapbox public token below. 
              You can get one from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ5b3VyLXRva2VuIn0..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Live Fleet & Technician Map</h2>
          <p className="text-muted-foreground">Track your vehicles and technicians in real-time</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showVehicles ? "default" : "outline"}
            size="sm"
            onClick={() => setShowVehicles(!showVehicles)}
          >
            <Truck className="h-4 w-4 mr-2" />
            Vehicles
          </Button>
          <Button
            variant={showTechnicians ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTechnicians(!showTechnicians)}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Technicians
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Vehicles</p>
              <p className="text-2xl font-bold">{activeVehicles}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <Truck className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Downtime</p>
              <p className="text-2xl font-bold">{downtimeVehicles}</p>
            </div>
            <div className="p-3 bg-critical/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-critical" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Maintenance</p>
              <p className="text-2xl font-bold">{maintenanceVehicles}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Truck className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Available Techs</p>
              <p className="text-2xl font-bold">{availableTechnicians}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <Wrench className="h-6 w-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assigned</p>
              <p className="text-2xl font-bold">{assignedTechnicians}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <User className="h-6 w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">On Route</p>
              <p className="text-2xl font-bold">{onRouteTechnicians}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Map */}
      <Card className="p-0 overflow-hidden">
        <div ref={mapContainer} className="w-full h-[600px]" />
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Map Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Vehicles 🚛</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success border-2 border-white"></div>
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-critical border-2 border-white"></div>
                <span className="text-sm">Downtime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning border-2 border-white"></div>
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Technicians 🔧</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-info border-2 border-white"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning border-2 border-white"></div>
                <span className="text-sm">Assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'hsl(280, 65%, 60%)', border: '2px solid white'}}></div>
                <span className="text-sm">On Route</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveMap;

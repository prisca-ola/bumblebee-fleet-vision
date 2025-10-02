import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Truck, AlertTriangle } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  location: [number, number]; // [lng, lat]
  status: 'active' | 'downtime' | 'maintenance';
  driver?: string;
}

const LiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [vehicles] = useState<Vehicle[]>([
    { id: 'TRK-007', name: 'Truck 007', location: [3.3792, 6.5244], status: 'active', driver: 'Emeka Nwankwo' },
    { id: 'BUS-001', name: 'Bus 001', location: [3.4000, 6.4500], status: 'active', driver: 'Adebayo Johnson' },
    { id: 'VAN-003', name: 'Van 003', location: [3.3500, 6.5800], status: 'downtime' },
    { id: 'VAN-008', name: 'Van 008', location: [3.4200, 6.4300], status: 'active', driver: 'Tunde Bakare' },
    { id: 'TRK-045', name: 'Truck 045', location: [3.3900, 6.4900], status: 'maintenance' },
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
          <h3 style="font-weight: 600; margin-bottom: 8px;">${vehicle.name}</h3>
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

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, vehicles]);

  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const downtimeVehicles = vehicles.filter(v => v.status === 'downtime').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;

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
      <div>
        <h2 className="text-2xl font-bold mb-2">Live Fleet Map</h2>
        <p className="text-muted-foreground">Track your vehicles in real-time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      {/* Map */}
      <Card className="p-0 overflow-hidden">
        <div ref={mapContainer} className="w-full h-[600px]" />
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Map Legend</h3>
        <div className="flex flex-wrap gap-4">
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
      </Card>
    </div>
  );
};

export default LiveMap;

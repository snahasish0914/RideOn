import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bus, BusStop, BusRoute } from '@/lib/mockData';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/lib/mapUtils';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as L.Icon.Default)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  buses: Bus[];
  stops: BusStop[];
  routes: BusRoute[];
  selectedRoute: string;
  onStopClick: (stopId: string) => void;
}

export const MapView = ({ buses, stops, routes, selectedRoute, onStopClick }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const routeLinesRef = useRef<{ [key: string]: L.Polyline }>({});

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    
    // Use OpenStreetMap tiles (free and works well for low bandwidth)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update route lines
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing route lines
    Object.values(routeLinesRef.current).forEach(line => {
      mapInstanceRef.current?.removeLayer(line);
    });
    routeLinesRef.current = {};

    // Add route lines
    routes.forEach(route => {
      if (selectedRoute === 'all' || selectedRoute === route.id) {
        const polyline = L.polyline(route.path, {
          color: route.color,
          weight: 4,
          opacity: 0.7
        }).addTo(mapInstanceRef.current!);

        routeLinesRef.current[route.id] = polyline;
      }
    });
  }, [routes, selectedRoute]);

  // Update bus stops
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing stop markers
    Object.values(markersRef.current).forEach(marker => {
      if (marker.options.icon?.options.className?.includes('stop')) {
        mapInstanceRef.current?.removeLayer(marker);
      }
    });

    // Add stop markers
    stops.forEach(stop => {
      const shouldShow = selectedRoute === 'all' || stop.routes.includes(selectedRoute);
      
      if (shouldShow) {
        const stopIcon = L.divIcon({
          className: 'stop-marker',
          html: `<div class="w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-lg"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
          .bindPopup(`<strong>${stop.name}</strong><br/>Routes: ${stop.routes.join(', ')}`)
          .on('click', () => onStopClick(stop.id))
          .addTo(mapInstanceRef.current!);

        markersRef.current[`stop-${stop.id}`] = marker;
      }
    });
  }, [stops, selectedRoute, onStopClick]);

  // Update bus markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing bus markers
    Object.values(markersRef.current).forEach(marker => {
      if (marker.options.icon?.options.className?.includes('bus')) {
        mapInstanceRef.current?.removeLayer(marker);
      }
    });

    // Add bus markers
    buses.forEach(bus => {
      const busIcon = L.divIcon({
        className: 'bus-marker',
        html: `<div class="w-6 h-6 bg-red-500 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
                 <div class="w-2 h-2 bg-white rounded-full"></div>
               </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon })
        .bindPopup(`<strong>Bus ${bus.id}</strong><br/>Speed: ${bus.speed} km/h<br/>Next Stop: ${bus.nextStopId}<br/>ETA: ${bus.estimatedArrival} min`)
        .addTo(mapInstanceRef.current!);

      markersRef.current[`bus-${bus.id}`] = marker;
    });
  }, [buses]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[400px] rounded-lg border border-gray-200"
      style={{ zIndex: 1 }}
    />
  );
};
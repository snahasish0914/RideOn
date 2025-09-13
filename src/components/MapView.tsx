// File: src/components/MapView.tsx

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bus, BusStop } from '@/lib/mockData';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/lib/mapUtils';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as L.Icon.Default)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.freepik.com/512/6395/6395367.png', // Placeholder URL, replace with your bus image
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface MapViewProps {
  buses: Bus[];
  stops: BusStop[];
  onStopClick: (stopId: string) => void;
}

export const MapView = ({ buses, stops, onStopClick }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    
    // Use OpenStreetMap tiles
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

  // Update bus stops
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(markersRef.current).forEach(marker => {
      if (marker.options.icon?.options.className?.includes('stop')) {
        mapInstanceRef.current?.removeLayer(marker);
      }
    });

    stops.forEach(stop => {
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
    });
  }, [stops, onStopClick]);

  // Update bus markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old bus markers
    Object.keys(markersRef.current).forEach(key => {
      if (key.startsWith('bus-')) {
        mapInstanceRef.current?.removeLayer(markersRef.current[key]);
        delete markersRef.current[key];
      }
    });

    // Add new bus markers
    buses.forEach(bus => {
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


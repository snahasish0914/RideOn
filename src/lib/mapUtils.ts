import { busStops, BusStop } from './mockData';

// Utility functions for map calculations

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const estimateArrivalTime = (
  busLat: number,
  busLng: number,
  stopLat: number,
  stopLng: number,
  speed: number // km/h
): number => {
  const distance = calculateDistance(busLat, busLng, stopLat, stopLng);
  const timeInHours = distance / speed;
  return Math.round(timeInHours * 60); // Convert to minutes
};

export const formatTime = (minutes: number): string => {
  if (minutes < 1) return 'Arriving now';
  if (minutes === 1) return '1 min';
  if (minutes < 60) return `${minutes} mins`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getStopById = (id: string): BusStop | undefined => {
  return busStops.find((stop: BusStop) => stop.id === id);
};

// Default map center for small Indian city
export const DEFAULT_CENTER: [number, number] = [30.7333, 76.7794]; // Chandigarh coordinates
export const DEFAULT_ZOOM = 13;
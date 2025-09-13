import { useState, useEffect, useCallback } from 'react';
import { Bus, generateMockBuses, busRoutes, busStops } from '@/lib/mockData';
import { estimateArrivalTime, getStopById } from '@/lib/mapUtils';

export const useBusTracking = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize buses
  useEffect(() => {
    const initialBuses = generateMockBuses();
    setBuses(initialBuses);
    setIsLoading(false);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          // Simulate movement along route
          const route = busRoutes.find(r => r.id === bus.routeId);
          if (!route) return bus;

          // Small random movement
          const deltaLat = (Math.random() - 0.5) * 0.001;
          const deltaLng = (Math.random() - 0.5) * 0.001;
          
          const newLat = bus.lat + deltaLat;
          const newLng = bus.lng + deltaLng;

          // Recalculate arrival time to next stop
          const nextStop = getStopById(bus.nextStopId);
          const newEstimatedArrival = nextStop 
            ? estimateArrivalTime(newLat, newLng, nextStop.lat, nextStop.lng, bus.speed)
            : bus.estimatedArrival;

          return {
            ...bus,
            lat: newLat,
            lng: newLng,
            estimatedArrival: Math.max(0, newEstimatedArrival - 0.5) // Gradually decrease
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = selectedRoute === 'all' 
    ? buses 
    : buses.filter(bus => bus.routeId === selectedRoute);

  const getBusesForStop = useCallback((stopId: string) => {
    return buses.filter(bus => bus.nextStopId === stopId);
  }, [buses]);

  const getArrivalTimes = useCallback((stopId: string) => {
    const stopBuses = getBusesForStop(stopId);
    return stopBuses
      .map(bus => ({
        busId: bus.id,
        routeId: bus.routeId,
        estimatedArrival: bus.estimatedArrival
      }))
      .sort((a, b) => a.estimatedArrival - b.estimatedArrival);
  }, [getBusesForStop]);

  return {
    buses: filteredBuses,
    selectedRoute,
    setSelectedRoute,
    selectedStop,
    setSelectedStop,
    isLoading,
    getBusesForStop,
    getArrivalTimes
  };
};
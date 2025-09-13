// File: src/hooks/useBusTracking.ts

import { useState, useEffect, useRef } from 'react';
import { busRoutes, busStops } from '@/lib/mockData';
import { getDistance } from 'geolib';

interface Bus {
  id: string;
  routeId: string;
  lat: number;
  lng: number;
  nextStopId: string;
  speed: number;
  distanceTraveled: number;
  estimatedArrival: number;
}

// Function to find a point along a polyline based on distance
const getPointAlongPath = (path: [number, number][], distance: number): [number, number] | null => {
  if (!path || path.length < 2) return null;

  let traveledDistance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const startPoint = { latitude: path[i][0], longitude: path[i][1] };
    const endPoint = { latitude: path[i + 1][0], longitude: path[i + 1][1] };
    const segmentDistance = getDistance(startPoint, endPoint);

    if (traveledDistance + segmentDistance >= distance) {
      const remainingDistance = distance - traveledDistance;
      const ratio = remainingDistance / segmentDistance;
      const lat = startPoint.latitude + (endPoint.latitude - startPoint.latitude) * ratio;
      const lng = startPoint.longitude + (endPoint.longitude - startPoint.longitude) * ratio;
      return [lat, lng];
    }
    traveledDistance += segmentDistance;
  }
  return path[path.length - 1];
};

export const useBusTracking = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize buses
    const initialBuses: Bus[] = busRoutes.map(route => ({
      id: `bus-${route.id}`,
      routeId: route.id,
      lat: route.path[0][0],
      lng: route.path[0][1],
      nextStopId: route.stops[0],
      speed: Math.floor(Math.random() * 20) + 15, // km/h
      distanceTraveled: 0,
      estimatedArrival: 0,
    }));
    setBuses(initialBuses);

    intervalRef.current = window.setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => {
          const route = busRoutes.find(r => r.id === bus.routeId);
          if (!route) return bus;

          const distanceIncrement = bus.speed * (1000 / 3600); // meters per second
          const newDistance = (bus.distanceTraveled + distanceIncrement);
          const newPosition = getPointAlongPath(route.path, newDistance);
          
          if (!newPosition) {
             // If no new position, reset to the start
             return { ...bus, lat: route.path[0][0], lng: route.path[0][1], distanceTraveled: 0 };
          }

          const totalRouteDistance = route.totalDistance;

          if (newDistance >= totalRouteDistance) {
            // Bus has completed the route, reset to start
            return { ...bus, lat: route.path[0][0], lng: route.path[0][1], distanceTraveled: 0 };
          }
          
          return {
            ...bus,
            lat: newPosition[0],
            lng: newPosition[1],
            distanceTraveled: newDistance,
          };
        })
      );
    }, 1000); // Update every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getArrivalTimes = (stopId: string) => {
    const stop = busStops.find(s => s.id === stopId);
    if (!stop) return [];

    return buses
      .filter(bus => bus.nextStopId === stopId)
      .map(bus => {
        const route = busRoutes.find(r => r.id === bus.routeId);
        if (!route) return null;

        const stopIndex = route.stops.indexOf(stopId);
        if (stopIndex === -1) return null;

        const distanceToStop = route.stopDistances[stopIndex] - bus.distanceTraveled;
        const eta = Math.max(0, Math.floor((distanceToStop / (bus.speed / 3.6)) / 60)); // in minutes

        return { busId: bus.id, eta };
      })
      .filter(Boolean);
  };

  return { buses, getArrivalTimes };
};

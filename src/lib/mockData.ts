export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: string[];
  path: [number, number][];
}

export interface Bus {
  id: string;
  routeId: string;
  lat: number;
  lng: number;
  speed: number;
  direction: number;
  nextStopId: string;
  estimatedArrival: number; // minutes
}

// Mock data for a small city (Chandigarh-like layout)
export const busStops: BusStop[] = [
  { id: 'stop1', name: 'City Center', lat: 30.7333, lng: 76.7794, routes: ['route1', 'route2'] },
  { id: 'stop2', name: 'Railway Station', lat: 30.7409, lng: 76.7729, routes: ['route1'] },
  { id: 'stop3', name: 'Bus Stand', lat: 30.7267, lng: 76.7781, routes: ['route1', 'route2'] },
  { id: 'stop4', name: 'Hospital', lat: 30.7194, lng: 76.7646, routes: ['route2'] },
  { id: 'stop5', name: 'University', lat: 30.7590, lng: 76.7750, routes: ['route1'] },
  { id: 'stop6', name: 'Market', lat: 30.7286, lng: 76.7880, routes: ['route2'] },
  { id: 'stop7', name: 'Stadium', lat: 30.7156, lng: 76.8019, routes: ['route1', 'route2'] },
  { id: 'stop8', name: 'Airport', lat: 30.6735, lng: 76.7884, routes: ['route1'] }
];

export const busRoutes: BusRoute[] = [
  {
    id: 'route1',
    name: 'Route 1: City Center - Airport',
    color: '#3B82F6',
    stops: ['stop1', 'stop2', 'stop5', 'stop3', 'stop7', 'stop8'],
    path: [
      [30.7333, 76.7794], [30.7409, 76.7729], [30.7590, 76.7750],
      [30.7267, 76.7781], [30.7156, 76.8019], [30.6735, 76.7884]
    ]
  },
  {
    id: 'route2',
    name: 'Route 2: Hospital - Market',
    color: '#EF4444',
    stops: ['stop4', 'stop1', 'stop3', 'stop6', 'stop7'],
    path: [
      [30.7194, 76.7646], [30.7333, 76.7794], [30.7267, 76.7781],
      [30.7286, 76.7880], [30.7156, 76.8019]
    ]
  }
];

// Simulate real-time bus positions
export const generateMockBuses = (): Bus[] => {
  const buses: Bus[] = [];
  
  busRoutes.forEach((route, routeIndex) => {
    // 2-3 buses per route
    const busCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < busCount; i++) {
      const pathIndex = Math.floor(Math.random() * route.path.length);
      const [lat, lng] = route.path[pathIndex];
      
      // Add some randomness to position
      const randomLat = lat + (Math.random() - 0.5) * 0.01;
      const randomLng = lng + (Math.random() - 0.5) * 0.01;
      
      buses.push({
        id: `bus-${route.id}-${i + 1}`,
        routeId: route.id,
        lat: randomLat,
        lng: randomLng,
        speed: Math.floor(Math.random() * 30) + 20, // 20-50 km/h
        direction: Math.floor(Math.random() * 360),
        nextStopId: route.stops[Math.floor(Math.random() * route.stops.length)],
        estimatedArrival: Math.floor(Math.random() * 15) + 2 // 2-17 minutes
      });
    }
  });
  
  return buses;
};

export const getStopById = (id: string): BusStop | undefined => {
  return busStops.find(stop => stop.id === id);
};

export const getRouteById = (id: string): BusRoute | undefined => {
  return busRoutes.find(route => route.id === id);
};
Real-Time Public Transport Tracking MVP - Development Plan
Project Overview
Building a web-based MVP for real-time public transport tracking in small cities, optimized for low-bandwidth environments.

Core Features (MVP)
Interactive map showing bus routes and stops
Real-time bus location tracking (simulated data)
Estimated arrival times at bus stops
Route information and schedules
Mobile-responsive design for low-bandwidth usage
Files to Create/Modify
1. Core Components
src/components/MapView.tsx - Main map component using Leaflet
src/components/BusTracker.tsx - Bus location and tracking logic
src/components/RouteSelector.tsx - Route selection dropdown
src/components/StopInfo.tsx - Bus stop information panel
src/components/ArrivalTimes.tsx - Estimated arrival times display
2. Data & Utils
src/lib/mockData.ts - Mock bus routes, stops, and real-time data
src/lib/mapUtils.ts - Map utilities and calculations
src/hooks/useBusTracking.ts - Custom hook for bus tracking logic
3. Main Pages
src/pages/Index.tsx - Main dashboard (rewrite existing)
index.html - Update title and meta tags
Technical Approach
Use Leaflet for lightweight mapping (better for low-bandwidth)
Simulate real-time data with mock GPS coordinates
Implement efficient data updates to minimize bandwidth usage
Use local storage for caching route data
Mobile-first responsive design
Implementation Priority
Basic map setup with routes and stops
Mock data structure for buses and schedules
Real-time simulation of bus movements
Arrival time calculations
UI polish and mobile optimization
Dependencies to Add
leaflet (mapping library)
react-leaflet (React wrapper for Leaflet)
@types/leaflet (TypeScript support)
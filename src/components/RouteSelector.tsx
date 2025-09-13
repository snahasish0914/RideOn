import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BusRoute } from '@/lib/mockData';

interface RouteSelectorProps {
  routes: BusRoute[];
  selectedRoute: string;
  onRouteChange: (routeId: string) => void;
}

export const RouteSelector = ({ routes, selectedRoute, onRouteChange }: RouteSelectorProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Route
      </label>
      <Select value={selectedRoute} onValueChange={onRouteChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a route" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Routes</SelectItem>
          {routes.map(route => (
            <SelectItem key={route.id} value={route.id}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: route.color }}
                />
                {route.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
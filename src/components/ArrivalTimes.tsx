import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, Clock, Navigation } from 'lucide-react';
import { formatTime } from '@/lib/mapUtils';

interface ArrivalTimesProps {
  buses: Array<{
    id: string;
    routeId: string;
    nextStopId: string;
    estimatedArrival: number;
    speed: number;
  }>;
}

export const ArrivalTimes = ({ buses }: ArrivalTimesProps) => {
  // Group buses by next stop
  const busesByStop = buses.reduce((acc, bus) => {
    if (!acc[bus.nextStopId]) {
      acc[bus.nextStopId] = [];
    }
    acc[bus.nextStopId].push(bus);
    return acc;
  }, {} as Record<string, typeof buses>);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Live Arrivals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {Object.keys(busesByStop).length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No active buses found
          </p>
        ) : (
          Object.entries(busesByStop).map(([stopId, stopBuses]) => (
            <div key={stopId} className="border-b border-gray-100 pb-3 last:border-b-0">
              <h4 className="font-medium text-sm text-gray-700 mb-2 capitalize">
                {stopId.replace('stop', 'Stop ')}
              </h4>
              <div className="space-y-2">
                {stopBuses
                  .sort((a, b) => a.estimatedArrival - b.estimatedArrival)
                  .slice(0, 3)
                  .map(bus => (
                    <div key={bus.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Bus className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">
                            {bus.id.split('-').pop()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Route {bus.routeId.replace('route', '')}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Navigation className="w-3 h-3" />
                          {bus.speed} km/h
                        </div>
                        <div className={`font-bold text-sm ${
                          bus.estimatedArrival <= 2 ? 'text-red-600' : 
                          bus.estimatedArrival <= 5 ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {formatTime(bus.estimatedArrival)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
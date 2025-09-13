import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BusStop, getStopById } from '@/lib/mockData';
import { Clock, MapPin } from 'lucide-react';

interface StopInfoProps {
  stopId: string | null;
  arrivalTimes: Array<{
    busId: string;
    routeId: string;
    estimatedArrival: number;
  }>;
}

export const StopInfo = ({ stopId, arrivalTimes }: StopInfoProps) => {
  if (!stopId) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Bus Stop Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Click on a bus stop to see arrival times
          </p>
        </CardContent>
      </Card>
    );
  }

  const stop = getStopById(stopId);
  if (!stop) return null;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {stop.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Available Routes</h4>
          <div className="flex flex-wrap gap-1">
            {stop.routes.map(routeId => (
              <Badge key={routeId} variant="secondary">
                Route {routeId.replace('route', '')}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Next Arrivals
          </h4>
          
          {arrivalTimes.length === 0 ? (
            <p className="text-gray-500 text-sm">No buses approaching this stop</p>
          ) : (
            <div className="space-y-2">
              {arrivalTimes.slice(0, 5).map((arrival, index) => (
                <div key={`${arrival.busId}-${index}`} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">
                      Bus {arrival.busId.split('-').pop()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Route {arrival.routeId.replace('route', '')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-sm ${
                      arrival.estimatedArrival <= 2 ? 'text-red-600' : 
                      arrival.estimatedArrival <= 5 ? 'text-orange-600' : 
                      'text-green-600'
                    }`}>
                      {arrival.estimatedArrival <= 1 ? 'Arriving' : `${arrival.estimatedArrival} min`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
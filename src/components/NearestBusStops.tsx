import { MapPin, Clock, ChevronRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusStop {
  id: string;
  name: string;
  walkingTime: string;
  routes: Array<{
    number: string;
    destination: string;
    status: string;
    nextArrival?: string;
  }>;
}

const nearestStops: BusStop[] = [
  {
    id: 'pmch',
    name: 'P M C H',
    walkingTime: '12 min away',
    routes: [
      {
        number: '333',
        destination: 'To Kargil Chowk',
        status: 'Timings not available'
      }
    ]
  },
  {
    id: 'city-palace',
    name: 'City Palace',
    walkingTime: '8 min away',
    routes: [
      {
        number: '6A',
        destination: 'To Jaipur Junction',
        status: 'Next bus in 5 mins',
        nextArrival: '5 mins'
      }
    ]
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    walkingTime: '15 min away',
    routes: [
      {
        number: '12B',
        destination: 'To Bani Park',
        status: 'Next bus in 12 mins',
        nextArrival: '12 mins'
      }
    ]
  }
];

export const NearestBusStops = () => {
  return (
    <div className="px-4 py-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Nearest bus stop</h2>
        <Button
          variant="ghost"
          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 font-medium"
        >
          See all stops
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Bus Stops */}
      <div className="space-y-4">
        {nearestStops.map((stop) => (
          <div
            key={stop.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Stop Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{stop.name}</h3>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Navigation className="w-4 h-4 mr-1" />
                {stop.walkingTime}
              </div>
            </div>

            {/* Routes */}
            <div className="space-y-3">
              {stop.routes.map((route, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🚌</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-800">{route.number}</span>
                        <span className="text-gray-600">{route.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {route.nextArrival ? (
                      <div className="flex items-center gap-1 text-[#2E7D32] font-medium text-sm">
                        <Clock className="w-4 h-4" />
                        {route.nextArrival}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">{route.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
        >
          View all nearby stops
        </Button>
      </div>
    </div>
  );
};
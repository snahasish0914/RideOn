// File: src/pages/Index.tsx
import { useState } from 'react';
import { Menu, Search, ArrowUpDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatBot } from '@/components/ChatBot';
import { AccountMenu } from '@/components/AccountMenu';
import { CitySelector } from '@/components/CitySelector';
import { NearestBusStops } from '@/components/NearestBusStops';
import { SloganArea } from '@/components/SloganArea';
import { BusStopSelector } from '@/components/BusStopSelector';
import { busStops } from '@/lib/mockData';


interface SearchResult {
  id: string;
  route: string;
  from: string;
  to: string;
  duration: string;
  fare: string;
  nextDeparture: string;
}

interface HistoryItem {
  vehicle: string;
  route: string;
  from: string;
  to: string;
  time: string;
}

export default function RideOnApp() {
  const [selectedVehicle, setSelectedVehicle] = useState<'bus' | 'auto'>('bus');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleFindBus = () => {
    if (!fromLocation || !toLocation) {
      alert('Please enter both From and To locations');
      return;
    }

    const mockResults: SearchResult[] = [
      {
        id: '1',
        route: selectedVehicle === 'bus' ? '6A' : 'Auto',
        from: fromLocation,
        to: toLocation,
        duration: '25 mins',
        fare: selectedVehicle === 'bus' ? '₹12' : '₹45',
        nextDeparture: '5 mins'
      },
      {
        id: '2',
        route: selectedVehicle === 'bus' ? '12B' : 'Auto',
        from: fromLocation,
        to: toLocation,
        duration: '32 mins',
        fare: selectedVehicle === 'bus' ? '₹15' : '₹52',
        nextDeparture: '12 mins'
      }
    ];

    setSearchResults(mockResults);
    
    const newHistoryItem: HistoryItem = {
      vehicle: selectedVehicle === 'bus' ? '🚌' : '🛺',
      route: selectedVehicle === 'bus' ? '6A' : '3A',
      from: fromLocation,
      to: toLocation,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + (Math.random() > 0.5 ? ' AM' : ' PM')
    };

    const existingHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]') as HistoryItem[];
    existingHistory.unshift(newHistoryItem);
    localStorage.setItem('searchHistory', JSON.stringify(existingHistory.slice(0, 5)));
  };

  const getSearchHistory = (): HistoryItem[] => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]') as HistoryItem[];
    if (history.length === 0) {
      return [
        {
          vehicle: '🚌',
          route: '6A',
          from: 'Jagatpura',
          to: 'Jaipur JN',
          time: '7:45 AM'
        },
        {
          vehicle: '🛺',
          route: '3A',
          from: 'Sanganer',
          to: 'Choti',
          time: '9:00 PM'
        }
      ];
    }
    return history;
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#81C784] px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAccountMenuOpen(true)}
            className="text-white hover:bg-white/20 p-1"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-bold">RideOn</h1>
          <CitySelector 
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        {/* Vehicle Selector */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setSelectedVehicle('bus')}
            className={`w-20 h-20 rounded-xl shadow-lg flex items-center justify-center transition-all ${
              selectedVehicle === 'bus' 
                ? 'bg-white shadow-xl scale-105' 
                : 'bg-white/80 shadow-md'
            }`}
          >
            <div className="text-2xl">🚌</div>
          </button>
          <button
            onClick={() => setSelectedVehicle('auto')}
            className={`w-20 h-20 rounded-xl shadow-lg flex items-center justify-center transition-all ${
              selectedVehicle === 'auto' 
                ? 'bg-white shadow-xl scale-105' 
                : 'bg-white/80 shadow-md'
            }`}
          >
            <div className="text-2xl">🛺</div>
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-6 relative z-10">
        <div className="space-y-4">
          {/* From Input */}
          <BusStopSelector
            placeholder="From"
            value={fromLocation}
            onValueChange={setFromLocation}
            stops={busStops}
          />

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapLocations}
              className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* To Input */}
          <BusStopSelector
            placeholder="To"
            value={toLocation}
            onValueChange={setToLocation}
            stops={busStops}
          />

          {/* Find Bus Button */}
          <Button 
            onClick={handleFindBus}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3 rounded-lg font-medium text-lg shadow-lg"
          >
            {selectedVehicle === 'bus' ? '🚌' : '🛺'} Find {selectedVehicle === 'bus' ? 'Bus' : 'Auto'}
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-800">Available Options</h3>
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-[#2E7D32]">{result.route}</div>
                    <div className="text-sm text-gray-600">{result.from} → {result.to}</div>
                    <div className="text-sm text-gray-500">{result.duration} • Next: {result.nextDeparture}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-800">{result.fare}</div>
                    <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-xs">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search History Section */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-800 font-medium mb-3">Search History</h3>
        <div className="space-y-3">
          {getSearchHistory().slice(0, 3).map((item, index) => (
            <div key={index} className="bg-[#E8F5E9] p-4 rounded-lg shadow-sm cursor-pointer hover:bg-[#E0F2E1] transition-colors">
              <div className="flex items-center text-gray-800">
                <span className="text-lg mr-3">{item.vehicle}</span>
                <div className="flex-1">
                  <span className="font-medium">{item.route}</span>
                  <span className="mx-2">|</span>
                  <span>{item.from} → {item.to}</span>
                  <span className="mx-2">|</span>
                  <span className="text-gray-600">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-80 bg-gray-200 mx-4 mb-6 rounded-lg overflow-hidden shadow-lg">
        {/* Google Maps Iframe */}
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d227748.99842513593!2d75.65046970898438!3d26.88544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2s${selectedCity}!3m2!1d26.8518188!2d75.8346067!4m5!1s0x396db1c5f0c3c5b7%3A0x61c1b8b9b7b8b8b8!2s${selectedCity}!3m2!1d26.9124336!2d75.7872709!5e0!3m2!1sen!2sin!4v1647875643123!5m2!1sen!2sin`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
        
        {/* Route Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Route Line */}
          <svg className="w-full h-full">
            <defs>
              <pattern id="dashed" patternUnits="userSpaceOnUse" width="10" height="2">
                <rect width="5" height="2" fill="#2E7D32" />
                <rect x="5" width="5" height="2" fill="transparent" />
              </pattern>
            </defs>
            <path
              d="M 50 200 Q 150 100 250 150 Q 300 180 320 220"
              stroke="url(#dashed)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
            />
          </svg>
          
          {/* Bus Stop Circles */}
          <div className="absolute top-48 left-12 w-4 h-4 bg-white border-3 border-[#2E7D32] rounded-full shadow-lg"></div>
          <div className="absolute top-24 left-36 w-4 h-4 bg-white border-3 border-[#2E7D32] rounded-full shadow-lg"></div>
          <div className="absolute top-36 right-16 w-4 h-4 bg-white border-3 border-[#2E7D32] rounded-full shadow-lg"></div>
          
          {/* Bus Icon */}
          <div className="absolute top-32 left-48 text-2xl transform -translate-x-1/2 -translate-y-1/2">
            🚌
          </div>
        </div>

        {/* Floating Chat Button */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className="absolute bottom-4 right-4 w-14 h-14 bg-[#2E7D32] rounded-full shadow-lg flex items-center justify-center hover:bg-[#1B5E20] transition-colors"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Nearest Bus Stops Section */}
      <NearestBusStops />

      {/* Slogan Area */}
      <SloganArea />

      {/* ChatBot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Account Menu */}
      <AccountMenu isOpen={isAccountMenuOpen} onClose={() => setIsAccountMenuOpen(false)} />
    </div>
  );
}


import { useState } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface City {
  id: string;
  name: string;
  state: string;
}

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityName: string) => void;
}

const cities: City[] = [
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh' },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh' },
  { id: 'kota', name: 'Kota', state: 'Rajasthan' },
  { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan' },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan' }
];

export const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCitySelect = (cityName: string) => {
    onCityChange(cityName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white/90 rounded-full px-3 py-1 hover:bg-white/95 h-auto"
      >
        <MapPin className="w-4 h-4 text-gray-700 mr-1" />
        <span className="text-gray-700 text-sm font-medium">{selectedCity}</span>
        <ChevronDown className="w-4 h-4 text-gray-700 ml-1" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Select City</h3>
              <p className="text-sm text-gray-600">Choose your current location</p>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.name)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                    {selectedCity === city.name && (
                      <Check className="w-4 h-4 text-[#2E7D32]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                More cities coming soon!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
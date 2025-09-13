// File: src/components/BusStopSelector.tsx

import { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BusStop } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface BusStopSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  stops: BusStop[];
}

export const BusStopSelector = ({ value, onValueChange, placeholder, stops }: BusStopSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);

  const filteredStops = useMemo(() => {
    if (!query) {
      return stops;
    }
    return stops.filter((stop) => stop.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, stops]);

  const handleSelect = (stopName: string) => {
    onValueChange(stopName);
    setQuery(stopName);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              const newValue = e.target.value;
              setQuery(newValue);
              onValueChange(newValue);
              // Show suggestions only when the user starts typing
              setIsOpen(newValue.length > 0);
            }}
            className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 placeholder-gray-500"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-32px)] max-w-sm p-0">
        <ScrollArea className="h-[200px]">
          {filteredStops.length > 0 ? (
            <div className="p-1">
              {filteredStops.map((stop) => (
                <button
                  key={stop.id}
                  className={cn(
                    'w-full flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100',
                    value === stop.name ? 'bg-gray-100' : ''
                  )}
                  onClick={() => handleSelect(stop.name)}
                >
                  <span className="truncate">{stop.name}</span>
                  {value === stop.name && <Check className="w-4 h-4 text-green-600" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No bus stops found.
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

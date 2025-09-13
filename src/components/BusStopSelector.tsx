// File: src/components/BusStopSelector.tsx

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BusStop } from "@/lib/mockData";

interface BusStopSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  stops: BusStop[];
}

export const BusStopSelector = ({ value, onValueChange, placeholder, stops }: BusStopSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(value);

  const filteredStops = React.useMemo(() => {
    if (!query) {
      return stops;
    }
    return stops.filter((stop) => stop.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, stops]);

  const handleSelect = (stopName: string) => {
    onValueChange(stopName);
    setQuery(stopName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Command className="h-auto">
            <CommandInput 
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
              className="py-3 pl-10 pr-4"
            />
          </Command>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-w-sm">
        <Command>
          <CommandList>
            <CommandEmpty>No bus stops found.</CommandEmpty>
            <CommandGroup>
              {filteredStops.map((stop) => (
                <CommandItem
                  key={stop.id}
                  value={stop.name}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue === value ? "" : currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stop.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {stop.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

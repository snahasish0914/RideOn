// File: src/components/BusStopSelector.tsx

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          {/* We remove the Search icon from here and add it directly to CommandInput */}
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start text-left font-normal h-auto py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 placeholder-gray-500"
          >
            {value ? value : placeholder}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-w-sm">
        <Command>
          {/* The CommandInput component already has a built-in search icon. We'll use that instead. */}
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No bus stops found.</CommandEmpty>
            <CommandGroup>
              {stops.map((stop) => (
                <CommandItem
                  key={stop.id}
                  value={stop.name}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
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

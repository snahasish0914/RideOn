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
  CommandList,
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

export const BusStopSelector = ({
  value,
  onValueChange,
  placeholder,
  stops,
}: BusStopSelectorProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-auto py-3 pl-10 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-normal justify-start text-left relative"
        >
          {/* Left-aligned search icon inside the button */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          {value ? value : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-w-sm">
        <Command>
          {/* Input with Search icon */}
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput placeholder={placeholder} className="flex-1" />
          </div>

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

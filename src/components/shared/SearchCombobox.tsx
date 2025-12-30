"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Option } from "@/types/ui";

interface SearchComboboxProps<T> {
    selected?: T;
    resolveSelectedLabel?: (value: T) => Promise<Option<T> | null>;
    onSelect: (value: T | null) => void;
    onSearch: (query: string) => Promise<Option<T>[]>;
    placeholder?: string;
}

export function SearchCombobox<T>({
    selected,
    resolveSelectedLabel,
    onSelect,
    onSearch,
    placeholder,
}: SearchComboboxProps<T>) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<Option<T>[]>([]);

    const [defaultSelected, setDefaultSelected] = useState<Option<T> | null>(
        null,
    );

    useEffect(() => {
        const fetchLabel = async () => {
            if (resolveSelectedLabel && selected) {
                const result = await resolveSelectedLabel(selected);
                setDefaultSelected(result);
            }
        };
        fetchLabel();
    }, [resolveSelectedLabel, selected]);

    useEffect(() => {
        (async () => setOptions(await onSearch("")))();
    }, [onSearch]);

    const selectedOption =
        options.find((o) => o.value === selected) ?? defaultSelected ?? null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedOption
                        ? selectedOption.label
                        : (placeholder ?? "Select...")}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-50 p-0">
                <Command shouldFilter={false}>
                    <CommandInput
                        onValueChange={async (query) =>
                            setOptions(await onSearch(query))
                        }
                        placeholder={placeholder}
                    />

                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={String(option.value)}
                                    value={String(option.value)}
                                    onSelect={() => {
                                        onSelect(
                                            option.value === selected
                                                ? null
                                                : option.value,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected === option.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

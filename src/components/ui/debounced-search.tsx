"use client";

import React, { useState, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-performance";
import { cn } from "@/utils";

interface DebouncedSearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    delay?: number;
    className?: string;
    loading?: boolean;
}

/**
 * Search input with built-in debouncing
 * Waits for user to stop typing before triggering search
 */
export function DebouncedSearch({
    onSearch,
    placeholder = "Search...",
    delay = 300,
    className,
    loading = false,
}: DebouncedSearchProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, delay);

    // Trigger search when debounced value changes
    React.useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleClear = useCallback(() => {
        setValue("");
    }, []);

    return (
        <div className={cn("relative", className)} data-testid="debounced-search">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="pl-9 pr-9 rounded-xl glass border-white/10"
                data-testid="search-input"
            />
            {loading ? (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            ) : value ? (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={handleClear}
                    data-testid="clear-search"
                >
                    <X className="h-3 w-3" />
                </Button>
            ) : null}
        </div>
    );
}

interface SearchWithSuggestionsProps extends DebouncedSearchProps {
    suggestions?: string[];
    onSelectSuggestion?: (suggestion: string) => void;
}

/**
 * Search input with autocomplete suggestions
 */
export function SearchWithSuggestions({
    onSearch,
    suggestions = [],
    onSelectSuggestion,
    placeholder = "Search...",
    delay = 300,
    className,
    loading = false,
}: SearchWithSuggestionsProps) {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const debouncedValue = useDebounce(value, delay);

    React.useEffect(() => {
        onSearch(debouncedValue);
        setIsOpen(debouncedValue.length > 0 && suggestions.length > 0);
    }, [debouncedValue, onSearch, suggestions.length]);

    const handleSelect = (suggestion: string) => {
        setValue(suggestion);
        setIsOpen(false);
        onSelectSuggestion?.(suggestion);
    };

    return (
        <div className={cn("relative", className)}>
            <DebouncedSearch
                onSearch={() => { }} // Handled internally
                placeholder={placeholder}
                delay={0}
                loading={loading}
            />

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 glass border border-white/10 rounded-xl overflow-hidden z-50">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors"
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

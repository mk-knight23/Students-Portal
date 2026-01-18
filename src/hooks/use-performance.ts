import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Debounce hook - delays callback execution until after wait period
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Debounced callback hook - useful for search inputs
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    ) as T;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
}

/**
 * Throttle hook - limits callback to once per wait period
 */
export function useThrottle<T>(value: T, limit: number): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastRan = useRef<number>(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    }, [value, limit]);

    return throttledValue;
}

/**
 * Local storage hook with SSR safety
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
}

/**
 * Previous value hook - returns previous render's value
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

/**
 * Intersection observer hook for lazy loading
 */
export function useIntersectionObserver(
    options?: IntersectionObserverInit
): [React.RefCallback<Element>, boolean] {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [element, setElement] = useState<Element | null>(null);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [element, options]);

    return [setElement, isIntersecting];
}

/**
 * Media query hook for responsive logic
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

/**
 * Presets for common breakpoints
 */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

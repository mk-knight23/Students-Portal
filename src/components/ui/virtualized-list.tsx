"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/utils";

interface VirtualizedListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    overscan?: number;
    className?: string;
}

/**
 * Virtualized list for rendering large datasets efficiently
 * Only renders items that are visible in the viewport
 */
export function VirtualizedList<T>({
    items,
    itemHeight,
    containerHeight,
    renderItem,
    overscan = 3,
    className,
}: VirtualizedListProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = items.length * itemHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = items.slice(startIndex, endIndex + 1);
    const offsetY = startIndex * itemHeight;

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("overflow-auto", className)}
            style={{ height: containerHeight }}
            onScroll={handleScroll}
            data-testid="virtualized-list"
        >
            <div style={{ height: totalHeight, position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        top: offsetY,
                        left: 0,
                        right: 0,
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <div
                            key={startIndex + index}
                            style={{ height: itemHeight }}
                        >
                            {renderItem(item, startIndex + index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface VirtualizedTableProps<T> {
    data: T[];
    columns: Array<{
        key: string;
        header: string;
        width?: number;
        render?: (item: T) => React.ReactNode;
    }>;
    rowHeight?: number;
    containerHeight?: number;
    className?: string;
}

/**
 * Virtualized table for large datasets
 */
export function VirtualizedTable<T extends Record<string, any>>({
    data,
    columns,
    rowHeight = 48,
    containerHeight = 500,
    className,
}: VirtualizedTableProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = data.length * rowHeight;
    const overscan = 5;

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(
        data.length - 1,
        Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
    );

    const visibleRows = data.slice(startIndex, endIndex + 1);
    const offsetY = startIndex * rowHeight;

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return (
        <div className={cn("glass border border-white/10 rounded-2xl overflow-hidden", className)}>
            {/* Header */}
            <div className="flex bg-white/5 border-b border-white/10">
                {columns.map((col) => (
                    <div
                        key={col.key}
                        className="px-4 py-3 font-medium text-sm text-muted-foreground"
                        style={{ width: col.width || "auto", flex: col.width ? "none" : 1 }}
                    >
                        {col.header}
                    </div>
                ))}
            </div>

            {/* Virtualized Body */}
            <div
                style={{ height: containerHeight - 48 }}
                className="overflow-auto"
                onScroll={handleScroll}
                data-testid="virtualized-table"
            >
                <div style={{ height: totalHeight, position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: offsetY,
                            left: 0,
                            right: 0,
                        }}
                    >
                        {visibleRows.map((row, index) => (
                            <div
                                key={startIndex + index}
                                className="flex border-b border-white/5 hover:bg-white/5 transition-colors"
                                style={{ height: rowHeight }}
                            >
                                {columns.map((col) => (
                                    <div
                                        key={col.key}
                                        className="px-4 flex items-center text-sm"
                                        style={{ width: col.width || "auto", flex: col.width ? "none" : 1 }}
                                    >
                                        {col.render ? col.render(row) : row[col.key]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Memoized row component for tables
 */
export const MemoizedRow = React.memo(function MemoizedRow<T>({
    item,
    renderItem,
}: {
    item: T;
    renderItem: (item: T) => React.ReactNode;
}) {
    return <>{renderItem(item)}</>;
});

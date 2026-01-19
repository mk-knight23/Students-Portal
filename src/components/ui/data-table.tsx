"use client";

import React, { useState, useMemo } from "react";
import {
    Search, Filter, ChevronDown, ChevronUp, X,
    Download, RefreshCw, MoreHorizontal, Eye, Edit, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";

export interface DataTableColumn<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: "text" | "select" | "date";
    filterOptions?: { label: string; value: string }[];
    render?: (value: unknown, row: T) => React.ReactNode;
    className?: string;
}

export interface DataTableAction<T> {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: (row: T) => void;
    variant?: "default" | "destructive";
}

interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    actions?: DataTableAction<T>[];
    keyField: keyof T;
    title?: string;
    searchable?: boolean;
    selectable?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
    onRefresh?: () => void;
    onExport?: () => void;
    loading?: boolean;
    pageSize?: number;
    className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    actions,
    keyField,
    title,
    searchable = true,
    selectable = false,
    onSelectionChange,
    onRefresh,
    onExport,
    loading = false,
    pageSize = 10,
    className,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedRows, setSelectedRows] = useState<Set<unknown>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort data
    const processedData = useMemo(() => {
        let result = [...data];

        // Apply search
        if (searchQuery) {
            result = result.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Apply column filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter((row) =>
                    String(row[key]).toLowerCase().includes(value.toLowerCase())
                );
            }
        });

        // Apply sorting
        if (sortColumn) {
            result.sort((a, b) => {
                const aVal = String(a[sortColumn] || "");
                const bVal = String(b[sortColumn] || "");
                return sortDirection === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }

        return result;
    }, [data, searchQuery, filters, sortColumn, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / pageSize);
    const paginatedData = processedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnKey);
            setSortDirection("asc");
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(paginatedData.map((row) => row[keyField])));
        } else {
            setSelectedRows(new Set());
        }
        onSelectionChange?.(checked ? paginatedData : []);
    };

    const handleSelectRow = (rowKey: unknown, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            newSelected.add(rowKey);
        } else {
            newSelected.delete(rowKey);
        }
        setSelectedRows(newSelected);
        onSelectionChange?.(
            data.filter((row) => newSelected.has(row[keyField]))
        );
    };

    const getValue = (row: T, key: string): unknown => {
        return key.split('.').reduce((obj: unknown, k) => (obj as Record<string, unknown>)?.[k], row);
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {title && <h3 className="text-lg font-bold">{title}</h3>}
                <div className="flex items-center gap-2 ml-auto">
                    {selectedRows.size > 0 && (
                        <Badge variant="secondary" className="text-xs">
                            {selectedRows.size} selected
                        </Badge>
                    )}
                    {onRefresh && (
                        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
                            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                        </Button>
                    )}
                    {onExport && (
                        <Button variant="outline" size="sm" onClick={onExport}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    )}
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                {searchable && (
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10"
                        />
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                onClick={() => setSearchQuery("")}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(showFilters && "bg-primary/10")}
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {Object.values(filters).filter(Boolean).length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-[10px]">
                            {Object.values(filters).filter(Boolean).length}
                        </Badge>
                    )}
                </Button>
            </div>

            {/* Filter Row */}
            {showFilters && (
                <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-muted/30 border">
                    {columns.filter(col => col.filterable).map((column) => (
                        <div key={String(column.key)} className="w-48">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">
                                {column.header}
                            </label>
                            {column.filterType === "select" && column.filterOptions ? (
                                <Select
                                    value={filters[String(column.key)] || ""}
                                    onValueChange={(value) =>
                                        setFilters({ ...filters, [String(column.key)]: value })
                                    }
                                >
                                    <SelectTrigger className="h-8 text-xs">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All</SelectItem>
                                        {column.filterOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    placeholder={`Filter ${column.header.toLowerCase()}...`}
                                    value={filters[String(column.key)] || ""}
                                    onChange={(e) =>
                                        setFilters({ ...filters, [String(column.key)]: e.target.value })
                                    }
                                    className="h-8 text-xs"
                                />
                            )}
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="self-end"
                        onClick={() => setFilters({})}
                    >
                        Clear All
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/30">
                                {selectable && (
                                    <th className="w-12 px-4 py-3">
                                        <Checkbox
                                            checked={
                                                paginatedData.length > 0 &&
                                                paginatedData.every((row) => selectedRows.has(row[keyField]))
                                            }
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </th>
                                )}
                                {columns.map((column) => (
                                    <th
                                        key={String(column.key)}
                                        className={cn(
                                            "px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
                                            column.sortable && "cursor-pointer hover:text-foreground",
                                            column.className
                                        )}
                                        onClick={() => column.sortable && handleSort(String(column.key))}
                                    >
                                        <div className="flex items-center gap-1">
                                            {column.header}
                                            {sortColumn === String(column.key) && (
                                                sortDirection === "asc" ? (
                                                    <ChevronUp className="h-3 w-3 text-primary" />
                                                ) : (
                                                    <ChevronDown className="h-3 w-3 text-primary" />
                                                )
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actions && actions.length > 0 && (
                                    <th className="w-12 px-4 py-3"></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                                        className="p-8 text-center text-muted-foreground"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((row) => (
                                    <tr
                                        key={String(row[keyField])}
                                        className={cn(
                                            "border-t hover:bg-muted/20 transition-colors",
                                            selectedRows.has(row[keyField]) && "bg-primary/5"
                                        )}
                                    >
                                        {selectable && (
                                            <td className="px-4 py-3">
                                                <Checkbox
                                                    checked={selectedRows.has(row[keyField])}
                                                    onCheckedChange={(checked) =>
                                                        handleSelectRow(row[keyField], checked as boolean)
                                                    }
                                                />
                                            </td>
                                        )}
                                        {columns.map((column) => (
                                            <td
                                                key={String(column.key)}
                                                className={cn("px-4 py-3 text-sm", column.className)}
                                            >
                                                {column.render
                                                    ? column.render(getValue(row, String(column.key)), row)
                                                    : String(getValue(row, String(column.key)) || "-")}
                                            </td>
                                        ))}
                                        {actions && actions.length > 0 && (
                                            <td className="px-4 py-3">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {actions.map((action, index) => (
                                                            <DropdownMenuItem
                                                                key={index}
                                                                onClick={() => action.onClick(row)}
                                                                className={cn(
                                                                    action.variant === "destructive" && "text-red-500"
                                                                )}
                                                            >
                                                                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                                                                {action.label}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                        Showing {(currentPage - 1) * pageSize + 1}-
                        {Math.min(currentPage * pageSize, processedData.length)} of{" "}
                        {processedData.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm font-medium">
                            {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataTable;

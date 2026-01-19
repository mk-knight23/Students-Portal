"use client";

import React, { useState } from "react";
import {
    FileText, Download, Printer, Search, Filter,
    Table, BarChart3, FileSpreadsheet, X, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

interface ReportColumn {
    key: string;
    label: string;
    sortable?: boolean;
}

interface ReportViewerProps {
    title: string;
    description?: string;
    columns: ReportColumn[];
    data: Record<string, unknown>[];
    loading?: boolean;
    onExportPdf?: () => void;
    onExportExcel?: () => void;
    onPrint?: () => void;
    className?: string;
}

export function ReportViewer({
    title,
    description,
    columns,
    data,
    loading = false,
    onExportPdf,
    onExportExcel,
    onPrint,
    className,
}: ReportViewerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnKey);
            setSortDirection("asc");
        }
    };

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedData = sortColumn
        ? [...filteredData].sort((a, b) => {
            const aVal = String(a[sortColumn] || "");
            const bVal = String(b[sortColumn] || "");
            return sortDirection === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        })
        : filteredData;

    const handleExportPdf = () => {
        console.log("Exporting PDF...");
        onExportPdf?.();
    };

    const handleExportExcel = () => {
        console.log("Exporting Excel...");
        onExportExcel?.();
    };

    const handlePrint = () => {
        window.print();
        onPrint?.();
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                        {sortedData.length} records
                    </Badge>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="mr-2 h-3 w-3" />
                        Filters
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handlePrint}>
                        <Printer className="mr-2 h-3 w-3" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleExportExcel}>
                        <FileSpreadsheet className="mr-2 h-3 w-3" />
                        Excel
                    </Button>
                    <Button size="sm" className="text-xs" onClick={handleExportPdf}>
                        <Download className="mr-2 h-3 w-3" />
                        PDF
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/30">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={cn(
                                            "px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
                                            column.sortable && "cursor-pointer hover:text-foreground"
                                        )}
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {column.label}
                                            {sortColumn === column.key && (
                                                <span className="text-primary">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center">
                                        <Loader2 className="h-6 w-6 mx-auto text-primary animate-spin" />
                                        <p className="text-sm text-muted-foreground mt-2">Loading data...</p>
                                    </td>
                                </tr>
                            ) : sortedData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center">
                                        <Table className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">No records found</p>
                                    </td>
                                </tr>
                            ) : (
                                sortedData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="border-t hover:bg-muted/20 transition-colors"
                                    >
                                        {columns.map((column) => (
                                            <td key={column.key} className="px-4 py-3 text-sm">
                                                {String(row[column.key] || "-")}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground print:hidden">
                <p>
                    Showing {sortedData.length} of {data.length} records
                </p>
                <p>Last updated: Just now</p>
            </div>
        </div>
    );
}

export default ReportViewer;

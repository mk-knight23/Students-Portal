"use client";

import React from "react";
import { X, Check, Columns } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Column {
    key: string;
    label: string;
    visible: boolean;
}

interface ColumnChooserProps {
    columns: Column[];
    onToggle: (key: string) => void;
}

export function ColumnChooser({ columns, onToggle }: ColumnChooserProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 glass rounded-2xl border-white/10 gap-2 px-5">
                    <Columns className="h-4 w-4" /> Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass border-white/10 rounded-xl">
                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Toggle Columns
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                        key={column.key}
                        checked={column.visible}
                        onCheckedChange={() => onToggle(column.key)}
                        className="text-sm font-medium focus:bg-white/10 rounded-lg"
                    >
                        {column.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

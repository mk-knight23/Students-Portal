"use client";

import React from "react";
import { FileX, Users, CreditCard, FileText, Search, AlertCircle, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-16 px-8 text-center",
            className
        )}>
            {icon && (
                <div className="mb-6 p-4 rounded-full bg-muted/20">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                    {description}
                </p>
            )}
            {action && (
                <Button onClick={action.onClick} className="rounded-xl">
                    {action.label}
                </Button>
            )}
        </div>
    );
}

// Pre-built empty states for common scenarios
export function NoStudentsFound({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon={<Users className="h-12 w-12 text-muted-foreground" />}
            title="No Students Found"
            description="There are no students matching your criteria. Try adjusting your filters or add a new student."
            action={onAdd ? { label: "Add Student", onClick: onAdd } : undefined}
        />
    );
}

export function NoSearchResults({ query }: { query: string }) {
    return (
        <EmptyState
            icon={<Search className="h-12 w-12 text-muted-foreground" />}
            title="No Results Found"
            description={`No results found for "${query}". Try searching with different keywords.`}
        />
    );
}

export function NoDocuments({ onUpload }: { onUpload?: () => void }) {
    return (
        <EmptyState
            icon={<FileX className="h-12 w-12 text-muted-foreground" />}
            title="No Documents"
            description="No documents have been uploaded for this student yet."
            action={onUpload ? { label: "Upload Document", onClick: onUpload } : undefined}
        />
    );
}

export function NoTransactions({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon={<CreditCard className="h-12 w-12 text-muted-foreground" />}
            title="No Transactions"
            description="No payment transactions recorded yet."
            action={onAdd ? { label: "Record Payment", onClick: onAdd } : undefined}
        />
    );
}

export function NoPreferences({ onFill }: { onFill?: () => void }) {
    return (
        <EmptyState
            icon={<FileText className="h-12 w-12 text-muted-foreground" />}
            title="No Preferences Set"
            description="College preferences have not been filled yet. Start by selecting your preferred colleges."
            action={onFill ? { label: "Fill Preferences", onClick: onFill } : undefined}
        />
    );
}

// Error States
export function ErrorState({
    title = "Something went wrong",
    description,
    onRetry,
}: {
    title?: string;
    description?: string;
    onRetry?: () => void;
}) {
    return (
        <EmptyState
            icon={<AlertCircle className="h-12 w-12 text-destructive" />}
            title={title}
            description={description || "An unexpected error occurred. Please try again."}
            action={onRetry ? { label: "Try Again", onClick: onRetry } : undefined}
        />
    );
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
    return (
        <EmptyState
            icon={<WifiOff className="h-12 w-12 text-muted-foreground" />}
            title="You're Offline"
            description="Please check your internet connection and try again."
            action={onRetry ? { label: "Retry", onClick: onRetry } : undefined}
        />
    );
}

"use client";

import React from "react";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-all",
    {
        variants: {
            variant: {
                default: "bg-muted text-muted-foreground",
                pending: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
                verified: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
                processing: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
                registered: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
                choices_filled: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
                allotted: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
                confirmed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                cancelled: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
                success: "bg-green-500/20 text-green-400 border border-green-500/30",
                failed: "bg-red-500/20 text-red-400 border border-red-500/30",
            },
            size: {
                sm: "text-[10px] px-2 py-0.5",
                md: "text-xs px-2.5 py-1",
                lg: "text-sm px-3 py-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

interface StatusBadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
    dot?: boolean;
    pulse?: boolean;
}

export function StatusBadge({
    className,
    variant,
    size,
    dot = true,
    pulse = false,
    children,
    ...props
}: StatusBadgeProps) {
    return (
        <span
            className={cn(statusBadgeVariants({ variant, size }), className)}
            data-testid={`status-badge-${variant}`}
            {...props}
        >
            {dot && (
                <span
                    className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        pulse && "animate-pulse",
                        variant === "pending" && "bg-amber-400",
                        variant === "verified" && "bg-emerald-400",
                        variant === "rejected" && "bg-red-400",
                        variant === "processing" && "bg-blue-400",
                        variant === "registered" && "bg-sky-400",
                        variant === "choices_filled" && "bg-violet-400",
                        variant === "allotted" && "bg-indigo-400",
                        variant === "confirmed" && "bg-emerald-400",
                        variant === "cancelled" && "bg-gray-400",
                        variant === "success" && "bg-green-400",
                        variant === "failed" && "bg-red-400",
                        (!variant || variant === "default") && "bg-muted-foreground"
                    )}
                />
            )}
            {children}
        </span>
    );
}

// Helper to map status strings to variants
export function getStatusVariant(status: string): StatusBadgeProps["variant"] {
    const statusMap: Record<string, StatusBadgeProps["variant"]> = {
        PENDING: "pending",
        VERIFIED: "verified",
        REJECTED: "rejected",
        PROCESSING: "processing",
        REGISTERED: "registered",
        CHOICES_FILLED: "choices_filled",
        ALLOTTED: "allotted",
        CONFIRMED: "confirmed",
        CANCELLED: "cancelled",
        SUCCESS: "success",
        FAILED: "failed",
    };
    return statusMap[status.toUpperCase()] || "default";
}

// Convenience components for common statuses
export function PendingBadge() {
    return <StatusBadge variant="pending" pulse>Pending</StatusBadge>;
}

export function VerifiedBadge() {
    return <StatusBadge variant="verified">Verified</StatusBadge>;
}

export function RejectedBadge() {
    return <StatusBadge variant="rejected">Rejected</StatusBadge>;
}

export function AllottedBadge() {
    return <StatusBadge variant="allotted">Allotted</StatusBadge>;
}

export function ConfirmedBadge() {
    return <StatusBadge variant="confirmed">Confirmed</StatusBadge>;
}

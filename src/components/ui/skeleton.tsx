"use client";

import React from "react";
import { cn } from "@/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
    animation = "pulse",
    ...props
}: SkeletonProps) {
    return (
        <div
            className={cn(
                "bg-muted/50 rounded",
                variant === "circular" && "rounded-full",
                variant === "text" && "rounded h-4",
                animation === "pulse" && "animate-pulse",
                animation === "wave" && "animate-shimmer",
                className
            )}
            style={{ width, height }}
            {...props}
        />
    );
}

// Pre-built skeleton patterns
export function SkeletonCard() {
    return (
        <div className="glass border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="space-y-2 flex-1">
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="40%" height={12} />
                </div>
            </div>
            <Skeleton height={80} />
            <div className="flex gap-2">
                <Skeleton width={80} height={32} className="rounded-lg" />
                <Skeleton width={80} height={32} className="rounded-lg" />
            </div>
        </div>
    );
}

export function SkeletonTableRow() {
    return (
        <tr className="border-b border-white/5">
            <td className="p-4"><Skeleton variant="circular" width={20} height={20} /></td>
            <td className="p-4"><Skeleton width="80%" height={16} /></td>
            <td className="p-4"><Skeleton width="60%" height={16} /></td>
            <td className="p-4"><Skeleton width={60} height={24} className="rounded-full" /></td>
            <td className="p-4"><Skeleton width={40} height={16} /></td>
            <td className="p-4">
                <div className="flex gap-2">
                    <Skeleton width={32} height={32} className="rounded-lg" />
                    <Skeleton width={32} height={32} className="rounded-lg" />
                </div>
            </td>
        </tr>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="glass border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <div className="flex justify-between">
                    <Skeleton width={200} height={40} className="rounded-xl" />
                    <Skeleton width={120} height={40} className="rounded-xl" />
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="p-4"><Skeleton width={20} height={20} /></th>
                        <th className="p-4"><Skeleton width={80} height={16} /></th>
                        <th className="p-4"><Skeleton width={60} height={16} /></th>
                        <th className="p-4"><Skeleton width={50} height={16} /></th>
                        <th className="p-4"><Skeleton width={40} height={16} /></th>
                        <th className="p-4"><Skeleton width={60} height={16} /></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <SkeletonTableRow key={i} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function SkeletonDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="glass border border-white/10 rounded-2xl p-6">
                        <Skeleton width={80} height={12} className="mb-2" />
                        <Skeleton width={120} height={32} className="mb-4" />
                        <Skeleton width="100%" height={8} className="rounded-full" />
                    </div>
                ))}
            </div>

            {/* Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass border border-white/10 rounded-2xl p-6">
                    <Skeleton width={150} height={20} className="mb-4" />
                    <Skeleton height={250} className="rounded-xl" />
                </div>
                <div className="glass border border-white/10 rounded-2xl p-6">
                    <Skeleton width={150} height={20} className="mb-4" />
                    <Skeleton height={250} className="rounded-xl" />
                </div>
            </div>
        </div>
    );
}

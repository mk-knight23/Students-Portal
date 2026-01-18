"use client";

import React from "react";
import { Check, Circle, Clock, X } from "lucide-react";
import { cn } from "@/utils";

interface TimelineStep {
    id: string;
    label: string;
    description?: string;
    status: "completed" | "current" | "upcoming" | "failed";
    date?: string;
}

interface TimelineProps {
    steps: TimelineStep[];
    orientation?: "horizontal" | "vertical";
    className?: string;
}

export function Timeline({ steps, orientation = "vertical", className }: TimelineProps) {
    if (orientation === "horizontal") {
        return <HorizontalTimeline steps={steps} className={className} />;
    }
    return <VerticalTimeline steps={steps} className={className} />;
}

function VerticalTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
    return (
        <div className={cn("relative", className)} data-testid="vertical-timeline">
            {steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "absolute left-[15px] top-8 w-0.5 h-full",
                                step.status === "completed" ? "bg-primary" : "bg-muted"
                            )}
                        />
                    )}

                    {/* Icon */}
                    <div
                        className={cn(
                            "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                            step.status === "completed" && "bg-primary text-primary-foreground",
                            step.status === "current" && "bg-primary/20 border-2 border-primary text-primary",
                            step.status === "upcoming" && "bg-muted text-muted-foreground",
                            step.status === "failed" && "bg-destructive text-destructive-foreground"
                        )}
                    >
                        {step.status === "completed" && <Check className="h-4 w-4" />}
                        {step.status === "current" && <Circle className="h-3 w-3 fill-current" />}
                        {step.status === "upcoming" && <Clock className="h-4 w-4" />}
                        {step.status === "failed" && <X className="h-4 w-4" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className={cn(
                                "font-medium",
                                step.status === "current" && "text-primary",
                                step.status === "upcoming" && "text-muted-foreground"
                            )}>
                                {step.label}
                            </p>
                            {step.date && (
                                <span className="text-xs text-muted-foreground">{step.date}</span>
                            )}
                        </div>
                        {step.description && (
                            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function HorizontalTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
    return (
        <div className={cn("flex items-start", className)} data-testid="horizontal-timeline">
            {steps.map((step, index) => (
                <div key={step.id} className="flex-1 flex flex-col items-center relative">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "absolute top-4 left-1/2 w-full h-0.5",
                                step.status === "completed" ? "bg-primary" : "bg-muted"
                            )}
                        />
                    )}

                    {/* Icon */}
                    <div
                        className={cn(
                            "relative z-10 flex items-center justify-center w-8 h-8 rounded-full",
                            step.status === "completed" && "bg-primary text-primary-foreground",
                            step.status === "current" && "bg-primary/20 border-2 border-primary text-primary",
                            step.status === "upcoming" && "bg-muted text-muted-foreground",
                            step.status === "failed" && "bg-destructive text-destructive-foreground"
                        )}
                    >
                        {step.status === "completed" && <Check className="h-4 w-4" />}
                        {step.status === "current" && <Circle className="h-3 w-3 fill-current" />}
                        {step.status === "upcoming" && <Clock className="h-4 w-4" />}
                        {step.status === "failed" && <X className="h-4 w-4" />}
                    </div>

                    {/* Label */}
                    <p className={cn(
                        "text-xs font-medium text-center mt-2",
                        step.status === "current" && "text-primary",
                        step.status === "upcoming" && "text-muted-foreground"
                    )}>
                        {step.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

// Counseling Round Timeline
interface CounselingRound {
    round: number;
    name: string;
    startDate: string;
    endDate: string;
    status: "completed" | "current" | "upcoming";
}

export function CounselingRoundTimeline({ rounds }: { rounds: CounselingRound[] }) {
    const steps: TimelineStep[] = rounds.map(round => ({
        id: `round-${round.round}`,
        label: round.name,
        description: `${round.startDate} - ${round.endDate}`,
        status: round.status,
    }));

    return (
        <div className="glass border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Counseling Rounds</h3>
            <Timeline steps={steps} orientation="horizontal" />
        </div>
    );
}

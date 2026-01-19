"use client";

import React from "react";
import { Check, Circle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface Step {
    id: string;
    title: string;
    description?: string;
}

interface MultiStepWorkflowProps {
    steps: Step[];
    currentStep: number;
    orientation?: "horizontal" | "vertical";
    onStepClick?: (stepIndex: number) => void;
    allowNavigation?: boolean;
    className?: string;
}

interface StepNavigatorProps {
    totalSteps: number;
    currentStep: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit?: () => void;
    isSubmitting?: boolean;
    canProceed?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    submitLabel?: string;
}

export function MultiStepWorkflow({
    steps,
    currentStep,
    orientation = "horizontal",
    onStepClick,
    allowNavigation = false,
    className,
}: MultiStepWorkflowProps) {
    const isHorizontal = orientation === "horizontal";

    return (
        <div
            className={cn(
                "flex gap-2",
                isHorizontal ? "flex-row items-center" : "flex-col",
                className
            )}
        >
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isClickable = allowNavigation && index <= currentStep;

                return (
                    <React.Fragment key={step.id}>
                        <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => isClickable && onStepClick?.(index)}
                            className={cn(
                                "flex items-center gap-3 transition-all",
                                isHorizontal ? "flex-row" : "flex-row w-full p-3 rounded-xl",
                                !isHorizontal && (isCurrent ? "bg-primary/10" : isCompleted ? "bg-muted/30" : ""),
                                isClickable && "cursor-pointer hover:opacity-80"
                            )}
                        >
                            {/* Step indicator */}
                            <div
                                className={cn(
                                    "flex items-center justify-center shrink-0 rounded-full transition-all",
                                    isHorizontal ? "w-8 h-8" : "w-10 h-10",
                                    isCompleted && "bg-primary text-primary-foreground",
                                    isCurrent && "bg-primary/20 border-2 border-primary text-primary",
                                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className={cn(isHorizontal ? "h-4 w-4" : "h-5 w-5")} />
                                ) : (
                                    <span className={cn("font-bold", isHorizontal ? "text-xs" : "text-sm")}>
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Step content */}
                            {!isHorizontal && (
                                <div className="flex-1 text-left">
                                    <p
                                        className={cn(
                                            "font-medium text-sm",
                                            isCurrent && "text-primary",
                                            !isCompleted && !isCurrent && "text-muted-foreground"
                                        )}
                                    >
                                        {step.title}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-muted-foreground">{step.description}</p>
                                    )}
                                </div>
                            )}

                            {isHorizontal && (
                                <span
                                    className={cn(
                                        "text-xs font-medium hidden sm:inline",
                                        isCurrent && "text-primary",
                                        !isCompleted && !isCurrent && "text-muted-foreground"
                                    )}
                                >
                                    {step.title}
                                </span>
                            )}
                        </button>

                        {/* Connector */}
                        {index < steps.length - 1 && isHorizontal && (
                            <div
                                className={cn(
                                    "flex-1 h-0.5 min-w-4",
                                    isCompleted ? "bg-primary" : "bg-muted"
                                )}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export function StepNavigator({
    totalSteps,
    currentStep,
    onPrevious,
    onNext,
    onSubmit,
    isSubmitting = false,
    canProceed = true,
    previousLabel = "Previous",
    nextLabel = "Next",
    submitLabel = "Submit",
}: StepNavigatorProps) {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex items-center justify-between gap-4 pt-6 border-t">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstStep}
                className="text-xs font-bold uppercase tracking-widest"
            >
                {previousLabel}
            </Button>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <Circle
                        key={i}
                        className={cn(
                            "h-2 w-2 transition-all",
                            i <= currentStep ? "fill-primary text-primary" : "text-muted"
                        )}
                    />
                ))}
            </div>

            {isLastStep ? (
                <Button
                    onClick={onSubmit}
                    disabled={!canProceed || isSubmitting}
                    className="text-xs font-bold uppercase tracking-widest shadow-lg"
                >
                    {isSubmitting ? "Submitting..." : submitLabel}
                </Button>
            ) : (
                <Button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="text-xs font-bold uppercase tracking-widest"
                >
                    {nextLabel}
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

export default MultiStepWorkflow;

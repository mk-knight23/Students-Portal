"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

type AlertType = "error" | "success" | "warning" | "info";

interface ValidationAlertProps {
    type: AlertType;
    title?: string;
    message: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const alertConfig: Record<AlertType, { icon: typeof AlertCircle; bgClass: string; borderClass: string; textClass: string }> = {
    error: {
        icon: AlertCircle,
        bgClass: "bg-red-500/10",
        borderClass: "border-red-500/20",
        textClass: "text-red-500",
    },
    success: {
        icon: CheckCircle2,
        bgClass: "bg-green-500/10",
        borderClass: "border-green-500/20",
        textClass: "text-green-500",
    },
    warning: {
        icon: AlertTriangle,
        bgClass: "bg-yellow-500/10",
        borderClass: "border-yellow-500/20",
        textClass: "text-yellow-600",
    },
    info: {
        icon: Info,
        bgClass: "bg-blue-500/10",
        borderClass: "border-blue-500/20",
        textClass: "text-blue-500",
    },
};

export function ValidationAlert({
    type,
    title,
    message,
    dismissible = false,
    onDismiss,
    className,
    action,
}: ValidationAlertProps) {
    const [dismissed, setDismissed] = useState(false);
    const config = alertConfig[type];
    const Icon = config.icon;

    const handleDismiss = () => {
        setDismissed(true);
        onDismiss?.();
    };

    if (dismissed) return null;

    return (
        <div
            className={cn(
                "flex items-start gap-3 p-4 rounded-xl border",
                config.bgClass,
                config.borderClass,
                className
            )}
            role="alert"
        >
            <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.textClass)} />
            <div className="flex-1 min-w-0">
                {title && (
                    <p className={cn("font-bold text-sm", config.textClass)}>{title}</p>
                )}
                <p className={cn("text-sm", title ? "text-foreground/80 mt-0.5" : config.textClass)}>
                    {message}
                </p>
                {action && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("mt-2 h-7 text-xs font-bold", config.textClass)}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                )}
            </div>
            {dismissible && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={handleDismiss}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

// Field-level validation component
interface FieldErrorProps {
    message?: string;
    className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
    if (!message) return null;

    return (
        <p className={cn("flex items-center gap-1 text-xs text-red-500 mt-1", className)}>
            <AlertCircle className="h-3 w-3" />
            {message}
        </p>
    );
}

// Form-level validation summary
interface ValidationSummaryProps {
    errors: string[];
    title?: string;
    className?: string;
}

export function ValidationSummary({ errors, title = "Please fix the following errors:", className }: ValidationSummaryProps) {
    if (errors.length === 0) return null;

    const errorMessage = errors.join(". ");

    return (
        <ValidationAlert
            type="error"
            title={title}
            message={errorMessage}
            className={className}
        />
    );
}

export default ValidationAlert;

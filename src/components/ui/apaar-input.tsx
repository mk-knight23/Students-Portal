"use client";

import React, { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApaarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    showValidation?: boolean;
}

// APAAR ID format: 12 alphanumeric characters
const validateApaarId = (value: string): { valid: boolean; message: string } => {
    if (!value) return { valid: false, message: "APAAR ID is required" };
    if (value.length !== 12) return { valid: false, message: "APAAR ID must be 12 characters" };
    if (!/^[A-Z0-9]+$/.test(value)) return { valid: false, message: "Only uppercase letters and numbers allowed" };
    return { valid: true, message: "Valid APAAR ID format" };
};

export const ApaarInput = forwardRef<HTMLInputElement, ApaarInputProps>(
    ({ label = "APAAR ID", showValidation = true, className, onChange, value, ...props }, ref) => {
        const [internalValue, setInternalValue] = useState(value?.toString() || "");
        const validation = validateApaarId(internalValue);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
            setInternalValue(rawValue);
            if (onChange) {
                const syntheticEvent = {
                    ...e,
                    target: { ...e.target, value: rawValue },
                };
                onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
            }
        };

        return (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-foreground">{label}</label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">
                                    Automated Permanent Academic Account Registry (APAAR) ID
                                    <br />
                                    12-character alphanumeric unique student identifier
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="relative">
                    <Input
                        ref={ref}
                        type="text"
                        value={internalValue}
                        onChange={handleChange}
                        placeholder="e.g., AB1234567890"
                        className={cn(
                            "pr-10 font-mono uppercase tracking-widest",
                            showValidation && internalValue && (validation.valid ? "border-green-500" : "border-red-500"),
                            className
                        )}
                        maxLength={12}
                        {...props}
                    />
                    {showValidation && internalValue && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {validation.valid ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <X className="h-4 w-4 text-red-500" />
                            )}
                        </div>
                    )}
                </div>
                {showValidation && internalValue && (
                    <p className={cn(
                        "text-[10px]",
                        validation.valid ? "text-green-600" : "text-red-500"
                    )}>
                        {validation.message}
                    </p>
                )}
                <p className="text-[10px] text-muted-foreground">
                    {internalValue.length}/12 characters
                </p>
            </div>
        );
    }
);

ApaarInput.displayName = "ApaarInput";

export default ApaarInput;

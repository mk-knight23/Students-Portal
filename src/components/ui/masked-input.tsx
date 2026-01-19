"use client";

import React, { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    maskPattern?: "aadhaar" | "phone" | "pan" | "custom";
    customMask?: (value: string) => string;
    showToggle?: boolean;
    label?: string;
}

const maskFunctions: Record<string, (value: string, show: boolean) => string> = {
    aadhaar: (value: string, show: boolean) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 12);
        if (show) {
            return cleaned.replace(/(\d{4})(\d{4})?(\d{4})?/, (_, a, b, c) =>
                [a, b, c].filter(Boolean).join("-")
            );
        }
        if (cleaned.length <= 8) return "X".repeat(cleaned.length);
        return `XXXX-XXXX-${cleaned.slice(8)}`;
    },
    phone: (value: string, show: boolean) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 10);
        if (show) return cleaned;
        if (cleaned.length <= 6) return "X".repeat(cleaned.length);
        return `XXXXXX${cleaned.slice(6)}`;
    },
    pan: (value: string, show: boolean) => {
        const cleaned = value.toUpperCase().slice(0, 10);
        if (show) return cleaned;
        if (cleaned.length <= 5) return "X".repeat(cleaned.length);
        return `XXXXX${cleaned.slice(5)}`;
    },
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    ({ maskPattern = "aadhaar", customMask, showToggle = true, label, className, onChange, value, ...props }, ref) => {
        const [showValue, setShowValue] = useState(false);
        const [internalValue, setInternalValue] = useState(value?.toString() || "");

        const getMaskedValue = (val: string): string => {
            if (customMask) return customMask(val);
            const maskFn = maskFunctions[maskPattern];
            return maskFn ? maskFn(val, showValue) : val;
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/[-\s]/g, "");
            setInternalValue(rawValue);
            if (onChange) {
                const syntheticEvent = {
                    ...e,
                    target: { ...e.target, value: rawValue },
                };
                onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
            }
        };

        const displayValue = getMaskedValue(internalValue);

        return (
            <div className="space-y-2">
                {label && (
                    <label className="text-sm font-medium text-foreground">{label}</label>
                )}
                <div className="relative">
                    <Input
                        ref={ref}
                        type="text"
                        value={displayValue}
                        onChange={handleChange}
                        className={cn("pr-10 font-mono tracking-wider", className)}
                        {...props}
                    />
                    {showToggle && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowValue(!showValue)}
                        >
                            {showValue ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    )}
                </div>
                {maskPattern === "aadhaar" && (
                    <p className="text-[10px] text-muted-foreground">
                        Format: XXXX-XXXX-1234 (last 4 digits visible)
                    </p>
                )}
            </div>
        );
    }
);

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;

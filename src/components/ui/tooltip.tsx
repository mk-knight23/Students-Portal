"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

// Convenience component for inline hints
interface HintProps {
    content: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    delayDuration?: number;
}

export function Hint({ content, children, side = "top", delayDuration = 300 }: HintProps) {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side}>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// Onboarding-specific tooltip with more styling
interface OnboardingHintProps {
    content: string;
    title?: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    open?: boolean;
}

export function OnboardingHint({ content, title, children, side = "top", open }: OnboardingHintProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip open={open}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    className="bg-gradient-to-r from-primary to-violet-600 max-w-xs p-3"
                >
                    {title && <p className="font-semibold mb-1">{title}</p>}
                    <p className="text-xs opacity-90">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils";

interface ConsentItem {
    id: string;
    title: string;
    description: string;
    required: boolean;
    defaultValue: boolean;
}

interface ConsentBannerProps {
    items?: ConsentItem[];
    onAcceptAll?: () => void;
    onRejectAll?: () => void;
    onSave?: (consents: Record<string, boolean>) => void;
    position?: "top" | "bottom";
    className?: string;
}

const defaultItems: ConsentItem[] = [
    {
        id: "essential",
        title: "Essential Services",
        description: "Required for the portal to function properly.",
        required: true,
        defaultValue: true,
    },
    {
        id: "analytics",
        title: "Analytics",
        description: "Help us improve by sharing anonymous usage data.",
        required: false,
        defaultValue: false,
    },
    {
        id: "marketing",
        title: "Marketing",
        description: "Receive updates about colleges and counseling dates.",
        required: false,
        defaultValue: false,
    },
];

export function ConsentBanner({
    items = defaultItems,
    onAcceptAll,
    onRejectAll,
    onSave,
    position = "bottom",
    className,
}: ConsentBannerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [consents, setConsents] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(items.map((item) => [item.id, item.defaultValue]))
    );

    useEffect(() => {
        // Check if consent was already given
        const savedConsent = localStorage.getItem("ame-consent");
        if (!savedConsent) {
            // Delay showing banner for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = Object.fromEntries(items.map((item) => [item.id, true]));
        setConsents(allAccepted);
        localStorage.setItem("ame-consent", JSON.stringify(allAccepted));
        setIsVisible(false);
        onAcceptAll?.();
    };

    const handleRejectAll = () => {
        const onlyRequired = Object.fromEntries(
            items.map((item) => [item.id, item.required])
        );
        setConsents(onlyRequired);
        localStorage.setItem("ame-consent", JSON.stringify(onlyRequired));
        setIsVisible(false);
        onRejectAll?.();
    };

    const handleSave = () => {
        localStorage.setItem("ame-consent", JSON.stringify(consents));
        setIsVisible(false);
        onSave?.(consents);
    };

    const toggleConsent = (id: string) => {
        const item = items.find((i) => i.id === id);
        if (item?.required) return;
        setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed left-0 right-0 z-50 p-4",
                position === "top" ? "top-0" : "bottom-0",
                className
            )}
        >
            <div className="max-w-4xl mx-auto">
                <div className="glass-card rounded-2xl border shadow-2xl p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Cookie className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Privacy & Data Consent
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                We use cookies and process your data to provide our services.
                                As per DPDPA 2023, we need your consent for certain activities.
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsVisible(false)}
                            className="shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Expandable Details */}
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs font-bold text-muted-foreground"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Hide" : "Show"} Details
                            {showDetails ? (
                                <ChevronUp className="ml-1 h-3 w-3" />
                            ) : (
                                <ChevronDown className="ml-1 h-3 w-3" />
                            )}
                        </Button>

                        {showDetails && (
                            <div className="mt-4 space-y-3">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium">{item.title}</p>
                                                {item.required && (
                                                    <span className="text-[9px] font-bold uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={consents[item.id]}
                                            onCheckedChange={() => toggleConsent(item.id)}
                                            disabled={item.required}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="flex-1 text-xs font-bold uppercase tracking-widest"
                            onClick={handleRejectAll}
                        >
                            Essential Only
                        </Button>
                        {showDetails && (
                            <Button
                                variant="outline"
                                className="flex-1 text-xs font-bold uppercase tracking-widest"
                                onClick={handleSave}
                            >
                                Save Preferences
                            </Button>
                        )}
                        <Button
                            className="flex-1 text-xs font-bold uppercase tracking-widest shadow-lg"
                            onClick={handleAcceptAll}
                        >
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsentBanner;

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-6">
            <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-2">
                <AlertCircle className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md">
                We encountered an unexpected error. Our team has been notified.
                {error.digest && <span className="block text-xs mt-2 font-mono bg-muted p-1 rounded">ID: {error.digest}</span>}
            </p>
            <div className="flex gap-2 mt-4">
                <Button onClick={() => window.location.href = "/"} variant="outline">
                    Go Home
                </Button>
                <Button onClick={() => reset()} className="gap-2">
                    <RefreshCcw className="h-4 w-4" /> Try Again
                </Button>
            </div>
        </div>
    );
}

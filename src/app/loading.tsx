import { SkeletonDashboard } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
                    <div className="h-4 w-64 bg-muted rounded-lg animate-pulse" />
                </div>
            </div>
            <SkeletonDashboard />
        </div>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 space-y-6">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative p-6 rounded-3xl glasseffect border-none">
                    <SearchX className="h-24 w-24 text-primary opacity-80" />
                </div>
            </div>

            <div className="space-y-2 max-w-md">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">404</h1>
                <h2 className="text-xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
            </div>

            <Button asChild size="lg" className="rounded-full gap-2">
                <Link href="/">
                    <MoveLeft className="h-4 w-4" /> Return Home
                </Link>
            </Button>
        </div>
    );
}

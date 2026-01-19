import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-dvh overflow-hidden bg-background">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scroll-pt-16">
                <Navbar />
                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}

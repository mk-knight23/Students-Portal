import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Navbar />
                <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
                    {children}
                </main>
            </div>
        </div>
    );
}

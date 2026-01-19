"use client"

import { motion } from "framer-motion"
import { Users, GraduationCap, ShieldCheck, ArrowRight, Zap, BookOpen, Briefcase, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppStore, UserRole } from "@/store/useAppStore"
import { useEffect } from "react"
import { cn } from "@/utils"

export default function RootPage() {
    const router = useRouter();
    const { login } = useAppStore();

    const handleLogin = (role: UserRole) => {
        login(role);
        // Small delay to allow state update to propagate
        setTimeout(() => {
            router.push(`/portal/${role}/dashboard`);
        }, 100);
    };

    const roles = [
        {
            id: 'student',
            label: "Student Login",
            icon: GraduationCap,
            description: "Access your application, documents, and fee status.",
            color: "text-primary",
            bg: "bg-primary/10",
            border: "group-hover:border-primary/50",
            delay: 0.1
        },
        {
            id: 'staff',
            label: "Branch Staff Login",
            icon: UserCheck,
            description: "Verify documents and manage student inquiries.",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "group-hover:border-orange-500/50",
            delay: 0.2
        },
        {
            id: 'head',
            label: "Branch Head Login",
            icon: ShieldCheck,
            description: "Oversee branch operations and view reports.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[160px]" />
            </div>

            <main className="container max-w-6xl mx-auto pt-20 pb-20 px-6">
                <div className="text-center space-y-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.2em] text-primary"
                    >
                        <Zap className="h-3 w-3" />
                        AME.HUB Node v0.0.3 — Operational Hub
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight leading-none italic"
                    >
                        SELECT YOUR <span className="text-primary tracking-[-0.05em]">ROLE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium"
                    >
                        Unified Operational Flow for AME Branches. Select your portal to proceed.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role) => (
                        <motion.button
                            key={role.id}
                            onClick={() => handleLogin(role.id as UserRole)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: role.delay }}
                            className={cn(
                                "group relative flex flex-col items-start p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/10 text-left w-full",
                                role.border
                            )}
                        >
                            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-6", role.bg, role.color)}>
                                <role.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                {role.label}
                                <ArrowRight className={cn("h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all", role.color)} />
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                {role.description}
                            </p>
                        </motion.button>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                        <span>Mock Session</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>No Persistent Auth</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Reset on Refresh</span>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

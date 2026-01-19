"use client"

import { motion } from "framer-motion"
import { Users, GraduationCap, ShieldCheck, ArrowRight, Zap } from "lucide-react"

export default function RootPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[160px]" />
            </div>

            <main className="container max-w-6xl mx-auto pt-32 pb-20 px-6">
                <div className="text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.2em] text-primary"
                    >
                        <Zap className="h-3 w-3" />
                        AME.HUB Node v0.3.0 — Grounded Operational Spec
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black tracking-tight leading-none italic"
                    >
                        OPERATIONS <span className="text-primary tracking-[-0.05em]">PLATFORM</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Localized student lifecycle management focusing on Maharashtra's top demographic hubs.
                        Tracking 100+ active student nodes across Mumbai, Pune, Latur, and beyond.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Student Portal Entry */}
                    <motion.a
                        href="/portal/dashboard"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative h-full flex flex-col p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-primary/40 transition-all hover:scale-[1.01] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <GraduationCap className="h-48 w-48 text-primary" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shadow-xl shadow-primary/10 border border-primary/20">
                                <GraduationCap className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black mb-2 italic tracking-tight flex items-center gap-3">
                                    Student Portal
                                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all text-primary" />
                                </h2>
                                <p className="text-muted-foreground font-medium leading-relaxed text-base opacity-80">
                                    A streamlined experience: Seat allotment simulators, fee payment modules, and digital student identity.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary/70">Merit Check</span>
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary/70">Payment Hub</span>
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary/70">Communication</span>
                            </div>
                        </div>
                    </motion.a>

                    {/* Admin Console Entry */}
                    <motion.a
                        href="/admin/dashboard"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group relative h-full flex flex-col p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-blue-500/40 transition-all hover:scale-[1.01] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity text-blue-500">
                            <ShieldCheck className="h-48 w-48" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-xl shadow-blue-500/10 border border-blue-500/20">
                                <Users className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black mb-2 italic tracking-tight flex items-center gap-3">
                                    Admin Console
                                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all text-blue-400" />
                                </h2>
                                <p className="text-muted-foreground font-medium leading-relaxed text-base opacity-80">
                                    Operational oversight: Bulk data processing, agency referral management, and financial reconciliation.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-blue-400/70">Mass Import</span>
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-blue-400/70">Agent Ledger</span>
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-blue-400/70">Compliance</span>
                            </div>
                        </div>
                    </motion.a>
                </div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-6 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                        <span>Regional Operations Compliant</span>
                        <span className="w-1 h-1 bg-primary/40 rounded-full" />
                        <span>Localized Data Hub</span>
                        <span className="w-1 h-1 bg-primary/40 rounded-full" />
                        <span>v0.3.0 Grounded</span>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Building2,
    ShieldCheck,
    Lock,
    User,
    UserCheck,
    Users,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [role, setRole] = React.useState<"admin" | "student" | "staff" | "head">("student");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { setCurrentUser } = useAppStore();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid credentials", {
                    description: "Please check your official email and password."
                });
            } else {
                setCurrentUser({ id: 'USR001', name: email.split('@')[0], role });
                toast.success(`Welcome back`, {
                    description: "Standard session established with DPDPA audit logging active."
                });
                router.push(`/portal/${role}/dashboard`);
            }
        } catch (error) {
            toast.error("Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-chart-4/10 rounded-full blur-[150px] opacity-50" />

            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group transition-all">
                        <Building2 className="h-8 w-8 text-primary animate-float" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
                        Admissions <span className="text-gradient">Made Easy</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase opacity-70">
                        Unified Data Management Portal
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="glass overflow-hidden rounded-[2.5rem] border-white/10 shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                            <ShieldCheck className="h-24 w-24 text-primary" />
                        </div>

                        <CardContent className="p-8 lg:p-10">
                            <form onSubmit={handleLogin} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div
                                            onClick={() => setRole("student")}
                                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${role === "student"
                                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <User className={`h-5 w-5 ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className={`text-[9px] font-bold uppercase tracking-tight text-center ${role === "student" ? "text-primary" : "text-muted-foreground"}`}>Student</span>
                                        </div>
                                        <div
                                            onClick={() => setRole("staff")}
                                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${role === "staff"
                                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <UserCheck className={`h-5 w-5 ${role === "staff" ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className={`text-[9px] font-bold uppercase tracking-tight text-center ${role === "staff" ? "text-primary" : "text-muted-foreground"}`}>Staff</span>
                                        </div>
                                        <div
                                            onClick={() => setRole("head")}
                                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${role === "head"
                                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <ShieldCheck className={`h-5 w-5 ${role === "head" ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className={`text-[9px] font-bold uppercase tracking-tight text-center ${role === "head" ? "text-primary" : "text-muted-foreground"}`}>Head</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Official Email</Label>
                                        <div className="relative group">
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 glass rounded-xl border-white/10 pl-11 focus:border-primary/50 transition-all"
                                                placeholder="name@admissions.com"
                                            />
                                            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center ml-1">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Credentials</Label>
                                            <span className="text-[10px] font-medium text-primary cursor-pointer hover:underline">Forgot?</span>
                                        </div>
                                        <div className="relative group">
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-12 glass rounded-xl border-white/10 pl-11 focus:border-primary/50 transition-all"
                                                placeholder="••••••••"
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 group"
                                >
                                    Authorize Entry
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="mt-12 text-center text-muted-foreground/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                    Protected by DPDPA 2023 & Enterprise Guard v4.2
                </div>
            </div>
        </div>
    );
}

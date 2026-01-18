"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    User,
    MapPin,
    GraduationCap,
    Phone,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Clock,
    AlertCircle
} from "lucide-react";
import { studentFormSchema, type StudentFormValues } from "@/utils/validation/schemas";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerStudent } from "@/actions/student";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    { id: "identity", label: "Identity", icon: User },
    { id: "region", label: "Region & Quota", icon: MapPin },
    { id: "academic", label: "Academics", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "review", label: "DPDPA Review", icon: ShieldCheck },
];

export function StudentMasterForm() {
    const [currentStep, setCurrentStep] = React.useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<StudentFormValues>({
        resolver: zodResolver(studentFormSchema),
        mode: "onChange",
    });

    const selectedState = watch("state");

    const router = useRouter();
    const onSubmit = async (data: StudentFormValues) => {
        try {
            const result = await registerStudent(data);
            if (result.success) {
                toast.success("Student Record Created Successfully!", {
                    description: "Identity verified and locked under tenant context.",
                });
                router.push("/students");
            }
        } catch (error) {
            toast.error("Submission failed. Please check your data.");
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-4 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                {steps.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 relative transition-all group shrink-0 mx-4 lg:mx-0">
                        <div
                            className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${i <= currentStep
                                ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20"
                                : "bg-white/5 text-muted-foreground border border-white/10"
                                }`}
                        >
                            <step.icon className="h-5 w-5" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
                            {step.label}
                        </span>
                        {i < steps.length - 1 && (
                            <div className={`hidden lg:block absolute left-[3.5rem] top-6 w-[calc(100%-1rem)] h-[2px] -z-10 transition-all duration-700 ${i < currentStep ? "bg-primary" : "bg-white/5"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            <Card className="glass overflow-hidden rounded-[2.5rem] border-white/10 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">First Name</Label>
                                        <Input {...register("firstName")} className="glass rounded-xl border-white/10" placeholder="e.g. Rahul" />
                                        {errors.firstName && <p className="text-[10px] text-destructive font-bold ml-1">{errors.firstName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Last Name</Label>
                                        <Input {...register("lastName")} className="glass rounded-xl border-white/10" placeholder="e.g. Patel" />
                                        {errors.lastName && <p className="text-[10px] text-destructive font-bold ml-1">{errors.lastName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Gender</Label>
                                        <Select onValueChange={(val) => setValue("gender", val as any)}>
                                            <SelectTrigger className="glass rounded-xl border-white/10">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-dark border-white/10">
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.gender && <p className="text-[10px] text-destructive font-bold ml-1">{errors.gender.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">D.O.B</Label>
                                        <Input type="date" {...register("dob")} className="glass rounded-xl border-white/10" />
                                        {errors.dob && <p className="text-[10px] text-destructive font-bold ml-1">{errors.dob.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Aadhaar (12-way Verhoeff)</Label>
                                        <div className="relative">
                                            <Input {...register("aadhaar")} className="glass rounded-xl border-white/10 pl-10" placeholder="XXXX XXXX XXXX" />
                                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                                        </div>
                                        {errors.aadhaar && <p className="text-[10px] text-destructive font-bold ml-1">{errors.aadhaar.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">APAAR ID (Mandatory)</Label>
                                        <Input {...register("apaarId")} className="glass rounded-xl border-white/10" placeholder="National Student ID" />
                                        {errors.apaarId && <p className="text-[10px] text-destructive font-bold ml-1">{errors.apaarId.message}</p>}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Domicile State</Label>
                                            <Select onValueChange={(val) => setValue("state", val)}>
                                                <SelectTrigger className="glass rounded-xl border-white/10">
                                                    <SelectValue placeholder="Select State" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10">
                                                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                                                    <SelectItem value="Kerala">Kerala</SelectItem>
                                                    <SelectItem value="UP">Uttar Pradesh</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.state && <p className="text-[10px] text-destructive font-bold ml-1">{errors.state.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category (Exhaustive)</Label>
                                            <Select onValueChange={(val) => setValue("category", val as any)}>
                                                <SelectTrigger className="glass border-white/10 rounded-xl">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="glass-dark border-white/10">
                                                    <SelectItem value="Open">Open / General</SelectItem>
                                                    <SelectItem value="OBC">OBC (Other Backward Class)</SelectItem>
                                                    <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                                                    <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                                                    <SelectItem value="VJ">VJ / DT (A)</SelectItem>
                                                    <SelectItem value="NTb">NT-B (NT-1)</SelectItem>
                                                    <SelectItem value="NTC">NT-C (NT-2)</SelectItem>
                                                    <SelectItem value="NTD">NT-D (NT-3)</SelectItem>
                                                    <SelectItem value="EWS">EWS (Economically Weaker Section)</SelectItem>
                                                    <SelectItem value="SEBC">SEBC (Socially & Educationally BC)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.category && <p className="text-[10px] text-destructive font-bold ml-1">{errors.category.message}</p>}
                                        </div>

                                        {selectedState === "Maharashtra" && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="space-y-2 col-span-2"
                                            >
                                                <Label className="text-xs font-bold uppercase tracking-wider text-primary ml-1">Candidature Type</Label>
                                                <Select onValueChange={(val) => setValue("candidatureType", val)}>
                                                    <SelectTrigger className="glass border-primary/30 rounded-xl">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-dark border-white/10">
                                                        <SelectItem value="Type A">Type A (Born/Domiciled in MH + SSC/HSC in MH)</SelectItem>
                                                        <SelectItem value="Type B">Type B (Parent Domiciled)</SelectItem>
                                                        <SelectItem value="Type C">Type C (Central Govt Employee)</SelectItem>
                                                        <SelectItem value="Type D">Type D (State Govt Employee)</SelectItem>
                                                        <SelectItem value="Type E">Type E (MH-KA Border Area)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    <div className="space-y-6 col-span-2">
                                        <h4 className="text-sm font-bold tracking-tight text-primary flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" /> Board Details
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">10th Board</Label>
                                                <Input {...register("board10th")} className="glass text-xs h-10 rounded-lg" placeholder="e.g. CBSE" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">10th %</Label>
                                                <Input type="number" {...register("score10th", { valueAsNumber: true })} className="glass text-xs h-10 rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">12th Board</Label>
                                                <Input {...register("board12th")} className="glass text-xs h-10 rounded-lg" placeholder="e.g. HSC" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">12th %</Label>
                                                <Input type="number" {...register("score12th", { valueAsNumber: true })} className="glass text-xs h-10 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 col-span-2">
                                        <h4 className="text-sm font-bold tracking-tight text-primary flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4" /> Competitive Exam Matrix
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">NEET Score</Label>
                                                <Input type="number" {...register("neetScore", { valueAsNumber: true })} className="glass h-12 rounded-xl border-primary/20 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2 col-span-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">NEET All India Rank</Label>
                                                <Input {...register("neetRank")} className="glass h-12 rounded-xl" placeholder="e.g. 142051" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">JEE Percentile</Label>
                                                <Input type="number" step="0.001" {...register("jeeScore", { valueAsNumber: true })} className="glass h-10 rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MHT-CET Score</Label>
                                                <Input type="number" {...register("cetScore", { valueAsNumber: true })} className="glass h-10 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Student Phone</Label>
                                        <Input {...register("phone")} className="glass rounded-xl border-white/10" placeholder="+91 XXXX XXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Parent Phone (Redundant)</Label>
                                        <Input {...register("parentPhone")} className="glass rounded-xl border-white/10" placeholder="+91 XXXX XXXX" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Official Email</Label>
                                        <Input {...register("email")} className="glass rounded-xl border-white/10" placeholder="student@example.com" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Permanent Address</Label>
                                        <Input {...register("address")} className="glass rounded-xl border-white/10" placeholder="Flat No, Building, Street, City..." />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-8"
                                >
                                    <div className="p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                            <ShieldCheck className="h-32 w-32 text-primary" />
                                        </div>

                                        <div className="flex items-center gap-3 text-primary">
                                            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <ShieldCheck className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold tracking-tight text-lg">DPDPA 2023 Compliance Review</h4>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Verify Identity Masking & Consent</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Candidate</p>
                                                <p className="font-bold text-sm tracking-tight">{watch("firstName")} {watch("lastName")}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Aadhaar (Masked)</p>
                                                <p className="font-mono font-bold tracking-tighter text-primary text-sm">
                                                    XXXX XXXX {watch("aadhaar")?.slice(-4) || "0000"}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">NEET Rank</p>
                                                <p className="font-bold text-sm">{watch("neetRank") || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Category</p>
                                                <p className="font-bold text-sm">{watch("category")}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/10 flex items-start gap-4">
                                            <div className="h-5 w-5 rounded border border-primary/30 bg-primary/10 shrink-0 mt-0.5 flex items-center justify-center">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                                                By proceeding, you certify that explicit, informed, and unconditional consent has been obtained from the candidate for processing this digital personal data under the DPDPA 2023 guidelines for the 2026 academic admission cycle.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between pt-8 border-t border-white/5">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="gap-2 rounded-xl hover:bg-white/10"
                            >
                                <ArrowLeft className="h-4 w-4" /> Previous
                            </Button>

                            {currentStep < steps.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="gap-2 rounded-xl group px-8"
                                >
                                    Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 border-none px-10 shadow-lg shadow-green-500/20"
                                >
                                    <CheckCircle2 className="h-4 w-4" /> Save & Lock Record
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {currentStep === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-[2rem] glass border border-primary/20 bg-primary/5 space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <h4 className="text-sm font-bold tracking-tight">Adaptive {selectedState} Compliance Checklist</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(selectedState === "Maharashtra"
                            ? ["Caste Validity", "NCL Certificate", "Domicile Cert", "SSC/HSC Marksheet"]
                            : selectedState === "UP"
                                ? ["NEET Scorecard", "Identity Proof", "Security Deposit Rec.", "12th Result"]
                                : ["NEET Scorecard", "SSC/HSC Marksheet", "Nativity Cert", "Income Cert"]
                        ).map((doc) => (
                            <div key={doc} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-[10px] font-medium text-muted-foreground">{doc}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

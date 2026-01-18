"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Check, Users, FileText, CreditCard, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OnboardingStep {
    title: string;
    description: string;
    icon: React.ReactNode;
    highlight: string;
}

const steps: OnboardingStep[] = [
    {
        title: "Welcome to AME Portal",
        description: "Your all-in-one platform for managing student admissions. Let's take a quick tour of the key features.",
        icon: <Users className="h-12 w-12 text-primary" />,
        highlight: "Start your journey with a streamlined admission process."
    },
    {
        title: "Student Management",
        description: "Register students, manage documents, and track their admission lifecycle from a single dashboard.",
        icon: <FileText className="h-12 w-12 text-blue-400" />,
        highlight: "Navigate to Students → Add Student to begin registration."
    },
    {
        title: "Counseling & Allotment",
        description: "Help students fill their college preferences and track multi-round allotments in real-time.",
        icon: <BarChart3 className="h-12 w-12 text-green-400" />,
        highlight: "The Counseling page lets students prioritize up to 10 colleges."
    },
    {
        title: "Payments & Receipts",
        description: "Process fees, generate receipts, and maintain a complete financial ledger for each student.",
        icon: <CreditCard className="h-12 w-12 text-purple-400" />,
        highlight: "All transactions are logged for audit compliance."
    },
    {
        title: "Compliance & Security",
        description: "Built-in DPDPA compliance with Aadhaar masking, consent management, and immutable audit logs.",
        icon: <Shield className="h-12 w-12 text-orange-400" />,
        highlight: "Your data is protected by enterprise-grade security."
    }
];

interface OnboardingTourProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = React.useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    const step = steps[currentStep];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <Card className="w-[500px] glass border-white/10 shadow-2xl">
                        <CardHeader className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-white/10"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    {step.icon}
                                </div>
                            </div>
                            <CardTitle className="text-center text-xl">{step.title}</CardTitle>
                            <CardDescription className="text-center text-sm mt-2">
                                {step.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center">
                                <p className="text-sm font-medium text-primary">{step.highlight}</p>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-2">
                                {steps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 w-2 rounded-full transition-all ${index === currentStep
                                                ? "bg-primary w-6"
                                                : index < currentStep
                                                    ? "bg-primary/50"
                                                    : "bg-white/20"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="rounded-xl"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" /> Back
                                </Button>
                                <Button onClick={nextStep} className="rounded-xl bg-primary">
                                    {currentStep === steps.length - 1 ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2" /> Get Started
                                        </>
                                    ) : (
                                        <>
                                            Next <ChevronRight className="h-4 w-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

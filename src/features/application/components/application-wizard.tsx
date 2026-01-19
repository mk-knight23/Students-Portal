"use client"

import { useApplicationWizard } from "../hooks/useApplicationWizard"
import { IdentityDetails } from "./identity-details"
import { AcademicDetails } from "./academic-details"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Save, CheckCircle2 } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { toast } from "sonner"

export function ApplicationWizard() {
    const { currentStep, formData, updateFormData, nextStep, prevStep } = useApplicationWizard();
    const { addStudent } = useAppStore();

    const getProgressValue = () => {
        const steps = ['personal', 'academic', 'counseling', 'documents', 'review'];
        return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
    };

    const handleFinalSubmit = () => {
        // Map the wizard formData to the StudentProfile interface
        addStudent({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            dob: formData.dob,
            aadhaarMasked: formData.aadhaar.replace(/.(?=.{4})/g, 'X'),
            apaarId: formData.apaarId,
            category: formData.category,
            state: formData.state,
            city: 'TBD', // Placeholder
            workflowState: 'application',
            academicHistory: {
                class10: { board: 'State Board', year: '2022', percentage: 85 },
                class12: { board: 'State Board', year: '2024', percentage: 82, stream: 'PCR' },
                neet: {
                    rollNo: '2026001',
                    score: formData.neet_score,
                    rank: formData.neet_rank,
                    year: '2026'
                }
            },
            documents: [],
            documentsVerified: false,
            counselingRegistrations: [],
            preferences: [],
            payments: [],
            branchId: 'Latur'
        } as any);

        toast.success("Application Submitted Successfully!", {
            description: "Your registration is being processed.",
        });

        window.location.href = "/portal/student/dashboard";
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'personal':
                return <IdentityDetails data={formData} update={updateFormData} />;
            case 'academic':
                return <AcademicDetails data={formData} update={updateFormData} />;
            case 'review':
                return (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-dashed">
                            <h3 className="font-bold mb-4">Review Your Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-muted-foreground">Name:</span> {formData.name}</div>
                                <div><span className="text-muted-foreground">NEET Score:</span> {formData.neet_score}</div>
                                <div><span className="text-muted-foreground">Category:</span> {formData.category}</div>
                                <div><span className="text-muted-foreground">Aadhaar:</span> {formData.aadhaar}</div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            By clicking submit, you confirm that all information provided is accurate and match your original documents.
                        </p>
                    </div>
                );
            default:
                return <div className="py-20 text-center text-muted-foreground">This step is coming soon in the mock flow.</div>;
        }
    };

    return (
        <Card className="max-w-3xl mx-auto glass-card">
            <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold capitalize">{currentStep} Details</CardTitle>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                        Step {currentStep === 'personal' ? 1 : currentStep === 'academic' ? 2 : currentStep === 'review' ? 5 : '...'} / 5
                    </span>
                </div>
                <Progress value={getProgressValue()} className="h-2 rounded-full" />
                <CardDescription>Consisting of 1.1 Multi-step Navigation with data persistence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
                {renderStep()}

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 'personal'}
                        className="rounded-xl px-8"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    {currentStep === 'review' ? (
                        <Button onClick={handleFinalSubmit} className="rounded-xl px-10 shadow-lg shadow-primary/20 bg-primary hover:scale-105 transition-transform">
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Submit Application
                        </Button>
                    ) : (
                        <Button onClick={nextStep} className="rounded-xl px-10 shadow-lg shadow-primary/20 bg-primary hover:scale-105 transition-transform">
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

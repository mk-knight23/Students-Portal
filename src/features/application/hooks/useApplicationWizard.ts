import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export type Step = 'personal' | 'academic' | 'counseling' | 'documents' | 'review';

export function useApplicationWizard() {
    const [currentStep, setCurrentStep] = useState<Step>('personal');
    const { addStudent } = useAppStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'Male' as 'Male' | 'Female' | 'Other',
        dob: '',
        aadhaar: '',
        apaar_id: '',
        category: 'Open',
        neet_score: 0,
        neet_rank: 0,
        state: 'Maharashtra',
        counseling_registrations: [] as string[],
        documents: [] as { id: string, type: string, status: 'Pending', url: string }[]
    });

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        const steps: Step[] = ['personal', 'academic', 'counseling', 'documents', 'review'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: Step[] = ['personal', 'academic', 'counseling', 'documents', 'review'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    return {
        currentStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        setCurrentStep
    };
}

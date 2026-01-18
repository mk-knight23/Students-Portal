import { StudentMasterForm } from "@/components/forms/student-master-form";

export default function AddStudentPage() {
    return (
        <div className="space-y-10 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-gradient">Register New Student</h1>
                <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-widest opacity-70">
                    Academic Session 2026-27 • Branch: Latur
                </p>
            </div>

            <StudentMasterForm />
        </div>
    );
}

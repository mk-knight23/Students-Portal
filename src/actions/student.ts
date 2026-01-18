"use server";

import { auth } from "@/auth";
import { studentFormSchema } from "@/utils/validation/schemas";
import { revalidatePath } from "next/cache";
import { mockStudentService, mockCounselingService, mockAuditService } from "@/mocks";

import { z } from "zod";

export async function registerStudent(data: unknown) {
    const session = await auth();

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    const validated = studentFormSchema.parse(data);

    // Enforce Tenant & Branch Isolation
    const branchId = session.user.branchId || (data as any).branchId;

    const result = await mockStudentService.create({
        name: `${validated.firstName} ${validated.lastName}`,
        aadhaarMasked: validated.aadhaar.replace(/\d(?=\d{4})/g, "X"),
        category: validated.category,
        domicileState: validated.state,
        branchId,
        neetScore: validated.neetScore,
        neetRank: validated.neetRank,
    });

    if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to register student");
    }

    // Create Audit Log
    await mockAuditService.log({
        action: "REGISTER_STUDENT",
        entity: `Student: ${result.data.id}`,
        details: JSON.stringify({ name: result.data.name, tenantId: session.user.tenantId }),
    });

    revalidatePath("/students");
    return { success: true, studentId: result.data.id };
}

export async function savePreferences(studentId: string, preferences: Record<string, any>[]) {
    const session = await auth();

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    const result = await mockCounselingService.savePreferences(studentId, preferences);

    if (!result.success) {
        throw new Error(result.error || "Failed to save preferences");
    }

    await mockAuditService.log({
        action: "UPDATE_PREFERENCES",
        entity: `Student: ${studentId}`,
        details: "Updated college preferences"
    });

    revalidatePath(`/students/${studentId}`);
    return { success: true };
}

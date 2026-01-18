"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { mockDocumentService, mockPaymentService, mockAuditService } from "@/mocks";

export async function uploadDocument(studentId: string, type: string, fileUrl: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    // In a real app we'd check if student exists using mockStudentService

    const result = await mockDocumentService.upload(studentId, { name: `${type}.pdf`, type });

    if (!result.success) throw new Error(result.error);

    await mockAuditService.log({
        action: "UPLOAD_DOCUMENT",
        entity: `Doc: ${type}`,
        details: JSON.stringify({ studentId, type })
    });

    revalidatePath(`/students/${studentId}`);
    return { success: true };
}

export async function processPayment(studentId: string, amount: number, type: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const result = await mockPaymentService.create({
        studentId,
        amount,
        type,
    });

    if (!result.success || !result.data) throw new Error(result.error);

    await mockAuditService.log({
        action: "GENERATE_RECEIPT",
        entity: `TXN: ${result.data.id}`,
        details: JSON.stringify({ studentId, amount })
    });

    revalidatePath("/payments");
    return { success: true, txnId: result.data.id };
}

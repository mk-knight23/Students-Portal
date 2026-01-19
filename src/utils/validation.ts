import { z } from "zod";

/**
 * Verhoeff Algorithm for identity number validation (Aadhaar, APAAR, etc.)
 * Optimized for performance in Next.js 16/React 19 environments.
 */

const multiplicationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

const permutationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

/**
 * Validates a number using the Verhoeff algorithm.
 */
export function validateVerhoeff(id: string): boolean {
    if (!id || id.length !== 12 || !/^\d+$/.test(id)) {
        return false;
    }

    let c = 0;
    const reversedArray = id.split("").map(Number).reverse();

    for (let i = 0; i < reversedArray.length; i++) {
        c = multiplicationTable[c][permutationTable[i % 8][reversedArray[i]]];
    }

    return c === 0;
}

/**
 * Masks Aadhaar number for DPDPA compliance
 */
export function maskAadhaar(aadhaar: string): string {
    if (!aadhaar || aadhaar.length < 4) return aadhaar;
    return `XXXX XXXX ${aadhaar.slice(-4)}`;
}

/**
 * Shared Zod Schemas
 */
export const studentFormSchema = z.object({
    // Step 1: Identity
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date of birth"),
    aadhaar: z.string().refine(validateVerhoeff, "Invalid Aadhaar number (Verhoeff failed)"),
    apaarId: z.string().refine(validateVerhoeff, "Invalid APAAR ID (Verhoeff failed)"),

    // Step 2: Quota & Region
    state: z.string().min(1, "State is required"),
    candidatureType: z.string().optional(),
    category: z.enum(["Open", "OBC", "SC", "ST", "VJ", "NTb", "NTC", "NTD", "EWS", "SEBC"]),

    // Step 3: Academic History & Comp. Exams
    board10th: z.string().min(1, "10th Board is required"),
    score10th: z.number().min(0).max(100),
    board12th: z.string().min(1, "12th Board is required"),
    score12th: z.number().min(0).max(100),
    diplomaScore: z.number().min(0).max(100).optional(),

    neetScore: z.number().min(0).max(720),
    neetRank: z.string().min(1, "NEET All India Rank is required"),
    jeeScore: z.number().min(0).max(300).optional(),
    jeeRank: z.string().optional(),
    cetScore: z.number().min(0).max(200).optional(),
    cetRank: z.string().optional(),

    // Step 4: Contact
    phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    parentPhone: z.string().regex(/^\d{10}$/, "Invalid parent phone number"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(10, "Full address is required"),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;

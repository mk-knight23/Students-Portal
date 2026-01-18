import { z } from "zod";
import { validateVerhoeff } from "./verhoeff";

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
    candidatureType: z.string().optional(), // Maharashtra specific Types A-E
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

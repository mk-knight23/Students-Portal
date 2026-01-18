import { describe, it, expect } from 'vitest'
import { studentFormSchema } from '../schemas'

describe('Student Form Schema Validation', () => {
    const validStudent = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        dob: '2000-01-15',
        aadhaar: '499118665246',
        apaarId: '499118665246',
        category: 'Open',
        state: 'Maharashtra',
        candidatureType: 'Type A',
        board10th: 'CBSE',
        score10th: 85.5,
        board12th: 'CBSE',
        score12th: 88.2,
        neetScore: 550,
        neetRank: '15000',
        phone: '9876543210',
        parentPhone: '9876543211',
        email: 'john.doe@example.com',
        address: '123 Main Street, Mumbai, Maharashtra 400001',
    }

    it('validates a correct student form', () => {
        const result = studentFormSchema.safeParse(validStudent)
        expect(result.success).toBe(true)
    })

    it('rejects missing first name', () => {
        const student = { ...validStudent, firstName: '' }
        const result = studentFormSchema.safeParse(student)
        expect(result.success).toBe(false)
    })

    it('rejects invalid Aadhaar format', () => {
        const student = { ...validStudent, aadhaar: '12345' }
        const result = studentFormSchema.safeParse(student)
        expect(result.success).toBe(false)
    })

    it('rejects NEET score out of range', () => {
        const student = { ...validStudent, neetScore: 800 }
        const result = studentFormSchema.safeParse(student)
        expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
        const student = { ...validStudent, email: 'not-an-email' }
        const result = studentFormSchema.safeParse(student)
        expect(result.success).toBe(false)
    })
})

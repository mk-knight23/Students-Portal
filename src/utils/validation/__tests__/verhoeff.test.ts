import { describe, it, expect } from 'vitest'
import { validateVerhoeff } from '../verhoeff'

describe('Verhoeff Algorithm (Aadhaar Validation)', () => {
    it('validates a correct Aadhaar number', () => {
        // Valid Aadhaar: 499118665246 (verhoeff checksum verified)
        expect(validateVerhoeff('499118665246')).toBe(true)
    })

    it('rejects an incorrect Aadhaar number', () => {
        expect(validateVerhoeff('123456789012')).toBe(false)
    })

    it('rejects non-numeric input', () => {
        expect(validateVerhoeff('12345678901a')).toBe(false)
    })

    it('rejects Aadhaar with wrong length', () => {
        expect(validateVerhoeff('12345')).toBe(false)
        expect(validateVerhoeff('1234567890123')).toBe(false)
    })

    it('handles empty input', () => {
        expect(validateVerhoeff('')).toBe(false)
    })
})

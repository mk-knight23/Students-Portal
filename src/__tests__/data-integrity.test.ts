import { describe, it, expect } from 'vitest';
import { mockStudents } from '../modules/students/mock-data';

describe('Data Integrity (100x Scale)', () => {
    it('has 100 students generated', () => {
        expect(mockStudents.length).toBeGreaterThanOrEqual(100);
    });

    it('ensures demo user (Aditya Sharma) exists', () => {
        const demoUser = mockStudents.find(s => s.name === 'Aditya Sharma');
        expect(demoUser).toBeDefined();
        expect(demoUser?.id).toBeDefined();
    });

    it('ensures all students have required fields', () => {
        mockStudents.forEach(student => {
            expect(student.id).toBeDefined();
            expect(student.name).toBeDefined();
            expect(student.workflowState).toBeDefined();
            expect(student.documents).toBeInstanceOf(Array);
        });
    });

});

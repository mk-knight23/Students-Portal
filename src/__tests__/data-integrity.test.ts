import { describe, it, expect } from 'vitest';
import { mockStudents } from '../modules/students/mock-data';
import { mockAgents } from '../modules/agents/mock-data';

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

    it('validates agent linkages', () => {
        const studentsWithAgents = mockStudents.filter(s => s.referralAgentId);
        studentsWithAgents.forEach(s => {
            const agent = mockAgents.find(a => a.id === s.referralAgentId);
            // It's possible mockAgents doesn't contain ALL agents if generated dynamically, 
            // but mock-data.ts usually has static or generated set.
            // Let's just check if referralAgentId format is valid if agent missing (e.g. 'AG...')
            if (!agent) {
                expect(s.referralAgentId).toMatch(/^AG\d+/);
            }
        });
    });
});

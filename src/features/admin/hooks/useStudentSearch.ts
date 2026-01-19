import { useState, useMemo } from 'react';
import { Student } from '@/store/useAppStore';

export function useStudentSearch(students: Student[]) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        state: 'all',
        city: 'all',
        status: 'all',
        branch: 'all'
    });

    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.phone.includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = filters.category === 'all' || student.category === filters.category;
            const matchesState = filters.state === 'all' || student.state === filters.state;
            const matchesCity = filters.city === 'all' || student.city === filters.city;
            const matchesStatus = filters.status === 'all' || student.workflowState === filters.status;
            const matchesBranch = filters.branch === 'all' || student.branchId === filters.branch;

            return matchesSearch && matchesCategory && matchesState && matchesCity && matchesStatus && matchesBranch;
        });
    }, [students, searchTerm, filters]);

    return {
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        filteredStudents
    };
}

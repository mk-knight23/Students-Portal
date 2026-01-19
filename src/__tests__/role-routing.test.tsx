import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoleGuard } from '../components/auth/role-guard';
import { useAppStore } from '../store/useAppStore';

// Mock the store
vi.mock('../store/useAppStore', () => ({
    useAppStore: vi.fn(),
}));

// Mock router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('RoleGuard', () => {
    const ChildComponent = () => <div>Access Granted</div>;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children when user has allowed role', () => {
        (useAppStore as any).mockReturnValue({
            currentUser: { role: 'student' },
            isLoading: false,
        });

        render(
            <RoleGuard allowedRoles={['student']}>
                <ChildComponent />
            </RoleGuard>
        );

        expect(screen.getByText('Access Granted')).toBeInTheDocument();
    });

    it('shows access restricted screen and redirects on click', async () => {
        (useAppStore as any).mockReturnValue({
            currentUser: { role: 'student' },
            isLoading: false,
        });

        render(
            <RoleGuard allowedRoles={['admin']} fallbackUrl="/unauthorized">
                <ChildComponent />
            </RoleGuard>
        );

        expect(screen.getByText('Access Restricted')).toBeInTheDocument();

        // Find and click the return button
        const button = screen.getByText('Return to Discovery');
        button.click();

        expect(mockPush).toHaveBeenCalledWith('/unauthorized');
    });



    it('shows nothing while loading', () => {
        (useAppStore as any).mockReturnValue({
            currentUser: null,
            isLoading: true,
        });

        render(
            <RoleGuard allowedRoles={['student']}>
                <ChildComponent />
            </RoleGuard>
        );

        expect(screen.queryByText('Access Granted')).not.toBeInTheDocument();
    });

    it('redirects to login if user is not authenticated', () => {
        (useAppStore as any).mockReturnValue({
            currentUser: null,
            isLoading: false,
        });

        render(
            <RoleGuard allowedRoles={['student']}>
                <ChildComponent />
            </RoleGuard>
        );

        expect(mockPush).toHaveBeenCalledWith('/login');
    });
});

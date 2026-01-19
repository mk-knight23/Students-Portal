import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootPage from '../app/page';
import LoginPage from '../app/login/page';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => '/',
}));

// Mock useAppStore
vi.mock('../store/useAppStore', () => ({
    useAppStore: () => ({
        setCurrentUser: vi.fn(),
    }),
}));

// Mock next-auth
vi.mock('next-auth/react', () => ({
    signIn: vi.fn(() => Promise.resolve({ error: null })),
}));

describe('Auth Flow', () => {
    beforeEach(() => {
        mockPush.mockClear();
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('RootPage navigates to staff dashboard on staff login', async () => {
        render(<RootPage />);
        const staffBtn = screen.getByText('Staff Login').closest('button');
        if (!staffBtn) throw new Error('Staff button not found');

        fireEvent.click(staffBtn);

        // Fast-forward the 100ms timeout
        vi.advanceTimersByTime(100);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/portal/staff/dashboard');
        });
    });

    it('RootPage navigates to admin dashboard on admin login', async () => {
        render(<RootPage />);
        const adminBtn = screen.getByText('Admin Login').closest('button');
        if (!adminBtn) throw new Error('Admin button not found');

        fireEvent.click(adminBtn);

        // Fast-forward the 100ms timeout
        vi.advanceTimersByTime(100);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/portal/admin/dashboard');
        });
    });

    it('LoginPage renders all role options', () => {
        render(<LoginPage />);
        expect(screen.getByText('Student')).toBeInTheDocument();
        expect(screen.getByText('Office Staff')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('LoginPage redirects to staff dashboard on staff login', async () => {
        render(<LoginPage />);
        const staffOption = screen.getByText('Office Staff').closest('div');
        if (!staffOption) throw new Error('Staff option not found');

        fireEvent.click(staffOption);
        fireEvent.submit(screen.getByRole('button', { name: /Authorize Entry/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/portal/staff/dashboard');
        });
    });

    it('LoginPage redirects to admin dashboard on admin login', async () => {
        render(<LoginPage />);
        const adminOption = screen.getByText('Admin').closest('div');
        if (!adminOption) throw new Error('Admin option not found');

        fireEvent.click(adminOption);
        fireEvent.submit(screen.getByRole('button', { name: /Authorize Entry/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/portal/admin/dashboard');
        });
    });
});

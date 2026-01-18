import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click Me</Button>)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('applies variant classes', () => {
        render(<Button variant="destructive">Delete</Button>)
        const button = screen.getByText('Delete')
        expect(button).toHaveClass('bg-destructive')
    })

    it('handles click events', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Submit</Button>)
        screen.getByText('Submit').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByText('Disabled')).toBeDisabled()
    })
})

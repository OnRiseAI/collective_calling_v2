import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Button } from '@/components/ui/Button'

test('renders primary button with label', () => {
  render(<Button variant="primary">Donate</Button>)
  const btn = screen.getByRole('button', { name: /donate/i })
  expect(btn).toBeInTheDocument()
  expect(btn.className).toContain('bg-brand')
})

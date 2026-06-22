import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

function Hello() {
  return <h1>Collective Calling</h1>
}

test('renders', () => {
  render(<Hello />)
  expect(
    screen.getByRole('heading', { name: /collective calling/i })
  ).toBeInTheDocument()
})

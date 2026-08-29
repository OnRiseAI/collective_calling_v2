import * as React from 'react'
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { WelcomeFilm } from '@/components/welcome/WelcomeFilm'

test('the film page plays the 9:16 welcome cut', () => {
  const { container } = render(<WelcomeFilm />)
  const film = container.querySelector('video')
  expect(film).toHaveAttribute('src', '/videos/welcome-gate.mp4')
  expect(film).toHaveAttribute('poster', '/videos/welcome-gate.png')
})

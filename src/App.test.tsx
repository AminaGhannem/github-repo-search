import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

it('renders initial instructions', () => {
  render(<App />)
  expect(screen.getByText(/Amina/i)).toBeInTheDocument()
}) 
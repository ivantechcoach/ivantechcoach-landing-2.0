import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock content
const mockContent = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    services: 'Servicios',
    contact: 'Contacto',
  },
}

describe('Header Component', () => {
  it('should render navigation links', () => {
    render(<Header lang="es" content={mockContent} />)

    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('should have accessible navigation', () => {
    const { container } = render(<Header lang="es" content={mockContent} />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('should render the ⌘K AI Command Palette trigger button', () => {
    render(<Header lang="es" content={mockContent} />)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('should render the trilingual selector (ES, CA, EN) with active language pressed', () => {
    render(<Header lang="ca" content={mockContent} />)
    const caBtn = screen.getByRole('button', { name: /Switch language to CA/i })
    expect(caBtn).toHaveAttribute('aria-pressed', 'true')
  })
})

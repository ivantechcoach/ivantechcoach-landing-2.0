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
    
    // El Header usa enlaces con href, no texto directo "Inicio"
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('should have accessible navigation', () => {
    const { container } = render(<Header lang="es" content={mockContent} />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })
})


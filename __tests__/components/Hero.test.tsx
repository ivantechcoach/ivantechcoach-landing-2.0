import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero Component', () => {
  const mockContent = {
    badge: 'Ivan Tech Coach',
    title: 'Tecnología sin fricción.',
    subtitle: 'Transformo la complejidad tecnológica en soluciones claras.',
    ctaPrimary: 'Hablemos ahora',
    ctaSecondary: 'Ver servicios',
  }

  it('should render without WaveCanvas duplication', () => {
    const { container } = render(<Hero lang="es" content={mockContent} />)

    // WaveCanvas should not be imported or rendered in Hero
    const waveCanvas = container.querySelector('canvas')
    expect(waveCanvas).toBeNull()
  })

  it('should render hero content correctly', () => {
    render(<Hero lang="es" content={mockContent} />)

    expect(screen.getByText(mockContent.title.split('.')[0])).toBeInTheDocument()
    expect(screen.getByText(mockContent.subtitle)).toBeInTheDocument()
    expect(screen.getByText(mockContent.ctaPrimary)).toBeInTheDocument()
  })

  it('should link CTA to contact page with correct lang', () => {
    render(<Hero lang="es" content={mockContent} />)

    const ctaLink = screen.getByText(mockContent.ctaPrimary).closest('a')
    expect(ctaLink).toHaveAttribute('href', '/es/contact')
  })

  it('should render and switch interactive AI architecture simulator scenarios', () => {
    render(<Hero lang="es" content={mockContent} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBeGreaterThanOrEqual(4)

    // Switch to second scenario (Cybersecurity for AI)
    fireEvent.click(tabs[1])
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/MOD-02/i)).toBeInTheDocument()
  })
})

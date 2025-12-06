import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

expect.extend(toHaveNoViolations)

const mockHeaderContent = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    services: 'Servicios',
    contact: 'Contacto',
  },
}

const mockFooterContent = {
  tagline: 'Tecnología sin fricción.',
  rights: 'Ivan Tech Coach. Todos los derechos reservados.',
  madeBy: 'Diseñado y desarrollado por Ivan',
  social: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
}

describe('Accessibility Tests', () => {
  describe('Header', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Header lang="es" content={mockHeaderContent} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Footer', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Footer content={mockFooterContent} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})


import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import InstrumentFrame from '@/components/InstrumentFrame'

expect.extend(toHaveNoViolations)

describe('InstrumentFrame Component', () => {
  it('renders its children inside the frame surface', () => {
    render(
      <InstrumentFrame>
        <span>portrait</span>
      </InstrumentFrame>
    )
    expect(screen.getByText('portrait')).toBeInTheDocument()
  })

  it('hides every decorative layer from assistive technology', () => {
    const { container } = render(
      <InstrumentFrame size="lg">
        <span>portrait</span>
      </InstrumentFrame>
    )
    const decorative = container.querySelectorAll(
      '.instrument-frame__halo, .instrument-frame__grid, .instrument-frame__corner, .instrument-frame__scan'
    )
    expect(decorative.length).toBe(7)
    decorative.forEach((node) => expect(node).toHaveAttribute('aria-hidden', 'true'))
  })

  it('renders only halo + bezel for the compact logo variant', () => {
    const { container } = render(
      <InstrumentFrame size="sm">
        <span>logo</span>
      </InstrumentFrame>
    )
    expect(container.querySelector('.instrument-frame__halo')).not.toBeNull()
    expect(container.querySelector('.instrument-frame__corner')).toBeNull()
    expect(container.querySelector('.instrument-frame__grid')).toBeNull()
  })

  it('shows the telemetry label when provided', () => {
    render(
      <InstrumentFrame size="lg" label="ID VERIFICADO · 20+ AÑOS">
        <span>portrait</span>
      </InstrumentFrame>
    )
    expect(screen.getByText('ID VERIFICADO · 20+ AÑOS')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <InstrumentFrame size="lg" label="ID VERIFIED · 20+ YRS">
        <img src="/images/logo.png" alt="Ivan Tech Coach" />
      </InstrumentFrame>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

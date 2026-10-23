import type { ReactNode } from 'react'

type FrameSize = 'sm' | 'md' | 'lg'

interface InstrumentFrameProps {
  children: ReactNode
  /** sm = logo (halo + bezel only) · md / lg = portrait (full detail) */
  size?: FrameSize
  /** Optional telemetry chip rendered over the bottom edge (pass copy from content JSON). */
  label?: string
  /** Sizing / layout classes for the outer frame (e.g. "w-24 h-24"). */
  className?: string
  /** Tailwind radius class shared by bezel and surface. */
  radius?: string
}

/**
 * Instrument Frame — Refero-compliant concentric optical mount for portrait and logo.
 *
 * Layers (back to front): circular closest-side aura → circular dot-matrix field →
 * 4 symmetric emerald registration corners → outer conic bezel + recessed channel →
 * inner aperture ring + surface (children) → subtle scanline/vignette.
 * All decorative layers are aria-hidden, strictly contained, and synchronized across themes.
 */
export default function InstrumentFrame({
  children,
  size = 'md',
  label,
  className = '',
  radius = 'rounded-xl',
}: InstrumentFrameProps) {
  const showDetail = size !== 'sm'

  return (
    <div
      className={`instrument-frame instrument-frame--${size} ${className}`}
      data-testid="instrument-frame"
    >
      <span aria-hidden="true" className="instrument-frame__halo" />

      {showDetail && (
        <>
          <span aria-hidden="true" className="instrument-frame__grid" />
          <span aria-hidden="true" className="instrument-frame__corner instrument-frame__corner--tl" />
          <span aria-hidden="true" className="instrument-frame__corner instrument-frame__corner--tr" />
          <span aria-hidden="true" className="instrument-frame__corner instrument-frame__corner--bl" />
          <span aria-hidden="true" className="instrument-frame__corner instrument-frame__corner--br" />
        </>
      )}

      <div className={`instrument-frame__bezel ${radius}`}>
        <div className="instrument-frame__surface">
          {children}
          {showDetail && <span aria-hidden="true" className="instrument-frame__scan" />}
        </div>
      </div>

      {label && <span className="instrument-frame__label">{label}</span>}
    </div>
  )
}

"use client";

import React from "react";

/**
 * Refero Styles Structural Blueprint Background
 *
 * Zero-bloat, zero-canvas architectural 1px grid and radial top vignette.
 * Respects both .theme-dark (Obsidian Command Center) and .theme-light (Engineering Dossier).
 */
const TechBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle 1px Architectural Blueprint Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 15%, #000 35%, transparent 100%)",
        }}
      />

      {/* Top Precision Telemetry Atmosphere Whisper (Warp / Raycast style) */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[340px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default TechBackground;

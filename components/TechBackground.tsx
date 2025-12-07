"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * SNYK++ Premium Background System
 * 
 * Four-layer architecture:
 * 1. Background Gradient Layer - Multiple radial gradients with dark energy tonality
 * 2. Energy Blobs Layer - 2-3 large amorphous blobs with slow animation
 * 3. Fog/Noise Layer - Subtle noise texture with soft-light blend mode
 * 4. Tech Grid Layer - Blueprint-style grid pattern
 * 
 * Features:
 * - Full light/dark theme support via CSS variables
 * - Subtle parallax on scroll (enterprise-grade)
 * - GPU-accelerated animations
 * - prefers-reduced-motion support
 */

const TechBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Parallax scroll handler
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use requestAnimationFrame for smooth parallax
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Generate noise texture as data URL
  const generateNoiseTexture = (): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value; // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  const [noiseTexture, setNoiseTexture] = useState<string>("");

  useEffect(() => {
    setNoiseTexture(generateNoiseTexture());
  }, []);

  // Parallax transform value (subtle, enterprise-grade)
  const parallaxTransform = prefersReducedMotion ? 0 : scrollY * 0.02;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        zIndex: -1,
        transform: `translateY(${parallaxTransform}px)`,
        willChange: "transform",
      }}
    >
      {/* LAYER 1: BACKGROUND GRADIENT LAYER */}
      <div
        className="absolute inset-0 w-full h-full energy-layer"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, var(--bg-gradient-1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, var(--bg-gradient-2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, var(--bg-gradient-3) 0%, transparent 60%),
            radial-gradient(circle at 10% 80%, var(--bg-gradient-1) 0%, transparent 40%),
            var(--bg)
          `,
        }}
      />

      {/* LAYER 2: ENERGY BLOBS LAYER */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Blob 1 - Top Left */}
        <div
          className="absolute blob"
          style={{
            width: "600px",
            height: "600px",
            left: "-10%",
            top: "-10%",
            background: `radial-gradient(circle, var(--blob-color-1) 0%, transparent 70%)`,
            filter: "blur(120px)",
            opacity: "var(--blob-opacity-1)",
            animation: prefersReducedMotion
              ? "none"
              : "blob-pulse 30s ease-in-out infinite alternate",
            animationDelay: "0s",
            willChange: "transform, opacity",
          }}
        />

        {/* Blob 2 - Bottom Right */}
        <div
          className="absolute blob"
          style={{
            width: "700px",
            height: "700px",
            right: "-15%",
            bottom: "-15%",
            background: `radial-gradient(circle, var(--blob-color-2) 0%, transparent 70%)`,
            filter: "blur(140px)",
            opacity: "var(--blob-opacity-2)",
            animation: prefersReducedMotion
              ? "none"
              : "blob-pulse 35s ease-in-out infinite alternate",
            animationDelay: "5s",
            willChange: "transform, opacity",
          }}
        />

        {/* Blob 3 - Center Right */}
        <div
          className="absolute blob"
          style={{
            width: "500px",
            height: "500px",
            right: "10%",
            top: "40%",
            background: `radial-gradient(circle, var(--blob-color-3) 0%, transparent 70%)`,
            filter: "blur(100px)",
            opacity: "var(--blob-opacity-3)",
            animation: prefersReducedMotion
              ? "none"
              : "blob-pulse 40s ease-in-out infinite alternate",
            animationDelay: "10s",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* LAYER 3: FOG / NOISE LAYER */}
      {noiseTexture && (
        <div
          className="absolute inset-0 w-full h-full fog-layer"
          style={{
            backgroundImage: `url(${noiseTexture})`,
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
            opacity: "var(--fog-opacity)",
            mixBlendMode: "soft-light",
            animation: prefersReducedMotion
              ? "none"
              : "fog-drift 60s linear infinite",
            willChange: "background-position",
          }}
        />
      )}

      {/* LAYER 4: TECH GRID LAYER */}
      <div
        className="absolute inset-0 w-full h-full tech-grid-layer"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "var(--grid-size) var(--grid-size)",
          opacity: "var(--grid-opacity)",
          animation: prefersReducedMotion
            ? "none"
            : "parallax-float 20s ease-in-out infinite alternate",
          willChange: "background-position",
        }}
      />
    </div>
  );
};

export default TechBackground;

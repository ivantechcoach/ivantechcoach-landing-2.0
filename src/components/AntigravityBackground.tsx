"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  glow: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  wobbleAngle: number;
}

export const AntigravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isActive: boolean }>({
    x: -1000,
    y: -1000,
    isActive: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Density calculation: ~40-60 particles on desktop, ~20-30 on mobile
    const isMobile = width < 768;
    const particleCount = isMobile ? 25 : 55;

    const cyanPalette = [
      "rgba(0, 209, 255, ",   // Primary Cyan
      "rgba(56, 189, 248, ",  // Sky 400
      "rgba(6, 182, 212, ",   // Cyan 500
      "rgba(181, 244, 255, ", // Light Cyan
    ];

    const particles: (Particle & { colorPrefix: string })[] = [];

    const createParticle = (initialY?: number): Particle & { colorPrefix: string } => {
      const radius = Math.random() * 2.2 + 1.0;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        radius,
        baseRadius: radius,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.25), // Antigravity upward drift
        alpha: Math.random() * 0.5 + 0.2,
        targetAlpha: Math.random() * 0.6 + 0.25,
        glow: Math.random() * 8 + 4,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
        wobbleDistance: Math.random() * 1.5 + 0.5,
        wobbleAngle: Math.random() * Math.PI * 2,
        colorPrefix: cyanPalette[Math.floor(Math.random() * cyanPalette.length)],
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX =
        "clientX" in e ? e.clientX : e.touches && e.touches[0] ? e.touches[0].clientX : -1000;
      const clientY =
        "clientY" in e ? e.clientY : e.touches && e.touches[0] ? e.touches[0].clientY : -1000;
      mouseRef.current = { x: clientX, y: clientY, isActive: true };
    };

    const handlePointerLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Antigravity drift
          p.y += p.vy;
          p.wobbleAngle += p.wobbleSpeed;
          p.x += p.vx + Math.sin(p.wobbleAngle) * (p.wobbleDistance * 0.2);

          // Interactive soft repulsion
          if (mouse.isActive) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120;
            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 1.5;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          // Wrap particle from top to bottom
          if (p.y < -20) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 10;
          if (p.x > width + 20) p.x = -10;
        }

        // Draw glowing cyan particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = "rgba(0, 209, 255, 0.65)";
        ctx.fill();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animationFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full opacity-60 transition-opacity duration-1000"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }}
    />
  );
};

export default AntigravityBackground;

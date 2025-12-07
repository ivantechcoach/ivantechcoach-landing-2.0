"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angleSpeed: number;
  radius: number;
}

const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const gridOffsetRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let gridSpacing = 100;
    let gridDriftSpeed = 0.1;
    const connectionDistance = 120;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get colors from CSS variables - called every frame for theme awareness
    const getThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains('theme-dark');
      
      const gridColor = styles.getPropertyValue(isDark ? '--grid-line-dark' : '--grid-line-light').trim() || 
        (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)');
      
      const particleColor = styles.getPropertyValue(isDark ? '--particle-dark' : '--particle-light').trim() || 
        (isDark ? 'rgba(61,220,243,0.25)' : 'rgba(0,118,255,0.15)');
      
      return { gridColor, particleColor };
    };

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Grid spacing: 80-120px, responsive
      gridSpacing = width < 768 ? 80 : width < 1200 ? 100 : 120;
      
      // Grid drift speed: 0.05-0.15 px per frame
      gridDriftSpeed = prefersReducedMotion ? 0 : (0.05 + Math.random() * 0.1);

      // Initialize 25-35 particles
      const particleCount = Math.floor(25 + Math.random() * 11);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.2; // 0.1-0.3 px per frame
        
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle: angle,
          angleSpeed: (Math.random() - 0.5) * 0.01, // Subtle angle change
          radius: 1.5 + Math.random() * 1.5,
        });
      }

      gridOffsetRef.current = 0;
    };

    const drawGrid = (gridColor: string) => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;

      const offset = gridOffsetRef.current;

      // Vertical lines with horizontal drift
      const startX = Math.floor(-offset / gridSpacing) * gridSpacing - (offset % gridSpacing);
      for (let x = startX; x <= width + gridSpacing; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const updateParticles = () => {
      if (prefersReducedMotion) return;
      
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update angle slightly for smooth direction change
        p.angle += p.angleSpeed;
        
        // Update velocity based on angle (smooth, professional motion)
        const baseSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        p.vx = Math.cos(p.angle) * baseSpeed;
        p.vy = Math.sin(p.angle) * baseSpeed;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce within canvas boundaries
        if (p.x < 0) {
          p.x = 0;
          p.angle = Math.PI - p.angle;
        } else if (p.x > width) {
          p.x = width;
          p.angle = Math.PI - p.angle;
        }
        
        if (p.y < 0) {
          p.y = 0;
          p.angle = -p.angle;
        } else if (p.y > height) {
          p.y = height;
          p.angle = -p.angle;
        }
        
        // Normalize angle
        p.angle = ((p.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      }
    };

    const drawParticles = (particleColor: string) => {
      const particles = particlesRef.current;

      // Draw connections between nearby particles
      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Opacity fades with distance
            const opacity = (1 - (distance / connectionDistance)) * 0.3;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = particleColor;
      ctx.globalAlpha = 1;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get theme colors every frame for dynamic theme switching
      const { gridColor, particleColor } = getThemeColors();

      // Update grid offset for horizontal drift
      if (!prefersReducedMotion) {
        gridOffsetRef.current += gridDriftSpeed;
        if (gridOffsetRef.current >= gridSpacing) {
          gridOffsetRef.current = 0;
        }
      }

      // Draw grid
      drawGrid(gridColor);

      // Update and draw particles
      updateParticles();
      drawParticles(particleColor);

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
        // Redraw static grid if reduced motion is enabled
        if (prefersReducedMotion) {
          const { gridColor } = getThemeColors();
          drawGrid(gridColor);
        }
      }, 150);
    };

    // Initialize and start animation
    init();
    
    // Always register resize handler regardless of motion preferences
    window.addEventListener("resize", handleResize, { passive: true });
    
    if (!prefersReducedMotion) {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      // Draw static grid for reduced motion
      const { gridColor } = getThemeColors();
      drawGrid(gridColor);
    }

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default TechBackground;

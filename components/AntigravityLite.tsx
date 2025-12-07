"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Antigravity Lite - Canvas 2D Particle Drift System
 * 
 * Lightweight particle field with subtle "antigravity" floating effect
 * Elegant, soft, visually premium Canvas 2D implementation
 * 
 * Features:
 * - Canvas 2D rendering (no WebGL dependency)
 * - Perlin-like particle motion with subtle wandering
 * - Soft mouse repulsion interaction
 * - Theme-aware colors and opacity
 * - Mobile performance optimization
 * - prefers-reduced-motion support
 */

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  colorIndex: number;
  opacity: number;
  noiseOffset: number;
}

const AntigravityLite: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [themeColors, setThemeColors] = useState({
    primary: "#00D1FF",
    primaryLight: "#B5F4FF",
    accentPurple: "#5B3DF5",
  });

  // Detect mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Detect theme and get colors from CSS variables
  useEffect(() => {
    const updateTheme = () => {
      const root = document.documentElement;
      const isDark =
        root.classList.contains("theme-dark") ||
        (!root.classList.contains("theme-light") &&
          !root.classList.contains("theme-dark"));
      setIsDarkTheme(isDark);

      const primary = getComputedStyle(root).getPropertyValue("--primary").trim();
      const primaryLight = getComputedStyle(root)
        .getPropertyValue("--primary-light")
        .trim();
      const accentPurple = getComputedStyle(root)
        .getPropertyValue("--accent-purple")
        .trim();

      setThemeColors({
        primary: primary || "#00D1FF",
        primaryLight: primaryLight || "#B5F4FF",
        accentPurple: accentPurple || "#5B3DF5",
      });
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Simple noise function for Perlin-like wandering
  const noise = (x: number, y: number, t: number): number => {
    const n =
      Math.sin(x * 0.01 + t * 0.5) * Math.cos(y * 0.01 + t * 0.3) +
      Math.sin(x * 0.015 + t * 0.4) * Math.cos(y * 0.012 + t * 0.35) * 0.5;
    return n * 0.5 + 0.5;
  };

  // Initialize particles
  const initParticles = (count: number, width: number, height: number, darkMode: boolean) => {
    const particles: Particle[] = [];
    // Increase particle size by 15% in light mode
    const sizeMultiplier = darkMode ? 1.0 : 1.15;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 2.3 + 1.2) * sizeMultiplier, // 1.2-3.5px (or 15% larger in light mode)
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        colorIndex: Math.floor(Math.random() * 3),
        opacity: Math.random() * 0.12 + 0.08, // 0.08-0.2
        noiseOffset: Math.random() * 1000,
      });
    }

    particlesRef.current = particles;
  };

  // Main animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Calculate particle count
      // Desktop: 50-90 particles
      let particleCount = Math.floor(50 + Math.random() * 40);

      // Mobile fallback: reduce particle count by 45% and motion amplitude by 40%
      if (isMobile) {
        particleCount = Math.floor(particleCount * 0.45); // Results in ~22-40 particles
      }

      initParticles(particleCount, width, height, isDarkTheme);
    };

    const drawStaticParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const particles = particlesRef.current;
      
      ctx.clearRect(0, 0, width, height);
      
      for (const p of particles) {
        const colors = [
          themeColors.primary,
          themeColors.primaryLight,
          themeColors.accentPurple,
        ];
        const colorHex = colors[p.colorIndex] || colors[0];
        
        // Use darker colors in light mode
        let color: string;
        if (isDarkTheme) {
          const hex = colorHex.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          color = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        } else {
          color = "rgba(0,90,150,0.85)";
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        
        // Add glow ring in light mode
        if (!isDarkTheme) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(0,90,150,0.35)";
        }
        
        ctx.fill();
        
        // Reset shadow
        if (!isDarkTheme) {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    
    // Re-initialize particles when theme changes (if canvas already has size)
    if (canvas.width > 0 && canvas.height > 0 && particlesRef.current.length > 0) {
      const particleCount = particlesRef.current.length;
      initParticles(particleCount, canvas.width, canvas.height, isDarkTheme);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (prefersReducedMotion) {
        // Draw static particles once, then stop animation
        drawStaticParticles();
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const particles = particlesRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Motion amplitude reduction for mobile
      const motionAmplitude = isMobile ? 0.6 : 1.0; // 40% reduction on mobile

      // Update and draw particles
      for (const p of particles) {
        // Add subtle Perlin-like wandering
        const noiseX =
          (noise(p.x, p.y, timeRef.current + p.noiseOffset) - 0.5) * 0.8;
        const noiseY =
          (noise(p.y, p.x, timeRef.current + p.noiseOffset + 100) - 0.5) *
          0.8;

        // Update velocity with noise
        p.speedX += noiseX * 0.02 * motionAmplitude;
        p.speedY += noiseY * 0.02 * motionAmplitude;

        // Add small random delta each frame for wandering
        p.speedX += (Math.random() - 0.5) * 0.01 * motionAmplitude;
        p.speedY += (Math.random() - 0.5) * 0.01 * motionAmplitude;

        // Damping
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        // Limit speed
        const maxSpeed = 0.5 * motionAmplitude;
        const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }

        // Mouse interaction - subtle repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120 && dist > 0) {
          const force = ((120 - dist) / 120) * 2.2 * motionAmplitude;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        } else {
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;
        }

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        const colors = [
          themeColors.primary,
          themeColors.primaryLight,
          themeColors.accentPurple,
        ];
        const colorHex = colors[p.colorIndex] || colors[0];

        // Use darker colors in light mode
        let rgba: string;
        if (isDarkTheme) {
          // Convert hex to rgba for dark mode
          const hex = colorHex.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          rgba = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        } else {
          // Use deep cyan for light mode
          rgba = "rgba(0,90,150,0.85)";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba;
        
        // Add soft glow ring around particles ONLY in light mode
        if (!isDarkTheme) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(0,90,150,0.35)";
        }
        
        ctx.fill();
        
        // Reset shadow after drawing
        if (!isDarkTheme) {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }

      timeRef.current += 0.016; // ~60fps

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [prefersReducedMotion, isMobile, themeColors, isDarkTheme]);

  // Determine opacity based on theme
  const getOpacity = () => {
    return isDarkTheme ? 0.55 : 0.78; // Increased opacity for light mode
  };

  // Determine blend mode based on theme
  const getBlendMode = (): React.CSSProperties["mixBlendMode"] => {
    return isDarkTheme ? "screen" : "multiply";
  };

  return (
    <canvas
      ref={canvasRef}
      className="antigravity-lite"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        mixBlendMode: getBlendMode(),
        opacity: getOpacity(),
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default AntigravityLite;

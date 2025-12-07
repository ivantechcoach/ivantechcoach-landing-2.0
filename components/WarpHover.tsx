"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * WarpHover - Smooth Warp/Distortion Effect on Interactive Elements
 * 
 * Applies a subtle warp/distortion effect near cursor when hovering
 * over elements with the "interactive" class.
 * 
 * Features:
 * - Lightweight 2D canvas implementation (no WebGL)
 * - Smooth distortion radius 60-90px
 * - Very low strength (2-6px displacement)
 * - Respects prefers-reduced-motion
 * - requestAnimationFrame for smooth animation
 */

const WarpHover: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const interactiveElementsRef = useRef<HTMLElement[]>([]);

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

  // Find all interactive elements
  useEffect(() => {
    const findInteractiveElements = () => {
      interactiveElementsRef.current = Array.from(
        document.querySelectorAll(".interactive")
      ) as HTMLElement[];
    };

    findInteractiveElements();

    // Watch for dynamically added elements
    const observer = new MutationObserver(findInteractiveElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check if mouse is over any interactive element
      const isOverInteractive = interactiveElementsRef.current.some((el) => {
        const rect = el.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      });

      setIsActive(isOverInteractive);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (prefersReducedMotion) return;

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
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Warp effect parameters
    const radius = 75; // Average of 60-90px
    const maxDisplacement = 4; // Average of 2-6px

    const animate = () => {
      if (!isActive) {
        // Clear canvas when not active
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply warp effect to interactive elements
      interactiveElementsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from cursor to element center
        const dx = mouseRef.current.x - centerX;
        const dy = mouseRef.current.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          // Calculate warp force
          const force = (radius - dist) / radius;
          const displacement = force * maxDisplacement;

          // Apply subtle transform to element
          // Using CSS transform for smooth performance
          const scaleX = 1 + (displacement / rect.width) * 0.02;
          const scaleY = 1 + (displacement / rect.height) * 0.02;
          const translateX = (dx / dist) * displacement * 0.3;
          const translateY = (dy / dist) * displacement * 0.3;

          el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
          el.style.transition = "transform 0.1s ease-out";
        } else {
          // Reset transform when cursor is far
          el.style.transform = "";
          el.style.transition = "transform 0.3s ease-out";
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // Reset all transforms on cleanup
      interactiveElementsRef.current.forEach((el) => {
        el.style.transform = "";
        el.style.transition = "";
      });
    };
  }, [prefersReducedMotion, isActive]);

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="warp-hover"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
};

export default WarpHover;

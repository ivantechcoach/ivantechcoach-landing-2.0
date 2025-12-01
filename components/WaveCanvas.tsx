"use client";

import React, { useEffect, useRef } from "react";

const WaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;
    let lines: { y: number; offset: number }[] = [];

    // Cached CSS variables
    let waveTop = '';
    let waveMid = '';
    let waveBottom = '';

    const config = {
      amplitude: 50,
      frequency: 0.02,
      speed: 0.002,
    };

    const refreshWaveColors = () => {
      const styles = getComputedStyle(document.documentElement);
      waveTop = styles.getPropertyValue('--wave-top').trim();
      waveMid = styles.getPropertyValue('--wave-mid').trim();
      waveBottom = styles.getPropertyValue('--wave-bottom').trim();
    };

    // Refresh colors once at the beginning
    refreshWaveColors();

    const init = () => {
      const dpr = window.devicePixelRatio || 1;

      const cssWidth = window.innerWidth;
      const computedHeight = canvas.clientHeight || canvas.offsetHeight;
      const cssHeight = computedHeight > 0
        ? computedHeight
        : (window.innerHeight - (window.innerWidth < 768 ? 80 : 96));

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;

      width = cssWidth;
      height = cssHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Refresh colors after setting transform
      refreshWaveColors();

      // Dynamic line count based on screen size
      const baseLineCount = 30;
      const isMobile = window.innerWidth < 480;
      const lineCount = isMobile ? 18 : baseLineCount;

      lines = [];

      for (let i = 0; i < lineCount; i++) {
        lines.push({
          y:
            (height / lineCount) * i +
            height / (lineCount * 2),
          offset: i * 0.5,
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 2;

      lines.forEach((line, i) => {
        ctx.beginPath();

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, waveTop);
        gradient.addColorStop(0.5, waveMid);
        gradient.addColorStop(1, waveBottom);

        ctx.strokeStyle = gradient;

        for (let x = 0; x <= width; x += 20) {
          const y =
            line.y +
            Math.sin(
              x * config.frequency +
                time * config.speed +
                line.offset
            ) *
              (config.amplitude *
                Math.sin(time * 0.0005 + x * 0.001)) *
              Math.sin((x / width) * Math.PI);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
        refreshWaveColors();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    init();
    draw(0);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default WaveCanvas;

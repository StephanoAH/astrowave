"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SpectrumCanvas({ bins, live = true }: { bins: number[]; live?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    let frame = 0;
    let id = 0;

    const drawFrame = (source: number[]) => {
      ctx.fillStyle = "#030508";
      ctx.fillRect(0, 0, w, h);
      const barW = w / source.length;
      source.forEach((v, i) => {
        const bh = v * h * 0.9;
        const g = ctx.createLinearGradient(0, h, 0, h - bh);
        g.addColorStop(0, "#0f172a");
        g.addColorStop(1, "#22d3ee");
        ctx.fillStyle = g;
        ctx.fillRect(i * barW, h - bh, Math.max(1, barW - 1), bh);
      });
    };

    if (!live || reduced) {
      drawFrame(bins);
      return;
    }

    const animate = () => {
      const t = frame / 18;
      const next = bins.map((v, i) => {
        const wobble = Math.sin(t + i * 0.18) * 0.12 + Math.sin(t * 1.7 + i) * 0.04;
        return Math.max(0.02, Math.min(1, v + wobble));
      });
      drawFrame(next);
      frame++;
      id = requestAnimationFrame(animate);
    };

    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [bins, live, reduced]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={160}
      className="h-40 w-full rounded border border-white/10 bg-black/50"
      role="img"
      aria-label="Frequency spectrum"
    />
  );
}

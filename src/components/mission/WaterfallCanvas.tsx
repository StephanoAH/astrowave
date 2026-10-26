"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WaterfallCanvas({ rows = 48 }: { rows?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const rowH = h / rows;

    let frame = 0;
    let id = 0;

    const draw = () => {
      const imageData = ctx.getImageData(0, rowH, w, h - rowH);
      ctx.putImageData(imageData, 0, 0);
      for (let x = 0; x < w; x++) {
        const v = Math.random() * 0.3 + (Math.sin((x + frame) * 0.05) + 1) * 0.15;
        const c = Math.floor(v * 255);
        ctx.fillStyle = `rgb(${c * 0.2}, ${c * 0.6}, ${c})`;
        ctx.fillRect(x, 0, 1, rowH);
      }
      frame++;
      id = requestAnimationFrame(draw);
    };

    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [rows, reduced]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={200}
      className="h-48 w-full rounded border border-white/10 bg-black/50"
      role="img"
      aria-label="Spectrum waterfall"
    />
  );
}

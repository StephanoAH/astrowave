"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function RfWaveOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".rf-wave");
    if (!paths?.length) return;
    paths.forEach((path, i) => {
      const len = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3 + i * 0.5,
        repeat: -1,
        ease: "none",
        delay: i * 0.8,
      });
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        className="rf-wave"
        d="M0 400 Q300 350 600 400 T1200 400"
        fill="none"
        stroke="url(#rfGrad)"
        strokeWidth="1"
      />
      <path
        className="rf-wave"
        d="M0 450 Q400 500 800 420 T1200 460"
        fill="none"
        stroke="url(#rfGrad)"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="rfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

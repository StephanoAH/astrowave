"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SpaceAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ambient-dust", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 2 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="ambient-dust absolute -inset-[20%] starfield opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_20%,#030508_85%)]" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MissionReveal({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.killTweensOf(document.body);
    gsap.set(document.body, { clearProps: "opacity,filter,transform" });
    document.body.style.opacity = "1";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-reveal",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-6">
      {children}
    </div>
  );
}

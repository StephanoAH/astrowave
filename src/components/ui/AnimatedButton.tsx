"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Button, type ButtonProps } from "./button";

export function AnimatedButton({ children, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 1.03, duration: 0.2, ease: "power2.out" });
  };
  const onMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.25, ease: "power2.out" });
  };

  return (
    <Button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Button>
  );
}

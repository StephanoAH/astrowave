"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function BodyOpacityGuard() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.killTweensOf(document.body);
    gsap.set(document.body, { clearProps: "opacity,filter,transform" });
    document.body.style.opacity = "1";
    document.body.style.filter = "none";
  }, [pathname]);

  return null;
}

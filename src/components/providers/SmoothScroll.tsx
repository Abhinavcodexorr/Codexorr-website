"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,            // lighter than custom easing function; ~100ms lag
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    /* Sync Lenis with GSAP ScrollTrigger so both systems agree on scroll position */
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

// Native browser scroll is used — no JS scroll library needed.
// This keeps Lenis/GSAP out of the bundle and removes perpetual RAF loops.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

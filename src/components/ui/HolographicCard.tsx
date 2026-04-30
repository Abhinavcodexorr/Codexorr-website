"use client";

import { cn } from "@/lib/cn";
import { TiltCard } from "@/components/ui/TiltCard";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maps to tilt strength (clamped). */
  intensity?: number;
  glowColor?: string;
}

/**
 * Paper-style card with tilt and a soft accent rim on hover.
 */
export function HolographicCard({
  children,
  className,
  intensity = 6,
  glowColor = "34,211,238",
}: HolographicCardProps) {
  const tilt = Math.min(Math.max(intensity, 3), 7);

  return (
    <TiltCard variant="paper" tiltAmount={tilt} scaleOnHover={1.008} className={cn("h-full", className)}>
      <div className="relative h-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px rgba(${glowColor},0.35)` }}
        />
        {children}
      </div>
    </TiltCard>
  );
}

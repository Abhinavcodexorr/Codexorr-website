"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  theme?: "dark" | "light";
}

export function HolographicCard({
  children,
  className,
  intensity = 6,
  glowColor = "34,211,238",
  theme = "light",
}: HolographicCardProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 28 });
  const y = useSpring(rawY, { stiffness: 200, damping: 28 });

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div style={{ perspective: "1000px" }} className="group h-full">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative h-full rounded-2xl transition-shadow duration-300",
          theme === "light"
            ? "border border-slate-200 bg-white shadow-sm group-hover:shadow-[0_18px_56px_-22px_rgba(15,23,42,0.18)]"
            : "border border-white/[0.08] bg-slate-900/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_60px_-18px_rgba(34,211,238,0.5)]",
          className,
        )}
      >
        <div
          aria-hidden
          style={
            theme === "light"
              ? { boxShadow: `inset 0 0 0 1px rgba(${glowColor},0.4)` }
              : { boxShadow: `inset 0 0 0 1px rgba(${glowColor},0.35)` }
          }
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div style={{ transform: "translateZ(8px)" }} className="h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

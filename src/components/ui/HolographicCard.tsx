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
  intensity = 8,
  glowColor = "34,211,238",
  theme = "dark",
}: HolographicCardProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Softer springs = less computation per frame */
  const x = useSpring(rawX, { stiffness: 200, damping: 28 });
  const y = useSpring(rawY, { stiffness: 200, damping: 28 });

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <div style={{ perspective: "1000px" }} className="group">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative rounded-2xl transition-shadow duration-300",
          theme === "light"
            ? "border border-slate-200 bg-white shadow-md group-hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.18)]"
            : [
                "border border-white/[0.1] bg-slate-950/60",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                `group-hover:shadow-[0_0_60px_-18px_rgba(${glowColor},0.55)]`,
              ].join(" "),
          className,
        )}
      >
        {/* HUD corners — dark only */}
        {theme === "dark" && (
          <>
            <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-[1.5px] border-t-[1.5px] border-cyan-400/35 transition-colors duration-300 group-hover:border-cyan-400/70" />
            <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-[1.5px] border-t-[1.5px] border-cyan-400/35 transition-colors duration-300 group-hover:border-cyan-400/70" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-[1.5px] border-l-[1.5px] border-cyan-400/35 transition-colors duration-300 group-hover:border-cyan-400/70" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-[1.5px] border-r-[1.5px] border-cyan-400/35 transition-colors duration-300 group-hover:border-cyan-400/70" />
          </>
        )}

        {/* Hover glow ring — pure CSS, no JS gradient string */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            theme === "light"
              ? "shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]"
              : "shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]",
          )}
        />

        {/* Depth layer */}
        <div style={{ transform: "translateZ(12px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

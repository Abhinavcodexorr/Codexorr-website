"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

export type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  scaleOnHover?: number;
  innerClassName?: string;
  /** `glass` — light glassmorphism; `paper` — solid white / studio card. */
  variant?: "glass" | "paper";
};

export function TiltCard({
  children,
  className,
  tiltAmount = 4.5,
  scaleOnHover = 1.012,
  innerClassName,
  variant = "glass",
}: TiltCardProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 26 });
  const y = useSpring(rawY, { stiffness: 260, damping: 26 });
  const rotateX = useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const surface =
    variant === "paper"
      ? "border border-slate-200 bg-white shadow-sm backdrop-blur-sm group-hover:shadow-[0_18px_56px_-22px_rgba(15,23,42,0.16)] ring-1 ring-transparent"
      : "border border-white/65 bg-white/72 shadow-[0_14px_44px_-26px_rgba(15,23,42,0.22)] backdrop-blur-md backdrop-saturate-150 ring-1 ring-slate-200/70 group-hover:shadow-[0_28px_72px_-32px_rgba(15,23,42,0.2)]";

  return (
    <div style={{ perspective: "1200px" }} className={cn("group h-full", className)}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: scaleOnHover }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className={cn(
          "relative h-full rounded-2xl transition-[box-shadow] duration-300",
          surface,
        )}
      >
        <div style={{ transform: "translateZ(10px)" }} className={cn("relative h-full rounded-[inherit]", innerClassName)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

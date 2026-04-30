"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
  theme?: "dark" | "light";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "flex w-full min-w-0 max-w-3xl flex-col gap-3",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {theme === "dark" ? (
        <div className={cn("flex", align === "center" ? "justify-center" : "justify-start")}>
          <div className="relative inline-flex overflow-hidden rounded-full border border-cyan-400/25 bg-cyan-500/[0.08] px-4 py-1.5 backdrop-blur-sm">
            <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400/90">
              {eyebrow}
            </span>
          </div>
        </div>
      ) : (
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2.75rem] leading-normal md:leading-snug",
          theme === "light" ? "text-slate-900" : "text-slate-50",
          theme === "dark" && "text-glow-sm",
        )}
      >
        {title}
      </h2>

      <p
        className={cn(
          "text-sm leading-relaxed sm:text-base md:text-lg",
          theme === "light" ? "text-slate-600" : "text-slate-400",
        )}
      >
        {subtitle}
      </p>

      {theme === "dark" && align !== "center" && (
        <div className="h-px w-16 bg-gradient-to-r from-cyan-400/70 to-transparent" />
      )}
    </motion.div>
  );
}

"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Lightweight fake-3D orb: gradients + blur + CSS motion (mobile / tablet · no Three.js). */
export function HeroPremiumFloatCSS({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative aspect-square min-h-[260px] w-full max-w-full overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-28%] bg-[radial-gradient(ellipse_68%_60%_at_45%_42%,rgba(34,211,238,0.28),transparent_62%),radial-gradient(ellipse_55%_50%_at_72%_58%,rgba(167,139,250,0.22),transparent_58%),radial-gradient(ellipse_50%_45%_at_30%_70%,rgba(52,211,153,0.14),transparent_55%)] blur-3xl saturate-115"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[48%] h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 [perspective:900px]",
          !reduceMotion && "hero-premium-sheen-shell",
        )}
      >
        <div className="absolute inset-[12%] rounded-[44%_56%_48%_52%/52%_46%_54%_48%] bg-gradient-to-br from-cyan-200/75 via-white/55 to-indigo-200/65 blur-md ring-1 ring-white/80" />
        <div className={cn("absolute inset-[20%]", !reduceMotion && "hero-premium-orb-live")}>
          <div className="absolute inset-0 rounded-[52%_48%_50%_50%/46%_54%_46%_54%] bg-gradient-to-tr from-teal-200/75 via-white/72 to-indigo-200/60 shadow-[inset_0_-20px_40px_rgba(255,255,255,0.55),0_28px_64px_-24px_rgba(34,211,238,0.25)] backdrop-blur-[3px]" />
          <div
            className="absolute inset-[6%] rounded-[48%_52%_52%_48%/54%_48%_52%_46%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, transparent 38%, rgba(192,132,252,0.22) 70%, transparent 96%)",
            }}
          />
        </div>
        <svg
          className={cn(
            "pointer-events-none absolute inset-[8%] h-[84%] w-[84%] text-cyan-400/48",
            !reduceMotion && "hero-premium-grid-spin",
          )}
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`hero-css-grid-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(8,145,178,0.55)" />
              <stop offset="52%" stopColor="rgba(99,102,241,0.45)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.4)" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="102" rx="78" ry="74" stroke={`url(#hero-css-grid-${gid})`} strokeWidth="0.35" />
          <ellipse cx="100" cy="102" rx="56" ry="74" stroke={`url(#hero-css-grid-${gid})`} strokeWidth="0.25" opacity={0.7} />
          <path d="M 22 102 H 178" stroke="currentColor" strokeWidth="0.2" opacity={0.5} strokeDasharray="3 10" />
          <path d="M 100 26 V 176" stroke="currentColor" strokeWidth="0.2" opacity={0.45} strokeDasharray="4 11" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.75)_0%,transparent_44%,transparent_58%,rgba(255,255,255,0.6)_100%)]" aria-hidden />
    </div>
  );
}

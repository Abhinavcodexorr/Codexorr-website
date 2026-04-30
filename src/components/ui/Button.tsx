"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost" | "ghost-dark";
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-slate-950 shadow-[0_0_40px_-10px_rgba(34,211,238,0.65)] hover:brightness-110 hover:shadow-[0_0_48px_-8px_rgba(167,139,250,0.55)]",
  ghost:
    "border border-white/15 bg-white/[0.04] text-slate-100 backdrop-blur-md hover:border-cyan-400/35 hover:bg-white/[0.07]",
  "ghost-dark":
    "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

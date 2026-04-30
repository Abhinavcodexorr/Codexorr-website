"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 sm:w-auto";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-white shadow-[0_10px_30px_-10px_rgba(34,211,238,0.6)] hover:brightness-110 hover:shadow-[0_14px_36px_-12px_rgba(167,139,250,0.55)]",
  outline:
    "border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-cyan-400/60 hover:text-cyan-700",
  ghost:
    "border border-slate-200 bg-white/70 text-slate-700 backdrop-blur hover:border-cyan-400/50 hover:bg-white hover:text-cyan-700",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  onClick,
  target,
  rel,
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel}>
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

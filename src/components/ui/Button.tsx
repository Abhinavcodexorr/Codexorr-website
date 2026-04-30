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
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:w-auto active:scale-[0.99] hover:-translate-y-px";

const variants = {
  primary:
    "bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 text-white shadow-[0_10px_30px_-10px_rgba(20,184,166,0.45)] hover:brightness-110 hover:shadow-[0_14px_36px_-12px_rgba(139,92,246,0.38)]",
  outline:
    "border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-teal-300/85 hover:text-teal-800",
  ghost:
    "border border-slate-200 bg-white/70 text-slate-700 backdrop-blur hover:border-teal-300/50 hover:bg-white hover:text-teal-800",
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

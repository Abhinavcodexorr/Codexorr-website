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
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-[transform,box-shadow,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto active:scale-[0.986] hover:-translate-y-0.5";

const variants = {
  primary:
    "bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 text-white shadow-[0_14px_40px_-18px_rgba(20,184,166,0.45)] hover:shadow-[0_18px_44px_-16px_rgba(167,139,250,0.35)] hover:brightness-105",
  outline:
    "border border-slate-200 bg-white text-slate-800 shadow-[0_10px_32px_-24px_rgba(15,23,42,0.18)] hover:border-teal-200 hover:text-teal-900 hover:shadow-[0_14px_40px_-24px_rgba(20,184,166,0.18)]",
  ghost:
    "border border-transparent bg-white/70 text-slate-700 backdrop-blur-sm hover:border-slate-200 hover:bg-white",
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

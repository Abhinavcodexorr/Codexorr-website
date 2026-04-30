"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl">
      {/* Animated gradient bottom border */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(167,139,250,0.5) 65%, transparent 100%)",
          animation: "shimmer-sweep 5s linear infinite",
          backgroundSize: "200% 100%",
        }}
      />

      <Container className="flex items-center justify-between gap-6 py-4 md:py-5">
        {/* Logo */}
        <Link href="/" aria-label="CodeXorr home"
          className="group relative flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-400/70">
          <Image src="/logo.png" alt="" width={36} height={36} priority
            className="h-9 w-9 mix-blend-screen transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <span className="font-heading text-[1.1rem] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-200">
            CodeXorr
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={cn(
                  "relative inline-flex items-center justify-center rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300",
                  active ? "text-cyan-300" : "text-slate-400 hover:text-white",
                )}>
                {active && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{link.label}</span>
                {active && (
                  <span aria-hidden
                    className="absolute -bottom-1 left-1/2 h-px w-1/2 -translate-x-1/2 bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/25 bg-cyan-500/[0.08] px-6 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/[0.14] hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]">
            <motion.span aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
            <span className="relative">Book a call</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button type="button" aria-expanded={open} aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] p-3 text-slate-100 lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-white/[0.06] bg-slate-950 lg:hidden">
            <Container className="flex flex-col gap-2 pb-6 pt-2">
              {links.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                      pathname === link.href ? "bg-white/[0.06] text-cyan-300" : "text-slate-300 hover:bg-white/[0.04]",
                    )}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white">
                Book a call
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

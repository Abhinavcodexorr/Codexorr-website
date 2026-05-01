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
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
      <Container className="flex items-center justify-between gap-8 py-4 md:py-5">
        <Link
          href="/"
          aria-label="CodeXorr home"
          className="group relative flex shrink-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/55 focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.png"
            alt=""
            width={46}
            height={46}
            priority
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-[1.04] md:h-11 md:w-11"
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
            CodeXorr<span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em]",
                  active ? "text-slate-900" : "text-slate-500 transition-colors hover:text-slate-800",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-chip"
                    className="absolute inset-1 rounded-full bg-teal-500/12 shadow-[inset_0_0_0_1px_rgba(20,184,166,0.22)]"
                    transition={{ type: "spring", stiffness: 440, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_-16px_rgba(20,184,166,0.45)] transition-all hover:brightness-105"
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 shadow-sm transition-colors hover:border-cyan-200 hover:text-teal-800 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 pb-6 pt-3">
              {links.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em]",
                      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                        ? "bg-teal-50 text-teal-800"
                        : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 py-3.5 text-center text-sm font-semibold text-white"
              >
                Start a project
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

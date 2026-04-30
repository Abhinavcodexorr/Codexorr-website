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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-6 py-3 md:py-4">
        <Link
          href="/"
          aria-label="CodeXorr home"
          className="group relative flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <span className="font-heading text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-cyan-700">
            CodeXorr
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center justify-center rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                  active ? "text-cyan-700" : "text-slate-500 hover:text-slate-900",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan-500/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(34,211,238,0.7)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_-12px_rgba(167,139,250,0.7)]"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition-colors hover:border-cyan-400/50 hover:text-cyan-700 lg:hidden"
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
            className="overflow-hidden border-t border-slate-200/70 bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1.5 pb-5 pt-3">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                        ? "bg-cyan-500/10 text-cyan-700"
                        : "text-slate-600 hover:bg-slate-100",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Book a call
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

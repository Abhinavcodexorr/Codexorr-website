"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const BRANDS = [
  "Government · mission systems",
  "Fortune-listed partners",
  "High-growth startups",
  "Scale-ups & unicorns",
  "Global SaaS",
  "On-demand ventures",
];

export function TrustStripSection() {
  return (
    <section className="relative border-b border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-14 md:py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-85"
      />
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-11 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400"
        >
          Built for ambitious teams everywhere
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {BRANDS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: Math.min(i, 12) * 0.035, duration: 0.4 }}
              className="group relative whitespace-nowrap font-heading text-[0.95rem] font-medium tracking-tight text-slate-500 transition-colors hover:text-slate-900"
            >
              {name}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-teal-500/0 via-teal-500/70 to-cyan-500/0 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  );
}

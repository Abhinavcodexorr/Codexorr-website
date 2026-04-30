"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="relative overflow-x-hidden bg-slate-950 pb-14 pt-10 md:pb-28 md:pt-16 lg:pb-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.10),transparent),radial-gradient(ellipse_50%_40%_at_95%_100%,rgba(167,139,250,0.10),transparent),radial-gradient(ellipse_45%_35%_at_0%_100%,rgba(236,72,153,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-12 text-center backdrop-blur-sm sm:rounded-3xl sm:px-8 md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] rounded-t-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 sm:rounded-t-3xl" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-8">
            <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/25 bg-cyan-500/[0.08] px-4 py-2 backdrop-blur-sm sm:gap-2.5 sm:px-5">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-400 status-dot" aria-hidden />
              <span className="relative font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90 sm:text-[10px] sm:tracking-[0.28em]">
                Let&apos;s build together
              </span>
            </div>

            <h2 className="font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
              Ready for software that feels{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                flagship-tier?
              </span>
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
              Tell us about your roadmap — we&apos;ll respond within two business days with a sane plan: architecture
              outline, timeline bands, and collaboration model.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(34,211,238,0.6)] transition-all duration-300 hover:brightness-110 sm:w-auto"
              >
                Schedule discovery
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.07] sm:w-auto"
              >
                Explore services
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

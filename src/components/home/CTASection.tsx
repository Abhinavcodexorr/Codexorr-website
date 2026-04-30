"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Parallax } from "@/components/animations/Parallax";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="relative overflow-x-hidden bg-gradient-to-b from-white via-emerald-50/25 to-white pb-10 pt-10 md:pb-16 md:pt-12 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_48%_at_50%_0%,rgba(34,211,238,0.07),transparent),radial-gradient(ellipse_50%_42%_at_95%_100%,rgba(167,139,250,0.065),transparent),radial-gradient(ellipse_58%_40%_at_8%_85%,rgba(52,211,153,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <Container>
        <Parallax offset={20} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative isolate mx-auto overflow-hidden rounded-2xl border border-slate-200/90 bg-white/75 px-5 py-8 shadow-[0_28px_80px_-44px_rgba(15,23,42,0.18)] backdrop-blur-xl backdrop-saturate-150 sm:rounded-[1.35rem] sm:px-8 md:px-12 md:py-11"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.92)_42%,rgba(241,245,249,0.82)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[1px] top-[1px] z-[1] h-[1.5px] rounded-t-[inherit] bg-gradient-to-r from-teal-400/45 via-cyan-400/42 to-violet-400/42"
            />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 pb-1 text-center md:gap-6">
              <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-200/60 bg-white/92 px-4 py-2 shadow-sm backdrop-blur-sm sm:gap-2.5 sm:px-5">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                <span className="relative font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-teal-800 sm:text-[10px] sm:tracking-[0.24em]">
                  Let&apos;s build together
                </span>
              </div>

              <h2 className="font-heading flex flex-col items-center gap-1.5 text-2xl font-semibold tracking-tight text-slate-900 sm:gap-2 sm:text-3xl md:text-4xl lg:text-[2.65rem] md:leading-[1.4] lg:leading-[1.38] leading-normal">
                <span className="block pb-[0.06em] text-balance">Ready for software that feels</span>
                <span className="gradient-text-fill bg-gradient-to-r from-teal-700 via-cyan-600 to-violet-700 bg-clip-text pb-[0.12em] text-center text-transparent">
                  flagship-tier?
                </span>
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                Tell us about your roadmap — we&apos;ll respond within two business days with a sane plan: architecture outline,
                timeline bands, and collaboration model.
              </p>

              <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-14px_rgba(20,184,166,0.42)] transition-all duration-300 hover:brightness-[1.03] hover:shadow-[0_18px_44px_-16px_rgba(59,130,246,0.28)] sm:w-auto"
                >
                  Schedule discovery
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300/85 hover:text-teal-800 sm:w-auto"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </Container>
    </section>
  );
}

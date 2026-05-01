"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Parallax } from "@/components/animations/Parallax";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="relative overflow-x-hidden border-t border-slate-200/80 bg-[linear-gradient(180deg,#fafbfc_0%,#ffffff_100%)] pb-24 pt-[88px] md:pb-[120px] md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_52%_-8%,rgba(34,211,238,0.16),transparent_58%),radial-gradient(ellipse_54%_48%_at_106%_90%,rgba(167,139,250,0.12),transparent_55%)]"
      />

      <Container>
        <Parallax offset={12} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative isolate mx-auto max-w-[940px] overflow-hidden rounded-[1.85rem] border border-slate-200/95 px-9 py-12 shadow-[0_48px_120px_-70px_rgba(15,23,42,0.18)] md:rounded-[2.125rem] md:px-14 md:py-14"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f5fbff_40%,#f7f8ff_100%)] backdrop-blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-[1px] z-[2] h-px rounded-full bg-gradient-to-r from-teal-300/0 via-teal-300/85 to-indigo-300/85"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-44 right-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-300/36 blur-[90px]"
              animate={{
                opacity: [0.5, 0.74, 0.5],
                scale: [0.95, 1.06, 0.95],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/95 bg-white/88 px-5 py-2 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-800">
                  Accelerate confidently
                </span>
              </div>

              <h2 className="font-heading text-[1.8rem] font-semibold leading-[1.2] tracking-tight text-slate-900 md:text-[2.45rem]">
                Ship the next‑gen experience your KPIs demanded{" "}
                <span className="gradient-text-animated">yesterday.</span>
              </h2>

              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 md:text-lg">
                From AI copilots to cloud-native backends — briefing us aligns architecture, pacing, instrumentation, and a pod
                that merges with yours.
              </p>

              <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-20px_rgba(20,184,166,0.45)] transition hover:brightness-105 sm:w-auto"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 shadow-[0_14px_40px_-38px_rgba(15,23,42,0.16)] transition hover:border-teal-200 sm:w-auto"
                >
                  View services
                </Link>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </Container>
    </section>
  );
}

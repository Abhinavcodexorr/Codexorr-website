"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LazyNeuralHero } from "@/components/3d/LazyNeuralHero";

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-x-clip bg-white py-14 sm:pb-20 md:min-h-[96vh] md:py-28 md:pb-28">
      {/* Soft light backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_50%,#f1f5f9_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_18%,rgba(34,211,238,0.18),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_75%,rgba(167,139,250,0.12),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_45%_at_10%_60%,rgba(99,102,241,0.10),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] dot-grid"
      />

      <LazyNeuralHero />

      {/* Bottom fade so the hero blends into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-white" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-[3] hidden h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent hero-scan-line md:block"
      />

      <div aria-hidden className="pointer-events-none absolute left-6 top-6 z-[4] hidden md:flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan-500" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-700/70">SYS ONLINE</span>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 z-[4] hidden md:flex flex-col items-end gap-1"
      >
        <span className="font-mono text-[9px] text-slate-500">[ 51.5°N · 0.1°W ]</span>
      </div>

      <div className="relative z-10 w-full min-w-0 px-0">
        <Container className="min-w-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex min-w-0 flex-col items-center gap-6 text-center sm:gap-7"
          >
            <motion.div variants={staggerChild} className="w-full min-w-0 px-1">
              <div className="relative mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden rounded-full border border-cyan-400/40 bg-cyan-50 px-4 py-2 shadow-sm sm:px-5">
                <Radio className="h-3 w-3 shrink-0 text-cyan-600 status-dot" aria-hidden />
                <span className="break-words text-center font-mono text-[9px] font-semibold uppercase leading-snug tracking-[0.2em] text-cyan-700 sm:text-[10px] sm:tracking-[0.28em]">
                  Next-gen IT · AI-native delivery
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="font-heading w-full min-w-0 max-w-4xl text-balance px-1 text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl sm:leading-tight md:text-6xl lg:text-[4.25rem] lg:leading-[1.15]"
            >
              Intelligent systems.{" "}
              <span className="gradient-text-animated">Built for global scale.</span>
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="mx-auto max-w-2xl min-w-0 px-1 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg"
            >
              CodeXorr engineers resilient cloud platforms, immersive product UX, and AI workflows that feel inevitable —
              sharp architecture, obsessive craft, and measurable outcomes.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="flex w-full min-w-0 max-w-lg flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
              <Button href="/contact">
                Start a project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/portfolio" variant="outline">
                View work
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pb-2 md:bottom-8 motion-reduce:hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400">Scroll</span>
        <span aria-hidden className="block h-6 w-px bg-gradient-to-b from-cyan-500/60 to-transparent hero-scroll-nudge" />
      </div>
    </section>
  );
}

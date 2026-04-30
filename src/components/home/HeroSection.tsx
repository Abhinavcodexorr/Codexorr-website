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
    <section className="relative flex min-h-dvh flex-col justify-center overflow-x-clip bg-slate-950 py-14 sm:pb-20 md:min-h-[96vh] md:py-28 md:pb-28">
      {/* Always-on visuals (SSR + mobile) — does not rely on Canvas or JS breakpoints */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-slate-950 bg-[linear-gradient(180deg,#020617_0%,#0f172a_42%,#020617_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_18%,rgba(34,211,238,0.22),transparent_58%)] max-md:bg-[radial-gradient(ellipse_120%_80%_at_50%_12%,rgba(34,211,238,0.28),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_75%,rgba(167,139,250,0.14),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_45%_at_10%_60%,rgba(99,102,241,0.12),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] dot-grid md:opacity-[0.1]"
      />

      <LazyNeuralHero />

      {/* Lighter vignette on small screens so the aurora stays visible */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_50%_50%,transparent_25%,rgba(2,6,23,0.55)_95%)] max-md:bg-[radial-gradient(ellipse_100%_70%_at_50%_45%,transparent_20%,rgba(2,6,23,0.45)_100%)] md:bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_35%,rgba(2,6,23,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(2,6,23,0.2)_0%,rgba(15,23,42,0.35)_52%,rgba(2,6,23,0.82)_100%)] max-md:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.08)_0%,rgba(15,23,42,0.22)_48%,rgba(2,6,23,0.72)_100%)]" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] hidden h-40 overflow-hidden md:block md:h-48">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,0.12) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            transform: "perspective(350px) rotateX(72deg)",
            transformOrigin: "bottom center",
          }}
          className="absolute inset-x-[-30%] top-0 h-[200%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-[3] hidden h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent hero-scan-line md:block"
      />

      <div aria-hidden className="pointer-events-none absolute left-6 top-6 z-[4] hidden md:flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-400/70">SYS ONLINE</span>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 top-6 z-[4] hidden md:flex flex-col items-end gap-1">
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
              <div className="relative mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-500/[0.12] px-4 py-2 backdrop-blur-sm sm:px-5">
                <Radio className="h-3 w-3 shrink-0 text-cyan-400 status-dot" aria-hidden />
                <span className="break-words text-center font-mono text-[9px] font-semibold uppercase leading-snug tracking-[0.2em] text-cyan-200/90 sm:text-[10px] sm:tracking-[0.28em]">
                  Next-gen IT · AI-native delivery
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="font-heading w-full min-w-0 max-w-4xl text-balance px-1 text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-slate-50 sm:text-4xl sm:leading-tight md:text-6xl lg:text-[4.25rem] lg:leading-[1.15]"
            >
              Intelligent systems.{" "}
              <span className="gradient-text-animated">Built for global scale.</span>
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="mx-auto max-w-2xl min-w-0 px-1 text-pretty text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg"
            >
              CodeXorr engineers resilient cloud platforms, immersive product UX, and AI workflows that feel inevitable —
              sharp architecture, obsessive craft, and measurable outcomes.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="flex w-full min-w-0 max-w-lg flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
              <Button href="/contact" className="min-h-[48px] w-full shrink-0 sm:w-auto sm:min-w-[200px]">
                Start a project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/portfolio" variant="ghost" className="min-h-[48px] w-full shrink-0 sm:w-auto sm:min-w-[200px]">
                View work
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pb-2 md:bottom-8 motion-reduce:hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
        <span
          aria-hidden
          className="block h-6 w-px bg-gradient-to-b from-cyan-400/60 to-transparent hero-scroll-nudge"
        />
      </div>
    </section>
  );
}

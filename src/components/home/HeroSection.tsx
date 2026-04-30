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
    <section className="relative flex min-h-[96vh] flex-col justify-center overflow-hidden bg-slate-950 py-20 md:py-28">
      <div className="absolute inset-0 z-0">
        <LazyNeuralHero />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_35%,rgba(2,6,23,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(2,6,23,0.15)_0%,rgba(15,23,42,0.55)_52%,rgba(2,6,23,0.92)_100%)]" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-48 overflow-hidden">
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
        className="pointer-events-none absolute inset-x-0 z-[3] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent hero-scan-line"
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

      <div className="relative z-10">
        <Container>
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-7 text-center">
            <motion.div variants={staggerChild}>
              <div className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-500/[0.12] px-5 py-2 backdrop-blur-sm">
                <Radio className="h-3 w-3 text-cyan-400 status-dot" aria-hidden />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
                  Next-gen IT · AI-native delivery
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="font-heading max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.15]"
            >
              Intelligent systems.{" "}
              <span className="gradient-text-animated">Built for global scale.</span>
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-slate-400 md:text-lg"
            >
              CodeXorr engineers resilient cloud platforms, immersive product UX, and AI workflows that feel inevitable — sharp
              architecture, obsessive craft, and measurable outcomes.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
            >
              <Button href="/contact" className="min-w-[208px]">
                Start a project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/portfolio" variant="ghost" className="min-w-[208px]">
                View work
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 motion-reduce:hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
        <span
          aria-hidden
          className="block h-6 w-px bg-gradient-to-b from-cyan-400/60 to-transparent hero-scroll-nudge"
        />
      </div>
    </section>
  );
}

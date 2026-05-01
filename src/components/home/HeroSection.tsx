"use client";

import type { Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Database, Layers3, Sparkles } from "lucide-react";
import { Parallax } from "@/components/animations/Parallax";
import { HeroInteractiveVisual } from "@/components/home/HeroInteractiveVisual";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const LazyHero3DPanel = dynamic(
  () =>
    import("@/components/3d/LazyHero3D").then((mod) => ({
      default: function LazyHeroGate(props: { className?: string }) {
        return <mod.LazyHero3D {...props} />;
      },
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] w-full rounded-[1.35rem] bg-gradient-to-br from-white via-cyan-50/95 to-indigo-50/92 ring-1 ring-cyan-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,1)] sm:min-h-[300px] lg:min-h-[min(420px,52vh)]"
        aria-hidden
      />
    ),
  },
);

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

function FloatingGlassCards({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-[2] hidden md:block", className)} aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className={cn(
          "hero-float-shell home-float-card-a absolute left-[-3%] top-[12%] w-[154px] rounded-2xl p-4 sm:w-[172px]",
        )}
      >
        <Cpu className="mb-3 h-4 w-4 text-teal-600" aria-hidden />
        <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-slate-200 to-slate-100" />
        <div className="mt-2 h-1.5 w-[42%] rounded-full bg-teal-200/90" />
        <div className="mt-3 flex gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-cyan-500/70" />
          <span className="h-1.5 flex-1 rounded-full bg-slate-200" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className={cn(
          "hero-float-shell home-float-card-b absolute right-[-5%] top-[50%] w-[146px] rounded-2xl p-4 sm:w-[156px]",
        )}
      >
        <Database className="mb-3 h-4 w-4 text-violet-600" aria-hidden />
        <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400/70 to-transparent" />
        <div className="mt-2 h-10 w-full rounded-xl bg-white/90 ring-1 ring-slate-200/85" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.15, duration: 0.45 }}
        className={cn(
          "hero-float-shell motion-safe:home-float-card-b absolute bottom-[7%] left-[8%] w-[168px] rounded-2xl p-4 sm:bottom-[9%]",
        )}
      >
        <Layers3 className="mb-3 h-4 w-4 text-teal-600" aria-hidden />
        <div className="flex items-end gap-2">
          <span className="font-heading text-2xl font-bold text-slate-900">∞</span>
          <span className="pb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Live sync</span>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden border-b border-slate-200/80 bg-background pb-14 pt-[76px] sm:pt-[84px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,transparent_52%)]" aria-hidden />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax offset={28} className="relative min-h-[100vh] w-full">
          <div className="mesh-blob-a absolute left-[-18%] top-[6%] h-[min(400px,56vw)] w-[min(400px,56vw)] rounded-full bg-gradient-to-br from-cyan-200/45 via-sky-100/28 to-transparent blur-3xl" />
          <div className="mesh-blob-b absolute bottom-[0%] right-[-14%] h-[min(440px,58vw)] w-[min(440px,58vw)] rounded-full bg-gradient-to-bl from-violet-200/38 via-indigo-100/26 to-transparent blur-3xl" />
          <div className="mesh-blob-b absolute right-[10%] top-[38%] h-[220px] w-[220px] rounded-full bg-emerald-200/35 blur-[60px]" />
        </Parallax>
      </div>

      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.22]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-teal-200/70 to-transparent" aria-hidden />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-[3] mx-auto w-full flex-1">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="flex min-w-0 flex-col gap-8 text-center lg:col-span-6 lg:items-start lg:text-left xl:col-span-6">
            <motion.div variants={staggerChild}>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/85 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-800">
                  Strategy · AI · Engineering
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="font-heading mx-auto max-w-xl text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:max-w-2xl sm:text-[2.25rem] md:max-w-3xl md:text-[2.875rem] lg:mx-0 xl:text-[3.125rem]"
            >
              We build next-generation digital experiences powered by{" "}
              <span className="gradient-text-animated">AI and 3D interfaces</span>
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="mx-auto max-w-xl text-[1rem] leading-[1.7] text-slate-600 sm:text-lg md:text-[1.07rem] lg:mx-0"
            >
              From apps and portals to intelligent automation — we innovate, optimise, and scale your business with disciplined
              delivery, resilient architecture, and interfaces your customers feel on day one.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start lg:gap-5"
            >
              <Button href="/contact">
                Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="outline">
                View Services
              </Button>
            </motion.div>

            <motion.ul
              variants={staggerChild}
              className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-slate-500 lg:mx-0 lg:justify-start"
            >
              {["Composable platforms", "Generative workflows", "Cloud-native delivery"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 shadow-[0_0_14px_rgba(20,184,166,0.45)]" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={staggerChild} className="relative order-first lg:order-none lg:col-span-6 xl:col-span-5 xl:col-start-8 lg:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[14%] z-0 rounded-[3rem] bg-[radial-gradient(ellipse_68%_60%_at_48%_42%,rgba(56,189,248,0.28),transparent_58%),radial-gradient(ellipse_58%_52%_at_78%_68%,rgba(167,139,250,0.22),transparent_55%)] opacity-95 blur-[64px]"
            />
            <HeroInteractiveVisual className="relative z-10 mx-auto max-w-[min(100%,520px)]">
              <div className="glass-panel-light relative rounded-[2rem] p-6 sm:p-7 lg:p-9">
                <FloatingGlassCards />
                <LazyHero3DPanel className="rounded-[1.35rem]" />
              </div>
            </HeroInteractiveVisual>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.55 }}
        className="motion-reduce:hidden absolute bottom-8 left-1/2 z-[4] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400">Scroll</span>
        <span className="hero-scroll-nudge-soft block h-8 w-px bg-gradient-to-b from-teal-400/85 to-transparent" />
      </motion.div>
    </section>
  );
}

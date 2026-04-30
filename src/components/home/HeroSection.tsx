"use client";

import type { Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { Parallax } from "@/components/animations/Parallax";
import { HeroInteractiveVisual } from "@/components/home/HeroInteractiveVisual";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const LazyHero3DPanel = dynamic(
  () =>
    import("@/components/3d/LazyHero3D").then((mod) => {
      function LazyHeroGate(props: { className?: string }) {
        return <mod.LazyHero3D {...props} />;
      }
      return { default: LazyHeroGate };
    }),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] w-full rounded-[1.25rem] bg-gradient-to-br from-sky-100/95 via-emerald-50/70 to-violet-100/80 ring-1 ring-cyan-100/55 sm:min-h-[300px] lg:min-h-[min(420px,52vh)]"
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
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.16 } },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-white py-10 sm:pb-14 md:min-h-[92vh] md:py-16 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#ffffff_0%,#fafbfc_50%,#f3f6f9_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_60%_at_15%_25%,rgba(125,211,252,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_92%_70%,rgba(196,181,253,0.12),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_46%_at_100%_108%,rgba(52,211,153,0.09),transparent_58%)]"
      />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Parallax offset={22} className="relative h-full min-h-full w-full">
          <div
            aria-hidden
            className="mesh-blob-a absolute left-[-18%] top-[10%] h-[min(340px,50vw)] w-[min(340px,50vw)] rounded-full bg-gradient-to-br from-cyan-200/26 via-teal-100/16 to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="mesh-blob-b absolute bottom-[12%] left-[-12%] h-[min(260px,40vw)] w-[min(260px,40vw)] rounded-full bg-gradient-to-br from-emerald-200/28 via-teal-100/18 to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="mesh-blob-b absolute bottom-[5%] right-[-14%] h-[min(360px,48vw)] w-[min(360px,48vw)] rounded-full bg-gradient-to-tl from-violet-200/26 via-purple-100/18 to-transparent blur-3xl"
          />
        </Parallax>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] dot-grid max-md:opacity-[0.05]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent to-white md:h-36" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[10%] z-[2] hidden h-px bg-gradient-to-r from-transparent via-teal-200/50 to-transparent md:block"
      />

      <div className="relative z-20 flex w-full min-w-0 flex-1 items-center pt-6 md:pt-0">
        <Container className="min-w-0 py-4 md:py-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex min-w-0 flex-col items-center gap-6 text-center sm:gap-7 md:gap-8 lg:col-span-6 lg:items-start lg:text-left xl:col-span-6"
            >
              <motion.div variants={staggerChild} className="w-full min-w-0">
                <div className="relative inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-200/55 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm ring-1 ring-cyan-100/70 lg:mx-0 lg:ml-px sm:px-5 mx-auto justify-center lg:justify-start">
                  <Radio className="h-3 w-3 shrink-0 text-emerald-600 max-md:opacity-90" aria-hidden />
                  <span className="font-mono text-[9px] font-semibold uppercase leading-snug tracking-[0.2em] text-teal-800 sm:text-[10px] sm:tracking-[0.24em]">
                    Next-gen IT · AI-native delivery
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={staggerChild}
                className="font-heading flex w-full min-w-0 flex-col gap-2.5 text-[1.7rem] font-semibold tracking-[-0.02em] text-slate-900 sm:gap-3 sm:text-4xl md:gap-3.5 md:text-5xl xl:text-[3.6rem] xl:leading-[1.28] lg:leading-[1.32] md:leading-[1.34] leading-normal"
              >
                <span className="block pb-[0.06em] text-balance lg:max-w-[14ch]">Intelligent systems.</span>
                <span className="gradient-text-animated block pb-[0.1em] text-balance lg:max-w-[16ch]">Built for global scale.</span>
              </motion.h1>

              <motion.p
                variants={staggerChild}
                className="max-w-xl min-w-0 text-pretty text-sm leading-[1.65] text-slate-600 sm:text-base md:text-[1.07rem] md:leading-[1.68]"
              >
                CodeXorr engineers resilient cloud platforms, immersive product UX, and AI workflows that feel inevitable —
                sharp architecture, obsessive craft, and measurable outcomes.
              </motion.p>

              <motion.div
                variants={staggerChild}
                className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start lg:gap-4"
              >
                <Button href="/contact">
                  Start a project <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href="/portfolio" variant="outline">
                  View work
                </Button>
              </motion.div>
            </motion.div>

            <div className="relative order-first w-full min-h-[280px] sm:min-h-[300px] lg:order-none lg:col-span-6 lg:min-h-0 xl:col-span-5 xl:col-start-8 lg:justify-self-end">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-[10%] z-0 rounded-[2.75rem] bg-[radial-gradient(ellipse_72%_62%_at_50%_48%,rgba(56,189,248,0.22),transparent_58%),radial-gradient(ellipse_58%_52%_at_70%_62%,rgba(167,139,250,0.18),transparent_55%)] opacity-90 blur-2xl"
              />
              <HeroInteractiveVisual className="relative z-10">
                <div className="rounded-[2rem] border border-cyan-100/40 bg-white/45 p-5 shadow-[0_40px_110px_-42px_rgba(15,23,42,0.2),0_0_0_1px_rgba(255,255,255,0.55)_inset] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-slate-200/40 sm:p-6 lg:p-7">
                  <LazyHero3DPanel className="rounded-[1.25rem]" />
                </div>
              </HeroInteractiveVisual>
            </div>
          </div>
        </Container>
      </div>

      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pb-2 md:bottom-8 motion-reduce:hidden max-md:hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400">Scroll</span>
        <span
          aria-hidden
          className="block h-6 w-px bg-gradient-to-b from-teal-300/55 to-transparent hero-scroll-nudge-soft"
        />
      </div>
    </section>
  );
}

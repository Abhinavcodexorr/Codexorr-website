"use client";

import type { Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const NeuralNetworkHero = dynamic(
  () => import("@/components/three/NeuralNetworkHero").then((m) => m.NeuralNetworkHero),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[680px] w-full" />,
  },
);

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const container: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export function HeroSection() {
  /* Detect touch/mobile — skip ALL parallax on touch devices */
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* Mouse parallax — only on pointer-fine devices */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 40, damping: 20 });
  const textX = useTransform(smoothX, [0, 1], [-8, 8]);
  const textY = useTransform(smoothY, [0, 1], [-5, 5]);

  /* Scroll fade */
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scrollYt      = useTransform(scrollY, [0, 300], [0, -50]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  }
  function onMouseLeave() { rawX.set(0.5); rawY.set(0.5); }

  /* Scan line ref for CSS animation fallback */
  const scanRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative flex min-h-[96vh] flex-col justify-center overflow-hidden bg-white py-20 md:py-28"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <NeuralNetworkHero />
      </div>

      {/* Vignette — cheap CSS gradients, zero GPU layers */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_30%,rgba(248,250,252,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(248,250,252,0.1)_0%,rgba(248,250,252,0.4)_60%,#f8fafc_100%)]" />

      {/* Perspective grid floor — pure CSS, zero JS */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-48 overflow-hidden">
        <div
          style={{
            backgroundImage: "linear-gradient(rgba(100,116,139,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,0.08) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            transform: "perspective(350px) rotateX(72deg)",
            transformOrigin: "bottom center",
          }}
          className="absolute inset-x-[-30%] top-0 h-[200%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-transparent" />
      </div>

      {/* Scan line — CSS animation, no framer-motion */}
      <div
        ref={scanRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-[3] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: "scan-vertical 6s linear 2s infinite" }}
      />

      {/* HUD corners — static text only */}
      <div aria-hidden className="pointer-events-none absolute left-6 top-6 z-[4] hidden md:flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-cyan-500" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-600/60">SYS ONLINE</span>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 top-6 z-[4] hidden md:flex flex-col items-end gap-1">
        <span className="font-mono text-[9px] text-slate-400">[ 51.5°N · 0.1°W ]</span>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: scrollOpacity, y: scrollYt }}
        className="relative z-10"
      >
        <Container>
          {/* Mouse parallax wrapper — only on pointer-fine, else static */}
          <motion.div
            style={isTouch ? {} : { x: textX, y: textY }}
          >
            <motion.div variants={container} initial="hidden" animate="show"
              className="flex flex-col items-center gap-7 text-center">

              {/* Badge */}
              <motion.div variants={staggerChild}>
                <div className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-50 px-5 py-2 shadow-sm">
                  <motion.span aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
                    animate={{ translateX: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, repeatDelay: 3, ease: "easeInOut" }} />
                  <Radio className="h-3 w-3 text-cyan-600 status-dot" aria-hidden />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-700">
                    Next-gen IT · AI-native delivery
                  </span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={staggerChild}
                className="font-heading max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.15]">
                Intelligent systems.{" "}
                <span className="gradient-text-animated">Built for global scale.</span>
              </motion.h1>

              {/* Sub */}
              <motion.p variants={staggerChild}
                className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-slate-500 md:text-lg">
                CodeXorr engineers resilient cloud platforms, immersive product UX, and AI workflows
                that feel inevitable — sharp architecture, obsessive craft, and measurable outcomes.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={staggerChild}
                className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/contact" className="min-w-[208px]">
                  Start a project <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href="/portfolio" variant="ghost-dark" className="min-w-[208px]">
                  View work
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block h-6 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}

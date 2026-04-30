"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-28 pt-20 md:pb-36">
      {/* CSS radial gradients — no filter blur, zero GPU compositing layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.07),transparent),radial-gradient(ellipse_50%_40%_at_95%_100%,rgba(167,139,250,0.07),transparent),radial-gradient(ellipse_45%_35%_at_0%_100%,rgba(236,72,153,0.05),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.03] px-6 py-16 text-center backdrop-blur-sm md:px-16 md:py-20"
        >
          {/* top accent stripe */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] rounded-t-3xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8">
            {/* badge */}
            <div className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-400/25 bg-cyan-500/[0.08] px-5 py-2 backdrop-blur-sm">
              <motion.span aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 2, ease: "easeInOut" }} />
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 status-dot" aria-hidden />
              <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">
                Let&apos;s build together
              </span>
            </div>

            {/* heading */}
            <h2 className="font-heading text-3xl font-semibold leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
              Ready for software that feels{" "}
              <span className="gradient-text-animated">flagship-tier?</span>
            </h2>

            {/* body */}
            <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Tell us about your roadmap — we&apos;ll respond within two business days with a sane
              plan: architecture outline, timeline bands, and collaboration model.
            </p>

            {/* buttons */}
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="min-w-[220px]">
                Schedule discovery
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="ghost" className="min-w-[220px]">
                Explore services
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

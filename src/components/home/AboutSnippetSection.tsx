"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSnippetSection() {
  return (
    <section className="relative overflow-x-hidden bg-slate-950 py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_10%,rgba(167,139,250,0.08),transparent),radial-gradient(ellipse_50%_35%_at_10%_90%,rgba(34,211,238,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading align="left" eyebrow="About"
            title="We build technology that feels inevitable."
            subtitle="CodeXorr is a specialist studio for enterprise platforms — pairing architectural rigor with product intuition. From cloud foundations to AI copilots, we ship systems your teams operate with confidence." />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <HolographicCard intensity={7} glowColor="6,182,212">
              <div className="relative flex flex-col gap-5 p-6 md:p-10">
                <p className="text-base leading-relaxed text-slate-300 md:text-lg">
                  Quality is non-negotiable: observability-first builds, accessible interfaces,
                  and migrations that never strand your users.
                </p>
                <ul className="flex flex-col gap-3 text-sm text-slate-400">
                  {[
                    { color: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]", text: "Embedded solution architects on every engagement." },
                    { color: "bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]", text: "Weekly demos — zero black-box delivery." },
                    { color: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]", text: "Playbooks for reliability, security, and compliance readiness." },
                  ].map((item, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="flex gap-3">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.color}`} />
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                  <Button href="/about">Our story</Button>
                  <Button href="/contact" variant="ghost">Talk to us</Button>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

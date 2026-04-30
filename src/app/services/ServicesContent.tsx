"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesContent() {
  return (
    <div className="flex flex-1 flex-col py-12 md:py-20 lg:py-28">
      <Container className="flex flex-col gap-12 md:gap-16 lg:gap-20">
        <SectionHeading
          eyebrow="Services"
          title="Capability depth — without the enterprise drag."
          subtitle="Each practice area pairs principal engineers with design partners so strategy, architecture, and UX evolve together."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <motion.div
              key={s.slug}
              variants={cardReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
            >
              <Link href={`/services/${s.slug}`} className="block h-full outline-none">
                <HolographicCard className="h-full" intensity={5} glowColor={s.glow}>
                  <div className="relative flex h-full flex-col gap-5 p-6 md:p-10">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${s.iconBg}`}>
                        <s.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{s.eyebrow}</span>
                    </div>
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {s.title}
                    </h2>
                    <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-[17px]">{s.tagline}</p>
                    <ul className="mt-2 flex max-w-3xl flex-col gap-3 border-t border-slate-200/80 pt-5">
                      {s.bullets.map((li) => (
                        <li
                          key={li}
                          className="flex gap-3 text-sm leading-relaxed text-slate-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-auto inline-flex items-center gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.18em] ${s.accent}`}
                    >
                      Read in detail <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </HolographicCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 py-4 text-center"
        >
          <p className="text-base text-slate-600">Ready to scope your project with a senior architect?</p>
          <Button href="/contact">Book a discovery session</Button>
        </motion.div>
      </Container>
    </div>
  );
}

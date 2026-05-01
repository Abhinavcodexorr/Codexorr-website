"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function HomeServicesSection() {
  const items = services;

  return (
    <section className="relative border-b border-slate-200/80 bg-white/40 py-[88px] md:py-[104px] lg:py-[120px]" id="services-preview">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_54%_at_92%_-6%,rgba(167,139,250,0.12),transparent_55%)]"
      />
      <div className="section-divider absolute inset-x-8 top-0 md:inset-x-16" />

      <Container className="relative flex flex-col gap-14 md:gap-16 lg:gap-[4.5rem]">
        <SectionHeading
          eyebrow="Services"
          title="Full‑spectrum builds — disciplined where it counts."
          subtitle="Web, mobile, AI, automation, cloud, UX, analytics, and roadmap clarity — each lane owned by principals who sweat the details alongside your team."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 16) * 0.038 }}
              >
                <motion.div whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }} className="h-full">
                  <Link href={`/services/${s.slug}`} className="group block h-full">
                    <div
                      className={cn(
                        "relative flex min-h-[240px] h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_22px_64px_-40px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-[box-shadow,border-color] duration-300",
                        "hover:border-teal-200/95 hover:shadow-[0_36px_90px_-40px_rgba(20,184,166,0.22)] lg:p-8",
                      )}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(120% 80% at 10% -10%, rgba(${s.glow},0.09), transparent 55%)`,
                        }}
                      />

                      <div className={`relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${s.iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-teal-700">
                        {s.eyebrow}
                      </span>
                      <h3 className="relative mt-2 font-heading text-lg font-semibold tracking-tight text-slate-900">{s.title}</h3>
                      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                      <span className="relative mt-8 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-teal-700">
                        View details <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

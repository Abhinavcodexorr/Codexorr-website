"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { services, getService, type ServiceSlug } from "@/lib/services";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug);
  if (!service) return null;
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-x-clip bg-white py-12 md:py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]"
        />
        <Container className="relative flex flex-col gap-8 md:gap-10">
          <motion.div initial="hidden" animate="show" variants={fade} className="flex flex-col items-start gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-cyan-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All services
            </Link>
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${service.iconBg}`}>
                <service.icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{service.eyebrow}</span>
            </div>
            <h1 className="font-heading max-w-3xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {service.title}.{" "}
              <span className="gradient-text-animated">{service.tagline}</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{service.description}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button href="/contact">
                Start a project <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/portfolio" variant="outline">
                See related work
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4 sm:gap-4 sm:p-6"
          >
            {service.outcomes.map((o) => (
              <div key={o.label} className="flex flex-col items-center gap-1 text-center">
                <span className="font-heading text-xl font-bold text-slate-900 md:text-2xl">{o.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 md:text-xs">{o.label}</span>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="relative bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <Container className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">Capabilities</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              What we deliver inside this practice.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2">
            {service.capabilities.map((c) => (
              <motion.div
                key={c.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <HolographicCard intensity={4} glowColor={service.glow}>
                  <div className="flex h-full flex-col gap-3 p-5 md:p-7">
                    <h3 className="font-heading text-lg font-semibold text-slate-900">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{c.body}</p>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${service.accent}`} aria-hidden />
                <span className="text-sm leading-relaxed text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="relative bg-white py-12 md:py-20 lg:py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">Process</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              How a typical engagement unfolds.
            </h2>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <motion.li
                key={p.step}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">{p.step}</span>
                <h3 className="font-heading text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Stack */}
      <section className="relative bg-slate-50 py-12 md:py-20 lg:py-28">
        <Container className="flex flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">Stack</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Tools we reach for in this practice.
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2 md:gap-3">
            {service.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-700 shadow-sm md:px-5 md:py-2.5 md:text-xs md:tracking-[0.18em]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-white py-12 md:py-20 lg:py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">FAQ</span>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2.25rem]">
              Common questions before kickoff.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.faq.map((f) => (
              <div key={f.q} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-heading text-base font-semibold text-slate-900">{f.q}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="relative bg-slate-50 py-12 md:py-20 lg:py-28">
          <Container className="flex flex-col gap-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Related services
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="block h-full">
                  <HolographicCard className="h-full" intensity={4} glowColor={r.glow}>
                    <div className="flex h-full flex-col gap-3 p-5 md:p-6">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${r.iconBg}`}>
                        <r.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-slate-900">{r.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{r.tagline}</p>
                      <span className={`mt-auto inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] ${r.accent}`}>
                        Open <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                  </HolographicCard>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative bg-white py-12 md:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center md:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Ready to engage on {service.title.toLowerCase()}?
            </h2>
            <p className="max-w-xl text-sm text-slate-600 md:text-base">
              Tell us your goals and constraints — we&apos;ll come back with architecture options, timelines, and a senior team.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button href="/contact">
                Book a discovery call <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="outline">
                Explore other services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

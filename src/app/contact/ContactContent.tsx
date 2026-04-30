"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HolographicCard } from "@/components/ui/HolographicCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactContent() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="flex flex-1 flex-col py-12 md:py-20 lg:py-28">
      <Container className="flex flex-col gap-10 md:gap-14 lg:gap-16">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you're building — we'll meet you with clarity."
          subtitle="Expect a thoughtful reply within two business days: suggested architecture slices, collaboration options, and next steps."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <HolographicCard intensity={5} glowColor="34,211,238">
              <div className="relative p-5 sm:p-8 md:p-10">
                {sent ? (
                  <div className="flex flex-col items-center gap-6 py-10 text-center">
                    <CheckCircle2 className="h-16 w-16 text-emerald-400" aria-hidden />
                    <h3 className="font-heading text-2xl font-semibold text-white">
                      Brief received!
                    </h3>
                    <p className="max-w-xs text-slate-400">
                      We&apos;ll review and reply within two business days with a sane plan.
                    </p>
                    <Button href="/services" variant="ghost">
                      Explore our services
                    </Button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm text-slate-300">
                        Name
                        <input
                          required
                          name="name"
                          className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 transition-colors focus:border-cyan-400/50 focus:bg-white/[0.06]"
                          placeholder="Jordan Avery"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm text-slate-300">
                        Work email
                        <input
                          required
                          type="email"
                          name="email"
                          className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 transition-colors focus:border-cyan-400/50 focus:bg-white/[0.06]"
                          placeholder="you@company.com"
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Company
                      <input
                        name="company"
                        className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 transition-colors focus:border-cyan-400/50 focus:bg-white/[0.06]"
                        placeholder="Northshore Analytics"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-300">
                      Project outline
                      <textarea
                        required
                        name="message"
                        rows={5}
                        className="resize-y rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 transition-colors focus:border-cyan-400/50 focus:bg-white/[0.06]"
                        placeholder="Roadmap, constraints, timelines, success metrics..."
                      />
                    </label>
                    <div className="pt-2">
                      <Button type="submit" className="w-full sm:w-auto sm:min-w-[200px]">
                        Send message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </HolographicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
            className="flex flex-col gap-8"
          >
            <HolographicCard intensity={5} glowColor="167,139,250">
              <div className="relative flex flex-col gap-5 p-5 sm:p-8 md:p-10">
                <h2 className="font-heading text-lg font-semibold text-white md:text-xl">
                  Studio coordinates
                </h2>
                <div className="flex flex-col gap-5 text-sm text-slate-400">
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
                    <div>
                      <p className="font-medium text-slate-200">Global remote-first</p>
                      <p className="mt-1 leading-relaxed">
                        Pods in San Francisco · Toronto · Berlin · Singapore — aligned scheduling for every partner.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
                    <a
                      href="mailto:hello@codexorr.com"
                      className="font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                      hello@codexorr.com
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
                    <span className="text-slate-300">+1 (415) 555-0198</span>
                  </div>
                </div>
              </div>
            </HolographicCard>

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] shadow-[0_0_60px_-36px_rgba(167,139,250,0.55)]">
              <div className="aspect-[16/11] w-full bg-slate-900/80">
                <iframe
                  title="Map — San Francisco"
                  className="h-full w-full opacity-60 grayscale contrast-[1.1] invert-[0.85] transition-opacity hover:opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4318%2C37.7617%2C-122.3896%2C37.7984&layer=mapnik&marker=37.7801%2C-122.4107"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/25" />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

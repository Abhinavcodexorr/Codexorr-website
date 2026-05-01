"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURED = [
  {
    title: "House Cleaning Services",
    tag: "Apps · Logistics",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "WhrzAt",
    tag: "Social · Discovery",
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Ride & Taxi Platform",
    tag: "Marketplace · Mobility",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1400&auto=format&fit=crop",
  },
];

export function FeaturedWorkSection() {
  return (
    <section
      className="section-band-dark relative border-b border-white/10 py-[88px] md:py-24 lg:py-[120px]"
      id="work"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] dot-grid-dark" />

      <Container className="relative flex flex-col gap-14 md:gap-16 lg:gap-[4.75rem]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Work"
            title="Products that endure launch week — not just demos."
            subtitle="Sampling platforms spanning mobility, commerce, logistics, finance, and realtime social — rigorous craft at every fidelity."
            align="left"
            theme="dark"
          />
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400 transition-colors hover:text-cyan-300 md:self-auto"
          >
            Portfolio
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="grid gap-8 md:gap-10 lg:grid-cols-3">
          {FEATURED.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ delay: i * 0.065, duration: 0.48 }}
            >
              <Link href="/portfolio" className="group block">
                <div className="overflow-hidden rounded-2xl border border-white/[0.13] bg-slate-950/45 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.65)] transition-[transform,box-shadow,border-color] duration-500 group-hover:-translate-y-2 group-hover:border-cyan-400/35 group-hover:shadow-[0_52px_120px_-48px_rgba(34,211,238,0.22)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-[transform] duration-700 group-hover:scale-[1.05]"
                      unoptimized={p.image.includes("unsplash")}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(15,23,42,0.78)_92%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 pt-24">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-teal-200">
                        {p.tag}
                      </span>
                      <h3 className="font-heading mt-2 text-xl font-semibold text-white">{p.title}</h3>
                      <span className="mt-5 inline-flex h-11 w-fit min-w-[9.5rem] items-center justify-center rounded-full border border-white/38 bg-white/15 px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition group-hover:bg-white/24">
                        View project
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

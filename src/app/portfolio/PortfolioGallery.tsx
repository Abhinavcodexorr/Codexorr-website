"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Platform badge colours                                               */
/* ------------------------------------------------------------------ */
const platformStyle: Record<string, string> = {
  iOS:           "bg-sky-50 text-sky-700 border-sky-200",
  Android:       "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Admin Panel": "bg-violet-50 text-violet-700 border-violet-200",
  "Driver App":  "bg-amber-50 text-amber-700 border-amber-200",
  "Artist App":  "bg-pink-50 text-pink-700 border-pink-200",
  Web:           "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function PlatformTag({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
        platformStyle[label] ?? "bg-slate-100 text-slate-700 border-slate-200",
      )}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stat chip                                                            */
/* ------------------------------------------------------------------ */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="font-heading text-xl font-bold text-slate-900">{value}</span>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project data                                                          */
/* ------------------------------------------------------------------ */
const projects = [
  {
    title: "House Cleaning Services",
    tagline: "Revolutionary on-demand cleaning — London",
    sector: "CleanTech · On-demand",
    summary:
      "End-to-end cleaning services platform built for scale — customers can book a professional cleaner in under 60 seconds. Real-time scheduling, provider matching, in-app payments, and live tracking, all in one seamless experience.",
    platforms: ["iOS", "Android"],
    stats: [
      { value: "10k+", label: "Customers" },
      { value: "100k+", label: "Bookings/day" },
      { value: "5.0 ★", label: "Rating" },
    ],
    href: "/contact",
    liveLabel: "Request case study",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1800&auto=format&fit=crop",
    featured: true,
    accent: "34,211,238",
  },
  {
    title: "WhrzAt",
    tagline: "Discover your city in real-time",
    sector: "Social · Location Discovery",
    summary:
      "GPS-powered social discovery app that lets users find live hotspots, trending events, bars, restaurants, and parties near them. Real-time photos, hotspot flame indicators, friend chat, and event promotion built in.",
    platforms: ["iOS", "Android", "Admin Panel"],
    stats: null,
    href: "https://www.whrzat.com",
    liveLabel: "Visit WhrzAt",
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=1800&auto=format&fit=crop",
    featured: false,
    accent: "167,139,250",
  },
  {
    title: "Foody's Hub",
    tagline: "Full-stack food delivery platform",
    sector: "FoodTech · Delivery",
    summary:
      "Three-sided marketplace connecting customers, restaurants, and delivery drivers. Live order tracking, dynamic driver dispatch, smart menu management, and an operations admin panel — built for high-frequency delivery volume.",
    platforms: ["iOS", "Android", "Admin Panel", "Driver App"],
    stats: null,
    href: "/contact",
    liveLabel: "Request case study",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1800&auto=format&fit=crop",
    featured: false,
    accent: "251,146,60",
  },
  {
    title: "kwot",
    tagline: "African music, video & podcast streaming",
    sector: "Entertainment · Streaming",
    summary:
      "Premium streaming platform for African artists and audiences — music, podcasts, and video content with artist fan clubs, exclusive early releases, behind-the-scenes footage, and live one-on-one sessions. 100k+ downloads.",
    platforms: ["iOS", "Android", "Admin Panel", "Artist App"],
    stats: [
      { value: "100k+", label: "Downloads" },
      { value: "4.4 ★", label: "Rating" },
    ],
    href: "https://apps.apple.com/ca/app/kwot-video-music-podcast/id1641283024",
    liveLabel: "View on App Store",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop",
    featured: false,
    accent: "244,114,182",
  },
  {
    title: "Finance & Wallet App",
    tagline: "Personal finance & digital wallet",
    sector: "FinTech · Payments",
    summary:
      "Secure digital wallet with peer-to-peer transfers, expense analytics, smart budgeting, and multi-currency support. Bank-grade encryption, biometric auth, and real-time transaction notifications out of the box.",
    platforms: ["iOS", "Android", "Admin Panel"],
    stats: null,
    href: "/contact",
    liveLabel: "Request case study",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1800&auto=format&fit=crop",
    featured: false,
    accent: "52,211,153",
  },
  {
    title: "Ride & Taxi Platform",
    tagline: "Ride-hailing with real-time dispatch",
    sector: "Mobility · Transport",
    summary:
      "Full ride-hailing solution with intelligent driver dispatch, fare estimation, in-app payments, trip history, and safety features. A driver app, customer app, and operations dashboard built from the ground up.",
    platforms: ["iOS", "Android", "Admin Panel", "Driver App"],
    stats: null,
    href: "/contact",
    liveLabel: "Request case study",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1800&auto=format&fit=crop",
    featured: false,
    accent: "56,189,248",
  },
];

/* ------------------------------------------------------------------ */
/* Card                                                                  */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const isExternal = project.href.startsWith("http");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_24px_60px_-26px_rgba(15,23,42,0.18)]"
      style={{ ["--card-glow" as never]: `rgba(${project.accent},0.25)` }}
    >
      {/* Image */}
      <div className={cn("relative w-full overflow-hidden", project.featured ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[16/10]")}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={project.featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 backdrop-blur-md sm:left-5 sm:top-5">
          {project.sector}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-4 md:p-8 sm:p-6">
        {/* Title + live link */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-semibold text-slate-900 md:text-2xl">{project.title}</h2>
            <p className="text-sm text-slate-500">{project.tagline}</p>
          </div>
          {isExternal ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="flex-shrink-0 rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-700"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : (
            <Link
              href={project.href}
              aria-label={`Learn more about ${project.title}`}
              className="flex-shrink-0 rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-700"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>

        <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">{project.summary}</p>

        {/* Stats — only for featured / projects with stats */}
        {project.stats && (
          <div className="flex flex-wrap gap-3">
            {project.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        )}

        {/* Platform tags + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap gap-2">
            {project.platforms.map((p) => (
              <PlatformTag key={p} label={p} />
            ))}
          </div>

          {isExternal ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 transition-colors hover:text-cyan-900"
            >
              {project.liveLabel}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : (
            <Link
              href={project.href}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 transition-colors hover:text-cyan-900"
            >
              {project.liveLabel}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */
export function PortfolioGallery() {
  const [featured, ...rest] = projects;

  return (
    <div className="flex flex-1 flex-col py-8 md:py-12 lg:py-16">
      <Container className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <SectionHeading
          eyebrow="Portfolio"
          title="Real products. Real users. Real impact."
          subtitle="A selection of apps, platforms, and digital products we've designed, engineered, and shipped — from initial concept through to App Store launch."
        />

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_26px_76px_-54px_rgba(15,23,42,0.16)] sm:grid-cols-4 sm:gap-4 sm:p-6"
        >
          {[
            { value: "100+", label: "Projects shipped" },
            { value: "10+", label: "Industries" },
            { value: "4.4★", label: "Avg app rating" },
            { value: "110k+", label: "App downloads" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <span className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">{s.value}</span>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Featured card */}
        <ProjectCard project={featured} index={0} />

        {/* Grid — 2 columns */}
        <div className="grid gap-5 md:grid-cols-2 lg:gap-8 xl:gap-10">
          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i + 1} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-slate-600">
            Have an idea for an app, platform, or digital product?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-[linear-gradient(135deg,#f8fafcff_0%,#ecfeff66_52%,#f5f3ffaa_100%)] hover:text-cyan-950"
          >
            <Star className="h-4 w-4 text-cyan-500" aria-hidden />
            Start your project
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Building2, Mail, Terminal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/services";

export function Footer() {
  const quick = services;

  return (
    <footer className="relative mt-auto border-t border-slate-200/90 bg-gradient-to-b from-white to-slate-50/92 py-12 md:py-14 lg:py-16">
      <Container className="relative flex flex-col gap-11 md:flex-row md:justify-between md:gap-14">
        <div className="mx-auto flex max-w-md flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-lg outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-cyan-500/70"
          >
            <Image src="/logo.png" alt="" width={44} height={44} className="h-10 w-10" />
            <span className="font-heading text-lg font-semibold tracking-tight text-slate-900 md:text-xl">CodeXorr</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            AI‑native engineering for teams that need platforms, mobile, cloud, automation, and product craft — clarity,
            measurable outcomes, and senior ownership at every milestone.
          </p>
          <a
            href="mailto:hello@codexorr.com"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
          >
            <Mail className="h-4 w-4" aria-hidden />
            hello@codexorr.com
          </a>
        </div>

        <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-10 text-center sm:grid-cols-3 md:mx-0 md:max-w-none md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Studio</span>
            <Link href="/about" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              About
            </Link>
            <Link href="/portfolio" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              Portfolio
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/services" className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-teal-800">
              Services →
            </Link>
            {quick.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
                {s.title}
              </Link>
            ))}
          </div>
          <div className="col-span-2 flex flex-col items-center gap-4 sm:col-span-1 md:items-start">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Social</span>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-teal-200 hover:text-teal-700 hover:shadow-md"
              >
                <Building2 className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <Terminal className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-8 text-center text-xs text-slate-500 md:flex-row md:text-left">
        <p>© {new Date().getFullYear()} CodeXorr. Crafted precision — built for global scale.</p>
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="/contact" className="transition-colors hover:text-slate-800">
            Privacy
          </Link>
          <Link href="/contact" className="transition-colors hover:text-slate-800">
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}

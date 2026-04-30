import Image from "next/image";
import Link from "next/link";
import { Building2, Mail, Terminal } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative mt-auto bg-slate-950 py-10 md:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <Container className="relative flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-lg outline-none ring-offset-2 ring-offset-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-400/70"
          >
            <Image src="/logo.png" alt="" width={44} height={44} className="h-10 w-10" />
            <span className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">CodeXorr</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Enterprise-grade engineering for ambitious teams — platforms that ship fast, scale cleanly, and feel
            unmistakably premium.
          </p>
          <a
            href="mailto:hello@codexorr.com"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <Mail className="h-4 w-4" aria-hidden />
            hello@codexorr.com
          </a>
        </div>

        <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-8 text-center sm:grid-cols-3 md:mx-0 md:max-w-none md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</span>
            <Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">About</Link>
            <Link href="/portfolio" className="text-sm text-slate-400 transition-colors hover:text-white">Portfolio</Link>
            <Link href="/contact" className="text-sm text-slate-400 transition-colors hover:text-white">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Capabilities</span>
            <Link href="/services/web" className="text-sm text-slate-400 transition-colors hover:text-white">Web</Link>
            <Link href="/services/mobile" className="text-sm text-slate-400 transition-colors hover:text-white">Mobile</Link>
            <Link href="/services/cloud" className="text-sm text-slate-400 transition-colors hover:text-white">Cloud</Link>
            <Link href="/services/ai" className="text-sm text-slate-400 transition-colors hover:text-white">AI &amp; Automation</Link>
            <Link href="/services/ux" className="text-sm text-slate-400 transition-colors hover:text-white">UI / UX</Link>
          </div>
          <div className="col-span-2 flex flex-col items-center gap-4 sm:col-span-1 md:items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Social</span>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="rounded-full border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_14px_-4px_rgba(34,211,238,0.5)]"
              >
                <Building2 className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="rounded-full border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                <Terminal className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-center text-xs text-slate-500 md:flex-row md:text-left">
        <p>© {new Date().getFullYear()} CodeXorr. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/contact" className="transition-colors hover:text-slate-300">Privacy</Link>
          <Link href="/contact" className="transition-colors hover:text-slate-300">Terms</Link>
        </div>
      </Container>
    </footer>
  );
}

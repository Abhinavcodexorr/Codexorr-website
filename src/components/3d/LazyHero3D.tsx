"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeroPremiumFloatCSS } from "@/components/home/HeroPremiumFloatCSS";
import { cn } from "@/lib/cn";

function Hero3DPlaceholder() {
  return (
    <div
      aria-hidden
      className="min-h-[inherit] w-full rounded-[inherit] bg-gradient-to-br from-white via-violet-50/90 to-teal-50/92 ring-1 ring-cyan-100/70"
    />
  );
}

const Hero3DCanvas = dynamic(() => import("@/components/3d/Hero3D"), {

  ssr: false,
  loading: Hero3DPlaceholder,
});

const GL_QUERY = "(min-width: 1024px)";

/** Below lg: CSS “live orb” only (fast, no Three). lg+: lazy WebGL, one mesh, ambient only. */
export function LazyHero3D({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<"css" | "gl">("css");
  const [shouldLoadGl, setShouldLoadGl] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(GL_QUERY);
    const sync = () => setTier(mq.matches ? "gl" : "css");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (tier !== "gl") {
      setShouldLoadGl(false);
      return;
    }
    const node = rootRef.current;
    if (!node) return;

    const activate = () => setShouldLoadGl(true);

    const nearViewport = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const edge = 240;
      return rect.bottom > -edge && rect.top < vh + edge;
    };

    if (nearViewport()) {
      activate();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          activate();
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [tier]);

  const chrome = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_72px_rgba(255,255,255,0.74)]"
    />
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[inherit] min-h-[260px] sm:min-h-[300px] lg:min-h-[min(420px,52vh)]",
        className,
      )}
    >
      {tier === "css" ? (
        <>
          <HeroPremiumFloatCSS className="rounded-[inherit]" />
          {chrome}
        </>
      ) : shouldLoadGl ? (
        <>
          <Suspense fallback={<Hero3DPlaceholder />}>
            <Hero3DCanvas />
          </Suspense>
          {chrome}
        </>
      ) : (
        <>
          <Hero3DPlaceholder />
          {chrome}
        </>
      )}
    </div>
  );
}
